'use client'
import React from "react";
import {
  Clock,
  ThumbsUp,
  MessageSquare,
  Eye
} from "lucide-react";
import Header from "@/components/header";
import { gql, useQuery } from "@apollo/client";
import DOMPurify from 'dompurify';
import Link from "next/link";

interface Tutorial {
  id: number | string;
  title: string;
  content: string;
  authorName: string;
  status: string;
  words: number;
  readIn: number;
  likes: number;
  views: number;
  comments: number;
  reputationPoints: number;
  images?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

interface QueryData {
  getApprovedPosts: Tutorial[];
}

const TutorialHome: React.FC = () => {
  const GET_POSTS = gql`
    query getApprovedPosts {
      getApprovedPosts {
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

  const { data, loading, error } = useQuery<QueryData>(GET_POSTS);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="w-full h-48 bg-gray-200" />
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded mb-4" />
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
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
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Tutorials</h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </main>
      </div>
    );
  }

  const displayTutorials = data?.getApprovedPosts || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTutorials.map((tutorial) => (
        <Link href={`/blogs/${tutorial.id}`} key={tutorial.id}>
            <article
              key={tutorial.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                {tutorial.images && tutorial.images[0] ? (
                  <img
                    src={tutorial.images[0]}
                    alt={tutorial.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/api/placeholder/400/225"
                    alt={tutorial.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                {/* Reading time overlay */}
                <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded-full flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {tutorial.readIn}m
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                  {tutorial.title}
                </h2>

                {/* Metrics */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="text-gray-700">By {tutorial.authorName}</span>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1 text-blue-500" />
                      <span>{tutorial.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1 text-green-500" />
                      <span>{tutorial.comments}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1 text-purple-500" />
                      <span>{tutorial.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
          ))}
        </div>
        
      </main>
    </div>
  );
};

export default TutorialHome;