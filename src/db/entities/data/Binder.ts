export interface Binder {
  uuid: string;

  author: string;
  icon?: Blob;

  properties?: Record<string, Record<string, string>>;

  pictograms?: string[];
  users?: string[];
}
