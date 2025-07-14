export interface TranslatedPictogram {
  uuid: string;

  image?: Blob;

  binderUuid: string;
  categories?: string[];

  word: string;
}
