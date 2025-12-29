export interface IChatSchema {
  role: string;
  message: string;
}

export enum EChatSchema {
  content = "content",
  role = "role",
}
