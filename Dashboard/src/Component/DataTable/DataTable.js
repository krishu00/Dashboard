import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import "../DataTable/DataTable.css"






function DataTable() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fileURL = process.env.PUBLIC_URL + "/monthly_production_detail.xlsx";
    // const fileURL = process.env.PUBLIC_URL + "/Monthly_Production.xlsx";
    fetch(fileURL)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parseData = XLSX.utils.sheet_to_json(sheet);

       
        // console.log(JSON.stringify(parseData));


        setData(parseData);
        dispatch({ type: 'piechart/setPieData', ...{ piedata: parseData } });
      })
      .catch((error) => {
        console.error("Error fetching the Excel file:", error);
      });
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filteredData = data.filter((row) => {
      return Object.values(row).some(
        (value) => String(value).toLowerCase().includes(query)
      );
    });
    setData(filteredData);
  };

  const resetData = () => {
    setSearchQuery('');
    // const fileURL = process.env.PUBLIC_URL + "/Monthly_Production_Detail.xlsx";
    const fileURL = process.env.PUBLIC_URL + "/monthly_production_detail.xlsx";
    fetch(fileURL)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parseData = XLSX.utils.sheet_to_json(sheet);

        // parseData.sort((a, b) => b["Total Req. Qty"] - a["Total Req. Qty"]);
        setData(parseData);
        console.log(parseData);
      })
      .catch((error) => {
        console.error("Error fetching the Excel file:", error);
      });
  };

  useEffect(() => {
    console.log("Table Headers:", data.length > 0 ? Object.keys(data[0]) : []);
  }, [data]);

  return (
    <div className="excel-data-container">
      <h1 className="exceldata"> Project's List</h1>

      <input
        className="searchBox"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="btnSearch" onClick={handleSearch}>
        Search
      </button>
      <button className="reset" onClick={resetData}>
        Reset
      </button>
      <div className="table-container">
        {data.length > 0 ? (
          <table className="excel-data-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                  
                ))}
              </tr>
              {/* console.log(th); */}
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{row[cell]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default DataTable;

