export const uploadToCloudinary = async (file) => {
  const url = process.env.REACT_APP_UploadUrl;
  const uploadPreset = process.env.REACT_APP_UploadPreset;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Upload failed: ${response.statusText}. Details: ${errorText}`
      );
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
