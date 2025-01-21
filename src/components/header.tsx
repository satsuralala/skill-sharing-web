'use client'
import { PlusCircle, LogIn, LogOut } from "lucide-react";  
import { Button } from "./shadcn/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const Header = () => {
  const { userId } = useUserContext();  

  const check = () => {
    if (!userId) {
      toast.error('Please log in to start writing your blog.');
    } else {
      window.location.href = '/write';
    }
  };

  const handleLogin = () => {
    if (!userId) {
      window.location.href = "/register"; 
    }
  };

  const handleLogout = () => {
  
    localStorage.clear();  
    toast.success('You have logged out successfully.');
    window.location.href = '/';  
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Skill Sharing</h1>

        <div className="flex items-center gap-4">
        <Button
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={check}
          >
            <PlusCircle className="w-5 h-5" />
            Start Writing
          </Button>
       
          {userId ? (
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </Button>
          ) : (
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={handleLogin}
            >
              <LogIn className="w-5 h-5" />
              Log In
            </Button>
          )}

        
          
        </div>
      </div>
    </header>
  );
};

export default Header;
