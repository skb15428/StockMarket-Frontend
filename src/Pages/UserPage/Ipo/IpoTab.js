import React from "react";
import axios from "axios";

const IpoTable = ({setIpo,setName,setIsEdit}) => {
  const [ipos, setIpos] = React.useState([]);

  // eslint-disable-next-line
  React.useEffect(async () => {
    let res = await axios.get("http://localhost:9090/ipo");
    setIpos([...res.data]);
  }, []);

  // const handleDelete = async (id) => {
  //   let res = await axios.delete("http://localhost:9090/ipo/" + id);
	// 	console.log(res);
  //   let temp = ipos.filter((item) => item.id !== id);
  //   setIpos([...temp]);
  // };

	// const handleEdit = (item)=>{
	// 	setIpo({id:item.id,price:item.price,lotsize:item.lotsize,date:item.date});
	// 	setName(item.company.name);
	// 	setIsEdit(true);
	// }

  return (
    <div className="mx-auto" style={{ width: "80%" }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">LotSize</th>
            {/* <th scope="col">Edit</th>
            <th scope="col">Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {ipos.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.company.name}</th>
                <td>{item.price}</td>
                <td>{item.lotsize}</td>
                {/* <td>
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
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IpoTable;
