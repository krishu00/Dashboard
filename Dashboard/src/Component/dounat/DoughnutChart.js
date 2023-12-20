import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Label, LabelList, Legend, Tooltip } from "recharts";



const DoughnutChart = () => {
  const [isHovered, setHovered] = useState(false);
  const [pieChartData, setPieChartData] = useState([]);
  const [lastApproxValue, setLastApproxValue] = useState("");

  const monthlySalesData = useSelector((state) => state?.pieSlice?.fullMonthlyData);

  useEffect(() => {
    processBillingData();
  }, [monthlySalesData]);

  const processBillingData = () => {
    // Ensure fetchBilling is not undefined and has data
    if (monthlySalesData && monthlySalesData.length > 0) {
      const lastIndex = monthlySalesData.length - 1;
      const billingDoneKey = "Billing Done";
      const pendingBillKey = "Pending for Billing";
      const approxBillKey = "Approx Amount"
      // console.log(monthlySalesData);


      const lastBillingDoneValue = parseFloat(monthlySalesData[lastIndex][billingDoneKey]);
      const lastPendingBillValue = parseFloat(monthlySalesData[lastIndex][pendingBillKey]);
      const lastApproxValue = parseFloat(monthlySalesData[lastIndex][approxBillKey]);
      // console.log(lastApproxValue);

      setPieChartData([
        { name: "Billing Done:", value: lastBillingDoneValue },
        { name: "Pending Bill:", value: lastPendingBillValue },
      ]);
      setLastApproxValue(lastApproxValue);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* Center Label */}
          <Label value={lastApproxValue} position="center" fontSize={26} color="red" /> 
          {/* {lastApproxValue !== undefined && (     */}
            {/* <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "12px",
                color: "red",
              }}
            >

              {lastApproxValue}
            </div> */}
          {/* )} */}
          <Tooltip formatter={(value, name) => [value, name]} />
          <Legend align="center" verticalAlign="bottom" layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default DoughnutChart;















