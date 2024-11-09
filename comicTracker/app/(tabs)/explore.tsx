import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, ThemedInput } from '@/components';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

export default function TabTwoScreen() {
	const [searchQuery, setSearchQuery] = useState('');
	const animatedWidth = useSharedValue(85);

	const animatedWidthStyle = useAnimatedStyle(() => ({
		width: `${animatedWidth.value}%`,
	}));

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
		<SafeAreaView>
			<AppHeader />
			<ThemedView style={styles.container}>
				<ThemedView style={styles.chaptersContainer}>
					<Animated.View style={[animatedWidthStyle]}>
						<ThemedView style={styles.chaptersInputHeading}>
							<ThemedInput
								placeholder='Search...'
								onChangeText={(text) => setSearchQuery(text)}
								value={searchQuery}
							/>
						</ThemedView>
					</Animated.View>
				</ThemedView>
			</ThemedView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
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
