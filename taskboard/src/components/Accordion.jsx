import { useState } from "react";

// Lab 4.1: Accordion with independently controlled items and Show all/Hide all.
const items = [
  { id: "state", title: "What is state?", body: "Data a component remembers between renders." },
  { id: "props", title: "What are props?", body: "Read-only inputs passed in by the parent." },
  { id: "events", title: "What is an event handler?", body: "A function React calls when something happens." },
];

function Accordion() {
  const [openIds, setOpenIds] = useState([]);
  const allOpen = openIds.length === items.length;
  function toggle(id) {
    setOpenIds((previousIds) => previousIds.includes(id)
      ? previousIds.filter((openId) => openId !== id)
      : [...previousIds, id]);
  }
  return (
    <section className="accordion" aria-label="State and interactivity questions">
      <button className="accordion-toggle-all" type="button" onClick={() => setOpenIds(allOpen ? [] : items.map((item) => item.id))}>{allOpen ? "Hide all" : "Show all"}</button>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return <div className="accordion-item" key={item.id}>
          <button type="button" aria-expanded={isOpen} onClick={() => toggle(item.id)}>{item.title}</button>
          {isOpen && <p>{item.body}</p>}
        </div>;
      })}
    </section>
  );
}

export default Accordion;