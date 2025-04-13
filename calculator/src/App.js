import './index.css';
import { useState } from 'react'

const imglink = "https://media.istockphoto.com/id/507995592/photo/pensive-man-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=fVoaIqpHo07YzX0-Pw51VgDBiWPZpLyGEahSxUlai7M="


function App() {
  const [splitBIllFormOpen, setSplitBIllFormOpen] = useState(false)
  const [friendSelected, setFriendSelected] = useState(null)
  const [friendList, setFriendList] = useState([{ key: "1", name: "Marloes", "image": imglink, balance: 0 }, { key: "2", name: "Marc", "image": imglink, balance: 0 }, { key: "3", name: "Frits", "image": imglink, balance: 0 }])

  return (
    <div className="app">
      <FriendList setSplitBIllFormOpen={setSplitBIllFormOpen} friendSelected={friendSelected} setFriendSelected={setFriendSelected} friendList={friendList}>
        <AddFriend friendList={friendList} setFriendList={setFriendList} setFriendSelected={setFriendSelected} />
      </FriendList>
      <Splitbill splitBIllFormOpen={splitBIllFormOpen} friendList={friendList} friendSelected={friendSelected} setFriendList={setFriendList} />
    </div>
  );
}

function Splitbill({ splitBIllFormOpen, friendSelected, friendList, setFriendList }) {
  const [billValue, setBillValue] = useState(0)
  const [billValueMyPart, setBillValueMyPart] = useState(0)
  const friend = friendList.find((friend) => friend.key === friendSelected)
  if (friendSelected === null) {
    return <></>
  }
  const options = ['You', friend.name];

  function handleSplitBill(e) {
    e.preventDefault();
    const newFriendList = friendList.slice()
    console.log(friendSelected)
    const updatedNewFriendlist = newFriendList.map((friend) => {
      return (
        friend.key === friendSelected ? { ...friend, balance: (friend.balance + (billValue - billValueMyPart)) } : friend
      )
    })
    console.log(updatedNewFriendlist)
    setFriendList(updatedNewFriendlist)
  }

  return (
    splitBIllFormOpen ? (
      <div className='form-split-bill'>

        <form className='form-split-bill' onSubmit={handleSplitBill} >
          <h2>Split a bill with {friend.name}</h2>
          <label value="dsd" name='billValue' for="billValue">Bill value</label>
          <input value={billValue} onChange={(e) => setBillValue(Number(e.target.value))} name='billValue' type="Number"></input>
          <label value="dsd" name='yourExpense' for="yourExpense">Your expense</label>
          <input value={billValueMyPart} onChange={(e) => setBillValueMyPart(Number(e.target.value))} name='yourExpense' type="Number"></input>
          <label name='yourExpense' for="friendExpense">{friend.name} expense</label>
          <input readOnly={true} value={billValue - billValueMyPart} name='friendExpense' type="Number"></input>
          <label name='whoPaysTheBill' for="whoPaysTheBill">Who is paying the bill</label>
          <select name="friendExpense" value="Dinner">
            {options.map(option => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
          <button className='button'>Split</button>
        </form>
      </div>
    ) : <></>
  )
}

function AddFriend({ friendList, setFriendList, setFriendSelected }) {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const toggleMenu = () => {
    setFormIsOpen(!formIsOpen)
  }
  function handleNameChange(e) {
    setName(e.target.value)

  }
  function handleUrlChange(e) {
    setUrl(e.target.value)
  }
  const handleAddFriend = (e) => {
    e.preventDefault();
    const friend = { key: Date.now().toString(), name: name, image: imglink, balance: 0 }
    setFriendList([...friendList, friend])
    setName("")
    setUrl("url")
    setFormIsOpen(!formIsOpen)
    setFriendSelected(null)
  }

  return (
    <div >
      {formIsOpen ? (
        <form className="form-add-friend" onSubmit={handleAddFriend}>
          <label for="name">First Name</label>
          <input value={name} onChange={handleNameChange} name="name" type="text"></input>
          <label for="url">Image URL</label>
          <input value={url} onChange={handleUrlChange} name="url" type="text"></input>
          <button className="button">Add</button>
        </form>) : <></>}
      <button onClick={toggleMenu} className="button">{formIsOpen ? "Close" : "Add friend"}</button>
    </div>
  )
}

function getBalanceText(friend) {
  console.log(friend.balance)
  if (friend.balance === Number(0)) {
    return `You and ${friend.name} are even`
  } else if (friend.balance > 0) {
    return `${friend.name} owes you ${friend.balance}€`
  } else if (friend.balance < 0) {
    return `You owe ${friend.name} ${friend.balance}€`
  }
}

function FriendList({ setSplitBIllFormOpen, friendList, children, friendSelected, setFriendSelected }) {
  const handleSetFriendSelected = (id) => {
    setFriendSelected(id)
    setSplitBIllFormOpen(true)
  }

  return (
    <div className="sidebar">
      <ul >
        {friendList.map((friend) => {
          return (
            < li key={friend.key} className={friendSelected === friend.key ? "sidebar selected" : "sidebar"
            }>
              <img src={friend.image} alt="pho"></img>
              <h3>{friend.name}</h3>
              <p>{getBalanceText(friend)} </p>
              <button onClick={() => handleSetFriendSelected(friend.key)} className="button">Select</button></li>
          )
        })
        }
        {children}
      </ul>
    </div >
  )
}

export default App;
