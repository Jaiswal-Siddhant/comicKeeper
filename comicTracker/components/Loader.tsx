// @ts-ignore
import AnimatedLoader from 'react-native-animated-loader';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	Easing,
	withSequence,
} from 'react-native-reanimated';

interface Payload {
	label: string;
}

type Callback = (input: any) => void;

enum Events {
	Update,
	Dismiss,
}

/**
 * This is our event manager to emit custom event
 */
const EventManager = {
	eventList: new Map(),

	on: function (event: Events, callback: Callback) {
		this.eventList.set(event, callback);
		return this;
	},

	off: function (event: Events) {
		this.eventList.delete(event);
	},

	emit: function (event: Events, payload?: Payload) {
		if (this.eventList.has(event)) {
			console.log(`Event emitted: ${Events[event]}`, payload); // Debugging log
			this.eventList.get(event)?.(payload);
		}
	},
};

/**
 * This is the main component which keeps watching different events
 * And shows or hides itself or updates
 */
export const FullPageLoaderComponent: React.FC = () => {
	const [state, setMyState] = useState<{ show: boolean; label: string }>({
		show: false,
		label: '',
	});
	const opacity = useSharedValue(0);

	const setState = (newObj: { show?: boolean; label?: string }) => {
		setMyState((prev) => ({ ...prev, ...newObj }));
	};

	useEffect(() => {
		EventManager.on(Events.Update, (data) => {
			console.log('Update event received', data); // Debugging log
			opacity.value = withSequence(
				withTiming(0, {
					duration: 1500,
					easing: Easing.inOut(Easing.sin),
				}),
				withTiming(1, {
					duration: 1500,
					easing: Easing.inOut(Easing.sin),
				})
			);
			setState({ label: data?.label, show: true });
		});
		EventManager.on(Events.Dismiss, () => {
			console.log('Dismiss event received'); // Debugging log
			opacity.value = withSequence(
				withTiming(1, {
					duration: 300,
					easing: Easing.inOut(Easing.sin),
				}),
				withTiming(0, {
					duration: 300,
					easing: Easing.inOut(Easing.sin),
				})
			);
			setState({ show: false });
		});
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<Animated.View style={[animatedStyle, styles.overlay]}>
			<AnimatedLoader
				AnimatedLoader
				visible={state.show}
				overlayColor='rgba(255,255,255,0.75)'
				animationStyle={[
					styles.lottie,
					{ opacity: animatedStyle.opacity },
				]}
				source={require('../assets/lottie/loader.json')}
				speed={0.8}>
				<Animated.Text style={[{ fontWeight: '500', fontSize: 17 }]}>
					{state.label ?? 'Loading...'}
				</Animated.Text>
			</AnimatedLoader>
		</Animated.View>
	);
};

/**
 * These are exposed functions to deal with loader from outside of the component
 */
export const FullPageLoader = {
	open: function (payload?: Payload) {
		EventManager.emit(Events.Update, payload);
	},
	close: function () {
		EventManager.emit(Events.Dismiss);
	},
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slightly dark overlay
	},
	lottie: {
		width: 450,
		height: 450,
	},
});
