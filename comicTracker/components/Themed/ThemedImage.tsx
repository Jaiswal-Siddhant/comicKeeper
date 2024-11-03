import {
	Image,
	ImageProps,
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	useColorScheme,
	View,
} from 'react-native';
import React from 'react';
import { ThemedView } from '../ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedImage = ImageProps & {
	lightColor?: string;
	darkColor?: string;
};
export default function ThemedImage({
	style,
	lightColor,
	darkColor,
	...rest
}: ThemedImage) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'lightBackground'
	);
	const colorScheme = useColorScheme();

	return (
		<ThemedView
			style={[
				colorScheme != 'dark'
					? {
							elevation: 5,
							borderRadius: 12,
					  }
					: {},
			]}>
			<Image
				{...rest}
				style={[
					{ backgroundColor },
					style,
					{
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.2,
					},
				]}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 45,
		marginVertical: 12,
		// borderWidth: 1,
		padding: 10,
		color: Colors.dark.textSecondary,
		borderColor: Colors.dark.textSecondary,
		backgroundColor: Colors.dark.lightBackground,
		borderRadius: 12,
		fontFamily: 'OpenSans',
		letterSpacing: 0.4,
		fontSize: 16,
	},
});
