import CommonContainer from "../Components/CommonContainer";

import { checkAuth } from "@/lib/slice/userSlice";
import { Button, Container } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
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
          className="transparentBox"
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.22)",
            padding: "8px 16px",
            borderRadius: "20px",
            color: "#fff",
            fontSize: "26px",
            height: 300,
            width: 300,
          }}
          onClick={() => router.push("/posts")}
        >
          Posts
        </Button>
        <Button
          color="primary"
          className="transparentBox"
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.22)",
            padding: "8px 16px",
            borderRadius: "20px",
            color: "#fff",
            fontSize: "26px",
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
