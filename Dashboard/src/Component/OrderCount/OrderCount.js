
import React, { useEffect, useState } from "react";
import "../OrderCount/OrderCount.css";
import { useSelector } from "react-redux";
import XLSX from "xlsx";

const OrderCount = (props) => {
  const OrderCounts = useSelector((state) => state?.pieSlice?.billingData);

  // MONTHLY TARGET DATA
  const monthlyTarget = useSelector((state) => state?.pieSlice?.fullMonthlyData);

  const [approxData, setApproxData] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [completedOrder, setCompletedOrder] = useState(0);
  const [remainingOrder, setRemainingOrder] = useState(0);
  const [yearlySales, setYearlySales] = useState(0);

  const fetchXLSXData = async () => {
    try {
      const fileURL = process.env.PUBLIC_URL + "/sales_details.xlsx";
      const response = await fetch(fileURL);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const Monthly_Sale_rs = XLSX.utils.sheet_to_json(sheet);

      let yearlySales = 0;

      Monthly_Sale_rs.forEach((object) => {
        Object.keys(object).forEach((key) => {
          if (key === "Monthly Sales") {
            const monthlySales = parseFloat(object[key]);
            yearlySales += monthlySales;

          }
        });
      });

      const FinalYearTarget = yearlySales/10000000
      
      setYearlySales(FinalYearTarget.toFixed(2));
    } catch (error) {
      console.error("Error fetching XLSX data:", error);
    }
  };

  useEffect(() => {
    fetchXLSXData();
  }, []); 

  useEffect(() => {
    MonthlyTartget();
  }, [monthlyTarget]);

  const MonthlyTartget = () => {
    if (monthlyTarget && monthlyTarget.length > 0) {
      const approxBillKey = "Approx Amount";
      const lastIndex = monthlyTarget.length - 1;
      const lastApproxValue = parseFloat(monthlyTarget[lastIndex][approxBillKey]);

      const valueInLakh = lastApproxValue / 100000;
      setApproxData(valueInLakh.toFixed(2));
    }
  };

  useEffect(() => {
    CountData();
  }, [OrderCounts]);

  const CountData = () => {
    if (OrderCounts && OrderCounts.length > 0) {
      const billingDoneKey = "Billing Done";
      const pendingBillKey = "Pending for Billing";

      let completedArray = [];
      let remainingArray = [];

      OrderCounts.forEach((row) => {
        const billingDoneValue = parseFloat(row[billingDoneKey]);
        const pendingBillValue = parseFloat(row[pendingBillKey]);

        if (pendingBillValue === 0) {
          completedArray.push(row);
        } else {
          remainingArray.push(row);
        }
      });

      setCompletedOrder(completedArray.length);
      setRemainingOrder(remainingArray.length);
      setTotalOrder(OrderCounts.length);
    }
  };

  return (
    <>
      <div className="container">
        <div className="box box1">
          <h1 className="title title1">Total Order:</h1>
          <h1 className="value value1">{totalOrder}</h1>
        </div>
        <div className="box box2">
          <h1 className="title title2">Completed Ord:</h1>
          <h1 className="value value2">{completedOrder}</h1>
        </div>
        <div className="box box3">
          <h1 className="title title3">Remaining Ord:</h1>
          <h1 className="value value3">{remainingOrder}</h1>
        </div>
        <div className="box box4 ">
          <h1 className="title title4">Monthly Target:</h1>
          <h1 className="value value4 approxValue">{`${approxData} Lac.`}</h1>
        </div>
        <div className="box box4 ">
          <h1 className="title title4">Yearly Target:</h1>
          <h1 className="value value4 approxValue">{`${yearlySales} Cr.`}</h1>
        </div>
      </div>
    </>
  );
};

export default OrderCount;




// import React, { useEffect, useState } from "react";
// import "../OrderCount/OrderCount.css";
// import { useSelector } from "react-redux";
// // import MonthlySale from "../MonthlySales/MonthlySales";

// const OrderCount = (props) => {
//   const OrderCounts = useSelector((state) => state?.pieSlice?.billingData);
//   // console.log(OrderCounts);

//   // MONTHLY TARGET DATA 
//   const monthlyTarget = useSelector((state) => state?.pieSlice?.fullMonthlyData);

//   const [approxData, setApproxData] = useState(0);
//   const [totalOrder, setTotalOrder] = useState(0);
//   const [completedOrder, setCompletedOrder] = useState(0);
//   const [remainingOrder, setRemainingOrder] = useState(0);

//   const fetchXLSXData = async () => {
//     try {
//       const fileURL = process.env.PUBLIC_URL + "/sales_details.xlsx";
//       const response = await fetch(fileURL);
//       const arrayBuffer = await response.arrayBuffer();
//       const data = new Uint8Array(arrayBuffer);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const Monthly_Sale_rs = XLSX.utils.sheet_to_json(sheet);
    
  
//       let yearlySales = 0;
  
//       Monthly_Sale_rs.forEach((object) => {
//         Object.keys(object).forEach((key) => {
//           if (key === "Monthly Sales") {
//             // Assuming Monthly_Sale_rs is an array of objects
//             const monthlySales = parseFloat(object[key]); // Convert to float if necessary
//             yearlySales += monthlySales;
//           }
//         });
//       });
  
//       console.log("Yearly Sales:", yearlySales);
  
//       // Now you can update your UI with the yearlySales value
//       // For example, if you have a state variable to store the yearlySales
//       // this.setState({ yearlySales });
//     } catch (error) {
//       console.error("Error fetching XLSX data:", error);
//     }
//   };
  




//   useEffect(() => {
//     MonthlyTartget();
//   }, [monthlyTarget]);

//   const MonthlyTartget = () => {
//     if (monthlyTarget && monthlyTarget.length > 0) {
//       const approxBillKey = "Approx Amount"
//       const lastIndex = monthlyTarget.length - 1;
//       const lastApproxValue = parseFloat(monthlyTarget[lastIndex][approxBillKey]);
//       console.log(lastApproxValue);
//       console.log(monthlyTarget);

//    // Convert the numerical value to lakh format
//    const valueInLakh = lastApproxValue / 100000;
//    setApproxData(valueInLakh.toFixed(2));

//       // setApproxData(lastApproxValue)
//     }
//   }




//   useEffect(() => {
//     CountData();
//   }, [OrderCounts]);

//   const CountData = () => {
//     if (OrderCounts && OrderCounts.length > 0) {
//       const billingDoneKey = "Billing Done";
//       const pendingBillKey = "Pending for Billing";

//       let completedArray = [];
//       let remainingArray = [];

//       OrderCounts.forEach((row) => {
//         const billingDoneValue = parseFloat(row[billingDoneKey]);
//         const pendingBillValue = parseFloat(row[pendingBillKey]);

//         if (pendingBillValue === 0) {
//           completedArray.push(row);
//         } else {
//           remainingArray.push(row);
//         }
//       });

//       // console.log(completedArray);
//       // console.log(remainingArray);

//       setCompletedOrder(completedArray.length);
//       setRemainingOrder(remainingArray.length);
//       setTotalOrder(OrderCounts.length);
//     }
//   };

//   return (
//     <>
//     <div className="container"> 
//       <div className="box box1">
//         <h1 className="title title1">Total Order:</h1>
//         <h1 className="value value1">{totalOrder}</h1>
//       </div>
//       <div className="box box2">
//         <h1 className="title title2">Completed Ord:</h1>
//         <h1 className="value value2">{completedOrder}</h1>
//       </div>
//       <div className="box box3">
//         <h1 className="title title3">Remaining Ord:</h1>
//         <h1 className="value value3">{remainingOrder}</h1>
//       </div>
//       <div className="box box4 ">
//         <h1 className="title title4">Monthly Target:</h1>
//         {/* <h1 className="value ">{approxData}</h1> */}
//         <h1 className="value  value4 approxValue">{`${approxData} Lac.`}</h1>
//       </div>
//       <div className="box box4 ">
//         <h1 className="title title4">Yearly Target:</h1>
//         {/* <h1 className="value ">{approxData}</h1> */}
//         <h1 className="value  value4 approxValue">{`${yearlyData} Lac.`}</h1>
//       </div>
//     </div>
//     </>
//   );
// };

// export default OrderCount;



