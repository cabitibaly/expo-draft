import { requestCameraPermission } from '@/utils/camera';
import { makePermissionAsked } from '@/utils/storage';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Camera } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface CameraPermissionProps {
    onClose: () => void;
}

const CameraPermission = ({ onClose }: CameraPermissionProps) => {
    
    const handleAllow = async () => {
        const granted = await requestCameraPermission();
        await makePermissionAsked('CAMERA_PERMISSION_kEY');

        onClose();

        if (granted) {
            Toast.show({
                type: 'success',
                text1: 'Autorisation',
                text2: `Vous avez autorisé Attendify à utiliser votre camera.`,
            });
            
        } else {
            Toast.show({
                type: 'error',
                text1: 'Autorisation',
                text2: `Vous n'avez pas autorisé Attendify à utiliser votre camera.`,
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
                    <Camera size={28} color="#EEEEF0" />
                </View>
                <View className='w-full flex-col items-center justify-center gap-4'>
                    <Text className='text-gris-1 text-3xl text-center font-bold'>Activer l'accès à la caméra</Text>
                    <Text className='text-gris-1 text-xl text-center font-normal'>
                        Autorisez Attendify à utiliser votre caméra.
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

export default CameraPermission