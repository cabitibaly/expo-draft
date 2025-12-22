import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, ReactNode, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export interface CustomBottomSheetProps {
    children: ReactNode;
    snapPoints?: (string | number)[];
    enablePanDownToClose?: boolean;
    backdropComponent?: boolean;
    onClose?: () => void;
}

export interface CustomBottomSheetRef {
    close: () => void;
    open: () => void;
    snapToIndex: (index: number) => void;
}

const CustomBottomSheet = forwardRef<CustomBottomSheetRef, CustomBottomSheetProps>(({
    children,
    snapPoints = ['25%', '50%', '75%'],
    enablePanDownToClose = true,
    backdropComponent = true,
    onClose,
}, ref) => {    

    const bottomSheetRef = useRef<BottomSheetModal>(null)

    useImperativeHandle(ref, () => ({
        open: () => bottomSheetRef.current?.present(),
        close: () => bottomSheetRef.current?.dismiss(),
        snapToIndex: (index: number) => bottomSheetRef.current?.snapToIndex(index),
    }));

    const snapPointsMemo = useMemo(() => snapPoints, [snapPoints])

    const renderBackDrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.7}
        />
    )

    return (        
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPointsMemo}
            enablePanDownToClose={enablePanDownToClose}
            backdropComponent={backdropComponent ? renderBackDrop : undefined}
            onDismiss={onClose}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.handleIndicator}
        >
            <View style={styles.contentContainer}>
                {children}
            </View>
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handleIndicator: {
        backgroundColor: '#D1D5DB',
        width: 40,
        height: 4,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
})

CustomBottomSheet.displayName = 'CustomBottomSheet'

export default CustomBottomSheet