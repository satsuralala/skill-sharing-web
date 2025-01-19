import React, { memo, useEffect, useRef, useState } from "react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist";

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
    config: {
      levels: [1, 2, 3],
      defaultLevel: 2,
    },
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
        uploadByFile(file:any) {
          return new Promise((resolve) => {
            const formData = new FormData();
            formData.append("file", file);

            setTimeout(() => {
              resolve({
                success: 1,
                file: {
                  url: "https://via.placeholder.com/800", // Replace with actual upload logic
                },
              });
            }, 1000);
          });
        },
      },
    },
  },
};

const calculateReadTime = (text) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const readTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute
  return { words, readTime };
};

interface EditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
  editorblock: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, editorblock }) => {
  const ref = useRef<EditorJS | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api: API) {
          const content = await api.saver.save();
          onChange(content);

          const text = content.blocks
            .filter((block) => block.type === "paragraph" || block.type === "header")
            .map((block) => block.data.text || "")
            .join(" ");

          const { words, readTime } = calculateReadTime(text);
          setWordCount(words);
          setReadTime(readTime);
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [data, onChange, editorblock]);

  return (
    <div className="editor-container">
      {/* Header Section */}
      <div className="editor-header">
        <h2 className="editor-title">Write Your Story</h2>
        <p className="editor-subtitle">Share your thoughts and ideas with the world.</p>
      </div>

      {/* Word Count and Read Time */}
      <div className="editor-stats">
        <span>{wordCount} words</span>
        <span> - {readTime} min read</span>
      </div>

      {/* Editor Content Area */}
      <div id={editorblock} className="editor-content"></div>

      <style jsx>{`
        .editor-container {
          padding: 24px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 700px;
          margin: 40px auto;
          font-family: 'Georgia', serif;
          color: #333;
        }
        .editor-header {
          border-bottom: 1px solid #ddd;
          padding-bottom: 16px;
          margin-bottom: 16px;
        }
        .editor-title {
          font-size: 32px;
          font-weight: bold;
          margin: 0;
        }
        .editor-subtitle {
          font-size: 16px;
          color: #666;
          margin: 4px 0 0;
        }
        .editor-stats {
          font-size: 14px;
          color: #888;
          margin-bottom: 16px;
        }
        .editor-content {
          font-size: 18px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default memo(Editor);
