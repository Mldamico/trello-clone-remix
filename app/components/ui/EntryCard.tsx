import React, { DragEvent, FC, useContext } from "react";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";
import { dateFunctions } from "../../utils";
import { IoIosTimer } from "react-icons/io";
import { useNavigate } from "@remix-run/react";
interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const navigate = useNavigate();
  const onDragSart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry.id);
    startDragging();
  };

  const onDragEnd = (event: DragEvent) => {
    endDragging();
  };
  const onClick = () => {
    navigate(`/entries/${entry.id}`);
  };
  return (
    <div
      onClick={onClick}
      draggable
      onDragStart={onDragSart}
      onDragEnd={onDragEnd}
      className="p-3 mb-1 transition duration-200 ease-in-out bg-gray-400 cursor-pointer hover:bg-slate-300 dark:bg-gray-700 dark:hover:bg-slate-500 rounded-xl"
    >
      <div>
        <div>
          <p className="whitespace-pre-line">{entry.description}</p>
        </div>
        <div className="flex justify-end">
          <p className="flex items-center space-x-1 text-sm">
            <IoIosTimer />
            <span>{entry.createdAt}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
