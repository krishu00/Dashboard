import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import * as XLSX from "xlsx";
// import "../MonthlySales/MonthlySales.css"
let count_number = 0,
  count_number1 = 0;
let data_new = [
  {
    name: "1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "5",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "6",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "7",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "8",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "9",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "10",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "11",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "12",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const MonthlySale = (props) => {
  const [data, setData] = useState([]);
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // const customLabels = ['a', 'b', 'c', 'd', 'e', 'f']; // Customize these labels as needed

  useEffect(() => {
    const colors = [
      "#0088FE",
      "#00C49F",
      "#717116",
      "#D15C5C",
      "#14261B",
      "#45C7BF",
      "#BF9898",
      "#FF8042",
      "#711616",
      "#11F1D3",
    ];

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
        Monthly_Sale_rs.pop(); // Remove the last object from the array
        console.log(Monthly_Sale_rs);

        // Assuming Monthly_Sale_rs is an array of objects
        Monthly_Sale_rs.forEach((object) => {
          Object.keys(object).forEach((key) => {
            if (key === "Month") {
              data_new[count_number++].name = `${object[key]}`;
            }
            if (key === "Monthly Sales") {
              // Convert the numerical value to lakh format
              const valueInLakh = parseFloat(object[key]) / 100000;
              data_new[count_number1++].uv = valueInLakh.toFixed(2);
            }
          });
        });

        const chartData = Monthly_Sale_rs.map(
          ({ Month: Month, "Monthly Sales": MonthlySales }, index) => ({
            name: getMonthLabel(Month),
            uv: Number(MonthlySales),
            fill: colors[index % colors.length],
          })
        );

        setData(chartData);
      } catch (error) {
        console.error("Error fetching or parsing the Excel file:", error);
      }
    };

    fetchXLSXData();
  }, []);

  const getMonthLabel = (monthNumber) => {
    return monthLabels[monthNumber - 1];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const monthLabel = payload[0].payload.name;

      return (
        <div className="custom-tooltip">
          <p className="label">{`${getMonthLabel()} :${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
      Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="monthlySales">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data_new}
          margin={{ top: 25, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList position="top" formatter={(value) => `${value}L.`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySale;
