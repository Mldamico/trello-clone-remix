export interface Entry {
  id: string;
  description: string;
  createdAt: number;
  status: Status;
}

export enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}
