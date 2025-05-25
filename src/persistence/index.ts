import Dexie, { type Table } from "dexie";

import { type Binder } from "@/persistence/entities/data/Binder";
import { type Category } from "@/persistence/entities/data/Category";
import { type Pictogram } from "@/persistence/entities/data/Pictogram";
import { type Setting } from "@/persistence/entities/data/Setting";
import { type Translation } from "@/persistence/entities/data/Translation";

import { populate } from "@/persistence/populate";

export class PickNTalkDB extends Dexie {
	binders!: Table<Binder, string>;
	categories!: Table<Category, string>;
	pictograms!: Table<Pictogram, string>;
	settings!: Table<Setting, string>;
	translations!: Table<Translation, number>;

	constructor() {
		super("PickNTalkDB");
		this.version(1).stores({
			binders: "&uuid",
			categories: "&uuid",
			pictograms: "&uuid, binderUuid, categoryUuid",
			settings: "&key",
			translations: "++id, &[objectUuid+language+key]",
		});
	}

	// #region List
	public getBinders() {
		return this.binders.toArray();
	}

	public getCategories() {
		return this.categories.toArray();
	}

	public getPictograms() {
		return this.pictograms.toArray();
	}

	public getSettings() {
		return this.settings.toArray();
	}

	public getTranslations() {
		return this.translations.toArray();
	}
	// #endregion
}

export const db = new PickNTalkDB();

db.on("populate", populate);