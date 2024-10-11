import axios from 'axios';

export const uploadImage = async (
    file: File,
    setSuccessMessage: (message: string | null) => void,
    setErrorMessage: (message: string | null) => void,
    folder: string,
): Promise<string> => {
    const uniqueFileName = `${Date.now()}_${file.name}`;

    try {
        const response = await axios.put(
            `http://localhost/uploads/${folder}/${uniqueFileName}`,
            file,
            {
                headers: {
                    'Content-Type': file.type,
                },
            }
        );

        if (response.status === 201) {
            setSuccessMessage('Изображение успешно загружено.');
            return `http://localhost/uploads/${folder}/${uniqueFileName}`;
        }
        if (response.status === 401){
            setErrorMessage('Вы не авторизованы');
            return'';
        }
        else {
            setErrorMessage('Ошибка при загрузке изображения.');
            return'';
        }
    } catch (error) {
        setErrorMessage('Ошибка при загрузке изображения.');
        return '';
    }
};
