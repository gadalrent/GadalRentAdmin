import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import {useFormik} from 'formik';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { api } from "../Private/api"
// import AuthContext from "../../Private/AuthProvider";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import { useNavigate } from "react-router-dom";
// import Snackbar from "@mui/material/Snackbar";
import accessLevels from '../utils/accessLevels'
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Admin's Name is required";
  } 
  
  // if (values.name.length > 15) {
  //   errors.name = 'Must be 15 characters or less';
  // }

  if (!values.email) {
    errors.email = 'Email is required';
  }
 
  else if(!validateEmail(values.email)) {
    errors.email = "Invalid Email";
  }
  if(!values.password){
      errors.password = 'Required';
  }
  if(!values.confirmPassword){
      errors.confirmPassword = 'Required'
  }
  else if(values.confirmPassword !== values.password){
      errors.confirmPassword = 'Password do not match'
  }

  return errors;
};

export default function AdminRegistration({closeDialogOnSave}){
    // const [accessLevel, setAccessLevel] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    // const [levelError,setLevelError] = React.useState(false)
    // const [levelErrorText,setLevelErrorText] = React.useState('')
    // const handleAccessLevelChange = (event) => {
    //     setAccessLevel(event.target.value);
    // };
    const formik = useFormik({
      initialValues: {
        name: '',
        password: '',
        email: '',
        confirmPassword:'',
      },
      validate,
      onSubmit: async values => {
        // alert(JSON.stringify(values, null, 2));
        if(!loading){
            // if(accessLevel === ''){
            // setLevelError(true)
            // setLevelErrorText("Access level is required")
            // }
            
              setLoading(true)
              try {
                const res = await Axios.post(`${api.baseUrl}/user/signup`, {
                  email:values.email,
                  name: values.name,
                  password: values.password,
                  accessLevel:1,
                  isAdmin:true
                });
                resetForm()
                closeDialogOnSave()
              } 
              catch (error) {
                
              }
              finally {
                setLoading(false)
              }
            
        }
      },
    });
    return (
        <Container component="main" maxWidth="xs">
        {/* <Snackbar
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
            severity={isSuccess ? "success" : "warning"}
            sx={{ width: "100%" }}
          >
            {isSuccess ? `Password Successfully Changed` : `Incorrect credential`}
          </Alert>
        </Snackbar> */}

          <form  onSubmit={formik.handleSubmit}
                  style = {{marginTop:'8px'}}
          >
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete="email"
            variant="filled"
            autoFocus
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            variant="filled"
            autoFocus
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            // type={showPassword ? "text" : "password"}
            type="password"
            id="password"
            variant="filled"
            value = {formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
               <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            // type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            id="confirm-password"
            variant="filled"
            value = {formik.values.confirmPassword}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
            {/* <FormControl sx={{mt:1}} fullWidth>
        <InputLabel >Access Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accessLevel}
          label="Access Level"
          onChange={handleAccessLevelChange}
          variant='filled'
          inputProps={
            {
                margin:'normal'
            }
          }
          
        >
          {
       
          accessLevels.map(al=>(
            <MenuItem value={al.level}>
                {al.description}
            </MenuItem>
          ))
          }
          
        </Select>
      </FormControl> */}
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
        
      </Container>
    )
}