"use client";

import { Bell, Heart, Repeat2, MessageCircle, UserPlus, Settings, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-gray-600" />
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="follows">Follows</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {mockNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md cursor-pointer ${!notification.read ? 'ring-2 ring-blue-100 bg-blue-50/30' : ''
                }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Notification Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationBg(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      {/* User Avatar */}
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={notification.user.avatar || "/globe.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                          {notification.user.name[0]}
                        </AvatarFallback>
                      </Avatar>

                      {/* Notification Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-semibold text-gray-900">
                            {notification.user.name}
                          </span>
                          <span className="text-gray-600 ml-1">
                            {notification.content}
                          </span>
                        </p>

                        {/* Original Post */}
                        {notification.post && (
                          <div className="mt-2 p-2 bg-gray-50 rounded-lg border-l-2 border-gray-200">
                            <p className="text-sm text-gray-700 italic">
                              "{notification.post}"
                            </p>
                          </div>
                        )}

                        {/* Comment Content */}
                        {notification.comment && (
                          <div className="mt-2 p-2 bg-purple-50 rounded-lg border-l-2 border-purple-200">
                            <p className="text-sm text-gray-700">
                              "{notification.comment}"
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4 mt-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No mentions yet</p>
              <p className="text-sm text-gray-400 mt-2">
                When someone mentions you, it will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4 mt-6">
          {mockNotifications
            .filter(n => ['like', 'repost', 'comment'].includes(n.type))
            .map((notification) => (
              <Card key={notification.id} className="transition-all hover:shadow-md cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationBg(notification.type)}`}>
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
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="follows" className="space-y-4 mt-6">
          {mockNotifications
            .filter(n => n.type === 'follow')
            .map((notification) => (
              <Card key={notification.id} className="transition-all hover:shadow-md cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-blue-500" />
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={notification.user.avatar || "/globe.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
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
                    <Button size="sm" variant="outline">
                      Follow Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}