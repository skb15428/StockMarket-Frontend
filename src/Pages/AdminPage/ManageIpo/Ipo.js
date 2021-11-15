import React from "react";
import axios from "axios";
import Navbar from "../Navbar";
import IpoTable from "./IpoTable";

const Ipo = () => {
  const [name, setName] = React.useState("");
  const [ipo, setIpo] = React.useState({
    id:null,
    price: 0,
    lotsize: 0,
    date: "",
  });
  const [isEdit,setIsEdit] = React.useState(false);


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "name") {
      setName(value);
    } else {
      setIpo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    //   e.preventDefault();
    let res = await axios.get(
      "http://localhost:9090/company/name/" + name
    );
    let dd=new Date(ipo.date);
    let temp;
    if(isEdit===false){

        temp={id:Math.random()*1000,price:ipo.price,lotsize:ipo.lotsize,date:dd,company:{...res.data}};
    }
    else{
        temp={id:ipo.id,price:ipo.price,lotsize:ipo.lotsize,date:ipo.date,company:{...res.data}};
    }

    await axios.post("http://localhost:9090/ipo",temp);

    console.log(temp);

    setIpo({
        price: 0,
        lotsize: 0,
        date: "",
      });
      setName("");
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
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={ipo.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lotsize" className="form-label">
              Lotsize
            </label>
            <input
              type="number"
              className="form-control"
              name="lotsize"
              value={ipo.lotsize}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="text"
              className="form-control"
              name="date"
              value={ipo.date}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add Ipo
            </button>
          </div>
        </form>
      </div>
      <br/>
      <IpoTable setIpo={setIpo} setName={setName} setIsEdit={setIsEdit}/>
    </div>
  );
};

export default Ipo;
