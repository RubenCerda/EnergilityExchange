import React, { useState } from "react";
import {Box,
    Button,
    Checkbox,
    Container,
    TextField,
    Typography} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../flmngApi/userProfile/model/IUser";
import * as service from '../../flmngApi/userProfile/services/user.service';
import md5 from 'md5';
const interfaceState: IUser = {
  Username: '',
  FirstName: '',
  LastName: '',
  Email: '',
  Password: '',
  UserSessionId: 1
}

const RegisterComponent = (props: any) => {
  const [create, setCreate] = useState<IUser>(interfaceState);
  const navigate = useNavigate();
  //Post new User
  async function postUserSubmit() {
    await service.postUser(create)
    .then(response=>{
      console.log(response);
      navigate('/', { replace: true });
    })

    .catch(error=>{
        console.log(error);
    })
  }

  const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) =>{
    var passwordEncript = md5(event.target.value)
    setCreate({...create,
      Password: passwordEncript})
  }

    return (
        <div>
          <Box component="main">
            <Container maxWidth="sm">
              <form>
                <Box>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Create a new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create a new account
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="User Name"
                  margin="normal"
                  name="userName"
                  variant="outlined"
                  onChange={(event) => setCreate({...create,Username: event.target.value})}
                />
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  variant="outlined"
                  onChange={(event) => setCreate({...create,FirstName: event.target.value})}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  variant="outlined"
                  onChange={(event) => setCreate({...create,LastName: event.target.value})}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  variant="outlined"
                  onChange={(event) => setCreate({...create,Email: event.target.value})}
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                  onChange={handleChangePass}
                />
                <Box>
                  <Checkbox
                    name="policy"
                  />
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    I have read the Terms and Conditions
                  </Typography>
                </Box>
                <Box>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={() => postUserSubmit()}
                    variant="contained"
                  >
                    Sign Up Now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Have an account? <Link className="navbar-brand" to={"/"}>Sign In</Link>
                </Typography>
              </form>
            </Container>
          </Box>
        </div>
      );

}

export default RegisterComponent