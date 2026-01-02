import CustomBottomSheet, { CustomBottomSheetRef } from "@/components/customBottomSheet";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Toast from "react-native-toast-message";

const Index = () => {
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    
    return (
        <ImageBackground
            source={require("../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 flex-1 items-center justify-center gap-6 bg-turquoise-2"
        >
            <TouchableOpacity onPress={() => {bottomSheetRef.current?.open()}}  activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">
                <Text className="text-gris-12 text-xl font-medium">Bottom sheet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/form")}  activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">
                <Text className="text-gris-12 text-xl font-medium">Form</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    Toast.show({
                        type: 'info',
                        text1: 'Pointage arrivée',
                        text2: `Vous avez pointé aujourd'hui à ${new Date().toLocaleTimeString()}`,                         
                    });
                }} 
                activeOpacity={0.8} 
                className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center"
            >
                <Text className="text-gris-12 text-xl font-medium">Toast</Text>
            </TouchableOpacity>
            <CustomBottomSheet 
                ref={bottomSheetRef}
                onClose={() => console.log('Fermé')}
            >
                <BottomSheetView>
                        <View className="w-full h-40 items-center justify-center">
                            <Text className="text-gris-1 text-2xl font-medium">Modifier son compte</Text>
                        </View>
                </BottomSheetView>                    
            </CustomBottomSheet>
        </ImageBackground>
    )
}

export default Index