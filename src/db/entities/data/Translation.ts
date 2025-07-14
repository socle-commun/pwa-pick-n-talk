export interface Translation {
	id?: number;

	objectUuid: string;
	language: string;

	key: string | undefined;

	value: string;
}