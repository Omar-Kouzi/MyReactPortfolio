import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../assets/dataHandling/firebase/auth"; // Import your auth methods

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(); // Google Sign-In
      localStorage.Loggedin = true;
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <br /><br /><br />
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
};

export default Login;
