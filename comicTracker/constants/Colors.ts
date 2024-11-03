/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
	light: {
		text: '#11181C',
		background: '#fff',
		tint: tintColorLight,
		icon: '#687076',
		tabIconDefault: '#687076',
		tabIconSelected: tintColorLight,
		lightBackground: '#fff',
	},
	dark: {
		text: '#ECEDEE',
		textSecondary: '#99A8BA',
		background: '#111b24',
		tint: tintColorDark,
		icon: '#9BA1A6',
		tabIconDefault: '#9BA1A6',
		tabIconSelected: tintColorDark,
		lightBackground: '#233647',
		mediumBackground: '#1a3c43',
	},
	theme: {
		primary: '#1466b8',
	},
};
