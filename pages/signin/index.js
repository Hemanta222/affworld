import { signInUser } from "@/lib/slice/userSlice";
import {
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
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
    if (formData.email && formData.password) {
      dispatch(signInUser(formData))
        .then(unwrapResult)
        .then((res) => {
          toast.success(res.message || "Signin successfully", {
            position: "top-right",
            theme: "dark",
          });
          router.push("/");
        })
        .catch((err) => {
          toast.error(err.message || "Signin failed", {
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
          Sign In
        </Typography>
        <Typography
          sx={{ textAlign: "center", marginBottom: "1rem" }}
          color="textSecondary"
        >
          Welcome, please sign in to continue
        </Typography>
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
        </Stack>
        <Stack mt={2.2}>
          <Link
            href="/forgot-password"
            style={{ color: "#607d8b", fontSize: "14px", marginBottom: "4px" }}
          >
            Forgot your password?
          </Link>
          <Button variant="contained" onClick={submitHandler}>
            Sign in
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2} mt={2}>
          <Typography color="textSecondary">
            Don&apos;t have account!
          </Typography>
          <Button variant="outlined">
            <Link href="/signup">Sign up</Link>
          </Button>
        </Stack>
      </Paper>
      <br />
      {/* </Box> */}
    </Container>
  );
};

export default SignIn;
