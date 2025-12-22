import * as DocumentPicker from 'expo-document-picker';
import { FileUp, X } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PDFIcon from './pdfIcon';

interface FileUpdoaldProps {
    file: DocumentPicker.DocumentPickerAsset | null;
    setFile: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset | null>>;
}

const FileUpdoald = ({file, setFile}: FileUpdoaldProps) => {

    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: false,
            multiple: false,
        })

        if (!result.canceled) {
            setFile(result.assets[0]);
        }
    }

    const removeFile = () => {
        setFile(null);
    }

    return (
        <View className='w-full p-4 bg-turquoise-5/50 rounded-xl flex-col items-center justify-center gap-3'>
            <TouchableOpacity
                onPress={pickFile}
                activeOpacity={0.9}
                style={{
                    borderStyle: 'dashed', 
                    borderWidth: 1,
                    borderColor: '#30CFD0'
                }}
                className='w-full  rounded-xl p-8 flex-col items-center justify-center gap-2'
            >
                <FileUp size={32} color='#FF1474' />
                <View className='flex-col items-center justify-center gap-0'>
                    <Text className='text-xl text-gris-12 font-medium'>Selectionner un fichier</Text>
                    <Text className='text-base text-gris-10'>pdf uniquement (5mb max)</Text>
                </View>            
            </TouchableOpacity>
            {   
                file != null && 
                <>
                    <View className='p-3 rounded-xl bg-turquoise-6/80 w-full flex-col items-center justify-center gap-3'>
                        <View className='w-full flex-row items-center justify-between gap-2'>
                            <View className='flex-row items-center justify-start gap-2'>
                                <PDFIcon />
                                <View className='flex-col items-start justify-start gap-0'>
                                    <Text className='text-base text-gris-12 font-regukar line-clamp-1'>{file.name}</Text>
                                    <Text className='text-base text-gris-10 font-medium'>{file.size && (file.size / (1024 * 1024)).toFixed(2)} MB</Text>
                                </View>
                            </View>                    
                            <TouchableOpacity onPress={removeFile} activeOpacity={0.6}>
                                <X strokeWidth={1.5} size={28} color='#FF1474' />
                            </TouchableOpacity>   
                        </View>
                        <View style={{borderRadius: 10}} className='bg-gris-11 w-full h-2'>
                            <View className='bg-vert h-full' style={{width: "30%", borderRadius: 10}} />
                        </View>                             
                    </View>
                    <TouchableOpacity activeOpacity={0.8} className='p-2.5 rounded-full bg-turquoise-7 w-full items-center justify-center'>
                        <Text className='text-xl text-gris-12 font-medium'>Téléverser</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}

export default FileUpdoald