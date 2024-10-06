import React, { useState, useEffect } from 'react';
import './AdminForms.css';

const MatchesAdmin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [matchesList, setMatchesList] = useState<any[]>([]);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        setMatchesList([
            { id: 1, title: 'Матч 1', description: 'Описание матча 1', imageUrl: '/images/match1.jpg' },
            { id: 2, title: 'Матч 2', description: 'Описание матча 2', imageUrl: '/images/match2.jpg' }
        ]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddOrUpdateMatch = async () => {
        if (!title || !description) {
            alert('Заполните все поля!');
            return;
        }

        // Логика сохранения матча...

        setTitle('');
        setDescription('');
        setImage(null);

        fetchMatches();
    };

    return (
        <div className="admin-form-container">
            <h2 className="admin-form-title">Добавить матч</h2>

            <input
                type="text"
                className="admin-form-input"
                placeholder="Название матча"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="admin-form-textarea"
                placeholder="Описание матча"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="admin-form-file-label">
                Загрузить изображение
                <input type="file" className="admin-form-file-input" onChange={handleFileChange} />
            </label>
            {image && <p className="admin-form-image-name">Файл: {image.name}</p>}

            <button className="admin-form-button" onClick={handleAddOrUpdateMatch}>Добавить матч</button>

            <div className="matches-list">
                <h3>Список матчей</h3>
                <ul>
                    {matchesList.map((match) => (
                        <li key={match.id}>{match.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MatchesAdmin;
