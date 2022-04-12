import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Icon } from '@iconify/react';
import {useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { IUserNewPassword } from "../../flmngApi/userProfile/model/IUser";
import * as service from '../../flmngApi/userProfile/services/user.service';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import md5 from 'md5';
const interfaceState: IUserNewPassword = {
  Email: '', 
  TemporalPassword: '',
  NewPassword: ''
}

const initialState: any = {
  email:'',
  newPassword:'',
  confirmPassword:''
}

const PassUpdateComponent = (props: any) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPass, setconfirmPass] = useState(false);
    const [alertTitle, setAlertTitle] = useState(false);
    const [password, setPassword] = useState(initialState);
    const [submit, setsubmit] = useState<IUserNewPassword>(interfaceState);
    const [errors, setErrors] = useState(initialState);


    const save=async()=>{
      if (submit.Email !== '' && submit.NewPassword !== '' && submit.TemporalPassword !== '') {
        await service.postNewPassword(submit)
        .then(response=>{
          console.log(response);
          navigate('/Dashboard', { replace: true });
        })
    
        .catch(error=>{
            console.log(error);
        })
      }else{
        setAlertTitle(true)
      }
      
    }

    /*-------Validations Fields-------*/
    const handleChangeTemporal = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setsubmit({...submit,
        TemporalPassword: md5(event.target.value)})
        setErrors({...submit, temporalPassword: ''})
        let validate = event.target.value
            if(validate === ''){
                setErrors({...submit,
                  temporalPassword: "This field temporal password is required."})
            }
    }

    const handleChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setPassword({...password,
        newPassword: event.target.value})
    }

    const handleChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setPassword({...password,
        confirmPassword: event.target.value})
      setErrors({...password, confirmPassword: ''})
      let validate = event.target.value
          if(validate != password.newPassword){
              setErrors({...password,
                confirmPassword: "Password don't match."})
          }
    }

    useEffect(() => {
      if (password.newPassword !== '') {    
        var mdPassword =md5(password.newPassword)
        setsubmit({
          ...submit,
          Email: cookies.get('email'),
          NewPassword: mdPassword
        })
      }
    }, [password.newPassword]);


    return (
        <div>
          <Box
            component="main"
          >
            <Container maxWidth="sm">
              <form>
                <Box>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    New Password
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Please, enter your new password.
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  disabled= {true}
                  variant="outlined"
                  value={cookies.get('email')}
                />
                <TextField
                  fullWidth
                  label="Temporal Password"
                  margin="normal"
                  name="temporalPassword"
                  type="email"
                  variant="outlined"
                  onChange={handleChangeTemporal}
                  error={Boolean(errors?.temporalPassword)}
                  helperText={(errors?.temporalPassword)}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  margin="normal"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                            <Box component={Icon} icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChangeNewPassword}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  name="confirmPassword"
                  type={confirmPass ? 'text' : 'password'}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setconfirmPass((prev) => !prev)}>
                            <Box component={Icon} icon={confirmPass ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChangeConfirm}
                  error={Boolean(errors?.confirmPassword)}
                  helperText={(errors?.confirmPassword)}
                />
                <Box >
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={()=>save()}>
                    Save
                  </Button>
                </Box>
                {alertTitle &&(
                <Alert severity="error">
                  <AlertTitle>Please, verify that all fields are filled</AlertTitle>
                </Alert>
                )}
              </form>
            </Container>
          </Box>
        </div>
      );
}


export default PassUpdateComponent