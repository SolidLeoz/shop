import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summary-components/Widget";
import StyledChart from "./summary-components/Chart";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import Transactions from "./summary-components/Transactions";
import AllTimeData from "./summary-components/AllTimeData";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Summary = () => {

  const [users, setUsers] = useState([])
  const [usersPerc, setUsersPerc] = useState(0)

  const [orders, setOrders] = useState([])
  const [ordersPerc, setOrdersPerc] = useState(0)
  
  const [income, setIncome] = useState([])
  const [incomePerc, setIncomePerc] = useState(0)

  
  function compare (a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
//Fetch Users stats
  useEffect(() =>{
    async function fetchData(){
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders())
        res.data.sort(compare)
        setUsers(res.data);
        setUsersPerc(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100 );
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  //Fetch Orders stats

  useEffect(() =>{
    async function fetchData(){
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders())
        res.data.sort(compare)
        setOrders(res.data);
        setOrdersPerc(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100 );
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])
  
  
  //Fetch Income Stats
  
  useEffect(() =>{
    async function fetchData(){
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders())
        res.data.sort(compare)
        setIncome(res.data);
        setIncomePerc(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100 );
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])




  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgba(102, 108, 255, )",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgba(38, 198, 249)",
      bgColor: "rgba(38, 198, 249, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: income[0]?.total,
      isMoney: true,
      title: "Earnings",
      color: "rgba(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: incomePerc,
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How shopping is performing compared to the previous month</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
          
        </Overview>
          <StyledChart />
      </MainStats>
      <SideStats>
        <AllTimeData />
        <Transactions />

      </SideStats>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgba(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
