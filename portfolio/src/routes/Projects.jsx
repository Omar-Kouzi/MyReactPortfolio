import { useEffect, useState } from "react";
import { getProjects, getSkills } from "../assets/dataHandling/firebase/firestore";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  // State management for projects, skills, filters, and loading state
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: [],
    skills: [],
    searchTerm: "",
  });
  const [projectTypes, setProjectTypes] = useState([]);
  const navigate = useNavigate();

  /* -------------------- FETCHING FUNCTIONS -------------------- */

  // Fetch all projects from Firestore
  const fetchProjects = async () => {
    try {
      const projectDocs = await getProjects();
      setProjects(projectDocs);
      setFilteredProjects(projectDocs);

      // Extract project types dynamically
      const types = new Set();
      projectDocs.forEach((project) =>
        project.Type.forEach((type) => types.add(type))
      );
      setProjectTypes(["All", ...Array.from(types)]);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all skills from Firestore
  const fetchSkills = async () => {
    try {
      const skillDocs = await getSkills();
      setSkills(skillDocs);
    } catch (error) {
      console.error("Error fetching Skills:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  /* -------------------- FILTERING FUNCTIONS -------------------- */

  // Update filtered projects based on filters
  useEffect(() => {
    let filtered = [...projects];

    if (filter.type.length > 0 && !filter.type.includes("All")) {
      filtered = filtered.filter((project) =>
        filter.type.some((type) => project.Type.includes(type))
      );
    }

    if (filter.skills.length > 0) {
      filtered = filtered.filter((project) =>
        filter.skills.every((skillId) => project.Skills.includes(skillId))
      );
    }

    if (filter.searchTerm.trim() !== "") {
      const searchTermLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.Title.toLowerCase().includes(searchTermLower) ||
          project.Text.toLowerCase().includes(searchTermLower) ||
          project.Type.some((type) =>
            type.toLowerCase().includes(searchTermLower)
          ) ||
          project.Skills.some((skillId) => {
            const skill = skills.find((s) => s.id === skillId);
            return skill && skill.Title.toLowerCase().includes(searchTermLower);
          })
      );
    }

    setFilteredProjects(filtered);
  }, [filter, projects, skills]);

  /* -------------------- INPUT HANDLING FUNCTIONS -------------------- */

  const handleSkillChange = (e) => {
    const skillId = e.target.value;
    setFilter((prev) => {
      const updatedSkills = prev.skills.includes(skillId)
        ? prev.skills.filter((id) => id !== skillId)
        : [...prev.skills, skillId];
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleTypeChange = (type) => {
    setFilter((prev) => {
      let updatedTypes;
      if (type === "All") {
        updatedTypes = prev.type.includes("All") ? [] : ["All"];
      } else {
        updatedTypes = prev.type.includes(type)
          ? prev.type.filter((t) => t !== type)
          : [...prev.type.filter((t) => t !== "All"), type];
      }
      return { ...prev, type: updatedTypes };
    });
  };

  const handleSearchChange = (e) => {
    setFilter((prev) => ({ ...prev, searchTerm: e.target.value }));
  };

  /* -------------------- NAVIGATION FUNCTION -------------------- */

  const handleItemClick = (projectid) => {
    navigate(`/project/${projectid}`);
  };

  /* -------------------- JSX RETURN BLOCK -------------------- */

  if (loading) {
    return <p className="Loading">Loading...</p>;
  }

  return (
    <div className="Projects">
      {/* Filter Controls */}
      <details className="Project-Details">
        <summary>Filter</summary>
        <div className="Filtering-Sorting">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search projects..."
            value={filter.searchTerm}
            onChange={handleSearchChange}
            className="Search-Input"
          />

          {/* Filter by Type */}
          <div className="Custom-Dropdown">
            <button className="Dropdown-Button">Filter Type</button>
            <div className="Dropdown-Menu">
              {projectTypes.map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={filter.type.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Filter by Skills */}
          <div className="Custom-Dropdown">
            <button className="Dropdown-Button">Filter Skills</button>
            <div className="Dropdown-Menu">
              <label>
                <input
                  type="checkbox"
                  value="All"
                  checked={filter.skills.length === 0}
                  onChange={() =>
                    setFilter((prev) => ({ ...prev, skills: [] }))
                  }
                />
                All
              </label>
              {skills.map((skill) => (
                <label key={skill.id}>
                  <input
                    type="checkbox"
                    value={skill.id}
                    checked={filter.skills.includes(skill.id)}
                    onChange={handleSkillChange}
                  />
                  {skill.Title}
                </label>
              ))}
            </div>
          </div>
        </div>
      </details>

      {/* Display Filtered Projects */}
      <div className="Projects-Fetched">
        {filteredProjects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="Home-Project">
              <img
                src={project.Image || ""}
                alt="Project"
                className="Home-Project-Image"
              />
              <p>{project.Title}</p>
              <button onClick={() => handleItemClick(project.id)}>
                More Info
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
