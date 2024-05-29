import React, { useEffect, useState } from "react";
// import { context } from "./lib/context";
import "./style.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  // const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirm = window.confirm("Удалить?");
    if (confirm) {
      axios
        .delete("http://localhost:3000/users/" + id)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div className="d-flex flex-column flex-col justify-content-center align-items-center bg-light  overflow-scrool">
        <h1>List users</h1>
        <div className="users">
          <div className="add-button  d-flex justify-content-end">
            <NavLink to={"/create"} className="btn btn-success ">
              Add +
            </NavLink>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, index) => (
                <tr key={index}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td>
                    <NavLink
                      to={`/read/${el.id}`}
                      className="edit-button btn btn-primary"
                    >
                      Read
                    </NavLink>
                    <NavLink
                      to={`/update/${el.id}`}
                      className="btn btn-success"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={(e) => handleDelete(el.id)}
                      className="delete-button btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
