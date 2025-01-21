"use client";
import React, { useEffect, useState } from "react";
import {
  FileText,
  Users,
  DollarSign,
  Flag,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
} from "lucide-react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "@/components/UserContext";
import { Button } from "@/components/shadcn/button";

// Move GraphQL operations outside component
const GET_ALL_POSTS = gql`
  query GetAllPosts($userId: String) {
    getAllPosts(userId: $userId) {
      id
      title
      content
      authorName
      status
      words
      readIn
      likes
      views
      comments
      images
      createdAt
    }
  }
`;

const APPROVE_POST = gql`
  mutation approvePost($approvePostId: String!, $userId: String!) {
    approvePost(id: $approvePostId, userId: $userId)
  }
`;

const DECLINE_POST = gql`
  mutation declinePost($declinePostId: String!, $userId: String!) {
    declinePost(id: $declinePostId, userId: $userId)
  }
`;


// Menu items configuration
const menuItems= [
  {
    icon: <FileText className="w-5 h-5 text-black" />,
    label: "Articles",
    value: "posts",
  },
  {
    icon: <Users className="w-5 h-5 text-black" />,
    label: "Authors",
    value: "authors",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-black" />,
    label: "Payments", 
    value: "payments",
  },
  {
    icon: <Flag className="w-5 h-5 text-black" />,
    label: "Report",
    value: "reports",
  },
  {
    icon: <BarChart className="w-5 h-5 text-black" />,
    label: "Statistics",
    value: "statistics",
  },
  {
    icon: <Settings className="w-5 h-5 text-black" />,
    label: "Settings",
    value: "settings",
  },
];
const AdminDashboard = () => {
  // Move all hooks to the top
  const { userId } = useUserContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  // Query with proper error handling
  const { data, loading, error, refetch } = useQuery(GET_ALL_POSTS, {
    variables: { userId },
    skip: !userId,
    onError: (error) => {
      toast.error(`Error fetching posts: ${error.message}`);
    }
  });

  // Setup mutations with proper error handling
  const [approvePost] = useMutation(APPROVE_POST, {
    onCompleted: () => {
      toast.success("Post published successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error publishing post: ${error.message}`);
    }
  });

  const [declinePost] = useMutation(DECLINE_POST, {
    onCompleted: () => {
      toast.success("Post declined successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error declining post: ${error.message}`);
    }
  });

  // Handle post actions
  const handlePublishPost = async (postId: string) => {
    try {
      await approvePost({
        variables: {
          approvePostId: postId,
          userId: userId,
        },
      });
    } catch (err) {
      // Error handling is done in mutation config
      console.error(err);
    }
  };

  const handleDeclinePost = async (postId: string) => {
    try {
      await declinePost({
        variables: {
          declinePostId: postId,
          userId: userId,
        },
      });
    } catch (err) {
      // Error handling is done in mutation config
      console.error(err);
    }
  };

  const handleLogout = () => {
  
    localStorage.clear();  
    toast.success('You have logged out successfully.');
    setTimeout(() => {
      
      window.location.href = '/';  
    }, 1000);
  };
  // Early return if no user
  if (!userId) {
    return (
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200">404</h1>
          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>
          <p className="mt-4 text-gray-500">We can't find that page.</p>
          <a
            href="/"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <h1
            className={`font-bold text-gray-600 text-xl ${
              !isSidebarOpen && "hidden"
            }`}
          >
            Admin
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-700 rounded-lg hover:text-white"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 text-gray-500 hover:text-white" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => setActiveTab(item.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                    activeTab === item.value ? "bg-gray-100" : ""
                  }`}
                >
                  {item.icon}
                  <span className={!isSidebarOpen ? "hidden" : ""}>
                    <div className="text-black">{item.label}</div>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={()=>handleLogout()}>
            <LogOut className="w-5 h-5" />
            <span className={!isSidebarOpen ? "hidden" : ""}>Log out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "posts" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-600">Articles</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 gap-4 p-4">
                  <div className="grid grid-cols-1 gap-4 p-4">
                    {data.getAllPosts.length > 0 ? (
                      data.getAllPosts.map((post: any) => (
                        <div
                          key={post.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <Link
                              href={`/requestedBlogs/${post.id}`}
                              key={post.id}
                            >
                              <div className="flex gap-8">
                                <div>
                                  <Image
                                    src={post.images[0]}
                                    alt={post.id}
                                    width={150}
                                    height={80}
                                    className={`rounded-3xl  border-2 ${
                                      post.status === "pending"
                                        ? "border-yellow-300"
                                        : post.status === "approved"
                                        ? "border-green-500"
                                        : post.status === "declined"
                                        ? "border-red-400"
                                        : "border-gray-500"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                                    {post.title}
                                  </h3>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>Author: {post.authorName}</span>
                                    <span>•</span>
                                    <span>{post.words} words</span>
                                    <span>•</span>
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {post.readIn}min
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                      <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {post.views}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <ThumbsUp className="w-4 h-4" />
                                        {post.likes}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4" />
                                        {post.comments.length}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div>
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                  post.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : post.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : post.status === "declined"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {post.status}
                              </span>
                              <div className="flex gap-2  mt-5">
                                <button
                                  className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-gray-800"
                                  onClick={() => handlePublishPost(post.id)}
                                >
                                  Publish
                                </button>
                                <button
                                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-300"
                                  onClick={() => handleDeclinePost(post.id)}
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No requests to publish at this moment.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "authors" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Зохиогчид</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Хайх..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-5 h-5" />
                    Шүүлт
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Нэр
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Нийтлэл
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Репутац
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Орлого
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Үйлдэл
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    Sample Authors
                    {/* {authors.map((author) => (
                      <tr key={author.id}>
                        <td className="px-6 py-4">
                          <div className="font-medium">{author.name}</div>
                        </td>
                        <td className="px-6 py-4">{author.posts}</td>
                        <td className="px-6 py-4">{author.reputation}</td>
                        <td className="px-6 py-4">{author.earnings}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {author.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800">
                            Дэлгэрэнгүй
                          </button>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
