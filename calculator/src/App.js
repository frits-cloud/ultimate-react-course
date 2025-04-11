import './index.css';

function App() {
  return (
    <div className="app">
      <FriendList children={<AddFriend />} />

    </div>
  );
}

function AddFriend() {
  return (
    <div className="form-add-friend">
      <form>
        <label for="name">Name</label>
        <input name="name" type="text"></input>
      </form>
    </div>
  )
}

function FriendList({ children }) {
  const imglink = "https://media.istockphoto.com/id/507995592/photo/pensive-man-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=fVoaIqpHo07YzX0-Pw51VgDBiWPZpLyGEahSxUlai7M="
  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar"><img src={imglink} alt="pho"></img><h3>Paul</h3><button className="button">Select</button></li>
        <li className="sidebar"><img src={imglink} alt="pho"></img><h3>Messi</h3><button className="button">Select</button></li>
        <li className="sidebar"><img src={imglink} alt="pho"></img><h3>Frits</h3><button className="button">Select</button></li>
        {children}
      </ul>
    </div>
  )
}

export default App;
