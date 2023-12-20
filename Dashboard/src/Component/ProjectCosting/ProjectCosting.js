import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
// import { useDispatch } from "react-redux";
import "../ProjectCosting/ProjectCosting.css";

const ProjectCosting = (props) => {
  const [data, setData] = useState([]);
//   const [costing , setCosting ] = useState ([]);
  // const [data, setData] = useState(parseData);
  // const [search, setSearch] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
  //
//   const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the XLSX file from the public directory
    const fileURL = process.env.PUBLIC_URL + "/Estimated_Biling_Monthly.xlsx";
    console.log(fileURL);
    // debugger
    fetch(fileURL)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const ProjetCOST = XLSX.utils.sheet_to_json(sheet);
        // Sort the data by 'Total Req. Qty' in descending order
        // parseData.sort((a, b) => b["Total Req. Qty"] - a["Total Req. Qty"]);
        console.log(JSON.stringify(ProjetCOST));
        
        setData(ProjetCOST);
        // debugger
        // dispatch({ type: "piechart/setPieData", ...{ piedata: ProjetCOST } });
      })
      .catch((error) => {
        console.error("Error fetching the Excel file:", error);
        // setLoading(false); // Set loading to false on error
      });
  }, []);


  // const handleSearch = () => {
  //   const query = searchQuery.toLowerCase();
  //   const filteredData = data.filter((row) => {
  //     const rowValues = Object.values(row);
  //     for (const value of rowValues) {
  //       if (value.toString().toLowerCase().includes(query)) {
  //         return true; // If any cell in the row contains the query, keep the row
  //       }
  //     }
  //     return false; // If no cell in the row contains the query, exclude the row
  //   });
  //   setData(filteredData);
  // };

  //

  // const resetData = () => {
  //   setSearchQuery('');
  //   // Refetch the data from the Excel file to reset it

  //   const fileURL = process.env.PUBLIC_URL + "/Monthly_Production.xlsx";

  //   fetch(fileURL)
  //     .then((response) => response.arrayBuffer())
  //     .then((arrayBuffer) => {
  //       const data = new Uint8Array(arrayBuffer);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const parseData = XLSX.utils.sheet_to_json(sheet);
  //       console.log("parseData",parseData[0])
  //       parseData.sort((a, b) => b["Total Req. Qty"] - a["Total Req. Qty"]);
  //       setData(parseData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching the Excel file:", error);
  //     });
  // };
  return (
    <div className="excel-data-container  projectC " >
      <h1 className="exceldata"> Project's Costs</h1>

     
      <div className="table-container">
        <table className="excel-data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Project</th>
              <th>Approx Amount</th>
              <th>Billing Done</th>
              <th>Pending for Billing </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row["__EMPTY"]}</td>
                <td>{row["__EMPTY_1"]}</td>
                <td>{row["7811864.34"]}</td>
                <td>{row["1599505"]}</td>
                <td>{row["6212359.34"]}</td>

                {/* <td>{row["Agrahari Communication (ATS Le Grandinios)"]}</td>
                <td>{row["  Trimoorti Electricsl (Godrej Noida)   "]}</td>
                <td>{row[" Capital Fire Engineer co  "]}</td>
                <td>{row[" Techart India "]}</td>
                <td>{row[" Mahagun Meadow tower-2   "]}</td>
                <td>{row[" Ahluwalia (Defence colony) "]}</td>
                <td>{row["Goel & Associates (ATS Dolce Ph-2)"]}</td>
                <td>{row[" Daksh Automation (KVD) "]}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectCosting;
