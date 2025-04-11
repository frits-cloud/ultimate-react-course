
import './App.css';
import { useState } from 'react';

function App() {
  const [riskList, setRiskList] = useState([]);

  function handleDeleteRisk(id) {
    console.log(id)
    setRiskList(riskList.filter((risk) => risk.id !== id))
  }

  return (
    <div className="container">
      <h1>Risk list</h1>
      <RiskCounter risksCount={riskList.length} />
      <RiskForm setRiskList={setRiskList} />
      <RiskList riskList={riskList} handleDeleteRisk={handleDeleteRisk} />
    </div>
  );
}


const RiskCounter = ({ risksCount }) => {
  return (
    <div class="risk-counter">
      Total Risks: <span id="riskCount">{risksCount}</span>
    </div>
  )
}

function RiskForm({ setRiskList }) {

  const [riskType, setRiskType] = useState('low');
  const [riskName, setRiskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    setRiskList(risks => [...risks, {
      id: Date.now().toString(),
      name: riskName,
      type: riskType
    }])

    e.target.name.value = '';
    e.target.type.value = 'low';
  }
  const handleChangeName = (e) => {
    console.log(e.target.value)
    setRiskName(e.target.value)
  }
  const handleChangeType = (e) => {
    console.log(e.target.value)
    setRiskType(e.target.value)
  }

  return (
    <div className="risk-form">
      <form onSubmit={handleSubmit}  >
        <label for="name">Risk name:</label>
        <input id="name" type="text" onChange={handleChangeName} ></input>
        <label for="type">    Risk type:</label>
        <select name="type" id="type-select" onChange={handleChangeType}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="submit" value="Add"></input>
      </form>
    </div>
  )
}
function RiskList({ riskList, handleDeleteRisk }) {

  return (
    <div className="risk-list">
      {riskList.map((risk, index) => {

        console.log(risk.type)

        return (
          <span>
            <div className={`risk-card risk-level-${risk.type.toLowerCase()}`} key={index} >{risk.name} <button onClick={() => handleDeleteRisk(risk.id)} className='delete-button'>delete</button></div>

          </span>

        )

      }
      )}

    </div>
  )
}

export default App;
