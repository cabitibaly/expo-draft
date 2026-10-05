import { Camera } from 'expo-camera';

export const checkCameraPermission = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    return status === 'granted';
};

export const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        const result = await Camera.requestCameraPermissionsAsync();
        return result.status === 'granted';
    }

    return true;
}