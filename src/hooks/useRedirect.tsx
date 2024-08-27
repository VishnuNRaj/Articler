import { Redirects } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
export default function useRedirect(){
    const router = useRouter()
    const redirect = ({path}:Redirects) => {
        router.push(path);
        router.refresh()
        return;
    }
    return redirect;
}