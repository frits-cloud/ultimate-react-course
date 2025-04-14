import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar><Search />
      </NavBar>
      <Main>
        <LeftPane />
        <RightPane />
      </Main>

    </div>
  );
}

const Search = () => {
  return <input type="text"></input>
}

const NavBar = ({ children }) => {
  return (
    <div className="navbar">{children}</div>
  )
}

const Main = ({ children }) => {
  return (
    <div className="main">

      {children}
    </div>
  )
}

const LeftPane = () => {
  return (<div className="left-pane">
    <h1>Countries</h1>
  </div>)
}
const RightPane = () => {
  return (<div className="right-pane">
    <h1>Details</h1>
  </div>)
}
export default App;
