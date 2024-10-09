from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from ...models import AboutFcKokoc
from ...serializers import AboutFcKokocSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


# Описание для PUT и PATCH запросов
@swagger_auto_schema(
    method='put',
    operation_description="Полное обновление информации о клубе. Доступно только администраторам (is_superuser == true).",
    request_body=AboutFcKokocSerializer,
    responses={
        200: openapi.Response(description="Информация о клубе успешно обновлена"),
        400: openapi.Response(description="Неправильные данные"),
        401: openapi.Response(description="Неавторизован. Необходимо передать токен доступа."),
        403: openapi.Response(description="У вас нет прав для изменения информации (нужен is_superuser)."),
        404: openapi.Response(description="Информация о клубе не найдена"),
    }
)
@swagger_auto_schema(
    method='patch',
    operation_description="Частичное обновление информации о клубе. Доступно только администраторам (is_superuser == true).",
    request_body=AboutFcKokocSerializer,
    responses={
        200: openapi.Response(description="Информация о клубе успешно частично обновлена"),
        400: openapi.Response(description="Неправильные данные"),
        401: openapi.Response(description="Неавторизован. Необходимо передать токен доступа."),
        403: openapi.Response(description="У вас нет прав для изменения информации (нужен is_superuser)."),
        404: openapi.Response(description="Информация о клубе не найдена"),
    }
)
@api_view(['PUT', 'PATCH'])
@authentication_classes([JWTTokenUserAuthentication])
@permission_classes([IsAuthenticated])
def update_about_fc_kokoc(request):
    try:
        about_fc_kokoc = AboutFcKokoc.objects.first()

        if not request.user.is_superuser:
            return Response({'error': 'У вас нет прав для изменения информации'}, status=status.HTTP_403_FORBIDDEN)

        # Проверяем, какой тип запроса (PUT или PATCH)
        if request.method == 'PUT':
            # Полное обновление (все поля обязательны)
            serializer = AboutFcKokocSerializer(about_fc_kokoc, data=request.data)
        elif request.method == 'PATCH':
            # Частичное обновление (некоторые поля могут быть обновлены)
            serializer = AboutFcKokocSerializer(about_fc_kokoc, data=request.data, partial=True)

        # Проверяем валидность данных
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except AboutFcKokoc.DoesNotExist:
        return Response({'error': 'Информация о клубе не найдена'}, status=status.HTTP_404_NOT_FOUND)
