"use client";

// file upload cha components ahe 

import IKUploadResponse from "imagekitio-react/dist/types/components/IKUpload/props"
//import { IKUpload, IKUploadResponse } from "@imagekit/next";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { IKUploadProps } from "imagekitio-react/dist/types/components/IKUpload/props";
import { IKUpload } from "imagekitio-react";

interface FileUploadProps {
    // ha type ahe res cha IKUploadResponse --> pn to yet nahi ahe
  onSuccess: (res:unknown) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {


  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // errror la handle krt ahe
  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  // success cha type
  const handleSuccess = (response:unknown) => {
    console.log("uploading file response=>",response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };


  // file sathi validation lavle 
  const validateFile = (file: File) => {

    if (fileType === "video") {
        // video nasel tr validation lav
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }

      // file size wr validation lavle --> 100MB peksha motha asel tr show error 
      if (file.size > 100 * 1024 * 1024) {
        setError("Video size must be less than 100MB");
        return false;
      }

    } else {

        // img chya type cha arrya banavla 
      const validTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or WebP)");
        return false;
      }
      // img size wr validation
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return false;
      }
    }
    // he sodun kahi support nahi krt tysathi false return kel 
    return false; // true
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        onUploadProgress={handleProgress}
        accept={fileType === "video" ? "video/*" : "image/*"}
        validateFile={validateFile}
        useUniqueFileName={true}
        folder={fileType === "video" ? "/videos" : "/images"}

        className="file-input file-input-bordered w-full"
      />

        {/* conditonal rendering */}
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading...</span>
        </div>
      )}

      {/* if error alyave he dakhavto --? text-error ==> daizy Ui warun ghetle */}
      {error && <div className="text-error text-sm">{error}</div>}

    </div>
  );
}