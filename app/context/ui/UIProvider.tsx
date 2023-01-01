import { FC, useReducer } from "react";
import { UIContext, uiReducer } from ".";
export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

type Props = {
  children: JSX.Element;
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "UI - Toggle Sidebar" });
  };

  const setIsAddingEntry = (value: boolean) => {
    dispatch({ type: "UI - Set Adding Entry", payload: value });
  };

  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" });
  };
  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
