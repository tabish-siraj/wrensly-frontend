'use client';

import { UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/src/stores/userStore';

const Sidebar = () => {
    const { clearUser: logout } = useUserStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <aside className="w-full h-full p-4 flex flex-col gap-4 sticky top-16">
            <button className="flex items-center gap-2 p-2 rounded hover:text-gray-800">
                <UserIcon /> Profile
            </button>
            <button className="flex items-center gap-2 p-2 rounded hover:text-gray-800">
                <SettingsIcon /> Settings
            </button>
            <button
                className="flex items-center gap-2 p-2 rounded hover:text-red-500 text-red-600"
                onClick={handleLogout}
            >
                <LogOutIcon /> Logout
            </button>
        </aside>
    );
};

export default Sidebar;