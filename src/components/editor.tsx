"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Camera,
  Loader,
} from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { saveDraft } from "../../resolvers/mutations";

<<<<<<< HEAD

interface EditorContent {
  title: string;
  content: string;
  wordCount: number;
  images: string[];
=======
const CLOUDINARYNAME = process.env.NEXT_PUBLIC_CLOUDINARYNAME;
const CLOUDINARYPRESET = process.env.NEXT_PUBLIC_CLOUDINARYPRESET || "";

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
        uploadByFile: async (file: any) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARYPRESET);

          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUDINARYNAME}/upload`,
              {
                method: "POST",
                body: formData,
              }
            );

            const data = await response.json();
            if (data.error) {
              return {
                success: 0,
                message: "Image upload failed",
              };
            }

            console.log("Cloudinary Response:", data);

            return {
              success: 1,
              file: {
                url: data.secure_url, // Correct URL field for secure Cloudinary links
              },
            };
          } catch (error) {
            console.error("Error uploading image:", error);
            return {
              success: 0,
              message: "An error occurred while uploading the image",
            };
          }
        },
      },
    },
  },
};

const calculateReadTime = (text: string) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const readTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute
  return { words, readTime };
};

interface EditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
  editorblock: string;
>>>>>>> f4ce05c0de11b02f9f0a5808ace4cb0c352b84ba
}

type FormattingCommand = "bold" | "italic" | "code" | "bullet" | "number";

const BlogEditor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorContent>({
    title: "",
    content: "",
    wordCount: 0,
    images: [],
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingPosition, setUploadingPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

<<<<<<< HEAD
  const contentRef = useRef<HTMLDivElement>(null);
=======
          const text = content.blocks
            .filter(
              (block) => block.type === "paragraph" || block.type === "header"
            )
            .map((block) => block.data.text || "")
            .join(" ");
>>>>>>> f4ce05c0de11b02f9f0a5808ace4cb0c352b84ba

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const newContent = target.innerHTML;

    const words = newContent
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 0);

    setEditorState((prev) => ({
      ...prev,
      content: newContent,
      wordCount: words.length,
    }));
  };

  const insertCodeBlock = (): void => {
    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const preElement = document.createElement("pre");
    const codeElement = document.createElement("code");

    preElement.className = "bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto";
    codeElement.className = "text-sm font-mono";

    if (selection.toString().length > 0) {
      codeElement.textContent = selection.toString();
    } else {
      codeElement.textContent = "Enter your code here";
    }

    preElement.appendChild(codeElement);
    range.deleteContents();
    range.insertNode(preElement);

    const newRange = document.createRange();
    newRange.setStart(codeElement, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    contentRef.current?.focus();
  };

  const createList = (type: "bullet" | "number"): void => {
    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const listElement = document.createElement(type === "bullet" ? "ul" : "ol");
    const listItem = document.createElement("li");

    listElement.className = "list-inside my-4 space-y-2";
    listElement.className += type === "bullet" ? " list-disc" : " list-decimal";
    listItem.className = "ml-4";

    if (selection.toString().length > 0) {
      listItem.textContent = selection.toString();
    } else {
      listItem.textContent = "List item";
    }

    listElement.appendChild(listItem);
    range.deleteContents();
    range.insertNode(listElement);

    const newRange = document.createRange();
    newRange.setStartAfter(listItem);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    contentRef.current?.focus();
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "n0kmdvhb");
    formData.append("timestamp", String(Date.now() / 1000));
    formData.append(
      "api_key",
      "kttm_Q.XWRBZw:oJ0PanXgJ8Dsg5BspXlB8hb1TDRSDA05d6bXYMmW7KM"
    );
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwf0svulc/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };
  const handleImageDelete = (imageUrl: string) => {
    // Remove the image from state
    setEditorState((prev) => ({
      ...prev,
      images: prev.images.filter((url) => url !== imageUrl),
    }));

    // Remove the image from the editor content
    if (contentRef.current) {
      const imageContainers =
        contentRef.current.querySelectorAll(".image-container");
      imageContainers.forEach((container) => {
        const img = container.querySelector("img");
        if (img?.getAttribute("data-cloudinary-url") === imageUrl) {
          // Remove the container and any empty paragraph that might have been created after it
          const nextElement = container.nextElementSibling;
          if (
            nextElement?.tagName === "P" &&
            !nextElement.textContent?.trim()
          ) {
            nextElement.remove();
          }
          container.remove();
        }
      });

      // Trigger content change to update state
      const changeEvent = new Event("input", { bubbles: true });
      contentRef.current.dispatchEvent(changeEvent);
    }
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Ensure the editor is focused
      const contentEditableElement = contentRef.current;
      if (
        contentEditableElement &&
        document.activeElement !== contentEditableElement
      ) {
        contentEditableElement.focus();
      }

      // Set uploading state
      setIsUploading(true);

      // Ensure there's a valid selection or range
      const selection = window.getSelection();
      if (!selection?.rangeCount) return;

      const range = selection.getRangeAt(0);
      const loadingPlaceholder = document.createElement("div");
      loadingPlaceholder.className =
        "relative inline-block bg-gray-100 rounded-lg p-4 my-4";
      loadingPlaceholder.style.width = "200px";
      loadingPlaceholder.style.height = "150px";
      loadingPlaceholder.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="animate-spin">
            <svg class="w-8 h-8 text-gray-400" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <span class="ml-2 text-gray-500">Uploading...</span>
        </div>
      `;

      // Insert loading placeholder
      range.deleteContents();
      range.insertNode(loadingPlaceholder);

      // Proceed with image upload
      const cloudinaryUrl = await uploadToCloudinary(file);

      // Update editor state
      setEditorState((prev) => ({
        ...prev,
        images: [...prev.images, cloudinaryUrl],
      }));

      // Create image container
      const imageContainer = document.createElement("div");
      imageContainer.className = "image-container relative inline-block group";

      // Create image element
      const img = document.createElement("img");
      img.src = cloudinaryUrl;
      img.className = "max-w-full h-auto my-4 rounded-lg";
      img.setAttribute("data-cloudinary-url", cloudinaryUrl);
      img.style.maxWidth = "600px";
      img.style.maxHeight = "500px";

      // Create delete button with hover effect
      const deleteButton = document.createElement("button");
      deleteButton.className =
        "absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100";
      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
      deleteButton.onclick = (e) => {
        e.preventDefault();
        handleImageDelete(cloudinaryUrl);
      };

      // Add image and delete button to container
      imageContainer.appendChild(img);
      imageContainer.appendChild(deleteButton);

      // Replace placeholder with the image container
      loadingPlaceholder.replaceWith(imageContainer);

      // Move the cursor to after the image
      const paragraph = document.createElement("p");
      const br = document.createElement("br");
      paragraph.appendChild(br);
      imageContainer.parentNode?.insertBefore(
        paragraph,
        imageContainer.nextSibling
      );

      // Set the cursor after the image
      const newRange = document.createRange();
      newRange.setStart(paragraph, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);

      // Trigger content change
      if (contentEditableElement) {
        const changeEvent = new Event("input", { bubbles: true });
        contentEditableElement.dispatchEvent(changeEvent);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false); // Hide loader after the upload
    }
  };

  const applyFormatting = (command: FormattingCommand): void => {
    switch (command) {
      case "bold":
        document.execCommand("bold", false);
        break;
      case "italic":
        document.execCommand("italic", false);
        break;
      case "code":
        insertCodeBlock();
        break;
      case "bullet":
        createList("bullet");
        break;
      case "number":
        createList("number");
        break;
    }
  };

  const CREATE_POST = gql`
    mutation createPost(
      $title: String!
      $content: String!
      $userId: String!
      $words: Int!
      $readIn: Int!
      $images: [String]
    ) {
      createPost(
        title: $title
        content: $content
        userId: $userId
        words: $words
        readIn: $readIn
        images: $images
      )
    }
  `;

  const SAVE_POST = gql`
    mutation saveDraft(
      $title: String!
      $content: String!
      $userId: String!
      $words: Int!
      $readIn: Int!
      $images: [String]
    ) {
      saveDraft(
        title: $title
        content: $content
        userId: $userId
        words: $words
        readIn: $readIn
        images: $images
      )
    }
  `;

  const [createPost, { loading: creatingPost }] = useMutation(CREATE_POST,{
    onCompleted:async(data)=>{
      window.location.href = '/home'

    },
  });
  const handlePublish = () => {
    createPost({
      variables: {
        title: editorState.title,
        content: editorState.content,
        words: editorState.wordCount,
        readIn: Math.ceil(editorState.wordCount / 200),
        userId: "678904d126a81ee3dfd2e539",
        images: editorState.images,
      },
    })
      .then(() => {
        alert("Post published successfully!");
        setEditorState({
          title: "",
          content: "",
          wordCount: 0,
          images: [],
        });
        if (contentRef.current) {
          contentRef.current.innerHTML = "";
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [saveDraft, { loading: savingDraft }] = useMutation(SAVE_POST,{
    onCompleted:async(data)=>{
      alert('successfully saved the post')
      window.location.href = '/home'
    },
  });
  const handleSave = () => {
    saveDraft({
      variables: {
        title: editorState.title,
        content: editorState.content,
        words: editorState.wordCount,
        readIn: Math.ceil(editorState.wordCount / 200),
        userId: "678904d126a81ee3dfd2e539",
        images: editorState.images,
      },
    })
      .then(() => {
        alert("Post published successfully!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
<<<<<<< HEAD
    <div className="max-w-4xl mx-auto">
      <div className="mt-8 ml-[79%] flex gap-2">
        <Button
          className="text-white bg-green-400 h-6 rounded-full"
          onClick={handleSave}
          disabled={savingDraft}
        >
          {savingDraft ? "Saving..." : "Save draft"}
        </Button>
        <Button
          className="text-white bg-green-600 h-6 rounded-full"
          onClick={handlePublish}
          disabled={creatingPost}
        >
          {creatingPost ? "Publishing..." : "Publish"}
        </Button>
=======
    <div className="editor-container">
      {/* Header Section */}
      <div className="editor-header">
        <h2 className="editor-title">Write Your Story</h2>
        <p className="editor-subtitle">
          Share your thoughts and ideas with the world.
        </p>
>>>>>>> f4ce05c0de11b02f9f0a5808ace4cb0c352b84ba
      </div>
      <Card className="max-w-4xl mx-auto bg-white mt-10">
        <CardContent className="p-6">
          <Input
            type="text"
            value={editorState.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEditorState((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter your story title..."
            className="text-3xl font-bold border-none focus:outline-none mb-2 p-0 bg-white text-black"
          />

          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={isUploading}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById("image-upload")?.click()}
              className="hover:bg-gray-100 text-black relative"
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormatting("bold")}
              className="hover:bg-gray-100 text-black"
            >
              <Bold className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormatting("italic")}
              className="hover:bg-gray-100 text-black"
            >
              <Italic className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormatting("code")}
              className="hover:bg-gray-100 text-black"
            >
              <Code className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormatting("bullet")}
              className="hover:bg-gray-100 text-black"
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormatting("number")}
              className="hover:bg-gray-100 text-black"
            >
              <ListOrdered className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <div
              ref={contentRef}
              contentEditable
              onInput={handleContentChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="min-h-[300px] text-black focus:outline-none prose prose-lg max-w-none px-4 py-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&>*]:my-4"
              data-placeholder="Tell your story..."
            />
          </div>

<<<<<<< HEAD
          <div className="mt-4 text-sm text-gray-500">
            {editorState.wordCount} words ・{" "}
            {Math.ceil(editorState.wordCount / 200)} min read
          </div>
        </CardContent>
      </Card>
=======
      <style jsx>{`
        .editor-container {
          padding: 24px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 700px;
          margin: 40px auto;
          font-family: "Georgia", serif;
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
>>>>>>> f4ce05c0de11b02f9f0a5808ace4cb0c352b84ba
    </div>
  );
};

export default BlogEditor;
