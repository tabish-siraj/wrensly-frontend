import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToggleRepost } from "@/hooks/post/useToggleRepost";
import { Post } from "@/src/types";
import { RepeatIcon } from "lucide-react";
import { useState } from "react";

interface RepostProps {
    screen: string;
    post: Post;
}

export function Repost({ screen, post }: RepostProps) {
    const { mutate: toggleRepost } = useToggleRepost();
    const [content, setContent] = useState("");

    const handleRepost = () => {
        toggleRepost({ postId: post.id, isReposted: post.isReposted, screen });
    };

    const handleQuoteRepost = () => {
        toggleRepost({ postId: post.id, isReposted: post.isReposted, screen, content });
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex items-center gap-1 text-gray-500 hover:text-green-500 hover:bg-transparent transition-colors"
                    >
                        <RepeatIcon className={`${post.isReposted ? "text-green-500" : "text-gray-500"}`} />
                        <span className="text-sm text-gray-700">{post.stats.reposts}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleRepost}>Repost</DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Quote Repost</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a quote to your repost</DialogTitle>
                </DialogHeader>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
                <Button onClick={handleQuoteRepost}>Repost</Button>
            </DialogContent>
        </Dialog>
    );
}
