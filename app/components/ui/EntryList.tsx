import React, { DragEvent, FC, useContext, useMemo } from "react";
import { EntryCard } from "./";
import { Status } from "../../interfaces/entry";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import styles from "./EntryList.module.css";
interface Props {
  status: Status;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={allowDrop}
      className={
        isDragging
          ? "bg-[rgba(255, 255, 255, 0.2)] rounded-xl border border-dashed border-black dark:border-white "
          : ""
      }
    >
      <div className={`h-[calc(100vh_-_250px)] overflow-scroll p-1 `}>
        <ul
          className={`opacity-100  ${
            isDragging && "opacity-50 transition-all duration-75 "
          }`}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </ul>
      </div>
    </div>
  );
};
