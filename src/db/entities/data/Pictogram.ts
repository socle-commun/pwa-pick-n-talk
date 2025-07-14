export interface Pictogram {
  uuid: string;

  blob?: Blob;
  image?: Blob;
  sound?: Blob;
  isFavorite: boolean;

  binderUuid: string;
  categoryUuid: string;
  categories?: string[];

  properties?: Record<string, Record<string, string>>;
}
