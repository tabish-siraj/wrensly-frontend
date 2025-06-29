import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
            </Link>
          </div>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 bg-gray-100 border-none rounded-full"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center">
            {/* <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Mail className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bookmark className="w-5 h-5" />
            </Button> */}

            <UserDropdown username={username} avatar={avatar} />

            {/* <Button variant="ghost" size="icon" className="md:hidden">
              <MoreHorizontal className="w-5 h-5" />
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
