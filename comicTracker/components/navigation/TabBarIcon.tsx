// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { useColorScheme } from 'react-native';

export function TabBarIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
	const color = useColorScheme();

	return (
		<Ionicons
			size={28}
			style={[{ marginBottom: -3 }, style]}
			color={color === 'dark' ? 'white' : Colors.dark.textSecondary}
			{...rest}
		/>
	);
}
