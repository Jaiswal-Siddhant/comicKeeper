import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	AppHeader,
	FullPageLoader,
	StandardComicTile,
	ThemedInput,
} from '@/components';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { searchComic } from '@/lib';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchComicResponse } from '@/@types/SearchComic';
import { router } from 'expo-router';

export default function TabTwoScreen() {
	const [searchedComics, setSearchedComics] = useState<SearchComicResponse[]>(
		[]
	);
	const [searchQuery, setSearchQuery] = useState('');
	const animatedWidth = useSharedValue(85);

	const animatedWidthStyle = useAnimatedStyle(() => ({
		width: `${animatedWidth.value}%`,
	}));

	const searchAPI = async (searchTerm: string) => {
		if (searchTerm === '') setSearchedComics([]);
		if (!searchTerm || searchTerm.trim().length < 3) return;
		try {
			FullPageLoader.open({
				label: 'Searching...',
			});
			const comicData = await searchComic(searchTerm);
			console.log('Comic searched', comicData);
			setSearchedComics(comicData);
		} catch (error) {
			alert('Something went wrong!');
		} finally {
			FullPageLoader.close();
		}
	};

	useFocusEffect(
		useCallback(() => {
			animatedWidth.value = withSequence(
				withTiming(100, { duration: 300 })
			);

			return () => {
				animatedWidth.value = withTiming(85);
			};
		}, [])
	);

	return (
		<SafeAreaView style={{ flex: 1, display: 'flex', height: '100%' }}>
			<ThemedView>
				<ThemedView style={{ paddingBottom: 10 }}>
					<AppHeader />
				</ThemedView>
				<ScrollView style={{ display: 'flex', height: '100%' }}>
					<ThemedView style={styles.container}>
						<ThemedView style={styles.chaptersContainer}>
							<Animated.View style={[animatedWidthStyle]}>
								<ThemedView style={styles.chaptersInputHeading}>
									<ThemedInput
										onEndEditing={() =>
											searchAPI(searchQuery)
										}
										placeholder='Search...'
										onChangeText={(text) => {
											setSearchQuery(text);
										}}
										style={{ marginTop: 0 }}
										value={searchQuery}
									/>
								</ThemedView>
							</Animated.View>
						</ThemedView>

						<ThemedView style={{ paddingHorizontal: 20 }}>
							{searchedComics?.map((comic, index) => (
								<StandardComicTile
									key={comic.title! + index}
									data={comic}
									onPress={(item) => {
										console.log('Pressed', item.title);
										router.push('/ComicDetail');
									}}
								/>
							))}
						</ThemedView>
					</ThemedView>
				</ScrollView>
			</ThemedView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
	},
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	chaptersContainer: {
		padding: 10,
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		paddingHorizontal: 20,
		// marginHorizontal: 10,
	},
	chaptersInputHeading: {
		flex: 1,
	},
	iconContainer: {
		display: 'flex',
		flex: 0.1,
		textAlign: 'center',
		verticalAlign: 'middle',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
