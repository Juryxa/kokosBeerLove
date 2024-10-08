import axios from 'axios';

export const uploadImage = async (
    file: File,
    setSuccessMessage: (message: string | null) => void,
    setErrorMessage: (message: string | null) => void
): Promise<string> => {
    const uniqueFileName = `${Date.now()}_${file.name}`;

    try {
        const response = await axios.put(
            `http://localhost:9000/upload_image/${uniqueFileName}`,
            file, // Передаем сам файл в body
            {
                headers: {
                    'Content-Type': file.type,
                },
            }
        );

        if (response.status === 200) {
            setSuccessMessage('Изображение успешно загружено.');
            return `/uploads/news_images/${uniqueFileName}`;
        } else {
            setErrorMessage('Ошибка при загрузке изображения.');
            return '';
        }
    } catch (error) {
        setErrorMessage('Ошибка при загрузке изображения.');
        return '';
    }
};
