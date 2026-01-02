import PostComposer from "./PostComposer";
import PostFeed from "./PostFeed";

const Dashboard = () => {
  // Sample posts data
  const samplePosts = [
    {
      id: 1,
      author: "John Doe",
      username: "@johndoe",
      avatar: "JD",
      time: "2h",
      content: "Just finished an amazing project! The team did incredible work. #Intercede #TeamWork",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop",
      likes: 42,
      shares: 12,
      comments: 8,
    },
    {
      id: 2,
      author: "Jane Smith",
      username: "@janesmith",
      avatar: "JS",
      time: "4h",
      content: "Excited to announce our new collaboration with the Local Intersection Team! This is going to be amazing.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
      likes: 89,
      shares: 23,
      comments: 15,
    },
    {
      id: 3,
      author: "Mike Johnson",
      username: "@mikej",
      avatar: "MJ",
      time: "6h",
      content: "What is in your spirit today? Share your thoughts and let's build something great together!",
      likes: 156,
      shares: 45,
      comments: 32,
    },
  ];

  return (
    <>
      {/* Header Removed - Managed by AppLayout (Mobile) and Sidebar (Desktop) */}
      <div className="max-w-2xl mx-auto w-full pt-4">
        {/* Trade Space / Post Area */}
        <div className="p-4">
          <PostComposer />
        </div>

        {/* Posts Feed */}
        <PostFeed posts={samplePosts} />
      </div>
    </>
  );
};

export default Dashboard;
