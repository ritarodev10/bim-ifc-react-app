import { create } from "zustand";

interface ModelState {
  loadedFile: File | null;
  loadedModelId: string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  setLoadedFile: (file: File | null) => void;
  setLoadedModelId: (modelId: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string | null) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  loadedFile: null,
  loadedModelId: null,
  isLoading: false,
  isError: false,
  error: null,
  setLoadedFile: (file) => set({ loadedFile: file, loadedModelId: null }),
  setLoadedModelId: (modelId) =>
    set({ loadedModelId: modelId, loadedFile: null }),
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  setIsError: (isError: boolean) => set({ isError: isError }),
  setError: (error: string | null) => set({ error: error }),
}));
