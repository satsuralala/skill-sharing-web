import React, { memo, useEffect, useRef } from "react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import CheckList from "@editorjs/checklist";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";

const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  checkList: {
    class: CheckList,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  link: {
    class: Link,
    config: {
      placeholder: "Enter a link",
    },
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file: File) {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            // Simulate the file upload (replace with actual API)
            setTimeout(() => {
              resolve({
                success: 1,
                file: {
                  url: "https://res.cloudinary.com/dwf0svulc/image/upload/v1737282736/lik1c0hcyqmiurprniiz.jpg",
                },
              });
            }, 1000);
          });
        },
      },
    },
  },
};

const EditorComponent = memo(() => {
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    // Initialize EditorJS only once when the component is mounted
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      tools: EDITOR_JS_TOOLS,
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
    });

    // Cleanup editor instance when component unmounts
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      id="editorjs"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        minHeight: "300px",
      }}
    />
  );
});

export default EditorComponent;
