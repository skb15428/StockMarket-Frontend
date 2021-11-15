import React from "react";
import { Bar,Line } from "react-chartjs-2";

const Chart = ({stockPrices}) => {
  // const [stockPrices,setStockPrices]=React.useState([]);
	const [labels,setLabels]=React.useState([]);
	const [data,setData]=React.useState([]);

	// eslint-disable-next-line
	React.useEffect(async()=>{
		// let res = await axios.get("http://localhost:9090/price");
		// setStockPrices([...res.data]);

		let t_labels=stockPrices.map(item => item.time);
		setLabels([...t_labels]);

		let t_data = stockPrices.map(item => item.price);
		setData([...t_data]);
	},[stockPrices]);

  return (
    <div className="container">
      <Line
        data={{
          labels: [...labels],
          datasets: [
            {
              label: "Stock Prices",
              data: [...data],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        }}
        width={400}
        height={600}
        options={{ 
					maintainAspectRatio: false
					// scales:{
					// 	yAxes: [
					// 		{
					// 			ticks:{
					// 				beginAtZero: true,
					// 			}
					// 		}
					// 	]
					// }
				}}
      />
    </div>
  );
};

export default Chart;
