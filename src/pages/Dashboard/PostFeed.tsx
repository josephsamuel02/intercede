import React, { useState } from "react";
import {
    FiMessageCircle,
    FiHeart,
    FiShare2,
    FiMoreHorizontal
} from "react-icons/fi";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { CommentSection } from "./CommentSection";

interface Post {
    id: number;
    author: string;
    username: string;
    avatar: string;
    time: string;
    content: string;
    image?: string;
    likes: number;
    shares: number;
    comments: number;
}

interface PostFeedProps {
    posts: Post[];
}

const PostFeed: React.FC<PostFeedProps> = ({ posts }) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

    const toggleLike = (postId: number) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    // Sample comments (mock mechanism for now)
    const getMockComments = (postId: number) => [
        {
            id: postId * 100 + 1,
            author: "Alice Wonderland",
            avatar: "AW",
            content: "This is super cool! excited to see more.",
            time: "1h",
            likes: 12,
            dislikes: 0,
            isLiked: true,
            replies: [
                {
                    id: postId * 100 + 101,
                    author: "You",
                    avatar: "U",
                    content: "Thanks Alice! More coming soon.",
                    time: "55m",
                    likes: 2,
                    dislikes: 0
                }
            ]
        },
        {
            id: postId * 100 + 2,
            author: "Bob Builder",
            avatar: "BB",
            content: "Can we collaborate on this?",
            time: "30m",
            likes: 5,
            dislikes: 1,
            replies: []
        },
    ];

    return (
        <>
            <div className="space-y-4 p-4 pt-0">
                {posts.map((post, index) => (
                    <Card
                        key={post.id}
                        className="cursor-pointer hover:shadow-lg dark:hover:shadow-[#e68200]/10 transition-all animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-bold">
                                    {post.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-foreground">{post.author}</span>
                                        <span className="text-muted-foreground text-sm">{post.username}</span>
                                        <span className="text-muted-foreground text-sm">·</span>
                                        <span className="text-muted-foreground text-sm">{post.time}</span>
                                        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-muted-foreground hover:text-primary">
                                            <FiMoreHorizontal />
                                        </Button>
                                    </div>
                                    <p className="text-foreground mb-3 leading-relaxed">{post.content}</p>
                                    {post.image && (
                                        <div className="rounded-xl overflow-hidden mb-3 border border-border group">
                                            <img
                                                src={post.image}
                                                alt="Post"
                                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-6 text-muted-foreground">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedPost(post);
                                            }}
                                            className="flex items-center gap-2 hover:text-primary transition-all hover:scale-105"
                                        >
                                            <FiMessageCircle size={18} />
                                            <span className="text-sm font-medium">{post.comments}</span>
                                            <span className="text-sm hidden sm:inline">Comments</span>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleLike(post.id);
                                            }}
                                            className={`flex items-center gap-2 transition-all hover:scale-105 ${likedPosts.has(post.id)
                                                    ? 'text-red-500'
                                                    : 'hover:text-red-500'
                                                }`}
                                        >
                                            <FiHeart
                                                size={18}
                                                className={likedPosts.has(post.id) ? 'fill-current' : ''}
                                            />
                                            <span className="text-sm font-medium">
                                                {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                            </span>
                                            <span className="text-sm hidden sm:inline">Likes</span>
                                        </button>
                                        <button className="flex items-center gap-2 hover:text-primary transition-all hover:scale-105">
                                            <FiShare2 size={18} />
                                            <span className="text-sm font-medium">{post.shares || 0}</span>
                                            <span className="text-sm hidden sm:inline">Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
                title={selectedPost ? `Comments on ${selectedPost.author}'s post` : "Comments"}
                size="lg"
            >
                {selectedPost && (
                    <CommentSection
                        key={selectedPost.id}
                        postId={selectedPost.id}
                        comments={getMockComments(selectedPost.id)}
                    />
                )}
            </Modal>
        </>
    );
};

export default PostFeed;
