import { Dexie } from "dexie";
import { IfcViewerAPI } from "web-ifc-viewer";
import { ModelDatabase } from "../types/model.type";

function createOrOpenDatabase(): ModelDatabase {
  const db = new Dexie("ModelDatabase") as ModelDatabase;

  db.version(1).stores({
    bimModels: "name, id, category, level",
    properties: "name, id",
  });

  return db;
}

async function loadSavedIfc(
  viewer: IfcViewerAPI,
  db: ModelDatabase
): Promise<any> {
  let properties: any;
  const serializedModelNames = localStorage.getItem("modelsNames");
  const serializedPropertyNames = localStorage.getItem("propertiesNames");

  if (!serializedModelNames || !serializedPropertyNames) {
    console.warn("No saved models or properties found");
    return null;
  }

  const modelNames: string[] = JSON.parse(serializedModelNames);
  const propertyNames: string[] = JSON.parse(serializedPropertyNames);

  for (const name of modelNames) {
    const savedModel = await db.bimModels.where("name").equals(name).toArray();
    if (savedModel.length === 0) continue;

    const data = savedModel[0].file;
    const file = new File([data], "example");
    const url = URL.createObjectURL(file);
    const model = await viewer.GLTF.loadModel(url);
    viewer.clipper.active = true;
    viewer.context.renderer.postProduction.active = true;
    await viewer.shadowDropper.renderShadow(model.modelID);
  }

  const savedProperties = await db.properties
    .where("name")
    .equals(propertyNames[0])
    .toArray();
  if (savedProperties.length > 0) {
    const data = savedProperties[0].file;
    const file = new File([data], "savedProperties");
    const url = URL.createObjectURL(file);
    const rawProperties = await fetch(url);
    properties = await rawProperties.json();
  }

  return properties;
}

function removeDatabase(db: ModelDatabase): void {
  localStorage.removeItem("modelsNames");
  localStorage.removeItem("propertiesNames");
  db.delete();
  location.reload();
}

export const database = {
  createOrOpenDatabase,
  loadSavedIfc,
  removeDatabase,
};
