import { Directory, File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ACCESS_TOKEN = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXNhdGV1cklEIjoxLCJlbWFpbCI6ImNvcnZ1c0BqaXl1dS5jb20iLCJ0ZWxlcGhvbmUiOiI2NDE0MTUyNSIsInJvbGVJRCI6MSwianRpIjoiY2IzOGVjZjktNjZlZC00OTQ2LTgyM2QtMzhkMWVkNTEyMDYyIiwiZXhwIjoxNzY4NDczMDk4LCJpYXQiOjE3NjgzODY2OTh9.eYlDgysSr4L9TtB7UAIJfnFMfz6bK9fLW7bZGd9IOYU";

export const downloadfile = async () => {
    const url = 'http://192.168.11.101:8080/pointage/export?debut=2026-01-01T00:00:00.000Z&fin=2026-01-31T00:00:00.000Z';

    try {        
        const cacheDir = new Directory(Paths.cache, 'temp');
        cacheDir.delete();
        cacheDir.create();

        const tempFile = await File.downloadFileAsync(url, cacheDir, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            }
        });
        await Sharing.shareAsync(tempFile.uri);

        tempFile.delete();
    } catch (error: any) {        
        console.error("une erreur est survenue: ", error.message?.includes('status: 401'));
    }
}