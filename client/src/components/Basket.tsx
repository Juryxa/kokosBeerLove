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
import axios from 'axios';
import BasketService from '../api/services/BasketService';
import { ShopResponse } from "../api/models/response/ShopResponse"
import img from '../images/T-shirt Mockup.png'

interface Basket  {
    id:number;
    product_name: number,
    description: string,
    url_images: string[],
    size: string,
    quantity: number
}

interface RemoveItemFromCartProps {
    productId: number;
    size: string;
  }

const Basket: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
   
    const[isBuying,setBuying]=useState<Basket[]>([])
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








const removeItemFromCart = async ({
  productId,
  size,
}: RemoveItemFromCartProps) => {
  try {
    // Отправляем DELETE запрос на сервер с productId и размером
    const response = await axios.delete(`http://localhost:8003/api/shop/remove_item_from_cart/${productId}/`, {
      params: { size },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,  // Если требуется авторизация
      },
    });

    // Если запрос успешен, вызываем onSuccess
    
  } catch (error) {
    setErrorMessage('Ошибка загрузки товаров.');
  }
}





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
                            {isBuying.map((item,index) => (
                                <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={item.url_images[0] || img} alt="error" style={{ width: '50px', marginRight: '15px' }} />
                                    <ListItemText
                                        primary={`Название:${item.product_name}`}
                                        // secondary={`Цена: ${item.price} руб.`}
                                    />
                                    <ListItemSecondaryAction >
                                        <IconButton edge="end" onClick={() => removeItemFromCart(item.id,item.size)}>
                                                                                                        
                                                                                                        
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
