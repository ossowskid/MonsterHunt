import "./auth.css";
import { useState } from "react";
import firebase from "firebase/app";
import firebaseApp from "../firebaseConfig";

const db = firebase.firestore();
// const createCharacter = (uid, nickname) => {
//   return db.collection("users").doc(uid).set({
//     exp: 0,
//     nextLevel: 100,
//     name: nickname,
//   });
// };

const createPlayerStats = (uid) => {
  return db.collection("stats").doc(uid).set({
    str: 1,
    agi: 1,
    tough: 1,
    int: 1,
    perc: 1,
    left: 10,
  });
};

const createPlayerResources = (uid) => {
  return db.collection("resources").doc(uid).set({
    gold: 100,
    material: 50,
    wood: 50,
  });
};

const resetFormOnSubmit = (e) => {
  e.target.reset();
};

export const Registration = () => {
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    password: "",
    error: "",
  });

  const { nickname, email, password, error } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(user.nickname, user.password, user.email);
    console.log(user);
    return user;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((token) => {
        token.user.updateProfile({
          displayName: user.nickname,
        });
        console.log(token);
        console.log(token.user.displayName);
        console.log(user.nickname);
        alert(`Witaj w grze ${user.nickname}`);
        // createCharacter(token.user.uid, user.nickname);
        createPlayerStats(token.user.uid);
        createPlayerResources(token.user.uid);
        resetFormOnSubmit(e);
      })
      .catch((error) => {
        console.log("error", error);
        setUser({
          ...user,
          error: error.message,
        });
        console.log(user);
      });
  };

  return (
    <>
      <div className="modal">
        <h2>Zarejestruj się</h2>
        <form
          className="registration__form"
          id="signUp-form"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="nickname">
            Imię postaci:
            <input
              value={nickname}
              type="text"
              className="form__input"
              name="nickname"
              id="nickname"
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="signUp-email">
            Adres email:
            <input
              value={email}
              type="email"
              className="form__input"
              name="email"
              id="signUp-email"
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="signUp-password">
            Hasło:
            <input
              value={password}
              type="password"
              className="form__input"
              name="password"
              id="signUp-password"
              required
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="myButton">
            Utwórz postać!
          </button>
        </form>
        <div>
          Masz konto? <a className="switch">Zaloguj się</a>
        </div>
        <div className="error">
          {" "}
          <p>{error} </p>
        </div>
      </div>
    </>
  );
};