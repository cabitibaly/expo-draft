import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_PERMISSION_kEY = 'noficiation_permission_show'
const CAMERA_PERMISSION_kEY = 'camera_permission_show'

const STORAGE_KEYS = {
    NOTIFICATION_PERMISSION_kEY,
    CAMERA_PERMISSION_kEY
} as const;

export const makePermissionAsked = async (key: keyof typeof STORAGE_KEYS) => {
    await AsyncStorage.setItem(key, 'true');
}

export const hasPermissionBeenAsked = async (key: keyof typeof STORAGE_KEYS) => {
    const value = await AsyncStorage.getItem(NOTIFICATION_PERMISSION_kEY);
    return value === 'true';
}