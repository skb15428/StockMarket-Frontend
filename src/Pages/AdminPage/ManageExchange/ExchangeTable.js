import React from "react";
import axios from "axios";

const ExchangeTable = ({setExchange,setIsEdit}) => {
  const [exchanges, setExchanges] = React.useState([]);

  // eslint-disable-next-line
  React.useEffect(async () => {
    let res = await axios.get("http://localhost:9090/exchange");
    setExchanges([...res.data]);
  }, []);

  const handleDelete = async(id) => {
    let res = await axios.delete("http://localhost:9090/exchange/" + id);
    console.log(res);
    let temp = exchanges.filter((item) => item.id !== id);
    setExchanges([...temp]);
  };

  const handleEdit = (item) => {
    setExchange({id:item.id,name:item.name});
    setIsEdit(true);
  };

  return (
    <div className="mx-auto" style={{ width: "80%" }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
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

export default ExchangeTable;
