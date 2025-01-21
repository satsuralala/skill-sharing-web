'use client'; // Mark the component as a Client Component

import React, { PropsWithChildren, useEffect, useState } from "react";
import "./global.css";
import { ApolloWrapper } from "@/components/provider/ApolloWrapper";
import { Toaster } from "sonner";
import { UserContext } from "@/components/UserContext";

const RootLayout = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []); 

  return (
    <html lang="en">
      <body className="bg-white">
        <ApolloWrapper>
          <UserContext.Provider value={{ userId }}>
            {children}
          </UserContext.Provider>
          <Toaster />
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
