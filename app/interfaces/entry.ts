export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: Status;
}

export enum Status {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  FINISHED = "Finished",
}
