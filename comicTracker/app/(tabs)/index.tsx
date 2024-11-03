import {
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	View,
	RefreshControl,
} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	AddComic,
	AppHeader,
	ComicTile,
	FullPageLoader,
	ThemedButton,
	ThemedInput,
	ThemedText,
} from '@/components';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useCallback, useRef, useState } from 'react';
import CustomBottomSheet, {
	CustomBottomSheetRef,
} from '@/components/CustomBottomSheet';
import { ComicData } from '@/@types/ComicDataType';
import { deleteComic, getAllComics } from '@/db/comicDB';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';

type FilterBy = 'ascending' | 'descending' | '';

export default function HomeScreen() {
	const bottomSheetModalRef = useRef<CustomBottomSheetRef>(null);
	const [myComics, setMyComic] = useState<ComicData[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [isSortedAscending, setIsSortedAscending] = useState(false);
	const [filterBy, setFilterBy] = useState<FilterBy>('');
	const [searchQuery, setSearchQuery] = useState('');
	const rotation = useSharedValue(0);

	const getComics = async () => {
		setRefreshing(true);
		console.log('Inside getComics');
		const myComics = await getAllComics();
		setMyComic(myComics);
		setRefreshing(false);
	};

	const handleComicDelete = (title: string) => {
		deleteComic(title);
		getComics();
	};

	const handleSorting = () => {
		FullPageLoader.open();
		// setIsSortedAscending(!isSortedAscending);

		if (filterBy === 'ascending') {
			setFilterBy('descending');
		} else if (filterBy === 'descending') {
			setFilterBy('');
		} else {
			setFilterBy('ascending');
		}

		if (filterBy === 'ascending') {
			rotation.value = withSequence(
				withTiming(0, { duration: 250 }),
				withTiming(180, { duration: 250 })
			);
		} else if (filterBy === 'descending') {
			rotation.value = withSequence(
				withTiming(180, { duration: 250 }),
				withTiming(0, { duration: 250 })
			);
		} else {
			rotation.value = withTiming(0, { duration: 250 });
		}

		setTimeout(() => {
			FullPageLoader.close();
		}, 2000);
	};

	useFocusEffect(
		useCallback(() => {
			getComics();
		}, [])
	);

	const animatedRotationStyle = useAnimatedStyle(() => ({
		transform: [{ rotateZ: `${rotation.value}deg` }],
	}));

	const filterHandler = (comic: ComicData) => {
		if (searchQuery.length < 3) return true;

		return comic.title
			.trim()
			.toLowerCase()
			.includes(searchQuery.trim().toLowerCase());
	};

	const sortHandler = (a: ComicData, b: ComicData) => {
		if (!filterBy) return 0;

		const [day1, month1, year1] = a.lastRead.split('/').map(Number);
		const [day2, month2, year2] = b.lastRead.split('/').map(Number);

		let comparison = 0;
		if (year1 !== year2) {
			comparison = year1 - year2;
		} else if (month1 !== month2) {
			comparison = month1 - month2;
		} else {
			comparison = day1 - day2;
		}

		// Adjust comparison based on the isSortedAscending flag
		return filterBy == 'ascending' ? comparison : -comparison;
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.appWrapper}>
				<ScrollView
					nestedScrollEnabled
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={getComics}
						/>
					}>
					<AppHeader />
					<ThemedView style={styles.chaptersContainer}>
						<ThemedView style={styles.chaptersInputHeading}>
							<ThemedInput
								placeholder='Search...'
								onChangeText={(text) => setSearchQuery(text)}
								value={searchQuery}
							/>
						</ThemedView>
						<ThemedView style={[styles.iconContainer]}>
							<Animated.View style={[animatedRotationStyle]}>
								<TabBarIcon
									onPress={handleSorting}
									name={
										filterBy == '' ? 'remove' : 'arrow-up'
									}
									size={24}
								/>
							</Animated.View>
						</ThemedView>
					</ThemedView>
					<ThemedView style={styles.titleContainer}>
						{myComics
							.filter(filterHandler)
							.sort(sortHandler)
							.map((comic, index) => (
								<ComicTile
									key={comic.title + index}
									data={comic}
									onDelete={handleComicDelete}
								/>
							))}
					</ThemedView>
				</ScrollView>
				<TouchableOpacity
					style={styles.floatingActionBtn}
					onPress={() => {
						bottomSheetModalRef.current?.present();
					}}>
					<TabBarIcon
						style={styles.floatingActionBtnTxt}
						name='add'></TabBarIcon>
				</TouchableOpacity>
			</View>
			{myComics.length === 0 && (
				<ThemedView style={styles.noComicsContainer}>
					<ThemedText>Add Comic to get started</ThemedText>
				</ThemedView>
			)}
			<CustomBottomSheet ref={bottomSheetModalRef}>
				<AddComic
					bottomSheetModalRef={bottomSheetModalRef}
					onAdded={getComics}
				/>
			</CustomBottomSheet>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		display: 'flex',
		height: '100%',
		flex: 1,
	},
	appWrapper: {
		height: '100%',
		backgroundColor: Colors.dark.background,
	},
	noComicsContainer: {
		position: 'absolute',
		top: '50%',
		alignItems: 'center',
		width: '100%',
	},
	modalContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		backgroundColor: 'grey',
		height: 1000,
		width: 1000,
	},
	titleContainer: {
		display: 'flex',
		height: '100%',
		gap: 10,
		paddingHorizontal: 20,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},

	floatingActionBtn: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		backgroundColor: Colors.theme.primary,
		height: 55,
		width: 55,
		borderRadius: 10,
	},
	floatingActionBtnTxt: {
		display: 'flex',
		color: 'white',
		alignItems: 'center',
		textAlign: 'center',
		verticalAlign: 'middle',
		height: 55,
		fontWeight: 'bold',
	},

	bottomSheetContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		position: 'absolute',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
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
		flex: 0.9,
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
