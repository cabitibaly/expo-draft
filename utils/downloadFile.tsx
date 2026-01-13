import { Directory, File, Paths } from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';

export const downloadfile = async () => {
    const url = 'https://pdfobject.com/pdf/sample.pdf';

    try {
        // 1. Télécharger d'abord dans le cache
        const cacheDir = new Directory(Paths.cache, 'temp');
        cacheDir.create();
        const tempFile = await File.downloadFileAsync(url, cacheDir);
        
        // 2. Demander à l'utilisateur où sauvegarder (SAF)
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        
        if (permissions.granted) {
            const uri = permissions.directoryUri;
            
            // 3. Créer le fichier dans le dossier choisi
            const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
                uri,
                'sample.pdf',
                'application/pdf'
            );
            
            // 4. Copier le contenu
            const content = await FileSystem.readAsStringAsync(tempFile.uri, {
                encoding: FileSystem.EncodingType.Base64
            });
            
            await FileSystem.writeAsStringAsync(fileUri, content, {
                encoding: FileSystem.EncodingType.Base64
            });
            
            console.log('Fichier sauvegardé :', fileUri);            
            // 5. Nettoyer le cache
            await tempFile.delete();
        }
    } catch (error) {
        console.error(error);
    }
}