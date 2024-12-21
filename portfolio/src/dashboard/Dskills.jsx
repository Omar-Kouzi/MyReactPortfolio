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
  });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      setSkillData({ Title: "", Image: null, Text: "" });
    } catch (error) {
      console.error("Error adding skill:", error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
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
  const DeleteSkill = (imageName, id) => {
    deleteFromCloudinary(imageName);
    deleteSkill(id);
    fetchSkills();
  };
  useEffect(() => {
    fetchSkills();
  }, []);
  return (
    <div>
      <form
        name="createSkill"
        onSubmit={handleSubmit}
        className="Create-Skill-Form"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="Title"
            value={skillData.Title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="Text"
            value={skillData.Text}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="Image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Skill"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
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
                delete
              </button>
              <button>show more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dskills;
