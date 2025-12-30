"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
    itemType: "post" | "comment" | "reply";
    itemContent?: string;
}

export function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    isDeleting,
    itemType,
    itemContent,
}: DeleteConfirmationModalProps) {
    const getTitle = () => {
        switch (itemType) {
            case "post":
                return "Delete Post";
            case "comment":
                return "Delete Comment";
            case "reply":
                return "Delete Reply";
            default:
                return "Delete Item";
        }
    };

    const getDescription = () => {
        const baseText = `Are you sure you want to delete this ${itemType}?`;
        const warningText = "This action cannot be undone.";
        return `${baseText} ${warningText}`;
    };

    const truncateContent = (content: string, maxLength: number = 100) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <Trash2 className="w-5 h-5" />
                        {getTitle()}
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        {getDescription()}
                    </DialogDescription>
                </DialogHeader>

                {itemContent && (
                    <div className="bg-gray-50 p-3 rounded-md border-l-4 border-gray-300">
                        <p className="text-sm text-gray-700 italic">
                            "{truncateContent(itemContent)}"
                        </p>
                    </div>
                )}

                <DialogFooter className="flex gap-2 sm:gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}