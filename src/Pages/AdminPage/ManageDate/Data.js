import React from "react";
import axios from "axios";

import Navbar from "../Navbar";
import Chart from "./Chart";

const Data = () => {
  const [file, setFile] = React.useState(null);
  const [stockPrices, setStockPrices] = React.useState([]);

  // eslint-disable-next-line
  React.useEffect(async () => {
		// console.log("HI");
    let res = await axios.get("http://localhost:9090/price");
    setStockPrices([...res.data]);

    console.log("stockPrices",stockPrices);
  }, []);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post("http://localhost:9090/price", formData, config)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <form className="mt-3 mx-auto">
          <div className="form-group">
            <label htmlFor="file">Upload File</label>
            <input
              type="file"
              className="form-control-file"
              id="file"
              onChange={handleChange}
            />
            <br />
            <button
              type="submit"
              className="btn btn-sm btn-primary"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      <br />
      <Chart stockPrices={stockPrices} />
    </div>
  );
};

export default Data;
