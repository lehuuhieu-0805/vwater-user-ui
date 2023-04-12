import { Box } from "@mui/material";
import React from "react";
// import { AuthConsumer } from "../../context/AuthContext";
import BackGroundImage from "../../../src/assets/images/background-5.jpg";
import BaseLayout from "../../shared/BaseLayout";
// import "./style.css";

function MainLayout() {
  // const { token } = AuthConsumer();

  // if (!token) {
  //   return <Navigate to={VWaterPaths.login} replace />;
  // }

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackGroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BaseLayout></BaseLayout>
    </Box>
  );
}

export default MainLayout;
