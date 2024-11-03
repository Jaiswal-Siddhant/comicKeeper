import React, {
	useCallback,
	useRef,
	useImperativeHandle,
	forwardRef,
	ReactNode,
	useState,
	useEffect,
} from 'react';
import { View, StyleSheet, Button, BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from './ThemedView';
import { Colors } from '@/constants/Colors';

interface CustomBottomSheetProps {
	children: ReactNode;
}

export interface CustomBottomSheetRef {
	present: () => void;
	close: () => void;
}

const CustomBottomSheet = forwardRef<
	CustomBottomSheetRef,
	CustomBottomSheetProps
>(({ children }, ref) => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [isOpen, setIsOpen] = useState(false);

	// methods
	const present = useCallback(() => {
		setIsOpen(true);
		bottomSheetModalRef.current?.present();
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
		bottomSheetModalRef.current?.dismiss();
	}, []);

	// expose present and close methods to parent
	useImperativeHandle(ref, () => ({
		present,
		close,
	}));

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				if (isOpen) {
					close();
					return true;
				}
				return false;
			}
		);

		return () => backHandler.remove();
	}, [isOpen]);

	return (
		<View
			style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				height: '100%',
			}}>
			<View style={styles.bottomSheetContainer}>
				<BottomSheetModalProvider>
					<View style={styles.bottomSheetContainer}>
						<BottomSheetModal
							ref={bottomSheetModalRef}
							snapPoints={['100%']}
							backgroundStyle={{
								backgroundColor: Colors.dark.textSecondary,
							}}
							enableDynamicSizing={false}
							enableOverDrag={false}
							// onChange={handleSheetChanges}
						>
							<BottomSheetView style={styles.contentContainer}>
								<ThemedView style={styles.childrenContainer}>
									{children}
								</ThemedView>
							</BottomSheetView>
						</BottomSheetModal>
					</View>
				</BottomSheetModalProvider>
			</View>
		</View>
	);
});

const styles = StyleSheet.create({
	bottomSheetContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		// position: 'absolute',
		// zIndex: 10,
		bottom: 0,
		left: 0,
		right: 0,
		height: '100%',
	},
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		backgroundColor: 'grey',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		zIndex: 10,
		backgroundColor: 'white',
		// backgroundColor: Colors.dark.background,
	},
	childrenContainer: {
		display: 'flex',
		flex: 1,
		width: '100%',
		padding: 20,
	},
});

export default CustomBottomSheet;
