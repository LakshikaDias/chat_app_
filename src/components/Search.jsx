import React, { useState } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    //using this q search query we are going to find user
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      //find the user
      const querySnapshot = await getDocs(q);
      //return the user
      querySnapshot.forEach((doc) => {
        //set the user
        setUser(doc.data());
      });
    } catch (err) {
      setErr(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = () => {
    //check whether the group(chats in firestore) exists, if not create
    //create user chats
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      {err && <span>User not found! </span>}

      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
