import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
	Gesture,
	GestureDetector,
	PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Colors } from '@/constants/Colors';
import { ComicData } from '@/@types/ComicDataType';
import { TabBarIcon } from './navigation/TabBarIcon';
import ThemedImage from './Themed/ThemedImage';
// const ImageNotFound = require('../assets/images/Image-not-found.png');

export default function ComicTile({
	data,
	onDelete,
	onPress,
}: {
	data: ComicData;
	onDelete?: (title: string) => void;
	onPress: (data: ComicData) => void;
}) {
	const translateX = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const deleteIconStyle = useAnimatedStyle(() => ({
		opacity: translateX.value < -50 ? withTiming(1) : withTiming(0),
	}));

	const gesture = Gesture.Pan()
		.activeOffsetY([-20, 20])
		.activeOffsetX([-20, 20])
		.simultaneousWithExternalGesture(Gesture.Tap())
		.onUpdate((e) => {
			if (e.translationX < 0) {
				translateX.value = e.translationX;
			} else if (e.translationX > 0) {
				translateX.value = Math.min(e.translationX, 0);
			}
		})
		.onEnd(() => {
			if (translateX.value < -50) {
				translateX.value = withTiming(-60);
			} else {
				translateX.value = withTiming(0);
			}
		});

	return (
		<Animated.View style={styles.container}>
			<GestureDetector gesture={gesture}>
				<Animated.View
					style={[styles.comicTile, animatedStyle]}
					onTouchEnd={() => onPress(data)}>
					{data.imgUrl ? (
						<ThemedImage
							style={styles.image}
							source={{
								uri: data.imgUrl,
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
					<ThemedView>
						<ThemedText style={styles.titleText}>
							{data.title}
						</ThemedText>
						<ThemedText style={styles.chaptersText}>
							Chapters: {data.readChapters} / {data.totalChapters}
						</ThemedText>
						<ThemedText style={styles.chaptersText}>
							Last Read {data.lastRead}
						</ThemedText>
					</ThemedView>
				</Animated.View>
			</GestureDetector>
			{onDelete && (
				<Animated.View style={[styles.deleteIcon, deleteIconStyle]}>
					<TouchableOpacity onPress={() => onDelete(data.title)}>
						<TabBarIcon name='trash-bin' style={styles.trashIcon} />
					</TouchableOpacity>
				</Animated.View>
			)}
		</Animated.View>
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
		fontFamily: 'default',
		color: Colors.dark.textSecondary,
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
