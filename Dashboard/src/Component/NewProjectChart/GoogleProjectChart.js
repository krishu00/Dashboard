import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";

function GoogleProjectCost() {
  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileURL = process.env.PUBLIC_URL + "/billing_details.xlsx";
        const response = await fetch(fileURL);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const billingData = XLSX.utils.sheet_to_json(sheet);

        const lastIndex = billingData.length - 1;
        const filteredData = billingData.slice(0, lastIndex);
        
        const shortData = filteredData.map(item => ({
          ...item,
          Client: item.Client.length > 15 ? item.Client.substring(0, 10) + "" : item.Client
        }));
        
        dispatch({ type: 'piechart/setBillingData', billData: shortData });
        dispatch({ type: 'piechart/setFullData', fullData: billingData });

        // Modify the structure of your formattedData
        const formattedData = shortData.map((row) => [
          ` ${row["Client"]}`,
          parseFloat(row["Billing Done"]),
          ` ${row["Client"]} \n Billing Done: ${row["Billing Done"]} `,
          parseFloat(row["Pending for Billing"]),
          ` ${row["Client"]} \n Pending Bill: ${row["Pending for Billing"]}`,
        ]);

        // Add column headers
        formattedData.unshift([
          'Client',
          'Billing Done',
          { type: 'string', role: 'tooltip' },
          'Pending for Billing',
          { type: 'string', role: 'tooltip' },
        ]);

        setChartData(formattedData);

      } catch (error) {
        console.error("Error fetching the Excel file:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Chart        width={"105%"}

        height={"480px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: "Project Costs",
          chartArea: { width: "60%" },
          isStacked: true,
          hAxis: {
            title: "Cost",
            minValue: 0,
          },
          vAxis: {
            title: "Client",
            textStyle:{fontSize:'10'},
         
          },
          legend: { position: "top", maxLines: 1, textStyle:{fontSize:'15'} },
          seriesType: "bars",
          series: {
            0: { color: "#3366cc", type: "bars", bars: { groupWidth: "50%" } },
            1: { color: "#dc3912", type: "bars" },
          },
          tooltip: { isHtml: false },
        }}
      />
    </div>
  );
}

export default GoogleProjectCost;
