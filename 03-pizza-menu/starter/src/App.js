import logo from './logo.svg';
import PizzaData from './data.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pizza Menu</h1>
      <Menu />
    </div>
  );
}



function Menu() {


  return (
    <div className="menu">
      Menu
      <div className="pizzas">

        {PizzaData.map((pizza) => (
          <Pizza name={pizza.name} ingredients={pizza.ingredients} photoName={pizza.photoName} />
        ))
        }
      </div>
    </div>
  )
}

function Pizza(props) {

  return (
    <div className="pizza">

      <img src={props.photoName} alt="pizza" />
      <h3>{props.name}</h3><br /><br />
      <p>ingredients: {props.ingredients}</p>
    </div>
  )
}

export default App;
