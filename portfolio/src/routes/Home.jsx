import React, { useEffect, useState } from "react";
import {
  getAbouts,
  getProjects,
  getSkills,
} from "../assets/dataHandling/firebase/firestore.js"; // Adjust the import path
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [about, setAbout] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const docs = await getAbouts();
        setAbout(docs[0]);
      } catch (error) {
        console.error("Error fetching about documents:", error);
      }
    };

    const fetchSkills = async () => {
      try {
        const docs = await getSkills();
        setSkills(docs);
      } catch (error) {
        console.error("Error fetching skills documents:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchProjects = async () => {
      try {
        const docs = await getProjects();
        setProjects(docs);
      } catch (error) {
        console.error("Error fetching skills documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    fetchAbouts();
    fetchSkills();
  }, []);

  const getRandomSkills = (skillsArray) => {
    if (!skillsArray || skillsArray.length === 0) return [];
    const shuffled = skillsArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };
  const getRandomProjects = (projectsArray) => {
    if (!projectsArray || projectsArray.length === 0) return [];
    const shuffled = projectsArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  if (loading) {
    return <p className="Loading">Loading...</p>;
  }

  const displayedSkills = getRandomSkills(skills);
  const displayedProjects = getRandomProjects(projects);
  const handleProjectClick = (projectid) => {
    navigate(`/project/${projectid}`);
  };
  const handleProjectsClick = () => {
    navigate(`/projects`);
  };
  const handleSkillsClick = () => {
    navigate(`/skills`);
  };
  return (
    <section className="Home">
      <div>
        <h3>About</h3>
        <div key={about.id} className="Home-About-Content">
          <div className="Home-About-Text-Content">
            <p className="Home-About-Text">{about.Text}</p>
            <p className="Home-About-RandomBoy">Random boy</p>
          </div>
          <img
            src={about.Image || ""}
            alt="About"
            className="Home-About-Image"
          />
        </div>
      </div>
      <div>
        <h3>Skills</h3>
        <div className="Home-Skills-Projects-Content">
          <div className="Home-Skills">
            {displayedSkills.length === 0 ? (
              <p>No skills available.</p>
            ) : (
              displayedSkills.map((skill) => (
                <div key={skill.id} className="Home-Skill">
                  <img
                    src={skill.Image || ""}
                    alt="Skill"
                    className="Home-Skill-Image"
                  />
                  <p>{skill.Title}</p>
                </div>
              ))
            )}
          </div>
          <button
            className="Home-Skill-Showmore"
            onClick={() => handleSkillsClick()}
          >
            Show More
          </button>
        </div>
      </div>
      <div>
        <h3>Projects</h3>
        <div className="Home-Skills-Projects-Content">
          <div className="Home-Skills">
            {displayedProjects.length === 0 ? (
              <p>No projects available.</p>
            ) : (
              displayedProjects.map((project) => (
                <div key={project.id} className="Home-Project">
                  <img
                    src={project.Image || ""}
                    alt="Project"
                    className="Home-Project-Image"
                  />
                  <p>{project.Title}</p>
                  <button onClick={() => handleProjectClick(project.id)}>
                    More Info
                  </button>
                </div>
              ))
            )}
          </div>
          <button
            className="Home-Projects-Showmore"
            onClick={() => handleProjectsClick()}
          >
            Show More
          </button>
        </div>
      </div>
      <div className="Contact"></div>
    </section>
  );
};

export default Home;
