import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  console.log("router.query", router.query);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log("name, value ", name, value);
    switch (name) {
      case "password":
        setFormData({ ...formData, password: value });
        break;
      case "confirmPassword":
        setFormData({ ...formData, confirmPassword: value });
        break;

      default:
        break;
    }
  };
  const submitHandler = () => {
    console.log("submitted");
    if (formData.confirmPassword) {
      axios({
        method: "POST",
        url:
          process.env.NEXT_PUBLIC_API_URL +
          "reset-password/" +
          router.query.token,
        // params: { token: router.query.token },
        data: {
          newPassword: formData.confirmPassword,
        },
      })
        .then((res) => {
          console.log("res", res);
          setSuccess(true);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        // bgcolor: "#eee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="gredientBackground"
    >
      <CssBaseline />
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
            marginBottom: "2rem",
          }}
        >
          Reset your password
        </Typography>

        {!success && (
          <Stack gap={2}>
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              id="password"
              label="Password"
              value={formData.password}
              onChange={inputHandler}
              fullWidth
            />
            <TextField
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={inputHandler}
              fullWidth
            />
            <Button
              variant="contained"
              sx={{ marginTop: "1rem" }}
              onClick={submitHandler}
            >
              Reset Password
            </Button>
          </Stack>
        )}
      </Paper>
      <br />
    </Container>
  );
};

export default ResetPassword;
