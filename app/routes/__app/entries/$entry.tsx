import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import React, { useState } from "react";
import { db } from "~/utils/db.server";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { TextAreaInput } from "~/components/ui/TextAreaInput";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { Entry, Status } from "~/interfaces";
import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
const validStatus: Status[] = [
  Status.PENDING,
  Status.IN_PROGRESS,
  Status.FINISHED,
];
const EntryPage = () => {
  const data = useActionData();
  const entry = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<Status>(entry.status);
  const [touched, setTouched] = useState(false);

  const onTextFieldChanges = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    //  updateEntry(updatedEntry);
    toast.success("Entry has been updated 😀");
    setTouched(false);
    fetcher.submit({ entry: JSON.stringify(updatedEntry) }, { method: "put" });
  };

  const onStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as Status);
  };

  const onDelete = () => {
    fetcher.submit({}, { method: "delete" });
  };
  return (
    <>
      <div className="flex justify-center mt-4  text-white bg-[#DD7373] dark:bg-[#4a148c] w-full mx-auto md:w-[70%] lg:w-[50%] rounded-lg">
        <div className="w-full m-3">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex flex-col justify-start">
            <h3>Entry</h3>
            <h5>Created {entry.createdAt}</h5>
          </div>
          <TextAreaInput
            inputValue={inputValue}
            onTextFieldChanges={onTextFieldChanges}
            setTouched={setTouched}
            touched={touched}
          />
          <div>
            <label htmlFor="status">Status</label>
            <div className="flex flex-row ml-6 space-x-4" id="status">
              {validStatus.map((option) => (
                <div
                  className="flex items-center justify-center space-x-2"
                  key={option}
                >
                  <input
                    id={option}
                    type="radio"
                    value={option}
                    checked={option === status}
                    onChange={onStatusChanged}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              className="flex items-center justify-center w-full py-2 space-x-2 font-bold rounded bg-slate-600 hover:bg-slate-300 hover:text-black disabled:bg-gray-400 disabled:text-gray-600"
              onClick={onSave}
              disabled={inputValue.length === 0}
            >
              <AiOutlineSave />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          className="fixed p-3 text-3xl bg-red-500 rounded-full bottom-7 right-7"
          onClick={onDelete}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </>
  );
};

export default EntryPage;

export const loader = async ({ params }: LoaderArgs) => {
  const id = params.entry;
  const entry = await db.entry.findUnique({ where: { id } });

  return json(entry);
};

export const action = async ({ request, params }: ActionArgs) => {
  const id = params.entry;
  const form = await request.formData();
  switch (request.method) {
    case "PUT":
      const data = form.get("entry");

      const newEntry: Entry = JSON.parse(data as string);

      await db.entry.update({
        where: { id },
        data: { status: newEntry.status, description: newEntry.description },
      });
      return redirect(`/entries/${id}`);

    case "DELETE":
      await db.entry.delete({
        where: { id },
      });

    default:
      return redirect("/");
    // console.log(updatedentry);
  }
};
