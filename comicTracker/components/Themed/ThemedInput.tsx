import {
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

type ThemedInputProps = TextInputProps & {
	placeholder?: string;
	value?: string;
	onChangeText?: ((text: string) => void) | undefined;
	lightColor?: string;
	darkColor?: string;
};
export default function ThemedInput({
	placeholder,
	value,
	onChangeText,
	style,
	lightColor,
	darkColor,
	...rest
}: ThemedInputProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'lightBackground'
	);
	const colorScheme = useColorScheme();

	return (
		<ThemedView>
			<TextInput
				placeholder={placeholder}
				style={[
					styles.input,
					style,
					{ backgroundColor },
					colorScheme != 'dark'
						? {
								elevation: 5,
						  }
						: {},
				]}
				value={value}
				onChangeText={onChangeText}
				placeholderTextColor={Colors.dark.textSecondary}
				{...rest}
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
