import { Directory, File, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

const ACCESS_TOKEN =
  "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXNhdGV1cklEIjoxLCJlbWFpbCI6ImNvcnZ1c0BqaXl1dS5jb20iLCJ0ZWxlcGhvbmUiOiI2NDE0MTUyNSIsInJvbGVJRCI6MSwianRpIjoiY2IzOGVjZjktNjZlZC00OTQ2LTgyM2QtMzhkMWVkNTEyMDYyIiwiZXhwIjoxNzY4NDczMDk4LCJpYXQiOjE3NjgzODY2OTh9.eYlDgysSr4L9TtB7UAIJfnFMfz6bK9fLW7bZGd9IOYU";

export const downloadfile = async () => {
    const url = "http://192.168.11.101:8080/pointage/export?debut=2026-01-01T00:00:00.000Z&fin=2026-01-31T00:00:00.000Z";

    try {
        const cacheDir = new Directory(Paths.cache, "temp");
        cacheDir.delete();
        cacheDir.create();

        const tempFile = await File.downloadFileAsync(url, cacheDir, {
            headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        await Sharing.shareAsync(tempFile.uri);

        tempFile.delete();
    } catch (error: any) {
        console.error(
            "une erreur est survenue: ",
            error.message?.includes("status: 401"),
        );
    }
};

const MIME_TYPES: { [key: string]: string } = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    mp4: "video/mp4",
    mp3: "audio/mpeg",
    zip: "application/zip",
};

const getMimeType = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    return MIME_TYPES[extension] || "application/octet-stream";
};

export const downloadAndOpenFile = async (
    url: string,
    onLoading?: (bool: boolean) => void,
): Promise<boolean> => {
    if (!url) return false;

    if (Platform.OS !== "android") {
        console.warn("IntentLauncher est disponible uniquement sur Android");
        return false;
    }

    onLoading?.(true);

    try {
        const fileName = url.split("/").pop() || "file";

        const cacheDir = new Directory(Paths.cache);
        const file = new File(cacheDir, fileName);
        if (file.exists) {
            file.delete();
            console.log("Ancien fichier supprimé");
        }

        const downloadResult = await File.downloadFileAsync(url, cacheDir);
        console.log("Fichier téléchargé:", downloadResult.uri);

        const contentUri = await FileSystem.getContentUriAsync(downloadResult.uri);
        console.log("Content URI:", contentUri);
        const mimeType = getMimeType(fileName);

        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: contentUri,
            flags: 1,
            type: mimeType,
        });

      return true;
    } catch (error) {
        console.log("Une erreur est survenue:", error);
        return false;
    } finally {
        onLoading?.(false);
    }
};
