import {
	StyleSheet,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	type ViewProps,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

export type ThemedButtonProps = TouchableOpacityProps & {
	lightColor?: string;
	darkColor?: string;
	title: string;
	textStyle?: TextStyle;
	onClick?: () => void;
};

export function ThemedButton({
	style,
	textStyle,
	lightColor,
	darkColor,
	title,
	onClick,
	...rest
}: ThemedButtonProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'lightBackground'
	);

	return (
		<TouchableOpacity
			style={[{ backgroundColor }, styles.button, style]}
			onPress={onClick}>
			<ThemedText style={[textStyle]}>{title}</ThemedText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		// backgroundColor: Colors.dark.lightBackground,
		margin: 10,
		marginHorizontal: 0,
	},
});
