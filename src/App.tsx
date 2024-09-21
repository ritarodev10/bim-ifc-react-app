import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import IFCViewer from "./pages/IFCViewer";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/ifc-viewer" />} />
        <Route path="/ifc-viewer" element={<IFCViewer />} />
      </Routes>
    </BrowserRouter>
  );
}
