import { requestNotificationPermission } from '@/utils/notification';
import { makePermissionAsked } from '@/utils/storage';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LocationIcon from './locationIcon';

interface NotificationPermissionProps {
    onClose: () => void;
}

const LocationPermission = ({ onClose }: NotificationPermissionProps) => {
    
    const handleAllow = async () => {
        const granted = await requestNotificationPermission()
        await makePermissionAsked();

        onClose();

        if (granted) {
            Toast.show({
                type: 'success',
                text1: 'Autorisation',
                text2: `Vous avez autorisé Attendify à vous envoyer des notifications importantes.`,
            });
            
        } else {
            Toast.show({
                type: 'error',
                text1: 'Autorisation',
                text2: `Vous n'avez pas autorisé Attendify à vous envoyer des notifications importantes.`,
            });
        }        
    }

    return (
        <BottomSheetView
            className="px-6 py-10"
            style={{ paddingBottom: 16 }}
        >
            <View className='w-full flex-col items-center justify-between gap-6'>
                <View className='size-20 bg-turquoise-8 rounded-full items-center justify-center'>
                    <LocationIcon size={28} color="#EEEEF0" />
                </View>
                <View className='w-full flex-col items-center justify-center gap-4'>
                    <Text className='text-gris-1 text-3xl text-center font-bold'>Activer la localisation</Text>
                    <Text className='text-gris-1 text-xl text-center font-normal'>
                        Autorisez Attendify à acceder à votre position. Il sera utilisé lors de l&apos;enregistrement de vos sites.
                    </Text>
                </View>
                <View className='w-full flex-col items-center justify-center gap-1'>
                    <TouchableOpacity onPress={handleAllow} activeOpacity={0.8} className="p-4 w-full rounded-full bg-turquoise-8 items-center justify-center">
                        <Text className="text-gris-12 text-xl font-medium">Autoriser</Text>
                    </TouchableOpacity>               
                    <TouchableOpacity onPress={onClose} activeOpacity={0.8} className="p-4 w-full rounded-full bg-transparent items-center justify-center">
                        <Text className="text-gris-11 text-xl font-medium">Plus tard</Text>
                    </TouchableOpacity>
                </View>                               
            </View>
        </BottomSheetView>
    )
}

export default LocationPermission