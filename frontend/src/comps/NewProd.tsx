import React, { useState } from "react";
import useUpload from "../custom_hooks/upload";

const NewProd = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any | null>(null);

  const uploadImg = useUpload();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (image) {
      const res = await uploadImg(image);
      setUploadResult(res);
    }
  };
  return (
    <>
      <h2>Image upload</h2>
      <input type="file" accept="image/*" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
      {uploadResult && (
        <div>
          {uploadResult.ok ? (
            <p>Image uploaded successfully.</p>
          ) : (
            <p>Error: {uploadResult.data}</p>
          )}
        </div>
      )}
    </>
  );
};

export default NewProd;
