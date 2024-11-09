import {
	Image,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { ThemedText } from './ThemedText';
import ThemedInput from './Themed/ThemedInput';
import { ThemedView } from './ThemedView';
import useDebounce from '@/hooks/useDebounce';
import { Colors } from '@/constants/Colors';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { searchComic } from '@/lib';
import { SearchComicResponse } from '@/@types/SearchComic';
import { ComicData } from '@/@types/ComicDataType';
import { ThemedButton } from './ThemedButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addComicToDB, updateComic } from '@/db/comicDB';
import { CustomBottomSheetRef } from './CustomBottomSheet';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { getCurrentDate } from '@/utils/getDate';
import ThemedSwitch from './Themed/ThemedSwitch';

export default function EditComic({
	bottomSheetModalRef,
	onAdded,
	prePopulatedData,
}: {
	bottomSheetModalRef: RefObject<CustomBottomSheetRef>;
	onAdded: () => void;
	prePopulatedData: ComicData;
}) {
	const [comicData, setComicData] = useState<ComicData>({
		title: '',
		readChapters: '',
		totalChapters: '',
		isCompleted: false,
		lastRead: '',
		description: '',
		imgUrl: '',
	});
	const optionsHeight = useSharedValue(0);
	const [options, setOptions] = useState<SearchComicResponse[]>([]);
	const [showOptions, setShowOptions] = useState(false);

	const searchAPI = async (searchTerm: string) => {
		// FullPageLoader.open();
		if (!searchTerm || searchTerm.trim().length < 3) return;
		const comicData = await searchComic(searchTerm);
		setOptions(comicData);
		setShowOptions(true);
		optionsHeight.value = withSequence(withTiming(125, { duration: 350 }));
	};

	const debouncedSearch = useCallback(useDebounce(searchAPI, 1500), [
		searchAPI,
	]);

	const handleChangeName = (text: string) => {
		console.log('text len', text);
		if (text.trim().length > 3) debouncedSearch(text);
	};

	const animatedOptionsHeight = useAnimatedStyle(() => ({
		maxHeight: optionsHeight.value,
	}));

	const handleComicOptionClick = (currentComic: string | undefined) => {
		try {
			if (!currentComic) return;

			const comic = options.find((comic) => comic.title === currentComic);
			if (!comic) return;

			setComicData({
				...comicData,
				title: comic.title!,
				readChapters: '',
				totalChapters: comic.nbChapters ?? '',
				lastRead: '',
				imgUrl: comic.thumbnail ?? '',
				description:
					comic.shortDescription?.replace('read more', '') ?? '',
			});
		} catch (error) {
			console.log('Error in handleComicOptionClick', error);
		} finally {
			optionsHeight.value = withSequence(
				// withTiming(125, { duration: 450 }),
				withTiming(0, { duration: 350 })
			);
			setTimeout(() => {
				setShowOptions(false);
			}, 1000);
		}
	};

	const handleComicDataChange = (
		key: keyof ComicData,
		value: string | boolean
	) => {
		setComicData({ ...comicData, [key]: value });
	};

	const handleEditComic = async () => {
		try {
			if (
				!comicData.title ||
				!comicData.readChapters ||
				!comicData.totalChapters
			)
				return;

			let lastRead = getCurrentDate();

			if (comicData.lastRead.length > 0) lastRead = comicData.lastRead;

			await updateComic({
				...comicData,
				lastRead,
			});
			bottomSheetModalRef.current?.close();
			onAdded();
		} catch (error) {
			console.log('Error in handleEditComic', error);
		}
	};

	const showDateInput = () => {
		DateTimePickerAndroid.open({
			value: new Date(),
			maximumDate: new Date(),
			onChange: (e, date) => {
				if (e.type === 'dismissed') {
					return;
				}

				if (date) {
					const currentDate = `${date.getDate()}/${
						date.getMonth() + 1
					}/${date.getFullYear()}`;
					handleComicDataChange('lastRead', currentDate);
				}
			},
		});
	};

	useEffect(() => {
		if (prePopulatedData) {
			console.log('prePopulatedData', prePopulatedData);
			setComicData(prePopulatedData);
		}
	}, []);

	return (
		<KeyboardAwareScrollView style={styles.container}>
			<ThemedText style={styles.Heading}>Edit comic</ThemedText>
			{comicData.imgUrl && (
				<Image
					style={{
						width: '100%',
						height: 150,
						objectFit: 'contain',
					}}
					source={{ uri: comicData.imgUrl }}
				/>
			)}
			<ThemedInput
				autoFocus={false}
				placeholder='Manga Name'
				onChangeText={(text) => {
					handleComicDataChange('title', text);
					handleChangeName(text);
				}}
				value={comicData.title}
			/>
			<ThemedSwitch
				value={comicData.isCompleted}
				switchText='Is Comic Completed'
				onChange={() => {
					handleComicDataChange(
						'isCompleted',
						!comicData.isCompleted
					);
				}}
			/>

			{showOptions && options?.length > 0 && (
				<Animated.View style={[animatedOptionsHeight]}>
					<BottomSheetFlatList
						style={[styles.dropdown]}
						data={options.map((item) => item.title)}
						keyExtractor={(item, index) => index.toString()}
						scrollEnabled
						keyboardShouldPersistTaps={'always'}
						scrollsToTop
						nestedScrollEnabled
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.option}
								onPress={() => {
									handleComicOptionClick(item);
								}}>
								<Text
									style={{
										color: Colors.dark.textSecondary,
									}}>
									{item}
								</Text>
							</TouchableOpacity>
						)}
					/>
				</Animated.View>
			)}

			<ThemedView style={styles.chaptersContainer}>
				<ThemedView style={styles.chaptersInputHeading}>
					<ThemedText>Read Chapters</ThemedText>
					<ThemedInput
						placeholder='0'
						keyboardType='number-pad'
						value={comicData.readChapters}
						onChangeText={(text) => {
							handleComicDataChange('readChapters', text);
						}}
					/>
				</ThemedView>
				<ThemedView style={styles.chaptersInputHeading}>
					<ThemedText>Total Chapters</ThemedText>
					<ThemedInput
						placeholder='0'
						value={comicData.totalChapters}
						keyboardType='number-pad'
						onChangeText={(text) => {
							handleComicDataChange('totalChapters', text);
						}}
					/>
				</ThemedView>
			</ThemedView>
			<ThemedButton
				title={
					comicData.lastRead.length
						? comicData.lastRead
						: 'Last read date (Default Today)'
				}
				onClick={showDateInput}
				style={styles.lastRead}
				textStyle={{ textAlign: 'left' }}
			/>
			<ThemedInput
				placeholder='Enter Description'
				multiline
				numberOfLines={4}
				value={comicData.description}
				style={{ height: 150, verticalAlign: 'top' }}
				onChangeText={(text) => {
					handleComicDataChange('description', text);
				}}
			/>

			<ThemedButton
				title='Edit Comic'
				style={styles.AddBtn}
				onClick={handleEditComic}
			/>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		height: '100%',
	},
	Heading: {
		fontSize: 20,
		marginBottom: 10,
	},
	autocompleteContainer: {
		flex: 1,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: 1,
	},
	mangaInput: {
		position: 'absolute',
	},
	chaptersContainer: {
		paddingTop: 10,
		display: 'flex',
		flexDirection: 'row',
		gap: 30,
	},
	lastRead: {
		alignItems: 'flex-start',
		paddingHorizontal: 10,
	},
	chaptersInputHeading: {
		flex: 0.5,
	},
	dropdown: {
		width: '100%',
		maxHeight: 150,
		// borderWidth: 1,npm
		borderColor: '#ccc',
		borderTopWidth: 0,
		backgroundColor: Colors.dark.lightBackground,
		// position: 'absolute',
		bottom: 0,
		display: 'flex',
		gap: 20,
	},
	option: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.dark.textSecondary,
		backgroundColor: Colors.dark.lightBackground,
		height: 40,
	},
	AddBtn: {
		// position: 'absolute',
		bottom: 0,
		width: '100%',
	},
});
