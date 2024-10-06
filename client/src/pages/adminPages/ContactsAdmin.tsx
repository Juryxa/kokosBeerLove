import React, { useState, useEffect } from 'react';
import './AdminForms.css';

const ContactsAdmin = () => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [contactsList, setContactsList] = useState<any[]>([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setContactsList([
            { id: 1, address: 'Улица 1, Город', phone: '+7 123 456 7890', email: 'contact@mail.com' },
            { id: 2, address: 'Улица 2, Город', phone: '+7 987 654 3210', email: 'info@mail.com' }
        ]);
    };

    const handleAddOrUpdateContact = async () => {
        if (!address || !phone || !email) {
            alert('Заполните все поля!');
            return;
        }

        // Логика сохранения контактов...

        setAddress('');
        setPhone('');
        setEmail('');

        fetchContacts();
    };

    return (
        <div className="admin-form-container">
            <h2 className="admin-form-title">Добавить контакт</h2>

            <input
                type="text"
                className="admin-form-input"
                placeholder="Адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <input
                type="text"
                className="admin-form-input"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="email"
                className="admin-form-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button className="admin-form-button" onClick={handleAddOrUpdateContact}>Добавить контакт</button>

            <div className="contacts-list">
                <h3>Список контактов</h3>
                <ul>
                    {contactsList.map((contact) => (
                        <li key={contact.id}>{contact.address} - {contact.phone} - {contact.email}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ContactsAdmin;
