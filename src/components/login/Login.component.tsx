import axios from "axios";
import { Box, Button, AlertTitle, TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import md5 from "md5";
import { ILogin } from "../../flmngApi/userProfile/model/IUser";

const interfaceState: ILogin = {
  UserId: "",
  Password: "",
};

const initialState: any = {
  userId: "",
  password: "",
};

const LoginComponent = (props: any) => {
  const navigate = useNavigate();
  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/Login`;
  const cookies = new Cookies();
  const [formLogin, setFormLogin] = useState<ILogin>(interfaceState);
  const [errors, setErrors] = useState(initialState);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertUserExist, setAlertUserExist] = useState(false);
  const [alertPasswd, setAlertPasswd] = useState(false);

  useEffect(() => {
    if (cookies.get("userId")) {
      navigate("/Dashboard", { replace: true });
    }
  });

  const loginIn = async () => {
    if (formLogin.UserId !== "" && formLogin.Password !== "") {
      //validate email exist
      const validateUserId = await axios.get(
        baseUrl + `/ValidateEmail?email=${formLogin.UserId}`
      );

      if (validateUserId.data.response === true) {
        //encript password with md5
        var password = md5(formLogin.Password);
        //login validate from API
        const response = await axios.get(
          baseUrl + `/Login?email=${formLogin.UserId}&password=${password}`
        );
        if (response.data !== "") {
          if (response.data.userId > 0) {
            cookies.set("userId", response.data.userId, { path: "/" });
            cookies.set("userName", response.data.userName, { path: "/" });
            cookies.set("firstName", response.data.firstName, { path: "/" });
            cookies.set("lastName", response.data.lastName, { path: "/" });
            cookies.set("email", response.data.email, { path: "/" });
            cookies.set("forgotPassword", response.data.forgotPassword, {
              path: "/",
            });
            var validate = cookies.get("forgotPassword");
            if (validate === "true") {
              navigate("/NewPassword", { replace: true });
            } else {
              navigate("/Dashboard", { replace: true });
            }
          }
        } else {
          //need notification
          setAlertPasswd(true);
          setAlertTitle(false);
        }
      } else {
        setAlertUserExist(true);
        setAlertTitle(false);
      }
    } else {
      setAlertTitle(true);
    }
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, UserId: event.target.value });
    setErrors({ ...formLogin, userId: "" });
    let validate = event.target.value;
    if (validate === "") {
      setErrors({ ...formLogin, userId: "This field user id is required." });
    }
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, Password: event.target.value });
    setErrors({ ...formLogin, password: "" });
    let validate = event.target.value;
    if (validate === "") {
      setErrors({ ...formLogin, password: "This field password is required." });
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-content-center justify-content-center fm_login_container">
        <div className="fm_login_bg"></div>
        <div className="fm_login_head text-center">
          <div className="col">
            <h1 className="fm_login_head--title">Welcome!</h1>
            <p className="fm_login_head--subtitle">
              Use these awesome forms to login.
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
        <div className="fm_login_card fm_card ">
          <div className="d-flex flex-column justify-items-center">
            <div className="d-flex w-100 justify-content-center">
            <div className="fm_login_card__logo fm-logo--big"></div>
            </div>

            <div className="fm_login_card__form  d-flex flex-column justify-content-center text-center">
              <h1 className="logincard__form__title text-center">Login</h1>
              <TextField
                label="User ID"
                className="fm_input"
                variant="outlined"
                type="UserId"
                name="UserId"
                size="small"
                onChange={handleChangeUserId}
                error={Boolean(errors?.userId)}
                helperText={errors?.userId}
              />
              <TextField
                className="fm_input"
                label="Password"
                name="Password"
                type="Password"
                size="small"
                variant="outlined"
                onChange={handleChangePassword}
                error={Boolean(errors?.password)}
                helperText={errors?.password}
              />
              <a
                href="/RecoverPassword"
                className="fm-button--link row justify-content-center"
              >
                Forgot Password?
              </a>
              <Button
                fullWidth
                size="large"
                variant="contained"
                className="fm-button--colored"
                color="primary"
                onClick={() => loginIn()}
              >
                Login
              </Button>
              {alertTitle && (
                <Alert severity="error">
                  <AlertTitle>
                    Please, verify that all fields are filled.
                  </AlertTitle>
                </Alert>
              )}
              {alertUserExist && (
                <Alert severity="error">
                  <AlertTitle>The user id entered doesn't exist.</AlertTitle>
                </Alert>
              )}
              {alertPasswd && (
                <Alert severity="error">
                  <AlertTitle>Wrong password.</AlertTitle>
                </Alert>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
