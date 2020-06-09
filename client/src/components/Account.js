import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "./../static/icons/edit-2.png";

export default function Account() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/1/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      });
  }, []);

  return (
    <div className="account">
      <div className="account-icon"></div>
      <div className="account-info">
        <p>{user.username}</p>
        <div className="account-divider"></div>
        <p>
          <span>
            {user.first_name} {user.last_name}
          </span>
        </p>
      </div>
      <div className="account-form">
        <Link
          className="account-settings"
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/edit/account/",
            state: {
              id: `${user.id}`,
              username: `${user.username}`,
              email: `${user.email}`,
              first_name: `${user.first_name}`,
              last_name: `${user.last_name}`,
            },
          }}
        >
          <img src={EditIcon} alt="edit-icon-cog"></img><span>Edit Account Details</span>
        </Link>
        <form method="post" className="register-form" action="/account/update">
          <label>E-Mail</label>
          <input
            className="text-input"
            name="email"
            disabled
            defaultValue={user.email}
          ></input>{" "}
          <br></br>
          <label>First Name</label>{" "}
          <input
            className="text-input"
            name="first_name"
            disabled
            defaultValue={user.first_name}
          ></input>{" "}
          <br></br>
          <label>Last Name</label>{" "}
          <input
            className="text-input"
            name="last_name"
            disabled
            defaultValue={user.last_name}
          ></input>
        </form>
      </div>
    </div>
  );
}
