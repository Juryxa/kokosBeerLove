import axios from 'axios';

export const uploadImage = async (
    file: File,
    setSuccessMessage: (message: string | null) => void,
    setErrorMessage: (message: string | null) => void,
    folder: string,
): Promise<string> => {
    // Преобразуем имя файла: заменяем пробелы на "_" и удаляем невалидные символы
    const sanitizedFileName = file.name
        .toLowerCase() // Делаем имя файла в нижнем регистре
        .replace(/\s+/g, '_') // Заменяем пробелы на "_"
        .replace(/[^a-z0-9_\.-]/g, ''); // Удаляем все символы, кроме букв, цифр, "_", ".", и "-"

    const uniqueFileName = `${Date.now()}_${sanitizedFileName}`;

    try {
        const response = await axios.put(
            `https://localhost/uploads/${folder}/${uniqueFileName}`,
            file,
            {
                headers: {
                    'Content-Type': file.type,
                },
            }
        );

        if (response.status === 201) {
            setSuccessMessage('Изображение успешно загружено.');
            return `https://localhost/uploads/${folder}/${uniqueFileName}`;
        }
        if (response.status === 401) {
            setErrorMessage('Вы не авторизованы');
            return '';
        } else {
            setErrorMessage('Ошибка при загрузке изображения.');
            return '';
        }
    } catch (error) {
        setErrorMessage('Ошибка при загрузке изображения.');
        return '';
    }
};
