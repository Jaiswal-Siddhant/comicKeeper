import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const pickJsonFile = async () => {
	try {
		const result = await DocumentPicker.getDocumentAsync({
			type: 'application/json',
			copyToCacheDirectory: false,
		});

		if (result.canceled) {
			return;
		}

		// Read the file content
		const fileUri = result.assets[0].uri;
		const fileContent = await FileSystem.readAsStringAsync(fileUri);

		const parsedData = JSON.parse(fileContent);
		console.log('parsed', parsedData);
		return parsedData;
	} catch (err) {
		console.error('Error reading JSON file:', err);
	}
};

export default pickJsonFile;
