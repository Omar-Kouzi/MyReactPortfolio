import { useEffect, useState } from "react";
import {
  addProject,
  deleteProject,
  getProjects,
  getSkills,
} from "../assets/dataHandling/firebase/firestore";
import { uploadToCloudinary } from "../assets/dataHandling/cloudinary/uploading";
import { useNavigate } from "react-router-dom";
import { deleteFromCloudinary } from "../assets/dataHandling/cloudinary/deleting";

const Dprojects = () => {
  const [projectData, setProjectData] = useState({
    Title: "",
    Image: [],
    Text: "",
    Link: "",
    Skills: [],
    Type: [""],
  });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* -------------------- FETCHING FUNCTIONS -------------------- */

  const fetchSkills = async () => {
    try {
      const SkillsDoc = await getSkills();
      setSkills(SkillsDoc);
    } catch (error) {
      console.error("Error fetching Skills:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const ProjectsDoc = await getProjects();
      setProjects(ProjectsDoc);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };

  const DeleteProject = async (imageNames, id) => {
    try {
      await Promise.all(
        imageNames.map((imageName) => deleteFromCloudinary(imageName))
      );
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  /* -------------------- INPUT HANDLING FUNCTIONS -------------------- */

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: Array.from(files),
      }));
    } else {
      setProjectData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleAddType = () => {
    setProjectData((prevData) => ({
      ...prevData,
      Type: [...prevData.Type, ""],
    }));
  };

  const handleTypeChange = (index, value) => {
    const newTypes = [...projectData.Type];
    newTypes[index] = value;
    setProjectData((prevData) => ({ ...prevData, Type: newTypes }));
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setProjectData((prevData) => {
      const newSkills = prevData.Skills.includes(value)
        ? prevData.Skills.filter((skill) => skill !== value)
        : [...prevData.Skills, value];
      return { ...prevData, Skills: newSkills };
    });
  };

  /* -------------------- SUBMITTING FORM FUNCTION -------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectData.Image || projectData.Image.length === 0) {
      setError("No images selected");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const imageUrls = await uploadToCloudinary(projectData.Image);
      const ProjectToSave = { ...projectData, Image: imageUrls };
      await addProject(ProjectToSave);

      setProjectData({
        Title: "",
        Image: [],
        Text: "",
        Link: "",
        Skills: [],
        Type: [""],
      });
    } catch (error) {
      console.error("Error adding Project:", error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      fetchProjects();
    }
  };

  /* -------------------- NAVIGATION FUNCTION -------------------- */

  const handleItemClick = (projectid) => {
    navigate(`/project/${projectid}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="Create-Project-Form">
        <div className="Create-Project-Input-div">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="Title"
            value={projectData.Title}
            onChange={handleChange}
          />
        </div>
        <div className="Create-Project-Input-div">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="Text"
            value={projectData.Text}
            onChange={handleChange}
          />
        </div>
        <div className="Create-Project-Input-div">
          <label htmlFor="Link">Link</label>
          <input
            type="text"
            id="Link"
            name="Link"
            value={projectData.Link}
            onChange={handleChange}
          />
        </div>
        {/* Skills selection using checkboxes */}
        <div>
          <p>Skills</p>
          <div className="Custom-Dropdown">
            <button className="Dropdown-Button" type="button">
              Select Skills
            </button>
            <div className="Dropdown-Menu">
              {skills.map((skill) => (
                <label key={skill.id}>
                  <input
                    type="checkbox"
                    value={skill.id}
                    checked={projectData.Skills.includes(skill.id)}
                    onChange={handleSkillChange}
                  />
                  {skill.Title}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label>Type</label>
          {projectData.Type.map((type, index) => (
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
        <div className="Create-Project-Input-div">
          <label>Images</label>
          <input type="file" name="Image" multiple onChange={handleChange} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="Create-Project-Submit"
        >
          {loading ? "Uploading..." : "Add Project"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {/* Display the list of projects */}
      <div className="Dashboard-Skills">
        {projects.map((project) => (
          <div key={project.id} className="Dashboard-SkillRow">
            <img
              src={project.Image[0]}
              alt="project"
              className="Dashboard-SkillRow-Image"
            />
            <p>{project.Title}</p>
            <div className="Dashboard-Skill-Buttons">
              <button onClick={() => DeleteProject(project.Image, project.id)}>
                Delete
              </button>
              <button onClick={() => handleItemClick(project.id)}>
                Show More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dprojects;
