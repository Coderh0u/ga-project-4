import React, { useRef, useState } from "react";
import useUpload from "../custom_hooks/upload";

const FileUpload = () => {
  const [files, setFiles] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadImage = useUpload();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    const res = await uploadImage(files!);
    if (res.ok) {
      console.log(res);
    }
  };

  if (files)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          border: "3px dashed rgb(117, 112, 112)",
          padding: "20px",
        }}
      >
        <p style={{ textAlign: "center" }}>{files.name}</p>
        <div>
          <button onClick={() => setFiles(null)}>Cancel</button>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    );

  return (
    <>
      {!files && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            border: "3px dashed rgb(117, 112, 112)",
            padding: "20px",
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h2>Add Your Image File Here</h2>
          <h2>OR</h2>
          <input
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files && e.target.files[0];
              if (selectedFile) {
                setFiles(selectedFile);
              }
            }}
            hidden
            ref={inputRef}
          />
          <button
            style={{ padding: "12px", fontSize: "medium" }}
            onClick={() => inputRef.current?.click()}
          >
            Select File
          </button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
