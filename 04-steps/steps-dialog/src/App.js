import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [showDialog, setShowDialog] = useState(true)
  const [dialogStep, setDialogStep] = useState(1)

  function handleButton(direction) {
    if ((dialogStep + direction) >= 0 && (dialogStep + direction) <= 3) {
      setDialogStep(dialogStep + direction)
    }


  }
  function handleCloseButton() {

    setShowDialog(!showDialog)
  }
  return (
    <div className="steps">
      <div className="close" onClick={handleCloseButton}>{`Current  ${dialogStep} `}</div>

      {showDialog ?
        <>
          <div className="numbers">

            <div className={dialogStep >= 1 ? "active" : ""}>1</div>
            <div className={dialogStep >= 2 ? "active" : ""}>2</div>
            <div className={dialogStep >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={dialogStep}>
            <div className="buttons">

              <Button bgColor="#e7e7e7"
                textColor="#333" onClick={() => handleButton(-1)} > Previous</Button>
              <Button bgColor="#e7e7e7"
                textColor="#333" onClick={() => handleButton(1)}>Next</Button>
            </div>
          </StepMessage >
        </>
        : <></>
      }
    </div >
  );
}
function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}
function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;
