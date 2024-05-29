import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="d-flex w-100 justify-content-center align-items-center bg-light vh-100 overflow-hidden">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h3>Detail of user:</h3>
          <div className="mb-2">
            <strong>Name: {data.name}</strong>
          </div>
          <div className="mb-2">
            <strong>Email: {data.email}</strong>
          </div>
          <div className="mb-2">
            <strong>Phone: {data.phone}</strong>
          </div>
          <NavLink to={`/update/${id}`} className="btn btn-success">
            Edit
          </NavLink>
          <NavLink to={`/`} className="btn btn-primary">
            Back
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Read;
