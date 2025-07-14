export interface Category {
  uuid: string;

  icon: Blob;

  properties?: Record<string, Record<string, string>>;

  pictograms?: string[];
}
