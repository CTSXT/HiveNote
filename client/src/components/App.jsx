import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Login from "./Login";

function App() {
  const [login, setLogin] = useState(false);
  const [notes, setNotes] = useState([""]);
  // const [data, setData] = useState([]);

  // // useEffect(() => {
  // //   fetch("/api")
  // //     .then((res) => res.json())
  // //     .then((data) => setData(data.message));
  // // }, []);
  // // console.log(data);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((notes) => setNotes(notes));
  });

  function userLogin(user) {
    console.log(user);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        res.json();
        console.log(res.body.answer);
      })
      .then((answer) => setLogin(answer))
      .catch((err) => console.log(err));
  }

  function addNote(newNote) {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // setNotes((prevNotes) => {
    //   return [...prevNotes, newNote];
    // });
  }

  function deleteNote(id) {
    fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // setNotes((prevNotes) => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
  }
  if (login) {
    return (
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <Login onAdd={userLogin} />
      </div>
    );
  }
}

export default App;

// happy coach quarter ribbon glide panel ostrich transfer craft ridge sketch test
