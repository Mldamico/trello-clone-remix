import { UIState } from "./";

type UIAction =
  | {
      type: "UI - Toggle Sidebar";
    }
  | { type: "UI - Set Adding Entry"; payload: boolean }
  | { type: "UI - Start Dragging" }
  | { type: "UI - End Dragging" };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "UI - Toggle Sidebar":
      return {
        ...state,
        sidemenuOpen: !state.sidemenuOpen,
      };
    case "UI - Set Adding Entry":
      return {
        ...state,
        isAddingEntry: action.payload,
      };

    case "UI - Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI - End Dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
