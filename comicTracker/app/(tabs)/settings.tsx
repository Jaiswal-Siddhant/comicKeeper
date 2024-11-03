import React, { useCallback, useMemo, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomSheet, {
	CustomBottomSheetRef,
} from '@/components/CustomBottomSheet';
import {
	FullPageLoader,
	ThemedButton,
	ThemedText,
	ThemedView,
} from '@/components';
import pickJsonFile from '@/utils/pickJson';
import { getAllComics } from '@/db/comicDB';
import * as FileSystem from 'expo-file-system';

const Explore1 = () => {
	const handleImportAsJson = async () => {
		const jsonObj = await pickJsonFile();

		if (jsonObj) {
			// Add to db
		}
	};

	const handleExportAsJson = async () => {
		try {
			FullPageLoader.open();
			const allComics = await getAllComics();

			const folderUri = `${FileSystem.documentDirectory}Comic Keeper`;
			const folderInfo = await FileSystem.getInfoAsync(folderUri);
			if (!folderInfo.exists) {
				// Create the Comic Keeper folder if it does not exist
				await FileSystem.makeDirectoryAsync(folderUri, {
					intermediates: true,
				});
				console.log(`Folder created at ${folderUri}`);
			} else {
				console.log(`Folder already exists at ${folderUri}`);
			}

			const today = new Date().toISOString().split('T')[0];
			const fileUri = `${folderUri}/${today}_comicKeeper.json`;
			// Convert allData to a JSON string
			const jsonData = JSON.stringify(allComics, null, 4);

			// Write the JSON data to a file
			await FileSystem.writeAsStringAsync(fileUri, jsonData, {
				encoding: FileSystem.EncodingType.UTF8,
			});

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
