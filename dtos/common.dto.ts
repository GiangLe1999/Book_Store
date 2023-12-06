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

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IReadOnlySelectOption {
  readonly value: string;
  readonly label: string;
}
