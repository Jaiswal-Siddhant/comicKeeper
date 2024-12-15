import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemedText, ThemedView } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ComicDetail({ navigation }: any) {
	console.log({ navigation });
	return (
		<SafeAreaView>
			<ThemedView>
				<ThemedText>ComicDetail</ThemedText>
			</ThemedView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
