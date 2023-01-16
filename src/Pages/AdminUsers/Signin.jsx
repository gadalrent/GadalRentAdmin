import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Axios from "axios";
// import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../Private/api";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useAuth from "../../utils/useAuth";
import { useFormik } from "formik";
const validate = (values) => {
  const errors = {};
  if (!values.emailOrUname) {
    errors.emailOrUname = " required";
  } 
  
  if (!values.password) {
    errors.password = 'required';
  }
  return errors;
};
export default function SignIn() {
  const { handleLogin,handleLevel,handleUserName,handleId} = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [snackopen, setSnackopen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const formik = useFormik({
    initialValues:{
      emailOrUname:'',
      password:'',
    },
    validate,
    onSubmit:async (values,{resetForm})=>{
      if(!loading){
        setLoading(true)
        try {
          const res = await Axios.post(`${api.baseUrl}/user/admin/login`, {
            email: values.emailOrUname,
            password: values.password
          });
         console.log('loogedin')
          const token = res?.data?.token;
          const level = res?.data?.level;
          const id = res?.data?.id
          const username = res?.data?.username;
          handleLogin(token)
          handleLevel(level)
          handleUserName(username)
          handleId(id)
          setIsSuccess(true);
          resetForm()
          navigate("/");
        } 
        catch (error) {
          console.log(error)
          setIsSuccess(false)
        }
        finally {
          setLoading(false)
          setSnackopen(true)
        }
      }
    }
  })
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   try {
  //     const res = await Axios.post(`${api.baseUrl}/user/admin/login`, {
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //    console.log('loogedin')
  //     const token = res?.data?.token;
  //     const level = res?.data?.level;
  //     const id = res?.data?.id
  //     const username = res?.data?.username;
  //     handleLogin(token)
  //     setLevel(level)
  //     setUsername(username)
  //     setId(id)
  //     setSnackopen(true);
  //     navigate("/");
  //   } 
  //   catch (err) {
  //     setSnackopen(true);
  //     setIsSuccess(false);
  //     console.log(err);
  //   }
  // };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        autoHideDuration={2000}
        open={snackopen}
        onClose={() => {
          setSnackopen(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackopen(false);
          }}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isSuccess ? `Successfully Loged In` : `Incorrect credential`}
        </Alert>
      </Snackbar>
      <Paper
        sx={{
          p: 4,
          m: 2,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form  onSubmit={formik.handleSubmit}  sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email or Username"
            name="emailOrUname"
            value={formik.values.emailOrUname}
            onChange = {formik.handleChange}
            autoComplete="email"
            variant="filled"
            error={formik.touched.emailOrUname && Boolean(formik.errors.emailOrUname)}
            helperText={formik.touched.emailOrUname && formik.errors.emailOrUname}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value = {formik.values.password}
            onChange = {formik.handleChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="password"
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* <Grid container>
              <Grid item xs>
                <Link href="/dashboard" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
        </form>
   
      </Paper>
    </Container>
  );
}
