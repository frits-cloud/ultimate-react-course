import { useState } from 'react';
import logo from './logo.svg';
import './styles.css';

function App() {
  const [selected, setSelected] = useState(Number(0))
  return (

    <div className="App">
      <FlashCards selected={selected} setSelected={setSelected} />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook"
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element"
  }
];



function FlashCards(props) {



  const handleClick = (e) => {
    console.log(e.target.id)
    console.log(props.selected)
    if (props.selected === Number(e.target.id)) {
      props.setSelected(Number(0))
    } else {
      props.setSelected(Number(e.target.id))
    }

  }
  return (
    <div className='flashcards' >
      {
        questions.map(question => {
          return <div className={props.selected === question.id ? "selected" : ""} onClick={handleClick} id={question.id}>{question.id === props.selected ? question.answer : question.question}</div>
        }
        )
      }
    </div>
  );
}

export default App;
