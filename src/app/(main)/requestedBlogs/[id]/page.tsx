'use client'
import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import {
  Clock,
  ThumbsUp,
  MessageSquare,
  Eye,
  Calendar,
  RefreshCw,
} from "lucide-react";

export default function Page() {
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

  const ApprovePost = gql`
    mutation approvePost($approvePostId: String!, $userId: String!) {
      approvePost(id: $approvePostId, userId: $userId)
    }
  `;
  const [approvePost] = useMutation(ApprovePost,{
    onCompleted:async()=>{
        toast.success("Post published successfully!");
        setTimeout(() => {
            window.location.href = "/admin";
          }, 1000); 
    }
  });

  const DECLINE = gql`
    mutation declinePost($declinePostId: String!, $userId: String!) {
      declinePost(id: $declinePostId, userId: $userId)
    }
  `;
  const [declinePost] = useMutation(DECLINE,{
    onCompleted:async()=>{
        toast.success("Post declined successfully!");
        setTimeout(() => {
            window.location.href = "/admin";
          }, 1000); 
    }
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
      toast.error("Failed to publish post. Please try again.");
    }
  };

  const handleDeclinePost = async (postId: string) => {
    try {
      await declinePost({
        variables: {
          declinePostId: postId,
          userId: "678dbbf39c6eb08b9960fb25",
        },
      });
     
    } catch (err) {
      toast.error("Failed to decline post. Please try again.");
    }
  };

  // Handle date formatting
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(parseInt(dateString));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Date not available";
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Loading skeleton */}
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

  const sanitizedContent = DOMPurify.sanitize(tutorial.content);
  const cleanContent = sanitizedContent.replace(
    /<button[^>]*class="[^"]*bg-red-500[^"]*"[^>]*>.*?<\/button>/gs,
    ''
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tutorial Title and other info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {tutorial.title}
          </h1>
        </div>

        {/* Tutorial Content */}
        <article className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8">
          <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
        </article>

        {/* Buttons */}
        <div className="flex gap-2 ml-[80%] mt-5">
          <button
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-gray-800"
            onClick={() => handlePublishPost(tutorial.id)}
          >
            Publish
          </button>
          <button
            className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-300"
            onClick={() => handleDeclinePost(tutorial.id)}
          >
            Decline
          </button>
        </div>
      </main>
    </div>
  );
}
