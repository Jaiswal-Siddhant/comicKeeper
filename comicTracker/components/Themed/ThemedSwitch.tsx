import {
	StyleSheet,
	Switch,
	SwitchProps,
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
import { ThemedText } from '../ThemedText';

type ThemedSwitchProps = SwitchProps & {
	switchText: string;
	value: boolean;
	onChange: (value: boolean) => Promise<void> | void;
	lightColor?: string;
	darkColor?: string;
};
export default function ThemedSwitch({
	switchText,
	value,
	onChange,
	style,
	lightColor,
	darkColor,
	...rest
}: ThemedSwitchProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'lightBackground'
	);
	const colorScheme = useColorScheme();

	return (
		<ThemedView style={styles.switchContainer}>
			<ThemedText>{switchText}</ThemedText>
			<Switch
				// @ts-ignore
				value={isNaN(value) ? value : value == 1 ? true : false}
				onValueChange={onChange}
				{...rest}
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				thumbColor={value ? Colors.dark.tint : undefined}
				style={[style]}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	switchContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
