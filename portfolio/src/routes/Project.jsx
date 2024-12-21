import { useState, useEffect } from "react";
import {
  getProject,
  getSkills,
} from "../assets/dataHandling/firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project data
        const projectDoc = await getProject(id);
        setProject(projectDoc);

        // Fetch all skills
        const skillsDoc = await getSkills();
        setSkills(skillsDoc);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after both fetches complete
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="Loading">Loading...</div>;
  if (!project) return <div>No project found!</div>;

  // Map project skills to skill details (title and image)
  const skillDetails =
    project.Skills?.map((skillId) => {
      const skill = skills.find((s) => s.id === skillId);
      return skill
        ? { id: skill.id, title: skill.Title, image: skill.Image || null }
        : { title: "Unknown Skill", image: null };
    }) || [];

  const handleItemClick = (skillid) => {
    navigate(`/skill/${skillid}`);
  };
  return (
    <div className="Project-Page">
      <div className="Project-Main-Content">
        <div className="Project-Main-Text">
          <h3>{project.Title}</h3>
          <p className="Project-Text">{project.Text}</p>
          <a href={project.link}>
            <button> Link</button>
          </a>
        </div>
        <a href={project.link}>
          <img
            src={project.Image}
            alt={project.Title}
            className="Project-Main-Image"
          />
        </a>
        <div className="Project-Types">
          <p>Type:</p>
          {project.Type.map((type, index) => (
            <p key={index} className="Project-Type">
              {type}
            </p>
          ))}
        </div>
      </div>
      <div className="Project-Skills-Container">
        <h4>Skills Used:</h4>
        <div className="Project-Skills">
          {skillDetails.map((skill) => (
            <p
              key={skill.id}
              className="Project-Skill"
              onClick={() => handleItemClick(skill.id)}
            >
              {skill.image && (
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="Project-Skill-Image"
                />
              )}
              <span>{skill.title}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
