import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import styles from "./Profile.module.css"

function ProfilePage() {
  const {user} = useContext(AuthContext)

  return (
    <>
      <div className={styles["profile-container"]}>
        <h1 className={styles["profile-header"]}>User information</h1>
        <p><strong>Gebruikersnaam:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </>
  )
}

export default ProfilePage;