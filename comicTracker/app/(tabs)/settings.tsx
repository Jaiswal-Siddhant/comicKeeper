import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
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
import { ThemedButton, ThemedText, ThemedView } from '@/components';
import pickJsonFile from '@/utils/pickJson';

const Explore1 = () => {
	const handleImportAsJson = async () => {
		const jsonObj = await pickJsonFile();

		if (jsonObj) {
			// Add to db
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ThemedView style={styles.container}>
				<ThemedButton title='Export as JSON' />
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
