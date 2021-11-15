import React from "react";
import axios from "axios";

import Navbar from "../Navbar";
import ExchangeTable from "./ExchangeTable";

const Exchange = () => {
  const [exchange, setExchange] = React.useState({
    id: null,
    name: "",
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const handleSubmit = async () => {
		let temp;
    if (isEdit) {
			temp={...exchange,id:exchange.id, name: exchange.name};
			setIsEdit(false);
    } else {
      temp = {...exchange, id: Math.random() * 1000, name: exchange.name };
    }

    let res = await axios.post("http://localhost:9090/exchange", temp);

    console.log("res", res);

    setExchange({
      id: null,
      name: "",
    });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setExchange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-auto" style={{ width: "80%" }}>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={exchange.name}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add Exchange
            </button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <ExchangeTable setExchange={setExchange} setIsEdit={setIsEdit}/>
    </div>
  );
};

export default Exchange;
