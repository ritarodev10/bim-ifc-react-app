import { Dexie } from "dexie";

export interface BimModel {
  name: string;
  id: string;
  category: string;
  level: string;
  file: Blob;
}

export interface Property {
  name: string;
  id: string;
  file: Blob;
}

export interface ModelDatabase extends Dexie {
  bimModels: Dexie.Table<BimModel, string>;
  properties: Dexie.Table<Property, string>;
}
