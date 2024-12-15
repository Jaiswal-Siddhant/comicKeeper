import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

export default function AppHeader() {
	return (
		<ThemedView style={styles.AppDetails}>
			<ThemedText style={styles.appTitlePrimary}>ComicKeeper</ThemedText>
			<ThemedText style={styles.textSecondary}>
				Your Comics, Your Journey
			</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	AppDetails: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
		paddingRight: 10,
		paddingBottom: 0,
		height: 45,
		zIndex: 1,
	},
	appTitlePrimary: {
		fontSize: 22,
		fontWeight: 'condensedBold',
		fontFamily: 'Epilogue',
		letterSpacing: 0.3,
	},
	textSecondary: {
		color: Colors.dark.textSecondary,
		fontSize: 11,
		verticalAlign: 'bottom',
		display: 'flex',
		alignItems: 'flex-end',
		fontFamily: 'Epilogue',
	},
});
