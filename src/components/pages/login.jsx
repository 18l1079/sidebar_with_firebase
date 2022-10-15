import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { db } from "../../firebase";
import Profile from "./Profile";
import { getDocs, collection } from "@firebase/firestore";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const userCollectionRef = collection(db, "user");
  //For Storing the data from database in users array
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const [wrong, setWrong] = useState(false);
  const [reload, setReload] = useState(false);
  var email_flag = 0;
  var password_flag = 0;
  var user_id;

  useEffect(()=>{
    props.isloggedin(false,"");
  },[])

   useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [reload]);

  const handleValidation = (values, { setFieldError }) => {
    
    console.log("handle validation");

    console.log(values.email);

    email_flag = 0;
    password_flag = 0;
    users.forEach((users) => {
      if (values.email === users.Email) {
        email_flag = 1;
        if (values.password === users.Password) {
          password_flag = 1;
          user_id = users.id;
        }
      } else {
        if (values.password === users.Password) {
          password_flag = 1;
        }
      }
    });

    console.log("end of loop");
    console.log(email_flag);
    console.log(password_flag);

    if (email_flag === 0) {
      setFieldError("email", "Email did'nt match");
    }
    if (password_flag === 0) {
      setFieldError("password", "Password did'nt match");
    }

    if (email_flag === 1 && password_flag === 1) {
      console.log("user logged in");
      props.isloggedin(true,user_id);
      navigate("/");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid Email")
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          enableReinitialize={true}
          onSubmit={(values, setFieldError) =>
            handleValidation(values, setFieldError)
          }
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldError,
          }) => (
            <form onSubmit={(values) => handleSubmit(values, setFieldError)}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="email"
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-title"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl
                    error={Boolean(touched.password && errors.password)}
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      type="password"
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="password"
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-title"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              {/* {wrong===true? <p style={{color:"red", fontSize:"15px"}}>Credentials are wrong</p>:<></>} */}
              <button
                className="button"
                type="submit"
                style={{
                  marginLeft: "13rem",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                Login
              </button>
            </form>
          )}
        </Formik>
        <Link to="/signup" style={{ color: "white" }}>
          Don't have account
        </Link>
      </div>
    </div>
  );
}
