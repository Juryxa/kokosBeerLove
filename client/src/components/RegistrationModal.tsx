import React, { useState, useContext, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';

const RegistrationModal: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [step, setStep] = useState<number>(1); // 1 - вход/регистрация, 2 - подтверждение email
    const [code, setCode] = useState<string[]>(Array(6).fill('')); // Код подтверждения
    const [errorFields, setErrorFields] = useState<{ name?: string, email?: string, password?: string, confirmPassword?: string, code?: string }>({});
    const [loginError, setLoginError] = useState<boolean>(false); // Ошибка входа
    const [codeError, setCodeError] = useState<boolean>(false); // Ошибка кода подтверждения
    const [resendTimer, setResendTimer] = useState<number>(10); // Таймер для повторной отправки кода
    const { store } = useContext(Context);

    useEffect(() => {
        if (!open) {
            setStep(1);
            setIsLogin(true); // Сброс формы на вход
            setCodeError(false); // Сброс ошибки кода
        }
    }, [open]);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [resendTimer]);

    // Проверка корректности email
    const validateEmail = (email: string): boolean => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = () => {
        if (isLogin) {
            // Валидация для входа
            const errors: any = {};
            if (!email) errors.email = 'Введите email';
            if (!password) errors.password = 'Введите пароль';

            if (Object.keys(errors).length > 0) {
                setErrorFields(errors);
                return;
            }

            const success = store.login(email, password);
            if (!success) {
                setLoginError(true); // Показываем ошибку при неправильных данных
            } else {
                handleClose();
            }
        } else {
            // Валидация для регистрации
            const errors: any = {};
            if (!name) errors.name = 'Введите имя';
            if (!email || !validateEmail(email)) errors.email = 'Некорректный email';
            if (!password) errors.password = 'Введите пароль';
            if (!confirmPassword) errors.confirmPassword = 'Подтвердите пароль';
            if (password !== confirmPassword) errors.confirmPassword = 'Пароли не совпадают';

            if (Object.keys(errors).length > 0) {
                setErrorFields(errors);
                return;
            }

            // Переход на шаг подтверждения email
            setStep(2);
            store.verify(email); // Отправляем код подтверждения
        }
    };

    const handleCodeChange = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    const handleConfirmEmail = () => {
        const confirmationCode = Number(code.join(''));
        const codeFromStore = store.getCode();
        if (confirmationCode === codeFromStore) {
            store.registration(name, email, password);
            handleClose();
        } else {
            setCodeError(true); // Устанавливаем ошибку, если код неверен
        }
    };

    const handleResendCode = () => {
        setResendTimer(10); // Сбрасываем таймер
        store.verify(email); // Повторно отправляем код
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    padding: '30px',
                    width: '400px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <IconButton
                    onClick={() => {
                        if (step === 2) setIsLogin(true); // Если закрыли подтверждение, возвращаем на страницу входа
                        handleClose();
                    }}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: "red"
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {step === 1 ? (
                    <>
                        <Typography variant="h5" sx={{ mb: 2, color: '#E62526', fontSize: "30px" }}>
                            {isLogin ? "Вход" : "Регистрация"}
                        </Typography>

                        {!isLogin && (
                            <TextField
                                sx={{
                                    mb: 2,
                                    width: "300px",
                                    backgroundColor: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: errorFields.name ? 'red' : '#E62526', borderWidth: '3px' },
                                    },
                                    '& .MuiInputLabel-root': { color: '#E62526' },
                                }}
                                label="Имя"
                                variant="outlined"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                error={!!errorFields.name}
                                helperText={errorFields.name}
                                FormHelperTextProps={{ sx: { color: 'red' } }} // Ярко-красный цвет ошибок
                            />
                        )}

                        <TextField
                            sx={{
                                mb: 2,
                                width: "300px",
                                backgroundColor: 'white',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: errorFields.email ? 'red' : '#E62526', borderWidth: '3px' },
                                },
                                '& .MuiInputLabel-root': { color: '#E62526' },
                            }}
                            label="Email"
                            variant="outlined"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            error={!!errorFields.email}
                            helperText={errorFields.email}
                            FormHelperTextProps={{ sx: { color: 'red' } }} // Ярко-красный цвет ошибок
                        />

                        <TextField
                            sx={{
                                mb: 2,
                                width: "300px",
                                backgroundColor: 'white',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: errorFields.password ? 'red' : '#E62526', borderWidth: '3px' },
                                },
                                '& .MuiInputLabel-root': { color: '#E62526' },
                            }}
                            label="Пароль"
                            variant="outlined"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            error={!!errorFields.password}
                            helperText={errorFields.password}
                            FormHelperTextProps={{ sx: { color: 'red' } }} // Ярко-красный цвет ошибок
                        />

                        {!isLogin && (
                            <TextField
                                sx={{
                                    mb: 2,
                                    width: "300px",
                                    backgroundColor: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: errorFields.confirmPassword ? 'red' : '#E62526', borderWidth: '3px' },
                                    },
                                    '& .MuiInputLabel-root': { color: '#E62526' },
                                }}
                                label="Подтвердите пароль"
                                variant="outlined"
                                type="password"
                                onChange={e => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                error={!!errorFields.confirmPassword}
                                helperText={errorFields.confirmPassword}
                                FormHelperTextProps={{ sx: { color: 'red' } }} // Ярко-красный цвет ошибок
                            />
                        )}

                        {loginError && (
                            <Typography sx={{ color: 'red', mb: 2 }}>
                                Неверные данные для входа
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#E62526',
                                color: 'white',
                                borderRadius: '12px',
                                width: "300px"
                            }}
                            onClick={handleSubmit}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>

                        <Button
                            sx={{ mt: 2, color: '#E62526' }}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" sx={{ mb: 2, color: '#E62526', fontSize: "30px" }}>
                            Подтверждение почты
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            {code.map((digit, index) => (
                                <TextField
                                    key={index}
                                    sx={{
                                        width: '40px',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: codeError ? 'red' : '#E62526', borderWidth: '2px' },
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 1,
                                        style: { textAlign: 'center' },
                                    }}
                                    variant="outlined"
                                    value={digit}
                                    onChange={e => handleCodeChange(e.target.value, index)}
                                />
                            ))}
                        </Box>

                        {codeError && (
                            <Typography sx={{ color: 'red', mt: 1 }}>
                                Неверный код подтверждения
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#E62526',
                                color: 'white',
                                borderRadius: '12px',
                                width: "300px"
                            }}
                            onClick={handleConfirmEmail}
                        >
                            Подтвердить
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: resendTimer === 0 ? '#E62526' : '#555',
                                color: 'white',
                                borderRadius: '12px',
                                width: "300px",
                                cursor: resendTimer === 0 ? 'pointer' : 'not-allowed'
                            }}
                            onClick={handleResendCode}
                            disabled={resendTimer > 0}
                        >
                            {resendTimer === 0 ? 'Отправить заново' : `Отправить заново через ${resendTimer} секунд`}
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default observer(RegistrationModal);
