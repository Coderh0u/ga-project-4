import React, { useRef, useState } from "react";
import useUpload from "../custom_hooks/upload";

const FileUpload = (props: any) => {
  const [files, setFiles] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<boolean | null>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadImage = useUpload();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    const res = await uploadImage(selectedFile);

    // if (files) {
    //   console.log("files true");
    //   const res = await uploadImage(files!);
    if (res.ok) {
      console.log("uploaded");
      props.setImage(res.data.data.url);
      console.log(res.data.data.url);
      setUploaded(true);
      setFiles(selectedFile);
      // }
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
          <button
            onClick={() => {
              console.log(uploaded);
            }}
          >
            Upload
          </button>
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
            color: "#c20f08",
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h2>Add Your Image File Here</h2>
          <h2 style={{ color: "black" }}>OR</h2>
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
            style={{
              padding: "12px",
              fontSize: "medium",
              backgroundColor: "#c20f08",
              border: "none",
              borderRadius: "10px",
              color: "white",
            }}
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
