import React, { FC, useRef } from "react";

interface Props {
  inputValue: string;
  setTouched: (value: React.SetStateAction<boolean>) => void;
  onTextFieldChanges: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  touched: boolean;
}

export const TextAreaInput: FC<Props> = ({
  inputValue,
  setTouched,
  onTextFieldChanges,
  touched,
}) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const setRef = (element: HTMLTextAreaElement) => {
    inputRef.current = element;
    inputRef.current?.focus();
  };
  return (
    <div className="relative my-4">
      <textarea
        ref={setRef}
        value={inputValue}
        onChange={onTextFieldChanges}
        id="text"
        className={`peer  bg-lightPrimary dark:bg-slate-800 outline w-full my-1 resize-none rounded p-2 placeholder-transparent focus:outline-black dark:focus:outline-lightPrimary ${
          touched && inputValue.length === 0 && "outline-red-500 "
        }`}
        placeholder="New Entry"
        aria-label="New Entry"
        onBlur={() => setTouched(true)}
      />
      <label
        htmlFor="text"
        className="absolute bg-lightPrimary text-black dark:text-gray-200 dark:bg-slate-800 left-2 -top-1.5 text-sm
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 transition-all duration-150 peer-focus:-top-1.5 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-gray-200 peer-placeholder-shown:px-2 "
      >
        New Entry
      </label>

      {inputValue.length === 0 && touched && (
        <div>
          <p className="ml-2 text-sm text-error">Ingrese un valor</p>
        </div>
      )}
    </div>
  );
};
