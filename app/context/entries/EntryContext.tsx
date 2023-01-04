import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (entry: Entry) => void;
  refreshEntries: (entries: Entry[]) => Promise<void>;
  setEntries: (entries: Entry[]) => Promise<void>;
}

export const EntriesContext = createContext({} as ContextProps);
