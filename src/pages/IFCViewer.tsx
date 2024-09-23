import React, { createRef, useEffect, useState } from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { IfcContainer } from "../components/IFCContainer/IfcContainer";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";
import { SnackbarContent } from "../components/Snackbar";
import Layout from "../components/Layout";
// import Toolbar from "@/components/IFCContainer/Toolbar";
import { useModelLoader } from "../hooks/useModelLoader";
import { useModelStore } from "../store/model.store";

const IFCViewer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const ifcContainerRef = createRef<HTMLDivElement>();
  const [ifcLoadingErrorMessage, setIfcLoadingErrorMessage] =
    useState<string>();
  const { isLoading, error, loadedFile } = useModelLoader();
  const { ifcViewer, setIfcViewer } = useModelStore();

  useEffect(() => {
    if (ifcContainerRef.current) {
      const container = ifcContainerRef.current;
      const ifcViewer = new IfcViewerAPI({
        container,
        backgroundColor: new Color(0xffffff),
      });
      ifcViewer.axes.setAxes();
      ifcViewer.grid.setGrid();
      ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: false,
      });
      setIfcViewer(ifcViewer);
    }
  }, []);

  useEffect(() => {
    if (ifcViewer && loadedFile) {
      ifcOnLoad(ifcViewer, loadedFile);
    }
  }, [ifcViewer, loadedFile]);

  const ifcOnLoad = async (viewer: IfcViewerAPI, file: File) => {
    setIfcLoadingErrorMessage("");
    setLoading(true);

    try {
      const model = await viewer.IFC.loadIfc(file, true, ifcOnLoadError);
      await viewer.shadowDropper.renderShadow(model.modelID);

      setIsSnackbarOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Error loading IFC file:", error);
      setIfcLoadingErrorMessage("Failed to load IFC file");
      setLoading(false);
    }
  };

  const ifcOnLoadError = async (err: any) => {
    setIfcLoadingErrorMessage(err.toString());
  };

  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Box component={"main"} sx={{ flexGrow: 1 }}>
          <IfcContainer ref={ifcContainerRef} viewer={ifcViewer} />
        </Box>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || isLoading}
      >
        <CircularProgress />
      </Backdrop>

      <SnackbarContent
        isSnackbarOpen={isSnackbarOpen}
        setIsSnackbarOpen={setIsSnackbarOpen}
        ifcLoadingErrorMessage={ifcLoadingErrorMessage || error || undefined}
      />
      {/* <Toolbar /> */}
    </Layout>
  );
};

export default IFCViewer;
