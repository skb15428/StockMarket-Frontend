import React from "react";
import axios from "axios";

const CompanyTable = ({setCompany, setSelectedExchange,setIsEdit}) => {
  const [companies, setCompanies] = React.useState([]);

  // eslint-disable-next-line
  React.useEffect(async () => {
    let res = await axios.get("http://localhost:9090/company");
    setCompanies([...res.data]);
  }, []);

  const handleDelete = async (id) => {
    let res = await axios.delete("http://localhost:9090/company/" + id);
		console.log(res);
    let temp = companies.filter((item) => item.id !== id);
    setCompanies([...temp]);
  };

	const handleEdit = (item)=>{
		setCompany({id:item.id,name:item.name,description:item.description,valuation:item.valuation});
		setSelectedExchange(item.exchanges[0].name);
		setIsEdit(true);
	}

  return (
    <div className="mx-auto" style={{ width: "80%" }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Valuation</th>
            <th scope="col">Exchange</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.valuation}</td>
                <td>{item.exchanges[0].name}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={()=>handleEdit(item)}>Edit</button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
