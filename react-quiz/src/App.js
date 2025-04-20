import { useReducer, useEffect } from "react"
import Header from "./Header"
import Main from "./Main"

function reducer(state, action) {
    switch (action.type) {
        case "load":
            console.log("load initial data")

            return {
                ...state,
                state: "loaded",
                questions: action.payload
            }
        default:
            console.error("Unknown dispatch action")
    }
}

const initialState = {
    state: "start",
    questions: []
}

export default function App() {
    const [state, dispatcher] = useReducer(reducer, initialState)

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatcher({ type: "load", payload: data }))
            .catch((err) => console.error("Error"))
    }, [])

    return (<div>
        <Header />
        <Main>
            <p>1/15</p>
            <p>Question</p>
        </Main>
    </div>)
}