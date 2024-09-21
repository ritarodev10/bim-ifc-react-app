import { useState, useRef } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  const toggleSidebar = () => {
    if (logoRef.current) {
      const computedStyle = window.getComputedStyle(logoRef.current);
      const matrix = new DOMMatrix(computedStyle.transform);
      const angle = Math.round(
        Math.atan2(matrix.b, matrix.a) * (180 / Math.PI)
      );
      logoRef.current.style.setProperty("--current-rotation", `${angle}deg`);
    }
    setIsCollapsed(!isCollapsed);
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 400);
  };

  const openSidebar = () => {
    if (isCollapsed) {
      toggleSidebar();
    }
  };

  return (
    <div className="h-screen overflow-hidden relative">
      <Navbar isCollapsed={isCollapsed} />
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        openSidebar={openSidebar}
      />
      <main className="absolute top-0 right-0 bottom-0 left-0 overflow-auto">
        {children}
      </main>
      <button onClick={toggleSidebar} className="fixed top-4 left-7 z-20">
        <img
          ref={logoRef}
          src="/ifcjs-logo.svg"
          alt="logo"
          className={`w-8 h-8 ${
            isSpinning ? "animate-spin-logo-click" : "animate-spin-logo-90"
          }`}
        />
      </button>
    </div>
  );
};

export default Layout;
