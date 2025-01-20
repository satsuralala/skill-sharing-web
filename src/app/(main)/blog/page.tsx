<<<<<<< HEAD
import BlogEditor from "@/components/editor";


const EditorPage = () => {
=======
"use client";
import React, { useState } from "react";

import Editor from "@/components/editor";

// Initial Data
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
>>>>>>> f4ce05c0de11b02f9f0a5808ace4cb0c352b84ba
  return (
    <div>
      <BlogEditor/>
    </div>
  );
<<<<<<< HEAD
};
export default EditorPage
=======
}

export default App;
>>>>>>> f4ce05c0de11b02f9f0a5808ace4cb0c352b84ba
