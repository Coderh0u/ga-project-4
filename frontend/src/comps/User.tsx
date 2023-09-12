import React, { useState } from "react";
import useUpload from "../custom_hooks/upload";

const User = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploadRes, setUploadRes] = useState<any | null>(null);

  return <div></div>;
};

export default User;
