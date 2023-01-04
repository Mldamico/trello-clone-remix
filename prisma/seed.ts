import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getEntries().map((entry) => {
      return db.entry.create({ data: entry });
    })
  );
}

seed();

function getEntries() {
  return [
    {
      description: "Learning",
      status: "PENDING",
    },
    {
      description: "Learning",
      status: "IN_PROGRESS",
    },
    {
      description: "Learning",
      status: "FINISHED",
    },
  ];
}
