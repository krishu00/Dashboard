import React, { useEffect, useState } from "react";
import "../OrderCount/OrderCount.css";
import { useSelector } from "react-redux";
// import MonthlySale from "../MonthlySales/MonthlySales";

const OrderCount = (props) => {
  const OrderCounts = useSelector((state) => state?.pieSlice?.billingData);
  // console.log(OrderCounts);

  // MONTHLY TARGET DATA 
  const monthlyTarget = useSelector((state) => state?.pieSlice?.fullMonthlyData);

  const [approxData, setApproxData] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [completedOrder, setCompletedOrder] = useState(0);
  const [remainingOrder, setRemainingOrder] = useState(0);

  useEffect(() => {
    MonthlyTartget();
  }, [monthlyTarget]);

  const MonthlyTartget = () => {
    if (monthlyTarget && monthlyTarget.length > 0) {
      const approxBillKey = "Approx Amount"
      const lastIndex = monthlyTarget.length - 1;
      const lastApproxValue = parseFloat(monthlyTarget[lastIndex][approxBillKey]);
      // console.log(lastApproxValue);

   // Convert the numerical value to lakh format
   const valueInLakh = lastApproxValue / 100000;
   setApproxData(valueInLakh.toFixed(2));

      // setApproxData(lastApproxValue)
    }
  }




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

      // console.log(completedArray);
      // console.log(remainingArray);

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
        {/* <h1 className="value ">{approxData}</h1> */}
        <h1 className="value  value4 approxValue">{`${approxData} Lac.`}</h1>
      </div>
    </div>
    </>
  );
};

export default OrderCount;



