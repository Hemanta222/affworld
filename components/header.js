import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [bgColor, setBgColor] = useState("transparent");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor("#16111D");
      } else {
        setBgColor("transparent"); // Default color
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        sx={{
          position: "fixed",
          top: 0,
          zIndex: 1000,
          backgroundColor: bgColor,
          transition: "background-color 0.3s ease",
          backdropFilter: "brightness(.5)",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingY: "1rem",
            }}
          >
            <Stack direction="row" gap={1} alignItems="center">
              {/* <Image
                src="/affworld.ico"
                width={50}
                height={50}
                alt="company_logo"
              /> */}
              <Link href="/">
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Affworld.Cloud
                </Typography>
              </Link>
            </Stack>

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
                transition: "all .15s ease-in-out",
                "&:hover": {
                  border: "1px dashed rgba(255, 255, 255, 0.54)",
                  boxShadow:
                    "0 0 2px rgb(255 255 255 / 0.7) inset, 0px 0px 40px 0px rgb(0 0 0 / 33%)",
                },
              }}
              onClick={() => Router.push("/signin")}
            >
              Signin
            </Button>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
