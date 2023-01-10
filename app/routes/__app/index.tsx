import { ActionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EntryList } from "~/components/ui/EntryList";
import { NewEntry } from "~/components/ui/NewEntry";
import { Entry, Status } from "~/interfaces";
import { db } from "~/utils/db.server";
import { useEffect, useState } from "react";

export default function Index() {
  const [entries, setEntries] = useState<Entry[]>();
  const data = useLoaderData();

  useEffect(() => {
    setEntries(data);
  }, [data]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
      <div className="bg-lightSecondary dark:bg-slate-800 dark:text-white p-2 h-[calc(100vh_-_100px)] rounded-2xl">
        <h2>To Do</h2>

        <NewEntry />
        <EntryList status={Status.PENDING} entries={entries} />
      </div>
      <div className="bg-lightSecondary dark:bg-slate-800 dark:text-white p-2 h-[calc(100vh_-_100px)] rounded-2xl">
        <h2>In Progress</h2>

        <EntryList status={Status.IN_PROGRESS} entries={entries} />
      </div>
      <div className="bg-lightSecondary dark:bg-slate-800 dark:text-white p-2 h-[calc(100vh_-_100px)] rounded-2xl">
        <h2>Completed</h2>

        <EntryList status={Status.FINISHED} entries={entries} />
      </div>
    </div>
  );
}

export const loader = async () => {
  const entries = await db.entry.findMany();

  return json(entries);
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();

  switch (request.method) {
    case "POST":
      console.log("entro en post");
      const description = form.get("input");
      if (typeof description !== "string") {
        return json({ error: "could not submit" }, { status: 400 });
      }

      if (description.length < 3) {
        return `That joke's name is too short`;
      }
      await db.entry.create({
        data: { description, status: "PENDING" },
      });
      return redirect(`/`);
    case "PUT":
      const data = form.get("entry");

      const newEntry: Entry = JSON.parse(data as string);

      await db.entry.update({
        where: { id: newEntry.id },
        data: { status: newEntry.status },
      });
      return redirect(`/`);
    default:
      return redirect(`/`);
  }
};
