import Head from "next/head";
import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";


const CommonContainer = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <Box
        component="main"
        sx={{ paddingTop: "100px" }}
        className="gredientBackground"
      >
        <Container maxWidth="xl" sx={{ minHeight: "400px", paddingY: "2rem" }}>
          {props.children}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CommonContainer;
