import React, { useContext, useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import img from '../images/T-shirt Mockup.png';
interface ShopItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: any;
}
const Basket: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
    const { store } = useContext(Context);
    const[isBuying,setBuying]=useState<ShopItem[]>([])
    const shopItems:ShopItem[] = [
        {
            id: 1,
            name: 'Кокосовое пиво',
            description: 'Освежающее пиво с легким кокосовым привкусом, идеально для летних вечеров.',
            price: 350,
            image: img
        },
        {
            id: 2,
            name: 'Пшеничное пиво',
            description: 'Традиционное пшеничное пиво с насыщенным вкусом и мягким ароматом.',
            price: 300,
            image: img
        },
        {
            id: 3,
            name: 'Темное стаут',
            description: 'Классический стаут с нотками кофе и шоколада, созданный для истинных гурманов.',
            price: 450,
            image: img
        },
        {
            id: 4,
            name: 'IPA с цитрусами',
            description: 'Интенсивное IPA с выраженным цитрусовым ароматом и горьким послевкусием.',
            price: 400,
            image: img
        },
        {
            id: 5,
            name: 'Классическое лагер',
            description: 'Легкое и освежающее лагер пиво, которое подходит к любому случаю.',
            price: 280,
            image: img
        }
    ];

useEffect(()=>{
    setBuying(shopItems)
},[])
    // Функция для удаления товара из корзины
    const handleRemoveItem = (itemId: number) => {
        // Логика удаления товара из корзины через store
        
    };

    // Функция для перехода к оформлению заказа
    const handleCheckout = () => {
        handleClose();
        // Логика для перехода на страницу оформления заказа
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    padding: '30px',
                    width: '500px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: "red"
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" sx={{ mb: 2, color: '#E62526', fontSize: "30px" }}>
                    Корзина
                </Typography>

                {shopItems.length > 0 ? (
                    <>
                        <List>
                            {shopItems.map((item) => (
                                <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '15px' }} />
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`Цена: ${item.price} руб.`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                                            <DeleteIcon sx={{ color: '#E62526' }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#E62526',
                                color: 'white',
                                borderRadius: '12px',
                                width: "100%"
                            }}
                            onClick={handleCheckout}
                        >
                            Перейти к оформлению
                        </Button>
                    </>
                ) : (
                    <Typography sx={{ mt: 2, color: 'gray' }}>
                        Ваша корзина пуста.
                    </Typography>
                )}
            </Box>
        </Modal>
    );
};

export default observer(Basket);
