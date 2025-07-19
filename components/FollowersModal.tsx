// "use client";

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { FC } from "react";

// interface FollowersModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const FollowersModal: FC<FollowersModalProps> = ({ isOpen, onClose }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Followers</DialogTitle>
//         </DialogHeader>

//         {/* Static followers for now */}
//         <div className="flex flex-col gap-4">
//           {[
//             { name: "Ali Raza", username: "ali_raza", image: "https://randomuser.me/api/portraits/men/32.jpg" },
//             { name: "Farah Khan", username: "farah_k", image: "https://randomuser.me/api/portraits/women/65.jpg" },
//           ].map((follower, index) => (
//             <div key={index} className="flex items-center gap-4">
//               <Avatar>
//                 <AvatarImage src={follower.image} alt={follower.name} />
//                 <AvatarFallback>{follower.name[0]}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-medium">{follower.name}</p>
//                 <p className="text-gray-500 text-sm">@{follower.username}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default FollowersModal;

// "use client";

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2 } from "lucide-react";
// import { FC } from "react";

// interface FollowingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const following = [
//   {
//     id: 1,
//     name: "Farah",
//     username: "farah_21",
//     image: "https://randomuser.me/api/portraits/women/12.jpg",
//     verified: true,
//   },
//   {
//     id: 2,
//     name: "Tabish",
//     username: "tabisht",
//     image: "https://randomuser.me/api/portraits/men/15.jpg",
//     verified: true,
//   },
//   {
//     id: 3,
//     name: "Zara Sheikh",
//     username: "zaras",
//     image: "https://randomuser.me/api/portraits/women/60.jpg",
//     verified: false,
//   },
//   {
//     id: 4,
//     name: "Imran Haider",
//     username: "imranh",
//     image: "https://randomuser.me/api/portraits/men/48.jpg",
//     verified: true,
//   },
//   {
//     id: 5,
//     name: "Sana Javed",
//     username: "sanaj",
//     image: "https://randomuser.me/api/portraits/women/68.jpg",
//     verified: false,
//   },
//   {
//     id: 6,
//     name: "Ali Raza",
//     username: "alirz",
//     image: "https://randomuser.me/api/portraits/men/27.jpg",
//     verified: false,
//   },
//   {
//     id: 7,
//     name: "Hina Khan",
//     username: "hinak",
//     image: "https://randomuser.me/api/portraits/women/43.jpg",
//     verified: true,
//   },
//   {
//     id: 8,
//     name: "Tariq Mehmood",
//     username: "tariqm",
//     image: "https://randomuser.me/api/portraits/men/33.jpg",
//     verified: false,
//   },
// ];

// const FollowingModal: FC<FollowingModalProps> = ({ isOpen, onClose }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md w-full rounded-xl p-0 overflow-hidden">
//         <DialogHeader className="border-b p-4">
//           <DialogTitle className="text-lg font-bold">Following</DialogTitle>
//         </DialogHeader>

//         <ScrollArea className="h-[400px] p-4">
//           {following.map((person) => (
//             <div key={person.id} className="flex items-center justify-between gap-3 mb-4">
//               <div className="flex items-center gap-3">
//                 <Avatar className="w-12 h-12">
//                   <AvatarImage src={person.image} alt={person.name} />
//                   <AvatarFallback>{person.name[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <div className="flex items-center gap-1">
//                     <p className="text-sm font-semibold">{person.name}</p>
//                     {person.verified && (
//                       <CheckCircle2 className="w-4 h-4 text-blue-500" />
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-500">@{person.username}</p>
//                 </div>
//               </div>
//               <Button size="sm" className="rounded-full px-4 text-xs">Following</Button>
//             </div>
//           ))}
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default FollowingModal;
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  type: "followers" | "following";
}

type User = {
  id: string;
  name: string;
  username: string;
  image: string;
  verified: boolean;
};

// 👉 Static mock data
const mockFollowers: User[] = [
    
 {
    id: "1",
    name: "Farah", 
    username: "farah_21",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    verified: true,
  },

  {
    id: "2",
    name: "Tabish",
    username: "tabisht",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    verified: true,
  },
  { id: "3", 
    name: "Amna", 
    username: "amna_x", 
    image: "https://randomuser.me/api/portraits/women/60.jpg", 
    verified: false },
];

const mockFollowing: User[] = [
  { id: "4", name: "Ali", username: "ali_writer", image: "", verified: true },
  { id: "5", name: "Sara", username: "sara_live", image: "", verified: false },
  { id: "6", name: "Usman", username: "usman007", image: "", verified: false },
];

const UserListModal: React.FC<UserListModalProps> = ({ isOpen, onClose, userId, type }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);

      // Simulating fetch
      setTimeout(() => {
        const data = type === "followers" ? mockFollowers : mockFollowing;
        setUsers(data);
        setLoading(false);
      }, 500);

      // 🔁 In future, replace this with:
      // fetch(`/api/${type}?userId=${userId}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setUsers(data);
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     console.error(`Error fetching ${type} list:`, err);
      //     setLoading(false);
      //   });
    }
  }, [isOpen, userId, type]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-xl p-0 overflow-hidden">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-lg font-bold capitalize">{type}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] p-4">
          {loading ? (
            <p className="text-center text-sm text-gray-500">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No {type} found.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={
                        user.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                      }
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold">{user.name}</p>
                      {user.verified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <Button size="sm" className="rounded-full px-4 text-xs">
                  {type === "followers" ? "Follow Back" : "Following"}
                </Button>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UserListModal;
