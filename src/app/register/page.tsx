import RegisterComponent from "@/components/Register/RegisterComponent";
import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession()
    console.log(session)
    return <RegisterComponent />
}