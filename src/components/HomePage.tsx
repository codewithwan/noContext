import { useState } from 'react';
import { PlusCircle, Home, Compass, User, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import PostCard from './molecules/PostCard'; // Updated import path
import PostModal from './molecules/PostModal'; // Updated import path



// Main Home Page Component
const HomePage = () => {
  const [posts, setPosts] = useState([
    {
      username: "creative_writer",
      timestamp: "2 hours ago",
      content: "Life is not about finding yourself. Life is about creating yourself.",
      font: "serif",
      likes: 42
    },
    {
      username: "tech_enthusiast",
      timestamp: "4 hours ago",
      content: "𝚃𝚑𝚎 𝚋𝚎𝚜𝚝 𝚠𝚊𝚢 𝚝𝚘 𝚙𝚛𝚎𝚍𝚒𝚌𝚝 𝚝𝚑𝚎 𝚏𝚞𝚝𝚞𝚛𝚎 𝚒𝚜 𝚝𝚘 𝚌𝚛𝚎𝚊𝚝𝚎 𝚒𝚝.",
      font: "mono",
      likes: 89
    }
  ]);

  const handleNewPost = (postData: { content: string; font: string }) => {
    const newPost = {
      username: "user",
      timestamp: "Just now",
      content: postData.content,
      font: postData.font,
      likes: 0
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              noContext
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                  <PlusCircle className="w-6 h-6" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <PostModal
                  onClose={() => {}}
                  onSubmit={handleNewPost}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-24 lg:pb-16 px-4 max-w-3xl mx-auto">
        <div className="space-y-4">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-6 bg-white p-3 rounded-full shadow-sm">
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Compass className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <User className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:hidden flex items-center bg-white rounded-full shadow-lg px-6 py-3 space-x-8">
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Compass className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <User className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;