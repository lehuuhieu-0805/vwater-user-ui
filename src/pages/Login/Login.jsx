import React, { useState } from "react";
import { AuthConsumer } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { VWaterPaths } from "../../confgurations/paths/vwaterPath";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function Login() {
  const navigate = useNavigate();
  const { setAccessToken } = AuthConsumer();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle submit form
  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    if (data.phone === "0312345678" && data.password === "vwater123@") {
      setAccessToken("Token");
    } else {
      toast.error("Số điện thoại hoặc mặt khẩu không chính xác!");
    }
    setLoading(false);
  });

  const handleSwitch = () => {
    navigate(VWaterPaths.register, { replace: true });
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
              <Loading isLoading={isLoading}></Loading>
              <ToastContainer />
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                Đăng nhập
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
                />
                <small style={{ color: "red" }}> {errors?.password?.message} </small>

                <Link className="forgot-password" >
                  Quên mật khẩu?
                </Link>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => onSubmit()}
                >
                  Đăng nhập
                </Button>

                <Grid container></Grid>
              </Box>
            </Box>
          </div>

          <div className="login_right">
            <div className="login_right-content">
              <h2 className="login_right-title">Bạn là người dùng mới?</h2>
              <p className="login_right-desc">
                Hãy đăng ký tài khoản và khám phá những tiện ích tuyệt vời của VWater!
              </p>
            </div>
            <div className="login_right-button">
              <button onClick={handleSwitch} className="btn-signup">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
