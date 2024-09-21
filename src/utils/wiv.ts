/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IFCWALL,
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCCOVERING,
  IFCCOLUMN,
  IFCWINDOW,
  IFCMEMBER,
  IFCPLATE,
  IFCCURTAINWALL,
  IFCFLOWFITTING,
  IFCFLOWSEGMENT,
  IFCFLOWTERMINAL,
  IFCBUILDINGELEMENTPROXY,
  IFCDOOR,
  IFCFURNISHINGELEMENT,
  IFCSTAIR,
  IFCSTAIRFLIGHT,
  IFCRAILING,
  IFCSPACE,
} from "web-ifc";
import { ModelDatabase } from "../types/model.type";

// Add type for viewer
interface Viewer {
  IFC: {
    loader: {
      ifcManager: {
        useWebWorkers: (use: boolean, path: string) => Promise<void>;
        dispose: () => Promise<void>;
      };
    };
    setWasmPath: (path: string) => Promise<void>;
  };
  GLTF: {
    exportIfcFileAsGltf: (options: any) => Promise<any>;
  };
  grid: {
    setGrid: () => void;
  };
  axes: {
    setAxes: () => void;
  };
}

const setUpMultiThreading = async (viewer: Viewer): Promise<void> => {
  await viewer.IFC.loader.ifcManager.useWebWorkers(true, "/IFCWorker.js");
  await viewer.IFC.setWasmPath("/");
};

const releaseMemory = async (viewer: Viewer): Promise<void> => {
  // This releases all IFCLoader memory
  await viewer.IFC.loader.ifcManager.dispose();
};

const setupProgressNotification = (
  loaded: number,
  total: number,
  string: string
): void => {
  const container = document.getElementById("progress-container");
  const label = document.getElementById("progress-label");
  const text = document.getElementById("progress-text");

  if (container && label && text) {
    label.textContent = `Loading ${string}:`;
    container.classList.remove("hidden");
    const percent = (loaded / total) * 100;
    const result = Math.trunc(percent);
    text.textContent = `${result.toString()} %`;
  }
};

const viewerSetup = (viewer: Viewer): void => {
  setUpMultiThreading(viewer);
  viewer.grid.setGrid();
  viewer.axes.setAxes();
};

// Saving the model
const preprocessAndSaveIfc = async (
  viewer: Viewer,
  db: ModelDatabase,
  event: Event
): Promise<void> => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const url = URL.createObjectURL(file);
    ifcToGLFT(viewer, db, url);
  }
};

const loadSampleIfc = async (
  viewer: Viewer,
  db: ModelDatabase,
  modelId: string
): Promise<any> => {
  const url = `/${modelId}.ifc`;
  return ifcToGLFT(viewer, db, url);
};

const ifcToGLFT = async (
  viewer: Viewer,
  db: ModelDatabase,
  url: string
): Promise<any> => {
  // Export to glTF and JSON
  const result = await viewer.GLTF.exportIfcFileAsGltf({
    ifcFileUrl: url,
    spliteByFloor: true,
    categories: {
      walls: [IFCWALL, IFCWALLSTANDARDCASE],
      slabs: [IFCSLAB],
      ceilings: [IFCCOVERING],
      columns: [IFCCOLUMN],
      windows: [IFCWINDOW],
      curtainwalls: [IFCMEMBER, IFCPLATE, IFCCURTAINWALL],
      doors: [IFCDOOR],
      furniture: [IFCFURNISHINGELEMENT],
      pipes: [IFCFLOWFITTING, IFCFLOWSEGMENT, IFCFLOWTERMINAL],
      stairs: [IFCSTAIR, IFCSTAIRFLIGHT, IFCRAILING],
      spaces: [IFCSPACE],
      undefined: [IFCBUILDINGELEMENTPROXY],
    },
    getProperties: true,
    onProgress: setupProgressNotification,
  });

  const models = [];
  const properties = [];

  for (const categoryName in result.gltf) {
    const category = result.gltf[categoryName];
    for (const levelName in category) {
      const file = category[levelName].file;
      if (file) {
        // Serialize data for saving it
        const data = await file.arrayBuffer();
        models.push({
          name: result.id + categoryName + levelName,
          id: result.id,
          category: categoryName,
          level: levelName,
          file: data,
        });
      }
    }
  }

  for (const propertiesJson of result.json) {
    const propertiesFile = await propertiesJson.arrayBuffer();

    properties.push({
      name: propertiesJson.name,
      id: result.id,
      file: propertiesFile,
    });
  }

  // Now, store all the models in the database
  await db.bimModels.bulkPut(models);
  await db.properties.bulkPut(properties);

  // Store all the names of the models
  const serializedModelNames = JSON.stringify(
    models.map((model) => model.name)
  );
  const serializedPropertyNames = JSON.stringify(
    properties.map((property) => property.name)
  );
  localStorage.setItem("modelsNames", serializedModelNames);
  localStorage.setItem("propertiesNames", serializedPropertyNames);

  // Return the result instead of reloading the page
  return result;
};

export const wiv = {
  viewerSetup,
  releaseMemory,
  preprocessAndSaveIfc,
  loadSampleIfc,
  ifcToGLFT,
};
