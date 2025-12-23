import CustomBottomSheet, { CustomBottomSheetRef } from "@/components/customBottomSheet";
import EmailIcon from "@/components/emailIcon";
import PhoneIcon from "@/components/phoneIcon";
import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

const Index = () => {
    const [nom, setNom] = useState("Santa");
    const [prenom, setPrenom] = useState("Dear");
    const [email, setEmail] = useState("santadear@gachiakuta.jp");
    const [telephone, setTelephone] = useState("+000 00 00 00 00");

    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);   
    const nomRef = useRef<TextInput>(null);
    const prenomRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const telephoneRef = useRef<TextInput>(null); 
    
    return (
        <ImageBackground
            source={require("../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 flex-1 items-center justify-center gap-6"
        >
            <TouchableOpacity onPress={() => {bottomSheetRef.current?.open()}}  activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">
                <Text className="text-gris-12 text-xl font-medium">Bottom sheet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/form")}  activeOpacity={0.8} className="p-3 w-full rounded-full bg-turquoise-8 items-center justify-center">
                <Text className="text-gris-12 text-xl font-medium">Form</Text>
            </TouchableOpacity>
            <CustomBottomSheet 
                ref={bottomSheetRef}
                onClose={() => console.log('Fermé')}
            >
                <BottomSheetScrollView 
                    className="px-4 py-2" 
                    keyboardShouldPersistTaps="handled" 
                    contentContainerStyle={{ paddingBottom: 8 }}
                    showsVerticalScrollIndicator={false}                    
                >
                    <View className="w-full flex-col items-center justify-start gap-6">
                        <Text className="text-gris-1 text-2xl font-medium">Modifier son compte</Text>
                        <View className="w-full flex-col items-center justify-start gap-8">
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Nom</Text>
                                <BottomSheetTextInput 
                                    ref={nomRef}
                                    value={nom} 
                                    onChangeText={setNom} 
                                    className='w-full bg-gris-11/30 px-4 py-4 rounded-2xl text-xl text-gris-1 font-medium' 
                                    placeholderTextColor={"#5F606A"} 
                                    placeholder='Saisir son nom' 
                                    returnKeyType="next"
                                    onSubmitEditing={() => prenomRef.current?.focus()}
                                />
                            </View>
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Prénom</Text>
                                <BottomSheetTextInput 
                                    ref={prenomRef}
                                    value={prenom} 
                                    onChangeText={setPrenom} 
                                    className='w-full bg-gris-11/30 px-4 py-4 rounded-2xl text-xl text-gris-1 font-medium' 
                                    placeholderTextColor={"#5F606A"} 
                                    placeholder='Saisir son prénom' 
                                    returnKeyType="next"
                                    onSubmitEditing={() => emailRef.current?.focus()}
                                />
                            </View>
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Email</Text>
                                <View className="bg-gris-11/30 rounded-2xl px-4 w-full flex-row items-center justify-between gap-2">
                                    <BottomSheetTextInput 
                                        ref={emailRef}
                                        value={email} 
                                        onChangeText={setEmail} 
                                        className='py-4 text-xl text-gris-1 font-medium flex-1' 
                                        placeholderTextColor={"#5F606A"} 
                                        placeholder='Saisir son email' 
                                        returnKeyType="next"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        onSubmitEditing={() => telephoneRef.current?.focus()}
                                    />
                                    <EmailIcon size={28} color="#5F606A" />
                                </View>                            
                            </View>
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Téléphone</Text>
                                <View className="bg-gris-11/30 rounded-2xl px-4 w-full flex-row items-center justify-between gap-2">
                                    <BottomSheetTextInput 
                                        ref={telephoneRef}
                                        value={telephone} 
                                        onChangeText={setTelephone} 
                                        className='py-4 text-xl text-gris-1 font-medium flex-1' 
                                        placeholderTextColor={"#5F606A"} 
                                        placeholder='Saisir son téléphone'
                                        keyboardType="phone-pad"
                                        returnKeyType="done"
                                    />
                                    <PhoneIcon size={28} color="#5F606A" />
                                </View>                            
                            </View>
                        </View>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            className='mb-6 px-4 py-5 w-full rounded-full bg-turquoise-8/70 items-center justify-center'
                        >
                            <Text className='text-xl text-gris-12 font-medium'>Soumettre la demande</Text>    
                        </TouchableOpacity>
                    </View>
                </BottomSheetScrollView>
            </CustomBottomSheet>
        </ImageBackground>
    )
}

export default Index