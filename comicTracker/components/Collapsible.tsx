import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';

export function Collapsible({
	children,
	title,
}: PropsWithChildren & { title: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const rotationAnimation = useSharedValue(0);
	const theme = useColorScheme() ?? 'light';

	const handleAccordionOpen = () => {
		rotationAnimation.value = withSequence(
			withTiming(100, { duration: 450 })
		);
	};

	const handleAccordionClose = () => {
		rotationAnimation.value = withTiming(0, { duration: 450 });
	};

	const animatedStyle = useAnimatedStyle(() => ({
		height:
			rotationAnimation.value == 100 ? `auto` : rotationAnimation.value,
	}));

	const handleClick = () => {
		if (!isOpen) {
			handleAccordionClose();
		} else {
			handleAccordionOpen();
		}
	};

	useEffect(() => {
		handleClick();
	}, [isOpen]);

	return (
		<ThemedView>
			<Animated.View>
				<TouchableOpacity
					style={styles.heading}
					onPress={() => setIsOpen((value) => !value)}
					activeOpacity={0.8}>
					<Ionicons
						name={
							isOpen ? 'chevron-down' : 'chevron-forward-outline'
						}
						size={18}
						color={
							theme === 'light'
								? Colors.light.icon
								: Colors.dark.icon
						}
					/>
					<ThemedText type='defaultSemiBold'>{title}</ThemedText>
				</TouchableOpacity>
			</Animated.View>
			<Animated.View style={animatedStyle}>
				{isOpen && (
					<ThemedView style={styles.content}>{children}</ThemedView>
				)}
			</Animated.View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	heading: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	content: {
		marginTop: 6,
		marginLeft: 24,
	},
});
