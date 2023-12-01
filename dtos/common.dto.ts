export interface CoreOutput {
  error?: string;
  ok: boolean;
}

export interface CoreEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDatabaseImage {
  public_id: string;
  url: string;
}
