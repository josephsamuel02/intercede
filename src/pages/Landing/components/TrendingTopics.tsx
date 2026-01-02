import { useState } from "react";
import {
  FiMessageCircle,
  FiHeart,
  FiShare2,
} from "react-icons/fi";
import { ArrowTrendingUpIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

interface TrendingPost {
  id: number;
  author: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  audioTitle?: string;
  audioDuration?: string;
  likes: string;
  comments: string;
  shares: string;
  topic: string;
}

interface TrendingTopic {
  id: string;
  name: string;
  count: string;
  trending: boolean;
}

const TrendingTopics = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const trendingTopics: TrendingTopic[] = [
    { id: "all", name: "All Topics", count: "", trending: false },
    { id: "technology", name: "Technology and Innovation", count: "12.5k", trending: true },
    { id: "prayer", name: "Prayer and Intercession", count: "8.9k", trending: true },
    { id: "community", name: "Community Building", count: "6.2k", trending: false },
    { id: "faith", name: "Faith and Trust", count: "5.1k", trending: true },
    { id: "inspiration", name: "Inspiration and Motivation", count: "4.3k", trending: false },
    { id: "worship", name: "Worship and Praise", count: "3.8k", trending: false },
  ];

  const trendingPosts: TrendingPost[] = [
    {
      id: 1,
      author: "Sarah Johnson",
      username: "@sarahj",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      time: "1h",
      content: "Just launched our new prayer request feature! Now you can share your prayer needs with the community. 🙏 #Technology #Prayer",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
      likes: "2.3k",
      comments: "456",
      shares: "189",
      topic: "technology",
    },
    {
      id: 2,
      author: "Michael Chen",
      username: "@michaelc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      time: "2h",
      content: "The power of community prayer is incredible. When we come together, miracles happen. Let's keep lifting each other up! 💪 #Prayer #Community",
      likes: "5.1k",
      comments: "892",
      shares: "324",
      topic: "prayer",
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      username: "@emilyr",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      time: "3h",
      content: "Faith is not about having all the answers. It's about trusting God even when you don't understand. Trust the process. ✨ #Faith #Inspiration",
      likes: "8.7k",
      comments: "1.2k",
      shares: "567",
      topic: "faith",
    },
    {
      id: 4,
      author: "David Thompson",
      username: "@davidt",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      time: "4h",
      content: "Building something meaningful takes time, patience, and a lot of prayer. Grateful for this amazing community! 🚀 #Technology #Community",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      likes: "3.4k",
      comments: "678",
      shares: "234",
      topic: "technology",
    },
    {
      id: 5,
      author: "Jessica Martinez",
      username: "@jessicam",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      time: "5h",
      content: "Today's worship session was powerful! The presence of God was so tangible. Thankful for moments like these. 🎵 #Worship #Faith",
      likes: "6.2k",
      comments: "945",
      shares: "412",
      topic: "worship",
    },
    {
      id: 6,
      author: "Robert Kim",
      username: "@robertk",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      time: "6h",
      content: "Sometimes the best way to inspire others is to share your own journey. Here's to growth, faith, and community! 🌟 #Inspiration #Community",
      likes: "4.5k",
      comments: "723",
      shares: "298",
      topic: "inspiration",
    },
    {
      id: 7,
      author: "Pastor James Wilson",
      username: "@pastorjames",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      time: "7h",
      content: "Today's message on the power of intercessory prayer touched many hearts. When we stand in the gap for others, we become vessels of God's grace and mercy. Listen to the full sermon below.",
      audioTitle: "The Power of Intercessory Prayer",
      audioDuration: "38:45",
      likes: "9.2k",
      comments: "1.4k",
      shares: "623",
      topic: "prayer",
    },
  ];

  const filteredPosts = selectedTopic
    ? trendingPosts.filter((post) => post.topic === selectedTopic)
    : trendingPosts;

  const toggleAudio = (id: number) => {
    if (playingAudio === id) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(id);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <ArrowTrendingUpIcon className="w-6 h-6 text-[#e68200]" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Topics</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">See what's trending in your community</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Trending Topics List */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-gray-50 dark:bg-[#111] rounded-2xl p-4 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Trending Now</h3>
              <ul className="space-y-2">
                {trendingTopics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => setSelectedTopic(topic.id === "all" ? null : topic.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between group ${
                        selectedTopic === topic.id || (selectedTopic === null && topic.id === "all")
                          ? "bg-[#e68200] text-white"
                          : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {topic.trending && (
                          <ArrowTrendingUpIcon className={`w-4 h-4 flex-shrink-0 ${
                            selectedTopic === topic.id || (selectedTopic === null && topic.id === "all")
                              ? "text-white"
                              : "text-[#e68200]"
                          } group-hover:text-white transition-colors`} />
                        )}
                        <span className="font-medium text-sm truncate">{topic.name}</span>
                      </div>
                      {topic.count && (
                        <span className="text-xs opacity-70 ml-2 flex-shrink-0">{topic.count}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content - Posts Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="h-auto bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-lg dark:hover:shadow-[#e68200]/10 transition-all hover:-translate-y-1"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10"
                      />
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {post.author}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {post.username}
                          </span>
                          <span className="text-xs text-gray-400">·</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-[#e68200]/10 dark:bg-[#e68200]/20 text-[#e68200] rounded-full capitalize">
                      {post.topic}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 mb-3">
                    <p className="text-gray-900 dark:text-gray-100">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Audio */}
                  {post.audioTitle && (
                    <div className="px-4 mb-3">
                      <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-4 border border-gray-200 dark:border-white/5 flex items-center gap-4">
                        <button
                          onClick={() => toggleAudio(post.id)}
                          className="w-12 h-12 rounded-full bg-[#e68200] flex items-center justify-center hover:bg-[#ff9900] transition-colors flex-shrink-0"
                        >
                          {playingAudio === post.id ? (
                            <PauseIcon className="w-5 h-5 text-white" />
                          ) : (
                            <PlayIcon className="w-5 h-5 text-white ml-0.5" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold mb-1 text-gray-900 dark:text-white truncate">
                            {post.audioTitle}
                          </div>
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-[#e68200] w-1/3" />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>12:30</span>
                            <span>{post.audioDuration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Post Image */}
                  {post.image && (
                    <div className="px-4 mb-3">
                      <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                        <img
                          src={post.image}
                          alt="Post"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="px-4 pt-3 pb-4 border-t border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
                      <button className="flex items-center gap-2 hover:text-[#e68200] transition-colors">
                        <FiMessageCircle size={20} />
                        <span className="text-sm font-medium">{post.comments}</span>
                        <span className="text-sm">Comments</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                        <FiHeart size={20} />
                        <span className="text-sm font-medium">{post.likes}</span>
                        <span className="text-sm">Likes</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-[#e68200] transition-colors">
                        <FiShare2 size={20} />
                        <span className="text-sm font-medium">{post.shares}</span>
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingTopics;

