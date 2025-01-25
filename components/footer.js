import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#16111D",width:'100%' }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: { xs: "auto", md: "300px" },
            // paddingX: { xs: "2rem", sm: "5rem", md: "10rem" },
            paddingY: "2rem",
            zIndex: 9,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            padding="2rem"
            borderBottom="1px solid #242c3e"
          >
            <Stack gap={2}>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                Solutions
              </Typography>
              <FooterListItemText>Feeds</FooterListItemText>
              <FooterListItemText>Task Management System</FooterListItemText>
            </Stack>
            <Stack gap={2} sx={{ marginTop: { xs: "1rem", md: 0 } }}>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                About
              </Typography>
              <FooterListItemText>FAQ</FooterListItemText>
              <FooterListItemText>Blog</FooterListItemText>
              <FooterListItemText>Support</FooterListItemText>
              <FooterListItemText>Contact Us</FooterListItemText>
              <FooterListItemText>Career</FooterListItemText>
            </Stack>
            <Stack gap={2} sx={{ marginTop: { xs: "1rem", md: 0 } }}>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                Get the App
              </Typography>
              <Image
                src="/btn-appstore.svg"
                width="160"
                height={50}
                alt="app-store-btn"
                style={{ cursor: "pointer" }}
              />
              <Image
                src="/btn-g-play.svg"
                width="160"
                height={50}
                alt="play-store-btn"
                style={{ cursor: "pointer" }}
              />
              <Typography
                variant="h5"
                sx={{ color: "#fff", marginTop: "1rem" }}
              >
                Stay Tuned
              </Typography>
              <Stack gap={4} direction="row">
                <FacebookOutlinedIcon
                  sx={{
                    color: "#b7bbc3",
                    fontSize: "28px",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                  }}
                />
                <InstagramIcon
                  sx={{
                    color: "#b7bbc3",
                    fontSize: "28px",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                  }}
                />
                <XIcon
                  sx={{
                    color: "#b7bbc3",
                    fontSize: "26px",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginY: "2rem",
            }}
          >
            <Image
              src="/affworld.ico"
              width={80}
              height={80}
              alt="company_logo"
            />
            <Box sx={{ display: "flex", marginTop: ".5rem" }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  lineHeight: "1.5",
                }}
              >
                Affworld{" "}
              </Typography>
              <Typography
                sx={{
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                }}
                className="gredientBackground"
              >
                .Cloud
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              marginY: "2rem",
            }}
          >
            <Stack flex={1}>
              <Typography
                variant="body1"
                sx={{ color: "#b7bbc3", marginTop: { xs: "2rem", md: 0 } }}
              >
                © 2025 All Rights Reserved, Affworld Pvt. limited
              </Typography>
            </Stack>
            <Stack direction="row" gap={1} justifyContent="center">
              <FooterItemText>Legal Notice</FooterItemText>
              <FooterItemText>DMCA</FooterItemText>
              <FooterItemText>Terms of Service</FooterItemText>
              <FooterItemText border={"No"}>Cookie Policy</FooterItemText>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

const FooterListItemText = (props) => {
  return (
    <Typography
      variant="body1"
      sx={{
        color: "#b7bbc3",
        "&:hover": {
          color: "#fff",
          cursor: "pointer",
          transition: "color 0.3s ease-in",
        },
      }}
    >
      {props.children}
    </Typography>
  );
};
const FooterItemText = (props) => {
  return (
    <Typography
      variant="body1"
      sx={{
        color: "#b7bbc3",
        paddingX: "1rem",
        textAlign: "center",
        "&:hover": {
          color: "#fff",
          cursor: "pointer",
          transition: "color 0.3s ease-in",
        },
        borderRight: props.border === "No" ? "" : "1px solid #242c3e",
      }}
    >
      {props.children}
    </Typography>
  );
};
