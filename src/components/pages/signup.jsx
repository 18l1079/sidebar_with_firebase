import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, collection, doc } from "@firebase/firestore";
import {
    Grid,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
  } from "@mui/material";

export default function Signup() {
  const userCollectionRef = collection(db, "user");
  const navigate = useNavigate();

  const signup_button = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: "#060b26",
    fontSize: "medium",
    marginLeft: "20rem",
    marginTop: "10px",
    padding: "5px",
    borderRadius: "5px",
    borderColor: "white",
    cursor: "pointer",
  };

  var user_id="";
  const createUser = async (values) => {
    console.log(values);

    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in");
      //navigate("/");
      console.log(user.uid);
      user_id = user.uid;
      console.log("variable");
      console.log(user_id);

      setDoc(doc(db, "user", user_id), {
        Firstname: values.firstName,
        Lastname: values.lastName,
        Age: values.age,
        Username: values.userName,
        Password: values.password,
        Email: values.email,
      });
    })
    .then(() => {
      navigate("/login");
    })
    .catch((error) => {
      console.log(error);
      console.log("Error");
    });
  };
  return (
    <div className="signup">
      <div className="signup-container" style={{ backgroundColor: "#293846" }}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            age: "",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(255).required("FirstName is required"),
            lastName: Yup.string().max(255).required("LastName is required"),
            userName: Yup.string().max(255).required("Username is required"),
            email: Yup.string()
              .email("Invalid Email")
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
            age: Yup.number().required("Age is Required"),
          })}
          enableReinitialize={true}
          onSubmit={(values) => createUser(values)}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={(values) => handleSubmit(values)}>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.firstName && errors.firstName)}
                  >
                    <InputLabel htmlFor="firstName">FirstName</InputLabel>
                    <OutlinedInput
                      id="firstName"
                      type="text"
                      value={values.firstName}
                      color='secondary'
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="FirstName"
                      inputProps={{}}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-title"
                      >
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                  >
                    <InputLabel htmlFor="lastName">LastName</InputLabel>
                    <OutlinedInput
                      id="lastName"
                      color='secondary'
                      type="text"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="LastName"
                      inputProps={{}}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-title"
                      >
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.userName && errors.userName)}
                  >
                    <InputLabel htmlFor="userName">Username</InputLabel>
                    <OutlinedInput
                      id="userName"
                      type="text"
                      color="secondary"
                      value={values.userName}
                      name="userName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="userName"
                      inputProps={{}}
                    />
                    {touched.userName && errors.userName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-title"
                      >
                        {errors.userName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="text"
                      color="secondary"
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
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      type="password"
                      color="secondary"
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

                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.age && errors.age)}
                  >
                    <InputLabel htmlFor="age">Age</InputLabel>
                    <OutlinedInput
                      id="age"
                      type="number"
                      color="secondary"
                      value={values.age}
                      name="age"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="age"
                      inputProps={{}}
                    />
                    {touched.age && errors.age && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-title"
                      >
                        {errors.age}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <button type="submit" style={signup_button}>
                Signup
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
