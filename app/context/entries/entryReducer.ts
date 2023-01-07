import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesAction =
  | {
      type: "Entries - Add Entry";
      payload: Entry;
    }
  | {
      type: "Entries - Entry Update";
      payload: Entry;
    }
  | {
      type: "Entries - Refresh Update";
      payload: Entry[];
    }
  | {
      type: "Entries - Delete Entry";
      payload: Entry;
    };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesAction
): EntriesState => {
  switch (action.type) {
    case "Entries - Add Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "Entries - Entry Update":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }

          return entry;
        }),
      };
    case "Entries - Refresh Update":
      return {
        ...state,
        entries: [...action.payload],
      };
    case "Entries - Delete Entry":
      return {
        ...state,
        entries: state.entries.filter(
          (entry) => entry.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
