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
  checkList: CheckList,
  list: List,
  header: Header,
  delimiter: Delimiter,
  link: Link,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file: File) {
          return new Promise((resolve, reject) => {
            // Simulate file upload (You can integrate a real API here)
            const formData = new FormData();
            formData.append("file", file);
            setTimeout(() => {
              resolve({
                success: 1,
                file: {
                  url: "https://via.placeholder.com/150",
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
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      tools: EDITOR_JS_TOOLS,
      onReady: () => {
        console.log("Editor.js is ready to work!");
      },
    });

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return <div id="editorjs" style={{ border: "1px solid #ccc", padding: "10px" }} />;
});

export default EditorComponent;
