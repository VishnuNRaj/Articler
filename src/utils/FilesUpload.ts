import app from "@/database/Firebase";
import { getStorage, UploadMetadata } from "firebase/storage";
export const storage = getStorage(app, "gs://articler-ca625.appspot.com");
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadFile(file: File): Promise<string | null> {
    try {
        const fileRef = ref(storage, `articles/${Date.now()}-${file.name}`);
        const metadata:UploadMetadata = {
            contentType: file.type,
        };
        const response = await uploadBytes(fileRef, file, metadata);
        console.log(response)
        const url = await getDownloadURL(fileRef);
        console.log(url)
        return url;
    } catch (e) {
        console.log(e);
        return null;
    }
}
