export interface Pictogram {
  uuid: string;

  image?: Blob;
  sound?: Blob;
  isFavorite: boolean;

  binderUuid: string;
  categories?: string[];

  properties?: Record<string, Record<string, string>>;
}
