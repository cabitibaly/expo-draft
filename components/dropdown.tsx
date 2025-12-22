import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface DropdownProps {
    setType: React.Dispatch<React.SetStateAction<string>>;
    type: string;
}

const typeConge = [
    "Congé exceptionnel",
    "Congé maladie",
    "Congé maternité",
    "Congé paternité",
    "Congé de formation",
    "Congé de sabbatique",
]

const Dropdown = ({type, setType}: DropdownProps) => {
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

    const handleChangeType = (selectedType: string) => {
        setType(selectedType);
        handleClose();
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
                className='p-3 rounded-xl bg-turquoise-5/50 w-full flex-row items-center justify-between gap-3'
            >                
                <Text className='text-xl text-gris-12 font-medium'>{ type || 'Selectionner un type' }</Text>
                <ChevronDown size={24} color={isActive ? '#30CFD0' : '#EEEEF0'} style={{transform: [{rotate: isActive ? '180deg' : '0deg'}]}} />
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
                    <ScrollView 
                        className="absolute top-16 left-0 bg-turquoise-5 rounded-xl px-2 z-50 w-full h-48 gap-1"
                        horizontal={false}
                        style={{paddingBottom: 8}}                    
                    >
                        {
                            typeConge.map((typeC, index) => (
                                <Pressable 
                                    key={index}
                                    style={{
                                        backgroundColor: typeC === type ? '#005758' : 'transparent',
                                        marginBottom: index === typeConge.length - 1 ? 8 : 0,
                                        marginTop: index === 0 ? 8 : 0,
                                    }}
                                    className='rounded-lg py-1.5 px-3 w-full mb-1'
                                    onPress={() => handleChangeType(typeC)}
                                >
                                    <Text className='text-gris-12 text-xl font-medium' >{typeC}</Text>
                                </Pressable>
                            ))
                        }
                    </ScrollView>
                </>
            )}
        </View>
    )
}

export default Dropdown