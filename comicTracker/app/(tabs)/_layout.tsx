import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					backgroundColor:
						Colors[colorScheme ?? 'light'].lightBackground,
					paddingBottom: 3,
				},
				tabBarVisibilityAnimationConfig: {
					hide: {
						animation: 'timing',
						config: {
							duration: 0,
						},
					},
				},
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'ComicKeeper',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='explore'
				options={{
					title: 'Browse',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={'search'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: 'Settings',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'settings' : 'settings-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
