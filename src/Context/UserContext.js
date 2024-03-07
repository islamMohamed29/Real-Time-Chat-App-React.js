import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { allUsersRoute, getUser } from "../utils/ApiRoutes";
import axios from "axios";

export const UserContext = createContext();
function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  function savedUserData() {
    let userToken = localStorage.getItem("chat-app-user");
    let decToken = jwtDecode(userToken);
    setCurrentUser(decToken);
    getUserProfile();
    if (currentUser !== undefined) {
      getContacts();
    }
  }

  async function getUserProfile() {
    if (currentUser) {
      let response = await axios.get(`${getUser}/${currentUser._id}`);
      if (response.data.status === "success") {
        setUserProfile(response.data.user[0]);
      }
    }
  }
  async function getContacts() {
    let response;
    if (currentUser) {
      response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    }
    if (response?.data.status === "success") {
      setContacts(response.data.users);
    }
  }
  useEffect(() => {
    //
    if (localStorage.getItem("chat-app-user")) {
      savedUserData();
    }
    getContacts();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        savedUserData,
        setCurrentUser,
        contacts,
        getContacts,
        userProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
