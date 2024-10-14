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
import BasketService from '../api/services/BasketService';
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

useEffect(()=>{
    fetchBacket()
},[])


const fetchBacket = async () => {
    setIsLoading(true);
    try {
        const response = await BasketService.getAllBasket();
        setBuying(response.data);
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            setErrorMessage('Товары не найдены.');
        } else {
            setErrorMessage('Ошибка загрузки товаров.');
        }
    } finally {
        setIsLoading(false);
    }
};




const handleRemoveItem = async (itemId: number) => {
    try {
        setIsLoading(true);
        await BasketService.removeItemFromBasket(itemId);
        setBuying((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error: any) {
        setErrorMessage('Ошибка при удалении товара из корзины.');
    } finally {
        setIsLoading(false);
    }
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

                {isBuying.length > 0 ? (
                    <>
                        <List>
                            {isBuying.map((item) => (
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
