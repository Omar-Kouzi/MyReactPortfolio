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
  // State management for project data, projects, skills, loading, and error states
  const [projectData, setProjectData] = useState({
    Title: "",
    Image: null,
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

  // Fetch skills from Firestore
  const fetchSkills = async () => {
    try {
      const SkillsDoc = await getSkills();
      setSkills(SkillsDoc);
    } catch (error) {
      console.error("Error fetching Skills:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects from Firestore
  const fetchProjects = async () => {
    try {
      const ProjectsDoc = await getProjects();
      setProjects(ProjectsDoc);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a specific project by ID
  const DeleteProject = (imageName, id) => {
    deleteFromCloudinary(imageName);
    deleteProject(id);
    fetchProjects(); // Refresh the projects list after deletion
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  /* -------------------- INPUT HANDLING FUNCTIONS -------------------- */

  // General input handler for form fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProjectData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setProjectData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Add an empty type field for dynamic input
  const handleAddType = () => {
    setProjectData((prevData) => ({
      ...prevData,
      Type: [...prevData.Type, ""],
    }));
  };

  // Update a specific type field
  const handleTypeChange = (index, value) => {
    const newTypes = [...projectData.Type];
    newTypes[index] = value;
    setProjectData((prevData) => ({ ...prevData, Type: newTypes }));
  };

  // Handle selection/deselection of skills using checkboxes
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

  // Handle project submission with image upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectData.Image) {
      setError("No image selected");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const imageUrl = await uploadToCloudinary(projectData.Image);
      const ProjectToSave = { ...projectData, Image: imageUrl };
      await addProject(ProjectToSave);

      // Reset form data
      setProjectData({
        Title: "",
        Image: null,
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
      fetchProjects(); // Refresh the projects list
    }
  };

  /* -------------------- NAVIGATION FUNCTION -------------------- */

  // Navigate to the project's detailed page
  const handleItemClick = (projectid) => {
    navigate(`/project/${projectid}`);
  };

  /* -------------------- JSX RETURN BLOCK -------------------- */

  return (
    <div>
      {/* Form for adding a new project */}
      <form onSubmit={handleSubmit} className="Create-Skill-Form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="Title"
            value={projectData.Title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="Text"
            value={projectData.Text}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Link">Link</label>
          <input
            type="text"
            id="Link"
            name="Link"
            value={projectData.Link}
            onChange={handleChange}
          />
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

        {/* Skills selection using checkboxes */}
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
          {loading ? "Uploading..." : "Add Project"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {/* Display the list of projects */}
      <div className="Dashboard-Skills">
        {projects.map((project) => (
          <div key={project.id} className="Dashboard-SkillRow">
            <img
              src={project.Image}
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
