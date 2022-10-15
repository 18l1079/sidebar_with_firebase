import React from "react";
import pic2 from "./pic2.png";
import { Grid } from "@mui/material";

export default function dashboard() {
  const book_button = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#293846",
    fontSize: "large",
    marginLeft: "7.5rem",
    marginTop: "5px",
    padding: "5px",
    borderRadius: "5px",
    borderColor: "white",
    cursor: "pointer",
  };
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <Grid container rowSpacing={5} columnSpacing={25}>
          <Grid item xs={4}>
            <img src={pic2} alt="book" />
            <button style={book_button}>Click</button>
          </Grid>
          <Grid item xs={4}>
            <img src={pic2} alt="book" />
            <button style={book_button}>Click</button>
          </Grid>
          <Grid item xs={4}>
            <img src={pic2} alt="book" />
            <button style={book_button}>Click</button>
          </Grid>

          <Grid item xs={4}>
            <img src={pic2} alt="book" />
            <button style={book_button}>Click</button>
          </Grid>
          <Grid item xs={4}>
            <img src={pic2} alt="book" />
            <button style={book_button}>Click</button>
          </Grid>
          <Grid item xs={4}>
            <img src={pic2} alt="book" />
            <button style={book_button}>Click</button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
