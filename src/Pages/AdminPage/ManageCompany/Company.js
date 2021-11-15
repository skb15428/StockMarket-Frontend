import React from "react";
import axios from "axios";

import Navbar from "../Navbar";
import CompanyTable from "./CompanyTable";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Company = () => {
  const [company, setCompany] = React.useState({
    id:null,
    name: "",
    description: "",
    valuation: 0,
  });
  const [exchanges, setExchanges] = React.useState([]);
  const [selectedExchange, setSelectedExchange] = React.useState("");
  const [isEdit,setIsEdit] = React.useState(false);
  // const [companies,setCompanies] = React.useState([]);

  // eslint-disable-next-line
  React.useEffect(async () => {
    let res = await axios.get("http://localhost:9090/exchange");
    setExchanges([...res.data]);
  }, []);


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "exchange") {
      setSelectedExchange(value);
    } else {
      setCompany((prev) => ({ ...prev, [name]: value }));
    }
  };
 
  const handleSubmit = async (e) => {
    // e.preventDefault();

    let res = await axios.get(
      "http://localhost:9090/exchange/name/" + selectedExchange
    );
    let comp;
    if (isEdit === false) {
      comp = {...company, id : Math.round(Math.random() * 10000),exchanges:[{...res.data}]};
    } else {
      comp = {...company,exchanges:[{...res.data}]};
      setIsEdit(false);
    }
    console.log("comp",comp);
    await axios.post("http://localhost:9090/company", comp);
    setCompany({
      name: "",
      description: "",
      valuation: 0,
    });
    setSelectedExchange('');
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
              value={company.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={company.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="value" className="form-label">
              Valuation
            </label>
            <input
              type="number"
              className="form-control"
              name="valuation"
              value={company.valuation}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="exchange">Exchange</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="exchange"
                  name="exchange"
                  value={selectedExchange}
                  label="Exchange"
                  onChange={handleChange}
                >
                  {exchanges.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add Company
            </button>
          </div>
        </form>
      </div>
      <br/>
      <br/>
      <CompanyTable setCompany={setCompany} setSelectedExchange={setSelectedExchange} setIsEdit={setIsEdit}/>
    </div>
  );
};

export default Company;
