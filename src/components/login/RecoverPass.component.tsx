import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as service from '../../flmngApi/userProfile/services/user.service';
const RecoverPassComponent = (props: any) => {
  const navigate = useNavigate();
  const [useEmail, setEmail] = useState({
    email:'',
  });
  const recoverPass=async()=>{
    await service.postRecoverPassword(useEmail.email)
    .then(response=>{
      console.log(response);
      navigate('/', { replace: true });
    })

    .catch(error=>{
        console.log(error);
    }) 
  }

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
                    Recover Password
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Please, enter the email address associated with your account and We will email you a new password.
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  variant="outlined"
                  onChange={(event) => setEmail({...useEmail,email: event.target.value})}
                />
                <Box >
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={()=>recoverPass()} >
                    Reset Password
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Back to login? <Link className="navbar-brand" to={"/"}>Sign In</Link>
                </Typography>
              </form>
            </Container>
          </Box>
        </div>
      );
}


export default RecoverPassComponent