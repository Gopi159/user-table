import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const userValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};
function Form() {
  const [values, setValues] = useState(userValues);
  const [records, setRecords] = useState([]);
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const clickResetHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      name: "",
      email: "",
      address: "",
      phone: "",
    });
  };
  const clickHandler = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/api/addUser",
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
      },
    }).then((res) => {
      axios.get("http://localhost:8000/api/getUsers").then((response) => {
        setRecords(response.data.data);
      });
    });
  };
  useEffect(() => {
    axios.get("http://localhost:8000/api/getUsers").then((response) => {
      setRecords(response.data.data);
    });
  }, []);

  return (
    <>
      <div>
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={values.name}
          placeholder="Enter Name"
          onChange={changeHandler}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          value={values.email}
          placeholder="Enter Email"
          onChange={changeHandler}
        />
        <br />
        <label>Phone Number</label>
        <br />
        <input
          type="tel"
          name="phone"
          value={values.phone}
          placeholder="Enter Phone Number"
          onChange={changeHandler}
        />
        <br />
        <label>Address</label>
        <br />
        <input
          type="text"
          name="address"
          value={values.address}
          placeholder="Enter Address"
          onChange={changeHandler}
        />
        <br />
        <br />
        <button type="submit" onClick={clickHandler}>
          Add User
        </button>
        <br />
        <button type="reset" onClick={clickResetHandler}>
          Reset
        </button>
        <br />
        <br />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {records.map((data, j) => (
            <tr key={j}>
              <td>{data?.userName}</td>
              <td>{data?.userEmail}</td>
              <td>{data?.userPhone}</td>
              <td>{data?.userAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Form;
