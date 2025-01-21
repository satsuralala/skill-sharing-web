// context/UserContext.tsx
'use client'
import React, { createContext, useContext } from "react";

export const UserContext = createContext<{ userId: string | null }>({ userId: null });

export const useUserContext = () => useContext(UserContext);
