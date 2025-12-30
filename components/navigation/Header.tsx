import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/search/SearchInput";
import Link from "next/link";
import UserDropdown from "@/components/dropdown/UserDropdown";
interface HeaderProps {
  username: string
  avatar: string | null
}

export function Header({ username, avatar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchInput
              placeholder="Search posts, users, hashtags..."
              className="w-full"
            />
          </div>

          <div className="flex items-center hover:bg-transparent">
            <UserDropdown username={username} avatar={avatar} />
          </div>
        </div>
      </div>
    </header>
  );
}
