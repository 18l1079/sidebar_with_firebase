import React from "react";
import { useState,useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "@firebase/firestore";

export default function Profile(props) {
  const userCollectionRef = collection(db, "user");
  //For Storing the data from database in users array
  const [users, setUsers] = useState([]);
  const [reload,setReload]=useState(false);
  const [firstName,setFirstname]=useState("");
  const [lastName,setLastname]=useState("");
  const [userName,setUsername]=useState("");
  const [email,setEmail]=useState("");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [reload]);

  console.log("Profile")
  console.log(props.user_id);
  console.log(users)

  useEffect(() => {
    users.forEach((users) => {
      if(users.id===props.user_id)
      {
        setFirstname(users.FirstName);
        setLastname(users.LastName);
        setUsername(users.Username);
        setEmail(users.Email);
        console.log("hello")
        console.log(users.FirstName)
      }
    });
  });
  console.log("outside")
console.log(firstName);
console.log(lastName);
console.log(userName);
console.log(email);

  return (
    <div className="profile">
      <div className="profile-container">
        <h2>FirstName : {firstName}</h2>
        <h2>LastName : {lastName}</h2>
        <h2>Username : {userName}</h2>
        <h2>Email : {email}</h2>
      </div>
    </div>
  );
}
