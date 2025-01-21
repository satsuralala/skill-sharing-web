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
import { toast } from "sonner";

interface EditorContent {
  title: string;
  content: string;
  wordCount: number;
  images: string[];
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

  const contentRef = useRef<HTMLDivElement>(null);

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
    setEditorState((prev) => ({
      ...prev,
      images: prev.images.filter((url) => url !== imageUrl),
    }));

    if (contentRef.current) {
      const imageContainers =
        contentRef.current.querySelectorAll(".image-container");
      imageContainers.forEach((container) => {
        const img = container.querySelector("img");
        if (img?.getAttribute("data-cloudinary-url") === imageUrl) {
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
      const contentEditableElement = contentRef.current;
      if (
        contentEditableElement &&
        document.activeElement !== contentEditableElement
      ) {
        contentEditableElement.focus();
      }

      setIsUploading(true);

      const selection = window.getSelection();
      if (!selection?.rangeCount) return;

      const range = selection.getRangeAt(0);
      const loadingPlaceholder = document.createElement("div");
      loadingPlaceholder.className =
        "relative inline-block bg-gray-100 rounded-lg p-4 my-4";
      loadingPlaceholder.style.width = "600px";
      loadingPlaceholder.style.height = "400px";
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

      range.deleteContents();
      range.insertNode(loadingPlaceholder);

      const cloudinaryUrl = await uploadToCloudinary(file);

      setEditorState((prev) => ({
        ...prev,
        images: [...prev.images, cloudinaryUrl],
      }));

      const imageContainer = document.createElement("div");
      imageContainer.className =
        "image-container relative inline-block group flex jusity-center mx-auto max-w-[600px] max-h-[400px]";

      const img = document.createElement("img");
      img.src = cloudinaryUrl;
      img.className = "max-w-full h-auto my-4 rounded-lg mx-auto ";
      img.setAttribute("data-cloudinary-url", cloudinaryUrl);
      img.style.maxWidth = "600px";
      img.style.maxHeight = "500px";

      const deleteButton = document.createElement("button");
      deleteButton.className =
        "absolute top-2 right-6 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100";
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

      imageContainer.appendChild(img);
      imageContainer.appendChild(deleteButton);

      loadingPlaceholder.replaceWith(imageContainer);

      const paragraph = document.createElement("p");
      const br = document.createElement("br");
      paragraph.appendChild(br);
      imageContainer.parentNode?.insertBefore(
        paragraph,
        imageContainer.nextSibling
      );

      const newRange = document.createRange();
      newRange.setStart(paragraph, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);

      if (contentEditableElement) {
        const changeEvent = new Event("input", { bubbles: true });
        contentEditableElement.dispatchEvent(changeEvent);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
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

  const [createPost, { loading: creatingPost }] = useMutation(CREATE_POST, {
    onCompleted: async (data) => {
      window.location.href='/'
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
        toast.success("Post published successfully!");
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

  const [saveDraft, { loading: savingDraft }] = useMutation(SAVE_POST, {
    onCompleted: async (data) => {
      toast.success("successfully saved the post");
      window.location.href = "/home";
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
        toast.success("Post saved successfully!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto">
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
              className="min-h-[300px] text-black focus:outline-none prose prose-lg max-w-none  px-4 py-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&>*]:my-4 "
              data-placeholder="Tell your story..."
            />
          </div>

          <div className="mt-4 text-sm text-gray-500 ">
            {editorState.wordCount} words ・{" "}
            {Math.ceil(editorState.wordCount / 200)} min read
            <div className="mt-4 ml-[73%] flex gap-2">
              <Button
                className="text-white bg-gray-600 h-6 rounded-full hover:bg-gray-400"
                onClick={handleSave}
                disabled={savingDraft}
              >
                {savingDraft ? "Saving..." : "Save draft"}
              </Button>
              <Button
                className="text-white bg-green-600 h-6 rounded-full hover:bg-green-400"
                onClick={handlePublish}
                disabled={creatingPost}
              >
                {creatingPost ? "Submitting..." : "Submit to publish"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogEditor;
