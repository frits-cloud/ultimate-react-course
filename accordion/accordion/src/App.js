import "./index.css";
import { Children, useState, UseState } from "react"

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {

  const [curOpen, setCurOpen] = useState(null)
  return (
    <div className="accordion">
      {faqs.map((faq, index) => {
        return (
          <AccordionItem curOpen={curOpen} onCurOpen={setCurOpen} index={index} title={faq.title}>
            {faq.text}
          </AccordionItem>
        )
      })}


    </div>)
    ;
}

function AccordionItem({ index, title, texts, curOpen, onCurOpen, children }) {
  console.log(curOpen)
  const isOpen = index === curOpen;

  const handleToggle = () => {
    onCurOpen(index)
  }
  return (
    <div className={isOpen === true ? "item open" : "item"} onClick={handleToggle} >
      <p className="number">{index + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>

      {isOpen ? <div className="content-box">{children}</div> : ""}
    </div >
  );
}
