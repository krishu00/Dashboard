import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label, LabelList, Legend, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import "../ItemsLists/ItemsLists.css";





function ItemPieChart({ children }) {
  const [isHovered, setHovered] = useState(false); // State to track hover

  const pieArray = useSelector((state) => state?.pieSlice?.itemPieChartList);
// console.log(pieArray);
  const itemDescriptionArray = [];
  const totalReqArray = [];

  function trimString(str) {
    const words = str.split(" ");
    words.length = 2;
    return words.join(" ");
  }

  pieArray.forEach((item) => {
    if (item['Total Req. Qty']) {
      if (item["Item Discription"]) {
        itemDescriptionArray.push(trimString(item["Item Discription"]));
      }
      totalReqArray.push(item["Total Req. Qty"]);
    }
  });

  // Sort totalReqArray in descending order and take the top 15 elements
  let top15Array = totalReqArray
    .map((value, index) => ({ value, name: itemDescriptionArray[index] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 9);

  if (top15Array.length > 0) {
    top15Array.shift();
  }


  const numericDummyData = top15Array.map(item => ({
    name: item.name,
    value: Number(item.value), // Convert the value to a number
  }));
  // top15Array = dummyData;
  // console.log(top15Array)
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#D15C5C", "#14261B" ,"#45C7BF" , "#BF9898" ,"#FF8042",]; // Define your colors

  return (
    <div className="itemContainer">
      <h1 className="ItemList">Items Lists </h1>
      <ResponsiveContainer width="100%" height={250} top={100}>
        <PieChart>

          <Pie
            data={numericDummyData  } 
            cx="40%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"  
            label
          >
            {top15Array.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label value="" position="center" />
            {isHovered && (
              // Conditionally render LabelList only when hovered
              <LabelList dataKey="name" position="outside" fill=" #FF0000" offset={10} />
            )}
          </Pie>

          <Tooltip formatter={(value, name) => [value, name]} />
          <Legend align="right" verticalAlign="middle" layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
      {children ? children : ""}
    </div>
  );
}

export default ItemPieChart;







