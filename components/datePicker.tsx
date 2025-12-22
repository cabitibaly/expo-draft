import React, { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import CalendarIcon2 from './calendarIcon2';
import CustomCalendar from './customCalendar';

interface DatePickerProps {
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    selectedDate: string;
}

const DatePicker = ({selectedDate, setSelectedDate}: DatePickerProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleClick = () => {
        setIsActive(!isActive);
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
        setIsActive(false);
    }

    return (
        <View className='relative w-full'>
            <TouchableOpacity 
                onPress={() => handleClick()} 
                activeOpacity={0.8} 
                style={{
                    borderStyle: 'solid', 
                    borderWidth: 1,
                    borderColor: `${isActive ? '#30CFD0' : "transparent"}`
                }} 
                className='p-3 rounded-xl bg-turquoise-5/50 w-full flex-row items-center justify-start gap-3'
            >
                <CalendarIcon2 size={28} color='#008384' />
                <Text className='text-xl text-gris-12 font-medium'>{ selectedDate ? new Date(selectedDate).toLocaleDateString("fr-FR") : 'Selectionner une date' }</Text>
            </TouchableOpacity>

            {visible && (
                <>
                    <Pressable
                        style={{
                        position: 'absolute',
                        top: -1000,
                        left: -1000,
                        right: -1000,
                        bottom: -1000,
                        zIndex: 40,
                        }}
                        onPress={() => handleClose()}
                    />                
                    <View className="absolute top-16 left-0 z-50 w-full">
                        <CustomCalendar
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            handleClose={handleClose}
                        />
                    </View>
                </>
            )}
        </View>
    )
}

export default DatePicker