import React from "react";
import { Box } from "@mui/material";
import Layout from "../components/Layout";
import IFCContainer from "../IFCContainer";

const IFCViewer: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Box component={"main"} sx={{ flexGrow: 1 }}>
          <IFCContainer />
        </Box>
      </Box>
    </Layout>
  );
};

export default IFCViewer;
