const useUpload = () => {
  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(
        "https://api.imgbb.com/1/upload?key=64ef0744cf8402f982255abac7596366",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        if (data.status === "error") {
          return { ok: false, data: data.msg };
        } else {
          return { ok: true, data };
        }
      } else {
        if (data?.errors && Array.isArray(data.errors)) {
          const messages = data.errors.map((item: any) => item.msg);
          return { ok: false, data: messages };
        } else if (data?.status === "error") {
          return { ok: false, data: data.msg };
        } else {
          return { ok: false, data: "An error occurred" };
        }
      }
    } catch (error) {
      return { ok: false, data: "An error occurred" };
    }
  };

  return uploadImage;
};

export default useUpload;
