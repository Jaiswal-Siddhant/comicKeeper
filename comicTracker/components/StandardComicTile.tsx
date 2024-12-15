import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemedView } from './ThemedView';
import ThemedImage from './Themed/ThemedImage';
import { TabBarIcon } from './navigation/TabBarIcon';
import { ThemedText } from './ThemedText';
import { ComicData } from '@/@types/ComicDataType';
import { Colors } from '@/constants/Colors';
import { SearchComicResponse } from '@/@types/SearchComic';

export default function StandardComicTile({
	data,
	onPress,
}: {
	data: SearchComicResponse;
	onPress: (data: SearchComicResponse) => void;
}) {
	return (
		<ThemedView style={styles.container}>
			<ThemedView
				style={[styles.comicTile]}
				onTouchEnd={() => onPress(data)}>
				{data.thumbnail ? (
					<ThemedImage
						style={styles.image}
						source={{
							uri: data.thumbnail,
						}}
					/>
				) : (
					<ThemedView style={styles.imageNotFound}>
						<TabBarIcon
							style={[styles.image, styles.imageNotFound]}
							name='warning-outline'
							color={'white'}
							size={50}
						/>
					</ThemedView>
				)}
				<ThemedView style={{ width: '70%' }}>
					<ThemedText style={styles.titleText}>
						{data.title}
					</ThemedText>
					<ThemedText style={styles.chaptersText} numberOfLines={3}>
						{data.shortDescription}
					</ThemedText>
				</ThemedView>
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	comicTile: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
		borderRadius: 8,
		padding: 10,
	},
	image: {
		height: 120,
		borderRadius: 10,
		aspectRatio: 9 / 12,
	},
	imageNotFound: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		verticalAlign: 'middle',
		backgroundColor: Colors.dark.lightBackground,
		height: 100,
	},
	titleText: {
		fontSize: 18,
		fontWeight: '600',
		maxWidth: '90%',
		paddingBottom: 10,
	},
	chaptersText: {
		fontSize: 14,
		width: 'auto',
		textAlign: 'justify',
	},
	deleteIcon: {
		position: 'absolute',
		right: 10,
		top: '50%',
		transform: [{ translateY: -15 }],
	},
	trashIcon: {
		fontSize: 24,
		color: '#C80815',
	},
});
