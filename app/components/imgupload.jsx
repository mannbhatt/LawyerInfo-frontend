"use client";

import { UploadDropzone } from "../../lib/uploadThings";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Imgupload({ onUploadComplete, onImageKeyChange, initialImage = "", initialImageKey = "" }) {
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [imageKey, setImageKey] = useState(initialImageKey);

  // Sync state with props if they change
  useEffect(() => {
    setImageUrl(initialImage);
    setImageKey(initialImageKey);
  }, [initialImage, initialImageKey]);

  // Function to remove an uploaded image
  const handleRemove = async () => {
    if (!imageKey) return;

    try {
      const res = await fetch("/api/uploadthing/imgRemove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageKey }),
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl("");
        setImageKey("");

        // Ensure the parent component updates correctly
        if (onUploadComplete) onUploadComplete("");
        if (onImageKeyChange) onImageKeyChange("");

        console.log("✅ Image removed successfully");
      } else {
        console.error("❌ Failed to delete image:", data.error);
      }
    } catch (error) {
      console.error("❌ Error deleting image:", error);
    }
  };

  return (
    <div className="focus:border-[#ff3003] h-48 outline-none mt-1 flex flex-col justify-left items-center gap-2 border-[#591B0C] border-2 bg-white shadow-sm rounded-md w-full">
      
      {/* Upload Dropzone (Only show if no image uploaded) */}
      {!imageUrl && (
        <UploadDropzone
          appearance={{
            container: {
              border: "none",
              boxShadow: "none",
              background: "transparent",
              borderRadius: "var(--radius)",
              padding: "13px",
              width: "100%",
              height: "100%",
              marginTop: "0px",
            },
            uploadIcon: { color: "#591B0C" },
            label: { color: "#591B0C", fontSize: "0.9rem" },
            allowedContent: { color: "#591B0C" },
            button: {
              background: "#591B0C",
              color: "white",
              borderRadius: "var(--radius)",
              fontSize: "0.9rem",
              hoverBackground: "#ff3003",
            },
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const url = res[0]?.url;
            const key = res[0]?.key;

            setImageUrl(url);
            setImageKey(key);

            // Ensure parent component gets the updated values
            if (onUploadComplete) onUploadComplete(url);
            if (onImageKeyChange) onImageKeyChange(key);
          }}
          onUploadError={(error) => alert(`❌ Upload Error: ${error.message}`)}
        />
      )}

      {/* Display Uploaded Image & Remove Button */}
      {imageUrl && (
        <>
          <div className="mt-1 w-36 h-36 overflow-hidden">
            <Image src={imageUrl} className="w-full h-full object-cover" alt="Uploaded" width={100} height={100} />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="bg-[#591B0C] hover:bg-[#ff3003] text-white px-2 py-0.5 rounded-md mb-1"
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
}
