import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { FullPageLoaderComponent } from '@/components/Loader';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		Epilogue: require('../assets/fonts/Epilogue/Epilogue-VariableFont_wght.ttf'),
		OpenSans: require('../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={styles.container}>
			<FullPageLoaderComponent />
			<ThemeProvider
				value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen
						name='(tabs)'
						options={{ headerShown: false }}
					/>
					<Stack.Screen name='+not-found' />
				</Stack>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	gutterBottom: {
		position: 'absolute',
	},
	bottomSheetContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		position: 'absolute',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'grey',
		zIndex: 10,
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		zIndex: 10,
	},
});
