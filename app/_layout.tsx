import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';
import "../global";

import "../global.css";

const RootLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Stack>
                    <Stack.Screen name="index" options={{headerShown: false}} />
                    <Stack.Screen name="form" options={{headerShown: false}} />
                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

export default RootLayout