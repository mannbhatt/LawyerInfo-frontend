"use client";

import { UploadDropzone } from "../../lib/uploadThings";
import { useState } from "react";

import Image from "next/image";
export default function Imgupload({ onUploadComplete, onImageKeyChange }) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  
  const handleRemove = async () => {
    if (!imageKey) return;

    try {
      const res = await fetch("/api/uploadthing/imgRemove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageKey }),
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl("");
        setImageKey("");
        onImageKeyChange(""); // Return imageKey to the called file
      } else {
        console.error("Failed to delete image:", data.error);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="focus:border-[#ff3003] outline-none mt-1 flex flex-col  justify-left items-center gap-2  border-[#591B0C] border-2 bg-white shadow-sm rounded-md w-full">

      
      {!imageUrl && (
        <UploadDropzone
          appearance={{
            container: {
              border:'none',
              boxShadow:'none',
              background:'transparent',
              borderRadius: "var(--radius)",
              padding:"13px",
              width: "100%",
              height:"100%", 
              marginTop:"0px"
            },
            uploadIcon: {
              color: "#591B0C",
            },
            label: {
              color: "#591B0C",
              fontSize: "0.9rem",
            },
            allowedContent: {
              color: "#591B0C",
            },
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
            console.log("Files: ", res);
            const url = res[0]?.url;
            const key = res[0]?.key;
            setImageUrl(url);
            setImageKey(key);
            onImageKeyChange(key); // Return imageKey to the called file
            if (onUploadComplete) {
              onUploadComplete(url);
            }
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}

      
      {imageUrl && (
        <>
       <div className="mt-1 w-36 h-36  overflow-hidden">
          <Image src={imageUrl} className=" w-full h-full" alt="Uploaded" width={100} height={100} />
         </div>
          <button
            onClick={handleRemove}
            className="bg-[#ff3003] text-white px-2 py-0.5 rounded-md mb-1">
            Remove
          </button>
       </>
      )}
    </div>
  );
}
