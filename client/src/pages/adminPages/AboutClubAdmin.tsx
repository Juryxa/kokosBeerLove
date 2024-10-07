import React, { useState, useEffect } from 'react';
import './AdminForms.css';

const AboutClubAdmin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [aboutList, setAboutList] = useState<any[]>([]);

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {

        setAboutList([
            { id: 1, title: 'О клубе', description: 'Описание клуба', imageUrl: '/images/about.jpg' }
        ]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddOrUpdateAbout = async () => {
        if (!title || !description) {
            alert('Заполните все поля!');
            return;
        }

        setTitle('');
        setDescription('');
        setImage(null);

        fetchAbout();
    };

    return (
        <div className="admin-form-container">
            <h2 className="admin-form-title">Редактировать "О клубе"</h2>

            <input
                type="text"
                className="admin-form-input"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="admin-form-textarea"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="admin-form-file-label">
                Загрузить изображение
                <input type="file" className="admin-form-file-input" onChange={handleFileChange} />
            </label>
            {image && <p className="admin-form-image-name">Файл: {image.name}</p>}

            <button className="admin-form-button" onClick={handleAddOrUpdateAbout}>Сохранить</button>
        </div>
    );
};

export default AboutClubAdmin;
