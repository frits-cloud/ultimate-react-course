import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="card">
      <Avatatar />
      <div className="data">
        <Intro />
        <SkillList size="20px" />
      </div>
    </div>
  );
}

function Avatatar() {
  return (
    <div>
      <img className="avatar" src="avatar.png" alt="plaatje"></img>
    </div >
  )
}

const Intro = () => {
  return (
    <div><p>A Cloud Engineer designs, builds, and maintains cloud infrastructure using platforms like AWS, Azure, or GCP. They automate deployments, manage scalability, ensure security, and support high availability. Skilled in tools like Terraform, Kubernetes, and CI/CD pipelines, Cloud Engineers play a key role in helping businesses adopt, optimize, and secure cloud environments for modern application needs.</p></div>
  )
}

const skillList = [{ "skill": "cloud", "color": "red" }, { "skill": "programming", "color": "pink" }]

const SkillList = (props) => {

  return (
    <div>
      <><br /></>
      <>test</>
      <div className="skill">
        {skillList.map((skill) => (
          <ul className="skill-list" style={{ "background-color": skill.color }}> {skill.skill}</ul>
        )
        )
        }


      </div>

    </div >
  )
}

export default App;
