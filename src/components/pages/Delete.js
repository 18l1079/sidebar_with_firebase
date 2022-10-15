import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc,getDocs, collection, deleteDoc } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function Delete(props) {
  const userCollectionRef = collection(db, "user");
  //For Storing the data from database in users array
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [reload]);

  console.log("Delete");
  console.log(props.user_id);
  console.log(users);

  useEffect(() => {
    users.forEach((users) => {
      if (users.id === props.user_id) {
        setFirstname(users.FirstName);
        setLastname(users.LastName);
        setUsername(users.Username);
        setEmail(users.Email);
        console.log("hello");
        console.log(users.FirstName);
      }
    });
  });

  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    deleteDoc(userDoc);
  };

  const delete_button = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: "#060b26",
    fontSize: "medium",
    marginTop: "10px",
    padding: "5px",
    borderRadius: "5px",
    borderColor: "white",
    cursor: "pointer",
  };
  return (
    <div className="profile">
      <div className="profile-container">
        <h2>FirstName : {firstName}</h2>
        <h2>LastName : {lastName}</h2>
        <h2>Username : {userName}</h2>
        <h2>Email : {email}</h2>
        <button
          type="submit"
          style={delete_button}
          onClick={() => {
            deleteUser(props.user_id);
            navigate("/login");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
