import Head from "next/head";
import React from "react";
import Header from "./header";
import { Box, Container } from "@mui/material";
import Footer from "./footer";

const CommonContainer = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <Box
        component="main"
        sx={{ paddingTop: "120px" }}
        className="gredientBackground"
      >
        <Container maxWidth="xl">{props.children}</Container>
      </Box>
      <Footer />
    </>
  );
};

export default CommonContainer;
