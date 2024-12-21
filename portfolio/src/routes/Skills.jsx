import { useEffect, useState } from "react";
import { getSkills } from "../assets/dataHandling/firebase/firestore";
// import { useNavigate } from "react-router-dom";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skillTypes, setSkillTypes] = useState([]);
  const [filter, setFilter] = useState({ type: "All", skills: [] });
  // const navigate = useNavigate();

  const fetchSkills = async () => {
    try {
      const skillDocs = await getSkills();
      setSkills(skillDocs);
      setFilteredSkills(skillDocs);
      const types = new Set();
      skillDocs.forEach((skill) =>
        skill.Type.forEach((type) => types.add(type))
      );
      setSkillTypes(["All", ...Array.from(types)]);
    } catch (error) {
      console.error("Error fetching Skills:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSkills();
  }, []);
  useEffect(() => {
    let filtered = [...skills];

    if (filter.type !== "All") {
      filtered = filtered.filter((skill) => skill.Type.includes(filter.type));
    }

    setFilteredSkills(filtered);
  }, [filter, skills]);

  if (loading) {
    return <p className="Loading">Loading...</p>;
  }

  // const handleItemClick = (skillid) => {
  //   navigate(`/skill/${skillid}`);
  // };

  return (
    <div className="Skills">
      <div>
        <h3>Skills</h3>
        <details className="Project-Details">
          <summary>Filter</summary>
          <div className="Filtering-Sorting">
            <select
              value={filter.type}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, type: e.target.value }))
              }
              className="Filter-Dropdown"
            >
              {skillTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select> 
          </div>
        </details>
      </div>

      <div className="Projects-Fetched">
        {filteredSkills.length === 0 ? (
          <p>No skills available.</p>
        ) : (
          filteredSkills.map((skill) => (
            <div key={skill.id} className="Home-Project">
              <img
                src={skill.Image || ""}
                alt="Skill"
                className="Skills-Skill-Image"
              />
              <p>{skill.Title}</p>
              {/* <button onClick={() => handleItemClick(skill.id)}>
                More Info
              </button> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Skills;
