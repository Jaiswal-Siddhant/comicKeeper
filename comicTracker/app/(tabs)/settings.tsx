import { StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FullPageLoader, ThemedButton, ThemedView } from '@/components';
import pickJsonFile from '@/utils/pickJson';
import { getAllComics } from '@/db/comicDB';
import * as FileSystem from 'expo-file-system';
import RNFS from 'react-native-fs';
import saveToComicKeeper from '@/utils/saveToDir';

const Explore1 = () => {
	// console.log(RNFS.ExternalStorageDirectoryPath);
	const handleImportAsJson = async () => {
		// const jsonObj = await pickJsonFile();
		// if (jsonObj) {
		// 	// Add to db
		// }
	};

	const handleExportAsJson = async () => {
		try {
			FullPageLoader.open();
			const allComics = await getAllComics();

			// Convert allData to a JSON string
			const jsonData = JSON.stringify(allComics, null, 4);
			const fileUri = saveToComicKeeper(jsonData);
			console.log(`Data saved to ${fileUri}`);
			ToastAndroid.show(`Exported to ${fileUri}`, ToastAndroid.SHORT);
		} catch (error) {
			console.error('Error saving data to file:', error);
		} finally {
			FullPageLoader.close();
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ThemedView style={styles.container}>
				<ThemedButton
					title='Export as JSON'
					onClick={handleExportAsJson}
				/>
				<ThemedButton
					title='Import as JSON'
					onClick={handleImportAsJson}
				/>
			</ThemedView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
	},
});

export default Explore1;
