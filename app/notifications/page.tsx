"use client";

import { Bell, Heart, Repeat2, MessageCircle, UserPlus, Settings, Filter, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const mockNotifications = [
  {
    id: 1,
    type: "like",
    user: { username: "sky_feather", name: "Sky Feather", avatar: null },
    content: "liked your post",
    time: "2 hours ago",
    post: "Just shipped a new feature! 🚀",
    read: false,
  },
  {
    id: 2,
    type: "repost",
    user: { username: "chirpy_chick", name: "Chirpy Chick", avatar: null },
    content: "reposted your post",
    time: "Yesterday",
    post: "Working on something exciting...",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: { username: "windy_wren", name: "Windy Wren", avatar: null },
    content: "started following you",
    time: "4 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "comment",
    user: { username: "stormy_stork", name: "Stormy Stork", avatar: null },
    content: "commented on your post",
    time: "30 minutes ago",
    post: "Great insights on React hooks!",
    comment: "This is really helpful, thanks for sharing!",
    read: false,
  },
  {
    id: 5,
    type: "mention",
    user: { username: "tech_eagle", name: "Tech Eagle", avatar: null },
    content: "mentioned you in a post",
    time: "1 hour ago",
    post: "Thanks to @you for the amazing tutorial!",
    read: false,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="w-5 h-5 text-red-500" />;
    case "repost":
      return <Repeat2 className="w-5 h-5 text-green-500" />;
    case "follow":
      return <UserPlus className="w-5 h-5 text-blue-500" />;
    case "comment":
      return <MessageCircle className="w-5 h-5 text-purple-500" />;
    case "mention":
      return <Bell className="w-5 h-5 text-orange-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

const getNotificationBg = (type: string) => {
  switch (type) {
    case "like":
      return "bg-red-50";
    case "repost":
      return "bg-green-50";
    case "follow":
      return "bg-blue-50";
    case "comment":
      return "bg-purple-50";
    case "mention":
      return "bg-orange-50";
    default:
      return "bg-gray-50";
  }
};

export default function NotificationsPage() {
  const router = useRouter();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="h-full">
      {/* Header - Fixed at top */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-gray-700" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-4">
        {/* Notification Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="follows">Follows</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            <div className="divide-y divide-gray-100">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`py-4 px-4 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg ${!notification.read ? 'bg-blue-50/50 border-l-4 border-blue-500' : ''
                    }`}
                >
                  <div className="flex gap-4">
                    {/* Notification Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationBg(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        {/* User Avatar */}
                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <AvatarImage src={notification.user.avatar || "/globe.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                            {notification.user.name[0]}
                          </AvatarFallback>
                        </Avatar>

                        {/* Notification Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-relaxed">
                            <span className="font-semibold text-gray-900">
                              {notification.user.name}
                            </span>
                            <span className="text-gray-600 ml-1">
                              {notification.content}
                            </span>
                          </p>

                          {/* Original Post */}
                          {notification.post && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-2 border-gray-200">
                              <p className="text-sm text-gray-700 italic">
                                "{notification.post}"
                              </p>
                            </div>
                          )}

                          {/* Comment Content */}
                          {notification.comment && (
                            <div className="mt-3 p-3 bg-purple-50 rounded-lg border-l-2 border-purple-200">
                              <p className="text-sm text-gray-700">
                                "{notification.comment}"
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-gray-500">
                              {notification.time}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentions" className="space-y-4 mt-6">
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No mentions yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                When someone mentions you in a post, it will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-3">
            <div className="divide-y divide-gray-100">
              {mockNotifications
                .filter(n => ['like', 'repost', 'comment'].includes(n.type))
                .map((notification) => (
                  <div key={notification.id} className="py-4 px-4 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationBg(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user.name}</span>
                          <span className="text-gray-600 ml-1">{notification.content}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="follows" className="space-y-3">
            <div className="divide-y divide-gray-100">
              {mockNotifications
                .filter(n => n.type === 'follow')
                .map((notification) => (
                  <div key={notification.id} className="py-4 px-4 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <UserPlus className="w-5 h-5 text-blue-500" />
                      </div>
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={notification.user.avatar || "/globe.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                          {notification.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user.name}</span>
                          <span className="text-gray-600 ml-1">{notification.content}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      <Button size="sm" variant="outline" className="hover:bg-gray-100">
                        Follow Back
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}