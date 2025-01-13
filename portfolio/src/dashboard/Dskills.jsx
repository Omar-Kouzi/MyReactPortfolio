import { useEffect, useState } from "react";
import {
  addSkill,
  deleteSkill,
  getSkills,
} from "../assets/dataHandling/firebase/firestore";
import { uploadToCloudinary } from "../assets/dataHandling/cloudinary/uploading";
import { deleteFromCloudinary } from "../assets/dataHandling/cloudinary/deleting";

const Dskills = () => {
  const [skillData, setSkillData] = useState({
    Title: "",
    Image: null,
    Text: "",
    Type: [""], // Add Type field
  });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch skills from Firestore
  const fetchSkills = async () => {
    try {
      const skillsDoc = await getSkills();
      setSkills(skillsDoc);
    } catch (error) {
      console.error("Error fetching Skills:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes for skill fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setSkillData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setSkillData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle type field input
  const handleAddType = () => {
    setSkillData((prevData) => ({
      ...prevData,
      Type: [...prevData.Type, ""],
    }));
  };

  // Update a specific type field
  const handleTypeChange = (index, value) => {
    const newType = [...skillData.Type];
    newType[index] = value;
    setSkillData((prevData) => ({ ...prevData, Type: newType }));
  };

  // Handle skill submission with image upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!skillData.Image) {
      setError("No image selected");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const imageUrl = await uploadToCloudinary(skillData.Image);
      const skillToSave = { ...skillData, Image: imageUrl };
      await addSkill(skillToSave);
      fetchSkills();
      // Reset form data
      setSkillData({ Title: "", Image: null, Text: "", Type: [""] });
    } catch (error) {
      console.error("Error adding skill:", error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete a specific skill by ID
  const DeleteSkill = (imageName, id) => {
    deleteFromCloudinary(imageName);
    deleteSkill(id);
    fetchSkills(); // Refresh the skills list after deletion
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      {/* Form for adding a new skill */}
      <form onSubmit={handleSubmit} className="Create-Skill-Form">
        <div className="Create-Skill-Input-div">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="Title"
            value={skillData.Title}
            onChange={handleChange}
          />
        </div>
        <div className="Create-Skill-Input-div">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="Text"
            value={skillData.Text}
            onChange={handleChange}
          />
        </div>

        {/* Type input */}
        <div className="Create-Skill-Input-div">
          <label>Type</label>
          {skillData.Type.map((type, index) => (
            <div key={index}>
              <input
                type="text"
                value={type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddType}>
            Add Type
          </button>
        </div>

        <div className="Create-Skill-Input-div">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="Image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading} className="Create-Skill-Submit">
          {loading ? "Uploading..." : "Add Skill"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {/* Display the list of skills */}
      <div className="Dashboard-Skills">
        {skills.map((skill) => (
          <div key={skill.id} className="Dashboard-SkillRow">
            <img
              src={skill.Image}
              alt="Skill"
              className="Dashboard-SkillRow-Image"
            />
            <p>{skill.Title}</p>
            <div className="Dashboard-Skill-Buttons">
              <button onClick={() => DeleteSkill(skill.Image, skill.id)}>
                Delete
              </button>
              <button>Show More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dskills;
