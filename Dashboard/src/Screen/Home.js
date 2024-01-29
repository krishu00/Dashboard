import React, { useState , useEffect } from "react";
// import Navbar from "../Component/Navbar/Navbar.js";
import "./screensCss/HomeCss.css";
import OrderCount from "../Component/OrderCount/OrderCount.js";
import DoughnutChart from "../Component/dounat/DoughnutChart.js";
import MonthlySale from "../Component/MonthlySales/MonthlySales.js";
import ItemList from "../Component/ItemsLists/ItemsLists.js";
// import DataTable from "../Component/DataTable/DataTable.js";
import MyModal from "../Component/Modal/index.js";
import ProjectCosting from "../Component/ProjectCosting/ProjectCosting.js";
import GoogleProjectCost from "../Component/NewProjectChart/GoogleProjectChart.js";
import { useDispatch } from "react-redux";
// import newDataTable from "../Component/NewProjectChart/newchart.js"
import * as XLSX from "xlsx";
// fetch('http://127.0.0.1:8000/fetch-sheets-data')



const Home = (props) => {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
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




  return (
    <div>
      <div className="contaiiner">
        <div className="leftblock">
          <DoughnutChart />

        </div>
        <div className="rightblock">
          <div className="orderCount">
            <OrderCount/>
            {/* <OrderCount title={"Total Orders:"} value={"24"} />
            <OrderCount className={"CompletedOrd"}  title={"Completed Ord:"} value={"9"}  />
            {/* <OrderCount title={"Running Ord:"} value={"15"} /> */}
            {/* <OrderCount  title={"Remaining Ord:"} value={"15"} /> */} 
          </div>
          <div className="monthlyChart">
            <MonthlySale />
          </div>
        </div>
      </div>
      <div className="lowerContainer">
        <div className="projectCost">
          {/* <DataTable /> */}
      
          <GoogleProjectCost/>
      
        </div>
      
        <div className="itemList">
          <ItemList>
            <button  className="buttonStyle"  onClick={() => setIsModalOpen(true)}>Display Table!</button>
          </ItemList> 
          {/* <Modal isOpen={false}></Modal> */}
          <MyModal openModal={ismodalOpen} close={setIsModalOpen}>
            
            {/* <DataTable /> */}
          </MyModal>
        </div>
      </div>
    </div>
  );
};

export default Home;
