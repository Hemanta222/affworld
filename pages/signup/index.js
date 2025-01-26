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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setFormData({ ...formData, name: value });
        break;
      case "email":
        setFormData({ ...formData, email: value });
        break;
      case "password":
        setFormData({ ...formData, password: value });
        break;

      default:
        break;
    }
  };

  const submitHandler = () => {
    if (formData.name && formData.email && formData.password) {
      axios({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + "register",
        data: {
          email: formData.email,
          name: formData.name,
          password: formData.password,
        },
      })
        .then((res) => {
          toast.success(res.message || "Signup successfully", {
            position: "top-right",
            theme: "dark",
          });
          router.push("/signin");
        })
        .catch((err) => {
          toast.error(err.message || "failed", {
            position: "top-right",
            theme: "dark",
          });
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
            Sign Up
          </Typography>
          <Typography
            sx={{ textAlign: "center", marginBottom: "1rem" }}
            color="textSecondary"
          >
            Welcome, please sign up to continue
          </Typography>
          <Stack gap={2}>
            <TextField
              id="name"
              type="text"
              name="name"
              label="Name"
              placeholder="Your Name"
              value={formData.name}
              onChange={inputHandler}
              fullWidth
              autoFocus
            />
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={inputHandler}
              fullWidth
            />
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
            <Button
              variant="contained"
              sx={{ marginTop: ".5rem" }}
              onClick={submitHandler}
            >
              Sign up
            </Button>
            <Stack direction="row" alignItems="center" gap={3}>
              <Typography color="textSecondary">Already registered!</Typography>
              <Button variant="outlined">
                <Link href="/signin">Sign in</Link>
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Paper>
      <br />
      {/* </Box> */}
    </Container>
  );
};

export default SignUp;
