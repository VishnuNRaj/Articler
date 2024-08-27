import { signOut } from "next-auth/react"
import useRedirect from "./useRedirect";
import { useUser } from "@/app/UserContext";

export default function useLogout() {
        const redirect = useRedirect()
        const {setUser} = useUser()
        const Logout = async () => {
        setUser(null)
        await signOut()
        await redirect({path:"/login"})
    }
    return Logout;
}