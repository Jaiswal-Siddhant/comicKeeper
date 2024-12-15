import { requestStoragePermission } from './requestStoragePermission';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

async function saveFileToCache(content: string) {
	try {
		const folderPath = `${FileSystem.cacheDirectory}/Comic Keeper`;
		const today = new Date().toISOString().split('T')[0];
		const file = `${folderPath}/${today}_comicKeeper.json`;
		const filePath = `${FileSystem.cacheDirectory}Comic Keeper ${today}.json`;

		const contentString =
			typeof content === 'string' ? content : JSON.stringify(content);

		console.log('Data to write', typeof contentString);
		// Write the content to the cache directory
		await FileSystem.writeAsStringAsync(filePath, contentString, {
			encoding: 'utf8',
		});

		console.log(`File saved at ${filePath}`);
		return filePath; // Return the path for further use if needed
	} catch (error) {
		console.error('Error saving file to cache:', error);
	}
}

const saveToComicKeeper = async (content: string) => {
	try {
		const file = await saveFileToCache(content);
		if (file) {
			await shareAsync(file);
		}
	} catch (error) {
		console.log(error);
	}
};

export default saveToComicKeeper;
