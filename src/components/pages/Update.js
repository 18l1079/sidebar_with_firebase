import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { auth,updateEmai} from "../../firebase";
import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { db } from "../../firebase";
import { updateDoc, doc, getDocs, collection } from "@firebase/firestore";
import { async } from "@firebase/util";

export default function Update(props) {
  const userCollectionRef = collection(db, "user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const update_button = {
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

  console.log("Update");
  console.log(props.user_id);
  const us=auth.currentUser;
  const updateUser = async (id, values) => {
    console.log("user");
    console.log(values);
    console.log(id);

    console.log("Auth")
    console.log(us)

updateEmai(auth.currentUser, values.email).then(() => {
  console.log("updated")
}).catch((error) => {
  console.log(error)
});

    const userDoc = doc(db, "user", id);
    const newData = {
      FirstName: values.firstName,
      LastName: values.lastName,
      Username: values.userName,
      Email: values.email,
      Password: values.password,
    };
    try{
    await updateDoc(userDoc, newData);
    }
    catch(e)
    {
      console.log(e);
    }
  };

  return (
    <div className="update">
      <div className="update-container">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(255).required("FirstName is required"),
            lastName: Yup.string().max(255).required("LastName is required"),
            userName: Yup.string().max(255).required("Username is required"),
            email: Yup.string()
              .email("Invalid Email")
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          enableReinitialize={true}
          onSubmit={(values) => updateUser(props.user_id, values)}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
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

              <button type="submit" style={update_button}>
                Update
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
