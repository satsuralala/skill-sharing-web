import React from 'react';
import { PlusCircle, Search, Clock, ThumbsUp, MessageSquare } from 'lucide-react';

const TutorialHome = () => {
  const tutorials = [
    {
      id: 1,
      title: "How To Build a RESTful API with Node.js and Express",
      description: "In this tutorial, you'll learn how to create a RESTful API using Node.js and Express framework. We'll cover routing, middleware, and database integration.",
      author: "Sarah Chen",
      readTime: 25,
      likes: 234,
      comments: 45,
      tags: ["Node.js", "Express", "API"]
    },
    {
      id: 2,
      title: "Understanding Docker Containers and Security Best Practices",
      description: "Learn about Docker container security, including best practices for image scanning, runtime security, and network isolation configurations.",
      author: "James Wilson",
      readTime: 20,
      likes: 189,
      comments: 32,
      tags: ["Docker", "Security", "DevOps"]
    },
    {
      id: 3,
      title: "Deploying a React Application to Production",
      description: "A comprehensive guide to deploying your React application to production, including build optimization and server configuration.",
      author: "Michael Brown",
      readTime: 15,
      likes: 156,
      comments: 28,
      tags: ["React", "Deployment", "Frontend"]
    },
    {
      id: 4,
      title: "Getting Started with MongoDB and Mongoose",
      description: "Learn how to integrate MongoDB with your Node.js application using Mongoose ODM. Covers basic CRUD operations and data modeling.",
      author: "Lisa Park",
      readTime: 18,
      likes: 142,
      comments: 23,
      tags: ["MongoDB", "Database", "Backend"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Skill Sharing</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search tutorials..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <PlusCircle className="w-5 h-5" />
              Start Writing
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 flex gap-4">
          {["All", "Trending", "Recent", "Most Liked"].map(filter => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-lg ${
                filter === "All" 
                  ? "bg-gray-100 text-gray-900" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map(tutorial => (
            <article 
              key={tutorial.id} 
              className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
            >
              <img
                src="/api/placeholder/400/200"
                alt={tutorial.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-gray-600 line-clamp-2">
                  {tutorial.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                  {tutorial.description}
                </p>
                
                <div className="flex gap-2 flex-wrap mb-4">
                  {tutorial.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                  <div className="flex items-center gap-2">
                    <span>By {tutorial.author}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tutorial.readTime}m
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {tutorial.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {tutorial.comments}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TutorialHome;