import { uploadHandler } from '@/utils/uploaderHandler';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const ImagePicker = () => {
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset>()

    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: false,
            multiple: false,
        })

        if (!result.canceled) {
            setFile(result.assets[0]);
            uploadHandler(result.assets[0]);
        }
    }

    return (
        <View className='relative'>
            <TouchableOpacity onPress={pickFile} activeOpacity={0.8} className=' overflow-hidden size-32 rounded-full bg-turquoise-8 items-center justify-center'>
                {
                    file ?
                        <Image className='size-full' source={{ uri: file.uri }} />
                        : 
                        <Text className='text-gris-12 text-5xl font-bold'>
                            C
                        </Text>
                }            
            </TouchableOpacity>
            <View className='absolute bottom-0 right-4 size-6 bg-turquoise-8 rounded-full items-center justify-center'>
                <Camera strokeWidth={2.5} size={14} color={"#EEEEF0"} />
            </View>
        </View>
    )
}

export default ImagePicker