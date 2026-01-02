import React, { useState, useRef } from "react";
import {
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface MediaFile {
  file: File;
  type: "image" | "video" | "audio";
  preview?: string;
}

const PostComposer: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video" | "audio"
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const mediaFile: MediaFile = { file, type };

      if (type === "image" || type === "video") {
        const reader = new FileReader();
        reader.onloadend = () => {
          mediaFile.preview = reader.result as string;
          setMediaFiles((prev) => [...prev, mediaFile]);
        };
        reader.readAsDataURL(file);
      } else {
        setMediaFiles((prev) => [...prev, mediaFile]);
      }
    });

    // Reset input
    e.target.value = "";
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (!postContent.trim() && mediaFiles.length === 0) return;

    // Here you would typically upload the files and post content to your backend
    console.log("Post content:", postContent);
    console.log("Media files:", mediaFiles);

    // Reset form
    setPostContent("");
    setMediaFiles([]);
  };

  return (
    <div className="border-b border-gray-200 dark:border-white/10 p-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-bold">
          U
        </div>
        <div className="flex-1">
          <textarea
            placeholder="What is in your spirit?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full resize-none border-none outline-none text-xl placeholder-muted-foreground bg-transparent min-h-[120px] text-foreground"
            rows={4}
          />

          {/* Media Previews */}
          {mediaFiles.length > 0 && (
            <div className="mt-4 space-y-3">
              {mediaFiles.map((media, index) => (
                <div key={index} className="relative">
                  {media.type === "image" && media.preview && (
                    <div className="relative rounded-lg overflow-hidden border border-border">
                      <img
                        src={media.preview}
                        alt="Preview"
                        className="w-full max-h-64 object-cover"
                      />
                      <button
                        onClick={() => removeMedia(index)}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  )}
                  {media.type === "video" && media.preview && (
                    <div className="relative rounded-lg overflow-hidden border border-border">
                      <video src={media.preview} controls className="w-full max-h-64" />
                      <button
                        onClick={() => removeMedia(index)}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  )}
                  {media.type === "audio" && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
                      <MusicalNoteIcon className="h-5 w-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {media.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(media.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <audio
                        src={URL.createObjectURL(media.file)}
                        controls
                        className="flex-1 max-w-xs"
                      />
                      <button
                        onClick={() => removeMedia(index)}
                        className="p-1.5 hover:bg-background/80 rounded-full transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-primary">
              {/* Image Upload */}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e, "image")}
                className="hidden"
              />
              <button
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-2 hover:bg-muted rounded-full px-3 py-2 transition-colors"
                title="Upload Image"
              >
                <PhotoIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Image</span>
              </button>

              {/* Video Upload */}
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileSelect(e, "video")}
                className="hidden"
              />
              <button
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center gap-2 hover:bg-muted rounded-full px-3 py-2 transition-colors"
                title="Upload Video"
              >
                <VideoCameraIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Video</span>
              </button>

              {/* Audio Upload */}
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                multiple
                onChange={(e) => handleFileSelect(e, "audio")}
                className="hidden"
              />
              <button
                onClick={() => audioInputRef.current?.click()}
                className="flex items-center gap-2 hover:bg-muted rounded-full px-3 py-2 transition-colors"
                title="Upload Audio"
              >
                <MusicalNoteIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Audio</span>
              </button>
            </div>
            <button
              onClick={handlePost}
              disabled={!postContent.trim() && mediaFiles.length === 0}
              className="bg-primary text-primary-foreground font-bold py-2 px-6 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
