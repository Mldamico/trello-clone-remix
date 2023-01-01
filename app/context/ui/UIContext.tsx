import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  toggleSideMenu: () => void;
  setIsAddingEntry: (value: boolean) => void;
  endDragging: () => void;
  startDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
