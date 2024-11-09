import RNFS from 'react-native-fs';
import { requestStoragePermission } from './requestStoragePermission';

const saveToComicKeeper = async (content: string) => {
	const hasPermission = await requestStoragePermission();
	if (!hasPermission) {
		return;
	}

	const folderPath = `${RNFS.DocumentDirectoryPath}/Comic Keeper`;
	const today = new Date().toISOString().split('T')[0];
	const filePath = `${folderPath}/${today}_comicKeeper.json`;

	try {
		// Create the folder if it doesn't exist
		await RNFS.mkdir(folderPath);

		// Write the file
		await RNFS.writeFile(filePath, content, 'utf8');
		console.log('File written successfully!');
		return filePath;
	} catch (error) {
		console.error('Error writing file:', error);
	}
};

export default saveToComicKeeper;
