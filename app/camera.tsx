import { FlashAutoIcon } from '@/components/flashAutoIcon';
import { FlashOffIcon } from '@/components/flashOffIcon';
import { FlashOnIcon } from '@/components/flashOnIcon';
import { uploadHandler } from '@/utils/uploaderHandler';
import { CameraView, FlashMode } from 'expo-camera';
import { useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

const Camera = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [flashMode, setFlashMode] = useState<FlashMode>("auto");
    const cameraRef = useRef<CameraView>(null);

    const toggleFlashMode = () => {
        setFlashMode((current) => {
            if (current === "auto") return "on";
            if (current === "on") return "off";
            return "auto";
        });
    };

    const takePhoto = async () => {
        if (!cameraRef.current) return;

        setIsLoading(true);

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.5,                
            });
             
            await uploadHandler(photo.uri);
            console.log("Photo capturée :", photo?.uri);
        } catch (error) {
            console.error("Erreur lors de la capture :", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }} className="justify-center">
            <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing="back"
                flash={flashMode}
            />

            <View className="absolute bottom-16 w-full flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={toggleFlashMode}
                    activeOpacity={0.9}
                    className="absolute left-4"
                >
                    {flashMode === "auto" && (
                        <FlashAutoIcon color="#EEEEF0" size={32} />
                    )}

                    {flashMode === "on" && (
                        <FlashOnIcon color="#EEEEF0" size={32} />
                    )}

                    {flashMode === "off" && (
                        <FlashOffIcon color="#EEEEF0" size={32} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={takePhoto}
                    className="size-20 rounded-full border-2 border-gris-12 p-1"
                    activeOpacity={0.8}
                >
                    <View className="flex-1 rounded-full bg-gris-12" />
                </TouchableOpacity>
            </View>
            {
                isLoading &&
                <View className="bg-gris-1/70 absolute top-0 w-full h-full items-center justify-center">
                    <ActivityIndicator size="large" color="#EEEEF0" />
                </View> 
            }           
        </View>
    );
};

export default Camera