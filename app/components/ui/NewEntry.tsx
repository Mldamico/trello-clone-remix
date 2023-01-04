import { Form, useFetcher } from "@remix-run/react";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { EntriesContext } from "../../context/entries/EntryContext";
import { UIContext } from "../../context/ui";
import { TextAreaInput } from "./TextAreaInput";

export const NewEntry = () => {
  // const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const fetcher = useFetcher();

  const onTextFieldChanges = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };
  const onSave = () => {
    if (inputValue.length === 0) return;
    // addNewEntry(inputValue);
    fetcher.submit({ input: inputValue }, { method: "post" });
    setInputValue("");
    setTouched(false);
    setIsAddingEntry(false);
  };

  return (
    <div className="px-1 mt-2 mb-1">
      {isAddingEntry ? (
        <fetcher.Form method="post">
          <TextAreaInput
            inputValue={inputValue}
            onTextFieldChanges={onTextFieldChanges}
            setTouched={setTouched}
            touched={touched}
          />

          <div className="flex justify-between">
            <button
              onClick={() => setIsAddingEntry(false)}
              className="flex items-center px-3 py-1 space-x-2 transition-all duration-150 ease-linear border border-black rounded outline-none dark:border-white focus:outline-none hover:text-slate-700 hover:bg-gray-400 dark:hover:bg-white"
            >
              <AiOutlineSave />
              <p>Cancel</p>
            </button>
            <button
              onClick={onSave}
              className="flex items-center px-3 py-1 space-x-2 transition-all duration-150 ease-linear border border-black rounded outline-none dark:border-white focus:outline-none hover:text-slate-700 hover:bg-gray-400 dark:hover:bg-white"
            >
              <AiOutlineSave />
              Save
            </button>
          </div>
        </fetcher.Form>
      ) : (
        <button
          onClick={() => setIsAddingEntry(true)}
          className="flex items-center justify-center w-full py-1 space-x-2 border border-black rounded-md dark:border-white hover:bg-gray-400 dark:hover:bg-slate-700"
        >
          <IoIosAddCircleOutline />
          <span> Add New Entry</span>
        </button>
      )}
    </div>
  );
};
