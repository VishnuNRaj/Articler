import axiosInstance from "@/config/axios";
import useLoading from "@/hooks/useLoading";
import { uploadFile } from "@/utils/FilesUpload";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function CustomToast({ file, onYes, onNo }: { file: File, onYes: () => void, onNo: () => void }) {
    return (
        <div className="w-full flex items-center justify-center h-auto">
            <div className="max-w-lg gap-3 w-full bg-background rounded-lg border-2 border-separate shadow-lg p-1 px-2 flex items-center justify-center">
                <div className="w-7 h-7 rounded-xl">
                    <Image alt="" src={URL.createObjectURL(file)} width={40} height={40} className="w-7 h-7" style={{ borderRadius: "9999px" }} />
                </div>
                <h1>Change profile</h1>
                <div className="w-auto flex flex-row gap-2 px-3">
                    <button onClick={onYes} className="px-2 p-1 flex-shrink-0 rounded-xl bg-foreground text-background shadow-lg border-2 border-muted">Change</button>
                    <button onClick={onNo} className="px-2 p-1 flex-shrink-0 rounded-xl bg-foreground text-background shadow-lg border-2 border-muted">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default function useProfileEdit() {
    const [image, setImage] = useState<File | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const toastIdRef = useRef<string | number | null>(null);

    const { loading, setLoading } = useLoading();

    const handleChange = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setImage(file);
        } else {
            toast.error("Select a valid profile image");
        }
    };

    const uploadImage = async () => {
        setLoading(true)
        toast.dismiss(toastIdRef.current as string | number)
        const id = toast.loading("Uploading, please wait...",);
        try {
            const url = await uploadFile(image as File);
            const response = await axiosInstance.patch("/profile/image", { url });
            if (response.status === 200) {
                toast.success("Profile changed successfully", { id: id });
            }
        } catch (e) {
            toast.error("Internal Server Error", { id });
        }
    };

    const cancelUpload = () => {
        if (toastIdRef.current) {
            toast.dismiss(toastIdRef.current);
            setImage(null);
        }
    };

    useEffect(() => {
        if (image && image.type.startsWith("image/")) {
            toastIdRef.current = toast.custom(
                (t) => <CustomToast file={image} onYes={uploadImage} onNo={cancelUpload} />,
                {
                    dismissible: false,
                    duration: 10000,
                    onAutoClose: cancelUpload,
                }
            );
        }
    }, [image]);

    return { handleChange, image, loading, imageRef };
}
