import CustomDateTimePicker from '@/components/date-time-picker';
import DatePicker from '@/components/datePicker';
import Dropdown from '@/components/dropdown';
import FileUpdoald from '@/components/fileUpdoald';
import ImagePicker from '@/components/imagePicker';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';

const Form = () => {    
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedDate2, setSelectedDate2] = useState<string>("");
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [time, setTime] = useState<Date>(new Date());
    const [image, setImage] = useState<string>("");

    const defaultTimeFormat = (h: number, m: number): Date => {
        const date = new Date();
        date.setHours(h, m, 0, 0);
        return date;
    }    

    return (
        <ImageBackground
            source={require("../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-28 flex-1 items-center justify-center gap-6"
        >
            <ImagePicker />
            <CustomDateTimePicker onDateChange={setTime} defaultTime={defaultTimeFormat(8, 0)} />
            <DatePicker setSelectedDate={setSelectedDate2} selectedDate={selectedDate2} />                       
            <Dropdown setType={setSelectedDate} type={selectedDate} />                       
            <FileUpdoald file={file} setFile={setFile} />

        </ImageBackground>
    )
}

export default Form