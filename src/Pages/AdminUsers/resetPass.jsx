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
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../Private/api"
import AuthContext from "../../Private/AuthProvider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useAuth from "../../utils/useAuth";
const validate = (values) => {
  const errors = {};
  if (!values.oldPassword) {
    errors.oldPassword = " required";
  } 
  
  if (!values.newPassword) {
    errors.newPassword = 'required';
  }
 
  if(!values.confirmPassword){
      errors.confirmPassword = 'Required'
  }
  else if(values.confirmPassword !== values.newPassword){
      errors.confirmPassword = 'Password do not match'
  }

  return errors;
};

const PassResetForm = ()=>{
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [snackopen, setSnackopen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [loading, setLoading] = React.useState(false);
    const {auth:token,username}= useAuth()
    const navigate = useNavigate()
    const handleClickShowOldPassword = () => {
      setShowOldPassword((prev) => !prev);
    };
    const handleClickShowNewPassword = () => {
      setShowNewPassword((prev) => !prev);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const formik = useFormik({
      initialValues:{
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
      },
      validate,
      onSubmit: async (values,{resetForm})=>{
        if(!loading){
          // if(accessLevel === ''){
          // setLevelError(true)
          // setLevelErrorText("Access level is required")
          // }
          
            setLoading(true)
            try {
              await Axios.patch(`${api.baseUrl}/user/admin/updatePassword`, {
                username,
                newPassword:values.confirmPassword,
                oldPassword:values.oldPassword
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
              );
              setIsSuccess(true)
              resetForm()
              navigate('/')
            } 
            catch (error) {
              console.log('some error',error)
              setIsSuccess(false)
            }
            finally {
              setLoading(false)
              setSnackopen(true)
            }
          
      }
      }
    })
    return(
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
            {isSuccess ? `Password Successfully Changed` : `Incorrect credential`}
          </Alert>
        </Snackbar>
        <Paper
          sx={{
            p: 4,
            m: 2,
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box  sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type={showOldPassword ? "text" : "password"}
              value = {formik.values.oldPassword}
              onChange = {formik.handleChange}
              id="oldPassword"
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
              autoComplete="current-password"
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              onChange = {formik.handleChange}
              value = {formik.values.newPassword}
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              autoComplete="new-password"
            />

                        <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange = {formik.handleChange}
              value = {formik.values.confirmPassword}
              id="confirm-password"
              variant="filled"
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              autoComplete="confirm-password"
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
              disabled={loading}
            >
            Save
            </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    )
}
export default PassResetForm
    