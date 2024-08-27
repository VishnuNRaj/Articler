
import app from "@/database/Firebase";
import { getStorage } from "firebase/storage"
export const storage = getStorage(app,"gs://articler-ca625.appspot.com");
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadFile(file: File): Promise<string | null> {
    try {
        const fileRef = ref(storage, `articles/${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (e) {
        console.log(e)
        return null
    }
}
