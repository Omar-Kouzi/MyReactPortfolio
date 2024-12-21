import { signInWithGoogle } from "../assets/firebase/auth";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;




// cloudinary usage

import { uploadToCloudinary, setProject } from "../assets/firebase/firestore";

const addProject = async (projectData, imageFile) => {
  try {
    // Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Add project to Firestore
    await setProject(projectData.id, { ...projectData, Image: imageUrl });

  } catch (error) {
    console.error("Error adding project:", error);
  }
};

