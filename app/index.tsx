import CustomBottomSheet, { CustomBottomSheetRef } from "@/components/customBottomSheet";
import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useRef, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const Index = () => {
    const [selected, setSelected] = useState<string>('');  
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    
    return (
        <ImageBackground
            source={require("../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 flex-1 items-center justify-center gap-6"
        >
            <View className='w-full'>
                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: {
                            selected: true, 
                            disableTouchEvent: true,
                            selectedColor: "#008384"                            
                        }
                    }}
                    style={{
                        backgroundColor: "rgba(0, 72, 73, 0.4)",  
                        borderRadius: 12,
                    }}
                    theme={{                        
                        backgroundColor: "transparent",
                        calendarBackground: "transparent",
                        textSectionTitleColor: "#EEEEF0",
                        todayTextColor: '#008384',
                        textDisabledColor: '#5F606A',
                        monthTextColor: '#EEEEF0',
                        dayTextColor: '#EEEEF0',
                        textDayFontWeight: "medium",
                        textMonthFontWeight: "medium",                        
                    }}
                    renderArrow={(direction) => (
                        direction === "left" ? 
                            (
                                <View className='size-6 bg-turquoise-8 rounded-full items-center justify-center'>
                                    <ChevronLeft strokeWidth={1.5} size={20} color="#EEEEF0" />
                                </View>
                            )
                        :
                            (
                                <View className='size-6 bg-turquoise-8 rounded-full items-center justify-center'>
                                    <ChevronRight strokeWidth={1.5} size={20} color="#EEEEF0" />
                                </View>
                            )  
                    )}
                />
            </View>
            <TouchableOpacity onPress={() => {bottomSheetRef.current?.open(); console.log('ouvert')}}  activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">
                <Text className="text-gris-12 text-xl font-semibold">Bottom sheet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/form")}  activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">
                <Text className="text-gris-12 text-xl font-semibold">Form</Text>
            </TouchableOpacity>
            <CustomBottomSheet 
                ref={bottomSheetRef}
                snapPoints={['25%', '50%', '90%']}
                onClose={() => console.log('Fermé')}
            >
                <Text>Contenu du bottom sheet</Text>
            </CustomBottomSheet>
        </ImageBackground>
    )
}

export default Index