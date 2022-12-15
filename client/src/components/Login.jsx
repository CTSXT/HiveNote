import React, { useState } from "react";

function Login(props) {
  const [note, setNote] = useState({
    username: "",
    password: "",
  });

  const [isExpanded, expandHandler] = useState(false);

  function expander() {
    expandHandler(true);
    console.log("Click");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      {!isExpanded ? (
        <button
          onClick={expander}
          type="button"
          className="login btn btn-warning btn-lg  "
        >
          Login
        </button>
      ) : (
        <form className="loginField">
          <input
            name="username"
            onChange={handleChange}
            value={note.title}
            placeholder="Username"
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={note.title}
            placeholder="Password"
          />
          <button
            onClick={submitNote}
            type="button"
            className=" btn btn-warning   "
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;
