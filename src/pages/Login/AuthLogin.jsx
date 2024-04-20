import {useContext, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Box} from '@mui/material';

import {Button, FormHelperText, Grid, InputLabel, Link, OutlinedInput, Stack, Typography} from '@mui/material';
import * as Yup from 'yup';
import {Formik} from 'formik';
import axios from "axios";
import UserContext from "../../hooks/UserProvider";


const AuthLogin = () => {

    const {login} = useContext(UserContext);

    return (
        <Box sx={{display: "flex",
            flexDirection: "row",
            height: "100vh",
            backgroundColor:"white"
            ,boxSizing:"border-box" }}>
            <Box sx={{boxSizing:"border-box", width:"50%" }}>
                <img src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1600"
                     alt="login-background" style={{width: "100%", height: "100vh",boxSizing:"border-box" , objectFit: "cover"}}
                />
            </Box>
            <Box sx={{width:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Box sx={{p:4, boxSizing:"border-box", m:8}}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
                        })}
                        onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                            try {
                                console.log("Signing IN")

                                const logInResponse = await axios.post('http://localhost:8222/api/user-service/authenticate',
                                    {
                                        username: values.email,
                                        password: values.password
                                });
                                login(logInResponse.data)
                                setStatus({success: true})

                            } catch (err) {
                                console.error(err);
                                if (err.response) {
                                    setErrors({submit: err.response.data});
                                } else if (err.message) {
                                    setErrors({submit: err.message});
                                } else if (err.request) {
                                    console.error(err.request);
                                    setErrors({submit: "No response from server"})
                                }
                                setStatus({success: false});
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                            <form noValidate onSubmit={handleSubmit} style={{padding: "16px"}}>
                                <Grid>
                                    <Typography variant="h4" sx={{
                                        mb: "50px", backgroundImage: "", textAlign: "center", fontWeight: "bold",
                                    }}>
                                        Log-in
                                    </Typography>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                            <OutlinedInput
                                                id="email-login"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter email address"
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="password-login">Password</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                id="password-login"
                                                type='password'
                                                value={values.password}
                                                name="password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter password"
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} sx={{mt: -1}}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center"
                                               spacing={10}>
                                            <Link variant="string" component={RouterLink} to=""  sx={{textAlign: "left", color:"black"}}>
                                                <Typography>
                                                    Forgot Password?
                                                </Typography>
                                            </Link>
                                            <Link variant="string" component={RouterLink}
                                                  to="/register"
                                                  sx={{textAlign: "right", color:"black"}}
                                            >
                                                <Typography>
                                                    New University? Sign Up
                                                </Typography>
                                            </Link>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sx={{height:"20px"}}>
                                        {errors.submit && (
                                            <Grid item xs={12}>
                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                            </Grid>
                                        )}
                                        {isSubmitting && (
                                            <Grid item xs={12}>
                                                <FormHelperText sx={{color: 'green'}}>
                                                    <Typography component="div">
                                                        Signing in...
                                                    </Typography>
                                                </FormHelperText>
                                            </Grid>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button disableElevation
                                                disabled={isSubmitting}
                                                fullWidth size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                        >
                                            <Typography>
                                                Login
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    );
};

export default AuthLogin;