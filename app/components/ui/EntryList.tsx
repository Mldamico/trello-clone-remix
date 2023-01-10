import React, { DragEvent, FC, useContext, useMemo } from "react";
import { EntryCard } from "./";
import { Entry, Status } from "../../interfaces/entry";
import { UIContext } from "../../context/ui";
import { useFetcher } from "@remix-run/react";
interface Props {
  status: Status;
  entries: Entry[] | undefined;
}

export const EntryList: FC<Props> = ({ status, entries }) => {
  const { isDragging, endDragging } = useContext(UIContext);
  const fetcher = useFetcher();
  const entriesByStatus = useMemo(
    () => entries?.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    console.log(event.dataTransfer.getData);
    const id = event.dataTransfer.getData("text");

    const entry = entries?.find((entry) => entry.id === id)!;

    entry.status = status;
    // updateEntry(entry);

    fetcher.submit({ entry: JSON.stringify(entry) }, { method: "put" });
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
          {entriesByStatus?.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </ul>
      </div>
    </div>
  );
};
