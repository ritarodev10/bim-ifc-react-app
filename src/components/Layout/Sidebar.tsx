import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AddFolderIcon,
  BoxIcon,
  PlayRoundedIcon,
  RoundDoubleArrowIcon,
  SquareQuestionLineDuotoneIcon,
} from "../Icons";
import { useModelStore } from "../../store/model.store";

const Sidebar = ({
  isCollapsed,
  toggleSidebar,
  openSidebar,
}: {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
}) => {
  const { setLoadedModelId, setLoadedFile } = useModelStore();

  const handleUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".ifc";

    fileInput.click();

    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setLoadedFile(file);
      }
    };
  };

  const handleExistingModelClick = (modelId: string) => {
    console.log(`Existing model clicked: ${modelId}`);
    setLoadedModelId(modelId);
    openSidebar();
  };

  const menuItems = [
    { icon: AddFolderIcon, text: "Upload Model", onClick: handleUpload },
    {
      icon: BoxIcon,
      text: "Existing Model",
      onClick: () => {
        openSidebar();
      },
      subItems: [
        {
          icon: PlayRoundedIcon,
          text: "Model 1",
          onClick: () => handleExistingModelClick("01"),
        },
        {
          icon: PlayRoundedIcon,
          text: "Model 2",
          onClick: () => handleExistingModelClick("02"),
        },
        {
          icon: PlayRoundedIcon,
          text: "Model 3",
          onClick: () => handleExistingModelClick("03"),
        },
        {
          icon: PlayRoundedIcon,
          text: "Model 4",
          onClick: () => handleExistingModelClick("04"),
        },
        {
          icon: PlayRoundedIcon,
          text: "Model 5",
          onClick: () => handleExistingModelClick("05"),
        },
      ],
    },
  ];

  return (
    <div className="relative">
      <aside
        className={`fixed top-0 left-0 bottom-0 ${
          isCollapsed ? "w-[88px]" : "w-60"
        } bg-green-400/30 backdrop-blur-md z-10 transition-all ease-in-out duration-300`}
      >
        <RoundDoubleArrowIcon
          onClick={toggleSidebar}
          className={`absolute cursor-pointer text-primary top-5 -right-3 w-6 h-6 transition-all ease-in-out duration-300 ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
        />
        <div className="flex flex-col h-full">
          <div className="flex items-center p-5 h-16">
            <span
              className={`ml-14 text-start text-lg text-primary font-semibold whitespace-nowrap overflow-hidden transition-all ease-in-out duration-300 ${
                isCollapsed ? "w-0 opacity-0" : "w-32 opacity-100"
              }`}
            >
              IFC Viewer
            </span>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden justify-between">
            <nav className="mt-8">
              <ul>
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="mb-4">
                      <a
                        href="#"
                        className="group flex items-center ps-5 py-2 text-gray-700 transition-all ease-in-out duration-300 hover:-translate-y-1"
                        onClick={(e) => {
                          e.preventDefault();
                          item.onClick();
                        }}
                      >
                        <span className="w-12 h-12 bg-[#b5ddc0] group-hover:bg-[#ffdb72] shadow-md rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                          <item.icon className="w-8 h-8 text-primary" />
                        </span>
                        <span
                          className={`ml-4 text-start text-primary font-medium whitespace-nowrap overflow-hidden transition-all ease-in-out duration-300 ${
                            isCollapsed ? "w-0 opacity-0" : "w-32 opacity-100"
                          }`}
                        >
                          {item.text}
                        </span>
                      </a>
                    </li>
                    <div className="relative">
                      <AnimatePresence>
                        {item.subItems && !isCollapsed && (
                          <motion.ul
                            className="pl-12 space-y-6 absolute left-0 top-0"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                              visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                  staggerChildren: 0.1,
                                  when: "beforeChildren",
                                },
                              },
                              hidden: {
                                opacity: 0,
                                x: -20,
                                transition: {
                                  staggerDirection: -1,
                                },
                              },
                            }}
                          >
                            {item.subItems.map((subItem, subIndex) => (
                              <motion.li
                                key={subIndex}
                                className="cursor-pointer flex items-center whitespace-nowrap"
                                variants={{
                                  hidden: { opacity: 0, x: -10 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                                onClick={subItem.onClick}
                              >
                                <subItem.icon className="w-6 h-6 text-primary" />
                                <span className="ml-4 text-start text-primary text-sm">
                                  {subItem.text}
                                </span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </React.Fragment>
                ))}
              </ul>
            </nav>
            <div
              className="flex items-center gap-5 ml-6 mb-6 cursor-pointer"
              onClick={() => setLoadedFile(null)}
            >
              <SquareQuestionLineDuotoneIcon className="w-10 h-10 text-primary" />
              <span
                className={`text-start text-primary overflow-hidden transition-all duration-300 ${
                  isCollapsed ? "w-0 opacity-0" : "w-32 opacity-100"
                } whitespace-nowrap group-hover:text-shadow-lg`}
              >
                Help
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
