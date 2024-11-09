import { ComicData } from '@/@types/ComicDataType';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('databaseName');

const initializeDB = () => {
	db.execSync(
		`CREATE TABLE IF NOT EXISTS comics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL UNIQUE,
        readChapters TEXT,
        totalChapters TEXT,
        isCompleted INTEGER,
        lastRead TEXT,
        description TEXT,
        imgUrl TEXT
      );`
	);
};

initializeDB();

// Add a comic entry to the database
export const addComicToDB = async (comic: ComicData) => {
	const {
		title,
		readChapters,
		totalChapters,
		isCompleted,
		lastRead,
		description,
		imgUrl,
	} = comic;
	try {
		await db.runAsync(
			`INSERT OR REPLACE INTO comics (title, readChapters, totalChapters, isCompleted, lastRead, description, imgUrl) VALUES (?, ?, ?, ?, ?, ?, ?);`,
			title,
			readChapters,
			totalChapters,
			isCompleted ? 1 : 0,
			lastRead,
			description,
			imgUrl
		);
	} catch (error) {
		console.log('Error while saving to db', error);
		return null;
	}
};

export const getAllComics = async (): Promise<ComicData[] | []> => {
	try {
		const data: ComicData[] = await db.getAllAsync('SELECT * FROM comics');
		return data;
	} catch (error) {
		console.log('Error while getting from db', error);
		return [];
	}
};

export const getComicByTitle = async (title: string) => {
	try {
		const data: ComicData[] = await db.getAllSync(
			`SELECT * FROM comics WHERE title = ?;`,
			title
		);
		return data;
	} catch (error) {
		return [];
	}
};

export const updateComic = async (comic: ComicData) => {
	const {
		title,
		readChapters,
		totalChapters,
		isCompleted,
		lastRead,
		description,
		imgUrl,
	} = comic;

	try {
		await db.runAsync(
			`UPDATE comics SET readChapters = ?, totalChapters = ?, isCompleted = ?, lastRead = ?, description = ?, imgUrl = ? WHERE title = ?;`,
			readChapters,
			totalChapters,
			isCompleted ? 1 : 0,
			lastRead,
			description,
			imgUrl,
			title
		);
	} catch (error) {
		console.log('Error while updating comic', error);
		return null;
	}
};

export const deleteComic = (title: string) => {
	try {
		db.runSync(`DELETE FROM comics WHERE title = ?;`, title);
	} catch (error) {
		console.log('error while deleting comic from db', error);
	}
};
