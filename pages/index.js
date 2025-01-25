import CommonContainer from "@/components/CommonContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { checkAuth } from "@/lib/slice/userSlice";
import { Box, Button, Container, Toolbar } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogin } = useSelector((state) => state.users);
  useEffect(() => {
    if (!isLogin) {
      dispatch(checkAuth(""))
        .then(unwrapResult)
        .catch(() => {
          router.push("/signin");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);
  return (
    <CommonContainer title="Affworld">
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          paddingY: "120px",
        }}
      >
        <Button
          color="primary"
          sx={{
            background:
              "linear-gradient(175deg, rgba(255, 255, 255, 0.35) -94.09%, rgba(255, 255, 255, 0.00) 154.53%)",
            backdropFilter: "blur(27px)",
            border: "1px solid rgba(255, 255, 255, 0.22)",
            padding: "8px 16px",
            borderRadius: "20px",
            color: "#fff",
            fontSize: "26px",
            transition: "all .15s ease-in-out",
            "&:hover": {
              border: "1px dashed rgba(255, 255, 255, 0.54)",
              boxShadow:
                "0 0 2px rgb(255 255 255 / 0.7) inset, 0px 0px 40px 0px rgb(0 0 0 / 33%)",
            },
            height: 300,
            width: 300,
          }}
          onClick={() => router.push("/posts")}
        >
          Posts
        </Button>
        <Button
          color="primary"
          sx={{
            background:
              "linear-gradient(175deg, rgba(255, 255, 255, 0.35) -94.09%, rgba(255, 255, 255, 0.00) 154.53%)",
            backdropFilter: "blur(27px)",
            border: "1px solid rgba(255, 255, 255, 0.22)",
            padding: "8px 16px",
            borderRadius: "20px",
            color: "#fff",
            fontSize: "26px",
            transition: "all .15s ease-in-out",
            "&:hover": {
              border: "1px dashed rgba(255, 255, 255, 0.54)",
              boxShadow:
                "0 0 2px rgb(255 255 255 / 0.7) inset, 0px 0px 40px 0px rgb(0 0 0 / 33%)",
            },
            height: 300,
            width: 300,
          }}
          onClick={() => router.push("/task-management")}
        >
          Tasks
        </Button>
      </Container>
    </CommonContainer>
  );
}
