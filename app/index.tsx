import CustomBottomSheet, { CustomBottomSheetRef } from "@/components/customBottomSheet";
import LocationPermission from "@/components/location-permission";
import NotificationPermission from "@/components/notification-permission";
import { downloadfile } from "@/utils/downloadFile";
import { checkNotificationPermisison } from "@/utils/notification";
import { hasPermissionBeenAsked } from "@/utils/storage";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const notifBottomSheetRef = useRef<CustomBottomSheetRef>(null);        
    const locationBottomSheetRef = useRef<CustomBottomSheetRef>(null);        

    useEffect(() => {        

        (
            async () => {
                const asked = await hasPermissionBeenAsked();
                const granted = await checkNotificationPermisison();                

                if (!asked && !granted) {
                    setTimeout(() => notifBottomSheetRef.current?.open(), 500);
                }
            }
        )()

    }, [])

    const handleClick = async () => {
        setIsLoading(true);        

        try {
            await downloadfile();
        } catch (error) {
            console.error("erreur: ", error);
        } finally {
            setIsLoading(false);
        }
    }    
    
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
                        type: 'success',
                        text1: 'Pointage arrivée',
                        text2: `Vous avez pointé aujourd'hui à ${new Date().toLocaleTimeString()}`,                         
                    });
                }} 
                activeOpacity={0.8} 
                className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center"
            >
                <Text className="text-gris-12 text-xl font-medium">Toast</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => notifBottomSheetRef.current?.open()}  activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">
                <Text className="text-gris-12 text-xl font-medium">Allow notification</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => locationBottomSheetRef.current?.open()}  activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">
                <Text className="text-gris-12 text-xl font-medium">Allow location</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClick} disabled={isLoading} activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">                
                {
                    isLoading ?
                        <ActivityIndicator size="small" color="#EEEEF0" />
                        :
                        <Text className="text-gris-12 text-xl font-medium">Download</Text>
                }
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
            <CustomBottomSheet 
                ref={notifBottomSheetRef}
                onClose={() => console.log('Fermé')}
                snapPoints={["47%"]}
            >   
                <NotificationPermission 
                    onClose={ () => {notifBottomSheetRef.current?.close()}}
                />
            </CustomBottomSheet>    
            <CustomBottomSheet 
                ref={locationBottomSheetRef}
                onClose={() => console.log('Fermé')}
                snapPoints={["47%"]}
            >   
                <LocationPermission 
                    onClose={ () => {locationBottomSheetRef.current?.close()}}
                />
            </CustomBottomSheet>    
        </ImageBackground>
    )
}

export default Index