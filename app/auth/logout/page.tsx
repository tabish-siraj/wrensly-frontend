import useUserStore from "@/src/stores/userStore";
import { useEffect } from "react";

export default function LogoutPage() {
    const { clearUser } = useUserStore()
    useEffect(() => {
        clearUser()
    })
}
