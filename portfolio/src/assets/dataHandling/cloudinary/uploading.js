export const uploadToCloudinary = async (files) => {
  const url = process.env.REACT_APP_UploadUrl;
  const uploadPreset = process.env.REACT_APP_UploadPreset;

  try {
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      return fetch(url, {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
    });

    const results = await Promise.all(uploadPromises);
    return results.map((result) => result.secure_url);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
