"use client";
import React, { useState } from "react";
import {
  Layout,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/Dialog";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Button } from "@/components/shadcn/button";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  const GET_All_POSTS = gql`
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
        reputationPoints
        images
        createdAt
      }
    }
  `;

  const { data, loading, error, refetch } = useQuery(GET_All_POSTS, {
    variables: {
      userId: "678dbbf39c6eb08b9960fb25",
    },
  });

  const ApprovePost = gql`
    mutation approvePost($approvePostId: ID!, $userId: String!) {
      approvePost(id: $approvePostId, userId: $userId)
    }
  `;

  const [approvePost] = useMutation(ApprovePost, {
    onCompleted: async () => {
      toast.success("Post published successfully!");
      refetch();
    },
  });

  const handlePublishPost = async (postId: string) => {
    try {
      await approvePost({
        variables: {
          approvePostId: postId,
          userId: "678dbbf39c6eb08b9960fb25",
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to publish post. Please try again.");
    }
  };
  const DECLINE = gql`
    mutation declinePost($declinePostId: ID!, $userId: String!) {
      declinePost(id: $declinePostId, userId: $userId)
    }
  `;
  const [declinePost] = useMutation(DECLINE, {
    onCompleted: async () => {
      toast.success("Post declined successfully!");
      refetch();
    },
  });
  const handleDeclinePost = async (postId: string) => {
    try {
      await declinePost({
        variables: {
          declinePostId: postId,
          userId: "678dbbf39c6eb08b9960fb25",
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to decline post. Please try again.");
    }
  };

  const menuItems = [
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
          <button className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className={!isSidebarOpen ? "hidden" : ""}>Log out</span>
          </button>
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
                  {data.getAllPosts.map((post: any) => (
                    <div
                      key={post.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-4">
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
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          {post.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
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

                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                            onClick={() => handlePublishPost(post.id)}
                          >
                            Publish
                          </button>
                          <button
                            className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                            onClick={() => handleDeclinePost(post.id)}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
