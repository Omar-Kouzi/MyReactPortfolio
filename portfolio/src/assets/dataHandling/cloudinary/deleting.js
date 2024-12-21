import sha256 from "js-sha256";

export const deleteFromCloudinary = async (publicId) => {
  const Url = process.env.REACT_APP_DestroyUrl;
  const APIKey = process.env.REACT_APP_APIKey;
  const APISecret = process.env.REACT_APP_APISecret;

  if (!Url || !APIKey || !APISecret) {
    throw new Error("Missing required environment variables.");
  }

  const urlParts = publicId.split("/");
  const publicIdWithVersion = urlParts.slice(-2).join("/");
  const publicIdWithoutVersion = publicIdWithVersion.replace(/v\d+\//, "");
  const cleanedPublicId = publicIdWithoutVersion.split(".")[0];

  const timestamp = Math.floor(Date.now() / 1000);

  try {
    // Generate the signature
    const signatureString = `public_id=${cleanedPublicId}&timestamp=${timestamp}${APISecret}`;
    const signature = sha256(signatureString);
    // Prepare the form data for cloudinary delete API
    const formData = new FormData();
    formData.append("public_id", cleanedPublicId);
    formData.append("timestamp", timestamp);
    formData.append("api_key", APIKey);
    formData.append("signature", signature);

    // Send the delete request to cloudinary
    const response = await fetch(Url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(` delete failed: ${errorText}`);
    }

    const data = await response.json();
    return data.result === "ok";
  } catch (error) {
    throw error;
  }
};
