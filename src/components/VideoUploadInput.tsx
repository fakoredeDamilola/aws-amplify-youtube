import React, { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

type VideoUploadInputProps = {
  onChange: (file: File | null) => void;
  maxSizeMB?: number;
  disabled?: boolean;
};

const VideoUploadInput: React.FC<VideoUploadInputProps> = ({
  onChange,
  maxSizeMB = 50,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      onChange(null);
      return;
    }

    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      return;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`Video must be less than ${maxSizeMB}MB.`);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange(file);
  };

  return (
    <div className="w-full">
      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        hidden
        disabled={disabled}
        onChange={handleFileChange}
      />

      {/* Custom trigger */}
      <button 
        type="button" 
        onClick={handleClick} 
        disabled={disabled}
        className="w-full px-4 py-3 border border-blue-600 text-blue-600 flex items-center justify-center font-medium rounded-lg hover:bg-blue-600 hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
       <FiUploadCloud className="mr-2" /> Upload Video
      </button>

      {/* Error */}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {/* Preview */}
      {previewUrl && (
        <video
          src={previewUrl}
          controls
          className="w-full h-[200px] mt-4 rounded-lg"
        />
      )}
    </div>
  );
};

export default VideoUploadInput;
