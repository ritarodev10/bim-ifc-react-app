import React, { useState } from "react";
import {
  ZoomInIcon,
  ZoomOutIcon,
  SquareArrowUpIcon,
  SquareArrowDownIcon,
  SquareArrowLeftIcon,
  SquareArrowRightIcon,
  FullScreenIcon,
  QuitFullScreenIcon,
  ResetIcon,
} from "../Icons";
import { wiv } from "../../utils/wiv";
import { database } from "../../utils/database";
import { IfcViewerAPI } from "web-ifc-viewer";
import { ModelDatabase } from "../../types/model.type";
import { useModelStore } from "../../store/model.store";

interface ToolbarProps {
  viewer: IfcViewerAPI | undefined;
  db: ModelDatabase | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ viewer, db }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { setLoadedFile } = useModelStore();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // Implement full screen logic here
  };

  const handleReset = async () => {
    if (viewer && db) {
      await wiv.releaseMemory(viewer);
      database.removeDatabase(db);
      setLoadedFile(null);
      // Optionally, you might want to refresh the viewer or reset its state
      // This depends on how your viewer is set up
      // For example: viewer.reset();
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-auto h-[50px] bg-white/30 backdrop-blur-md border border-primary/30 rounded-lg z-10 transition-all duration-300">
      <div className="h-full py-2 flex justify-between items-center px-4">
        <div className="flex items-center gap-4 text-primary">
          <div className="flex items-center gap-1">
            <ZoomInIcon className="cursor-pointer" />
            <ZoomOutIcon className="cursor-pointer" />
          </div>
          <div className="flex items-center gap-1">
            <SquareArrowUpIcon className="cursor-pointer" />
            <SquareArrowDownIcon className="cursor-pointer" />
            <SquareArrowLeftIcon className="cursor-pointer" />
            <SquareArrowRightIcon className="cursor-pointer" />
          </div>
          <div className="flex items-center gap-1">
            {isFullScreen ? (
              <QuitFullScreenIcon
                className="cursor-pointer"
                onClick={toggleFullScreen}
              />
            ) : (
              <FullScreenIcon
                className="cursor-pointer"
                onClick={toggleFullScreen}
              />
            )}
            <ResetIcon className="cursor-pointer" onClick={handleReset} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
