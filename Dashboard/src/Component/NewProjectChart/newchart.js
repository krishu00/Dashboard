import React , {useState} from "react";
import Chart from "react-google-charts";
 const  newDataTable =( props)=>{
    // const [chartData, setChartData] = useState([]);

const newArrayData = [
  
{ID: '1', Client: 'SAP Exim', Project: 'Omax Mullanpur Chandigarh', ApproxAmount: '1035840.00', billingDone: '0'},
{ID: 'dummy1', Client: 'Dummy Client 1', Project: 'Dummy Project 1', ApproxAmount: '0.00', billingDone: '0.00'},
{ID: '2', Client: 'TRIMOORTI ELECTRICALS', Project: 'SIGNATURE GOLF GREEN SECTOR - 79 GURGAON )', ApproxAmount: '539460.00', billingDone: '0'},
{ID: 'dummy2', Client: 'Dummy Client 2', Project: 'Dummy Project 2', ApproxAmount: '0.00', billingDone: '0.00'}
]

//  setChartData(newArrayData);




    return(
    <div>
        
        <Chart
        width={"150%"}
        height={"800px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={newArrayData}
        options={{
          title: "Project Costs",
          chartArea: { width: "70%" },
          isStacked: true,
          hAxis: {
            title: "Cost",
            minValue: 0,
          },
          vAxis: {
            title: "Client",
          },
          legend: { position: "top", maxLines: 3 },
          seriesType: "bars",
          series: {
            0: { color: "#3366cc", type: "bars", bars: { groupWidth: "15%" } },
            1: { color: "#dc3912", type: "bars" },
          },
          tooltip: { isHtml: false },
        }}
      />
    </div>
        
        
        
   
    )
 }