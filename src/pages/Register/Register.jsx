import React, { useState } from 'react'
import { useNavigate, } from "react-router-dom";
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import "./style.css";
import { VWaterPaths } from '../../confgurations/paths/vwaterPath';
import Loading from '../../components/Loading/Loading';
import { ToastContainer } from 'react-toastify';

function Register() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [showPasswordField, setShowPasswordField] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    // Handle submit form
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    const handleSwitch = () => {
        navigate(VWaterPaths.login, { replace: true });
    }

    return (
        <div className="wrapper">
            <Loading isLoading={isLoading}></Loading>
            <ToastContainer />

            <div className="login_container">
                <div className="container">
                    <div className="login_left">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "90%",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                                <LockOpenOutlinedIcon />
                            </Avatar>

                            <Typography component="h1" variant="h5">
                                Đăng ký
                            </Typography>

                            <Box noValidate sx={{ mt: 1, width: "90%" }}>
                                {/* Input phone number */}
                                <TextField
                                    margin="normal"
                                    name="phone"
                                    {...register("phone")}
                                    id="phone"
                                    label="Số điện thoại"
                                    autoComplete="phone"
                                    autoFocus
                                    required
                                    className="input"
                                />
                                <small style={{ color: "red" }}> {errors?.phone?.message} </small>

                                {/* Input password */}
                                {showPasswordField &&
                                    <TextField
                                        margin="normal"
                                        required
                                        name="password"
                                        {...register("password")}
                                        label="Mật khẩu"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        className="input"
                                    />}
                                {showPasswordField && <small style={{ color: "red" }}> {errors?.password?.message} </small>}

                                {/* Input password confirmation */}
                                {showPasswordField &&
                                    <TextField
                                        margin="normal"
                                        required
                                        name="passwordConfirmation"
                                        {...register("passwordConfirmation")}
                                        label="Xác nhận mặt khẩu"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        className="input"
                                    />}
                                {showPasswordField && <small style={{ color: "red" }}> {errors?.passwordConfirmation?.message} </small>}


                                {showPasswordField && <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => onSubmit()}
                                >
                                    Đăng ký
                                </Button>}

                                <Grid container></Grid>
                            </Box>
                        </Box>
                    </div>

                    <div className="login_right">
                        <div className="login_right-content">
                            <h2 className="login_right-title">Bạn đã có tài khoản?</h2>
                            <p className="login_right-desc">
                                Hãy đăng nhập vào hệ thống để tận hưởng những tiện ich tuyệt vời của VWater
                            </p>
                        </div>
                        <div className="login_right-button">
                            <button onClick={handleSwitch} className="btn-signup">Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register