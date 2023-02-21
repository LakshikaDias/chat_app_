import React from "react";

import Add from "../img/addAvatar.png";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { doc, setDoc } from "firebase/firestore";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //response
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log("File available at", downloadURL);

            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create users collection
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create userChats collection
            await setDoc(doc(db, "userChats", res.user.uid), {});

            //after completing task navigate to the omepage
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Dias Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file"></input>
          <label htmlFor="file">
            <img src={Add} alt=""></img>
            <span>Add an Avatar</span>
          </label>

          <button>Sign up</button>

          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
