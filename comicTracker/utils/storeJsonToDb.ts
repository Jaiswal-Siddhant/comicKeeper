import { ComicData } from '@/@types/ComicDataType';
import { FullPageLoader } from '@/components';
import { addComicToDB } from '@/db/comicDB';

const validateObject = (obj: object) => {
	const objKeys = Object.keys(obj);
	const comicKeysSet = new Set([
		'description',
		'id',
		'imgUrl',
		'isCompleted',
		'lastRead',
		'readChapters',
		'title',
		'totalChapters',
	]);

	for (let i = 0; i < objKeys.length; i++) {
		if (!comicKeysSet.has(objKeys[i])) {
			return false;
		}
	}
	return true;
};

const storeJsonToDb = async (jsonData: object[]) => {
	try {
		FullPageLoader.open();
		for (let i = 0; i < jsonData.length; i++) {
			const comicData = jsonData[i] as ComicData;
			if (!validateObject(comicData)) return;
		}

		for (let i = 0; i < jsonData.length; i++) {
			const comicData = jsonData[i] as ComicData;
			await addComicToDB(comicData);
		}
	} catch (error) {
		console.error('Error saving data to file:', error);
	} finally {
		FullPageLoader.close();
	}
};

export { storeJsonToDb };
