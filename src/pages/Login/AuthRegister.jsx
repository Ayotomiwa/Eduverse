import {useContext, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


import {
    Box,
    Button,
    FormHelperText,
    Grid,
    InputLabel, Link,
    OutlinedInput,
    Stack, TextField,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import {Formik} from 'formik';
import axios from "axios";
import UserContext from "../../hooks/UserProvider";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material";



const AuthRegister = () => {
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [next, setNext] = useState(false);
    const {login, API_GATEWAY} = useContext(UserContext);
    const Navigate = useNavigate();




    useEffect(() => {
        if(universities.length > 0){
            return;
        }
        fetchUniversities();
    }, [next]);


    const fetchUniversities = () => {
        axios.get('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
            .then(response => {
                const universitiesWithId = response.data.map((university, index) => ({
                    ...university,
                    id: index,
                }));
                const universitiesInTheUk = universitiesWithId.filter((university) => university.country === "United Kingdom");
                const uniqueUniversities = Array.from(
                    new Set(universitiesInTheUk.map((university) => JSON.stringify(university)))
                ).map((university) => JSON.parse(university));
                setUniversities(uniqueUniversities);

                console.log("Universities", universitiesWithId);
            })
            .catch(error => {
                console.error("Failed to fetch universities", error);
            });
    }

    const changePassword = (value) => {

    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <Box sx={{display: "flex",
            flexDirection: "row-reverse",
            height: "100vh",
            backgroundColor:"white"
            ,boxSizing:"border-box" }}>
            <Box sx={{boxSizing:"border-box", width:"50%" }}>
                <img src="https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1600"
                     alt="login-background" style={{width: "100%", height: "100vh",boxSizing:"border-box" , objectFit: "cover"}}
                />
            </Box>
            <Box sx={{width:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Box sx={{p:4, boxSizing:"border-box", m:8}}>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        universityName: "",
                        domain: "",
                        address: "",
                        password: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().max(255).required('First Name is required'),
                        lastName: Yup.string().max(255).required('Last Name is required'),
                        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                        password: Yup.string().max(255).required('Password is required'),
                      phoneNumber: Yup.string().max(255).required('Phone Number is required'),
                        universityName:  Yup.string().max(255).required('University Name is required'),
                        domain: Yup.string().required('Domain is required')
                    })}
                    onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                        try {
                            console.log("Signing UP")
                            await axios({
                                "method": 'POST',
                                "url": `${API_GATEWAY}/api/user-service/university/register`,
                                "data": values
                            });

                            const logInResponse = await axios({
                                "method": 'POST',
                                "url": `${API_GATEWAY}/api/user-service/authenticate`,
                                "data": {
                                    username: values.email,
                                    password: values.password
                                }
                            });
                            login(logInResponse.data)
                            console.log("Signing UP")
                            setStatus({success: true})
                            console.log("Status is successful")
                            Navigate('/user', { replace: true })
                        } catch (err) {
                            console.error(err);
                            if (err.response) {
                                setErrors({submit: err.response.data.message});
                            } else if (err.response) {
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
                    {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue}) => (
                        <form noValidate onSubmit={handleSubmit} style={{padding: "16px"}}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: "50px"}}>
                                <Typography variant="h4" sx={{fontWeight: "bold"}}>
                                    Sign Up Form
                                </Typography>
                                <Button type="link"
                                        component={RouterLink}
                                        to={`/login`}
                                        sx={{color:"rgb(99, 102, 241)"}}
                                > Have an Account? Log in</Button>
                            </Stack>

                            <Grid container spacing={3}>
                                {!next && (
                                    <>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="firstName-signup">First Name*</InputLabel>
                                        <OutlinedInput
                                            id="firstName-login"
                                            type="firstName"
                                            value={values.firstName}
                                            name="firstName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="John"
                                            fullWidth
                                            error={Boolean(touched.firstName && errors.firstName)}
                                        />
                                        {touched.firstName && errors.firstName && (
                                            <FormHelperText error id="helper-text-firstName-signup">
                                                {errors.firstName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="lastName-signup">Last Name*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.lastName && errors.lastName)}
                                            id="lastName-signup"
                                            type="lastName"
                                            value={values.lastName}
                                            name="lastName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            inputProps={{}}
                                        />
                                        {touched.lastName && errors.lastName && (
                                            <FormHelperText error id="helper-text-lastname-signup">
                                                {errors.lastName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                              <Grid item xs={12}>
                                <Stack spacing={1}>
                                  <InputLabel htmlFor="phone-signup">Phone Number*</InputLabel>
                                  <OutlinedInput
                                      id="phone-signup"
                                      type="tel"
                                      value={values.phoneNumber}
                                      name="phoneNumber"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      placeholder="07123455567"
                                      fullWidth
                                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                  />
                                  {touched.phoneNumber && errors.phoneNumber && (
                                      <FormHelperText error id="helper-text-phone-signup">
                                        {errors.phoneNumber}
                                      </FormHelperText>
                                  )}
                                </Stack>
                              </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-signup">Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            id="password-signup"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                changePassword(e.target.value);
                                            }}
                                            placeholder="******"
                                            inputProps={{}}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="helper-text-password-signup">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                            </>
                                )}

                                {next && (
                                    <>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="universityName">University Name*</InputLabel>
                                                <Autocomplete
                                                    freeSolo
                                                    id="universityName"
                                                    options={universities}
                                                    getOptionLabel={(option) => option.name || ''}
                                                    // getOptionSelected={(option, value) => option.name === value.name}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    onBlur={handleBlur}
                                                    onChange={(event, newValue) => {
                                                        setFieldValue('universityName', newValue ? newValue.name : '');
                                                        const domain = newValue?.domains ? newValue.domains[0] : '';
                                                        setFieldValue('domain', domain);
                                                    }}
                                                    value={values.universityName ? { name: values.universityName, domain: values.domain } : null}
                                                />


                                                {touched.universityName && errors.universityName && (
                                                    <FormHelperText error id="helper-text-universityName-signup">
                                                        {errors.universityName}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="domain">Domain*</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.domain && errors.domain)}
                                                    id="domain"
                                                    type="domain"
                                                    value={values.domain}
                                                    name="domain"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="lsbu.ac.uk"
                                                    inputProps={{}}
                                                />
                                                {touched.domain && errors.domain && (
                                                    <FormHelperText error id="helper-text-domain-signup">
                                                        {errors.domain}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="email-signup">Email Address(@domain)*</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.email && errors.email)}
                                                    id="email-login"
                                                    type="email"
                                                    // value={values.email === "" || values.email.startsWith("@") ? values.email + "@" + values.domain : values.email}
                                                    value={values.domain === "" ? values.email : values.email.substr(0, values.email.indexOf("@")) + "@" + values.domain }
                                                    name="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="demo@lsbu.ac.uk"
                                                    inputProps={{}}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="helper-text-email-signup">
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>

                                      {/*<Grid item xs={12}>*/}
                                      {/*  <Stack spacing={1}>*/}
                                      {/*    <InputLabel htmlFor="address-signup">Company Address*</InputLabel>*/}
                                      {/*    <OutlinedInput*/}
                                      {/*        id="address-signup"*/}
                                      {/*        type="text"*/}
                                      {/*        value={values.address}*/}
                                      {/*        name="business.address"*/}
                                      {/*        onBlur={handleBlur}*/}
                                      {/*        onChange={handleChange}*/}
                                      {/*        placeholder="123 Market Street, London, WC27 8YH"*/}
                                      {/*        fullWidth*/}
                                      {/*        error={Boolean(touched.address && errors.address)}*/}
                                      {/*    />*/}
                                      {/*      {touched.address && errors.address && (*/}
                                      {/*          <FormHelperText error id="address-signup">*/}
                                      {/*              {errors.address}*/}
                                      {/*          </FormHelperText>*/}
                                      {/*      )}*/}
                                      {/*  </Stack>*/}
                                      {/*</Grid>*/}
                                    </>
                                )}

                                <Grid item xs={12}>
                                    <Button
                                        onClick={() => setNext(!next)}
                                        fullWidth
                                        size="large"
                                        variant= {next? "outlined" : "contained"}
                                        color={!next ? "success" : "secondary"}
                                    >
                                        {next ? "Previous" : "Next"}
                                    </Button>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                                {isSubmitting && (
                                    <Grid item xs={12}>
                                        <FormHelperText sx={{ color: 'green' }}>Authenticating...</FormHelperText>
                                    </Grid>
                                )}

                                {next && (
                                <Grid item xs={12}>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{backgroundColor:"rgb(59, 61, 145)", borderRadius:"10px",
                                                        "&:hover,&:focus, &:active": {
                                                            backgroundColor: "rgb(59, 61, 145)"
                                                        }}}
                                                >
                                                    Create Account
                                                </Button>
                                </Grid>
                                    )}
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Box>
            </Box>
        </Box>

    );
};

export default AuthRegister;
