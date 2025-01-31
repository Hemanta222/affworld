import {
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [success, setSuccess] = useState(false);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setFormData({ ...formData, email: value });
        break;

      default:
        break;
    }
  };

  const submitHandler = () => {
    if (formData.email) {
      axios({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + "forgot-password",
        data: {
          email: formData.email,
        },
      }).then(() => {
        setSuccess(true);
      });
    }
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="gredientBackground"
    >
      <CssBaseline />
      <Paper
        className="transparentBox"
        sx={{ padding: "1rem", backgroundColor: "transparent" }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: "3rem 2rem",
            width: { xs: "auto", md: "420px" },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Recover your password
          </Typography>
          {success && (
            <Typography sx={{ marginY: "1.5rem", textAlign: "justify" }}>
              If we find an eligible account associated with that address, we
              will send an email to the address containing further instructions
              to recover your password.
            </Typography>
          )}
          {!success && (
            <Typography sx={{ marginY: "1.5rem" }} color="textSecondary">
              Please provide a valid email address to recover your account
              password.
            </Typography>
          )}
          {!success && (
            <Stack gap={2}>
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={inputHandler}
                fullWidth
                autoFocus
              />

              <Button
                variant="contained"
                sx={{ marginTop: ".5rem" }}
                onClick={submitHandler}
              >
                Send Reset Link
              </Button>
            </Stack>
          )}
        </Paper>
      </Paper>
      <br />
    </Container>
  );
};

export default ForgotPassword;
