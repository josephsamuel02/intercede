import { useState } from "react";
import { Button } from "../../components/ui/Button";
import {
    HandThumbUpIcon,
    HandThumbDownIcon,
    ArrowUturnLeftIcon
} from "@heroicons/react/24/outline";
import {
    HandThumbUpIcon as HandThumbUpSolid,
    HandThumbDownIcon as HandThumbDownSolid
} from "@heroicons/react/24/solid";
import { cn } from "../../lib/utils";

export interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    time: string;
    likes: number;
    dislikes: number;
    isLiked?: boolean;
    isDisliked?: boolean;
    replies?: Comment[];
}

interface CommentSectionProps {
    postId: number;
    comments: Comment[];
}

const CommentItem: React.FC<{ comment: Comment; onReply: (id: number, content: string) => void }> = ({ comment, onReply }) => {
    const [isLiked, setIsLiked] = useState(comment.isLiked || false);
    const [isDisliked, setIsDisliked] = useState(comment.isDisliked || false);
    const [likes, setLikes] = useState(comment.likes);
    const [dislikes, setDislikes] = useState(comment.dislikes);
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const handleLike = () => {
        if (isLiked) {
            setLikes(l => l - 1);
            setIsLiked(false);
        } else {
            setLikes(l => l + 1);
            setIsLiked(true);
            if (isDisliked) {
                setDislikes(d => d - 1);
                setIsDisliked(false);
            }
        }
    };

    const handleDislike = () => {
        if (isDisliked) {
            setDislikes(d => d - 1);
            setIsDisliked(false);
        } else {
            setDislikes(d => d + 1);
            setIsDisliked(true);
            if (isLiked) {
                setLikes(l => l - 1);
                setIsLiked(false);
            }
        }
    };

    const handleSubmitReply = () => {
        if (!replyContent.trim()) return;
        onReply(comment.id, replyContent);
        setReplyContent("");
        setIsReplying(false);
    };

    return (
        <div className="flex gap-3 group">
            <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-secondary-foreground font-bold text-xs mt-1">
                {comment.avatar.startsWith("http") ? <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover rounded-full" /> : comment.avatar}
            </div>
            <div className="flex-1">
                <div className="bg-muted/30 rounded-2xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-1 ml-2">
                    <button
                        onClick={handleLike}
                        className={cn("flex items-center gap-1 text-xs font-medium transition-colors hover:text-primary", isLiked ? "text-primary" : "text-muted-foreground")}
                    >
                        {isLiked ? <HandThumbUpSolid className="h-3.5 w-3.5" /> : <HandThumbUpIcon className="h-3.5 w-3.5" />}
                        {likes > 0 && <span>{likes}</span>}
                        <span className="sr-only">Like</span>
                    </button>
                    <button
                        onClick={handleDislike}
                        className={cn("flex items-center gap-1 text-xs font-medium transition-colors hover:text-destructive", isDisliked ? "text-destructive" : "text-muted-foreground")}
                    >
                        {isDisliked ? <HandThumbDownSolid className="h-3.5 w-3.5" /> : <HandThumbDownIcon className="h-3.5 w-3.5" />}
                        {dislikes > 0 && <span>{dislikes}</span>}
                        <span className="sr-only">Dislike</span>
                    </button>
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowUturnLeftIcon className="h-3.5 w-3.5" />
                        Reply
                    </button>
                </div>

                {/* Reply Input */}
                {isReplying && (
                    <div className="mt-2 flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-bold text-[10px]">
                            U
                        </div>
                        <div className="flex-1 space-y-2">
                            <textarea
                                autoFocus
                                className="w-full bg-background border border-input rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary min-h-[60px]"
                                placeholder={`Reply to ${comment.author}...`}
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <Button size="sm" variant="ghost" onClick={() => setIsReplying(false)}>Cancel</Button>
                                <Button size="sm" onClick={handleSubmitReply} disabled={!replyContent.trim()}>Reply</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-border space-y-3">
                        {comment.replies.map(reply => (
                            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments: initialComments }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");

    const handlePostComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Number(`${postId}${Date.now()}`),
            author: "You",
            avatar: "U",
            content: newComment,
            time: "Just now",
            likes: 0,
            dislikes: 0,
            replies: []
        };

        setComments((prev) => [comment, ...prev]);
        setNewComment("");
    };

    // Helper to deeply add a reply
    const addReply = (targetId: number, content: string) => {
        const newReply: Comment = {
            id: Number(`${postId}${Date.now()}${Math.floor(Math.random() * 1000)}`),
            author: "You",
            avatar: "U",
            content: content,
            time: "Just now",
            likes: 0,
            dislikes: 0
        };

        const updateComments = (list: Comment[]): Comment[] => {
            return list.map(c => {
                if (c.id === targetId) {
                    return { ...c, replies: [...(c.replies || []), newReply] };
                }
                if (c.replies) {
                    return { ...c, replies: updateComments(c.replies) };
                }
                return c;
            });
        };

        setComments(prev => updateComments(prev));
    };

    return (
        <div className="space-y-6">
            {/* Input Area */}
            <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-bold text-sm">
                    U
                </div>
                <div className="flex-1 space-y-2">
                    <textarea
                        className="w-full bg-muted/50 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-input transition-all resize-none min-h-[80px]"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <Button size="sm" onClick={handlePostComment} disabled={!newComment.trim()}>Post Comment</Button>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} onReply={addReply} />
                ))}
                {comments.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to say something!</p>
                )}
            </div>
        </div>
    );
};
