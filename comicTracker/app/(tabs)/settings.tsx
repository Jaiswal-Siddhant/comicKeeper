import { StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FullPageLoader, ThemedButton, ThemedView } from '@/components';
import pickJsonFile from '@/utils/pickJson';
import { getAllComics } from '@/db/comicDB';
import { shareAsync } from 'expo-sharing';
import expoFs from 'expo-file-system';
import saveToComicKeeper from '@/utils/saveToDir';
import { storeJsonToDb } from '@/utils/storeJsonToDb';

const Explore1 = () => {
	// console.log(RNFS.ExternalStorageDirectoryPath);
	const handleImportAsJson = async () => {
		const jsonObj = await pickJsonFile();
		if (jsonObj) {
			// Add to db
			// console.log('JSON', jsonObj);

			storeJsonToDb(jsonObj);
		}
	};

	const handleExportAsJson = async () => {
		try {
			FullPageLoader.open();
			const allComics = await getAllComics();
			saveToComicKeeper(JSON.stringify(allComics, null, 4));
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
