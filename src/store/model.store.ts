import { create } from "zustand";
import { IfcViewerAPI } from "web-ifc-viewer";

interface ModelState {
  loadedFile: File | null;
  loadedModelId: string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  setLoadedFile: (file: File | null) => void;
  setLoadedModelId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string | null) => void;
  ifcViewer: IfcViewerAPI | null;
  setIfcViewer: (viewer: IfcViewerAPI | null) => void;
  disposeCurrentModel: () => void;
}

export const useModelStore = create<ModelState>((set, get) => ({
  loadedFile: null,
  loadedModelId: null,
  isLoading: false,
  isError: false,
  error: null,
  setLoadedFile: (file) => set({ loadedFile: file, loadedModelId: null }),
  setLoadedModelId: (id) => set({ loadedModelId: id }),
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  setIsError: (isError: boolean) => set({ isError: isError }),
  setError: (error: string | null) => set({ error: error }),
  ifcViewer: null,
  setIfcViewer: (viewer) => set({ ifcViewer: viewer }),
  disposeCurrentModel: () => {
    const { ifcViewer, loadedModelId, setLoadedModelId } = get();
    if (ifcViewer && loadedModelId) {
      ifcViewer.IFC.loader.ifcManager.dispose();
      setLoadedModelId(null);
    }
  },
}));
