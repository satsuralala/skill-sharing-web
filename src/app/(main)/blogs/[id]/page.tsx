"use client";
import React from "react";
import {
  Clock,
  ThumbsUp,
  MessageSquare,
  Eye,
  Calendar,
  RefreshCw,
} from "lucide-react";
import Header from "@/components/header";
import { gql, useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import { useUserContext } from "@/components/UserContext";
import { toast } from "sonner";

export default function TutorialDetailPage() {
  const { userId } = useUserContext();
  if(!userId){
      toast.error('Please sign in to read the article.')
  }
  const params = useParams();
  const id = params.id;

  const GET_TUTORIAL = gql`
    query GetPost($getPostId: String!, $userId: String!) {
      getPost(id: $getPostId, userId: $userId) {
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
        updatedAt
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_TUTORIAL, {
    variables: {
      userId: "678904d126a81ee3dfd2e539",
      getPostId: id,
    },
  });

  // Helper function to format dates safely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(parseInt(dateString));
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Date not available';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="aspect-[16/9] bg-gray-200 rounded mb-8" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error Loading Tutorial
            </h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </main>
      </div>
    );
  }

  const tutorial = data?.getPost;
  if (!tutorial) return null;

  const createdDate = formatDate(tutorial.createdAt);
  const updatedDate = formatDate(tutorial.updatedAt);

  // Sanitize content
  const sanitizedContent = DOMPurify.sanitize(tutorial.content);
  const cleanContent = sanitizedContent.replace(
    /<button[^>]*class="[^"]*bg-red-500[^"]*"[^>]*>.*?<\/button>/gs,
    ''
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {tutorial.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {tutorial.readIn}m read
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {createdDate}
              </span>
              {createdDate !== updatedDate && (
                <span className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Updated {updatedDate}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1 text-blue-500" />
                <span className="text-black">{tutorial.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-black">{tutorial.comments?.length || 0}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1 text-purple-500" />
                <span className="text-black">{tutorial.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
            <div>
              <h3 className="font-semibold text-gray-900">
                {tutorial.authorName}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8">
          <div dangerouslySetInnerHTML={{ __html: cleanContent }}/>
        </article>
      </main>
    </div>
  );
}