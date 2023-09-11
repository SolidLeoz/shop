import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "../summary-components/Widget";


const Summary = () => {
  const data = [
    {
      icon: <FaUsers />,
      digits: 50,
      isMoney: false,
      title: "Users",
      color: "rgba(234, 234, 255, 0.68)",
      bgColor: "rgba(234, 234, 255, 0.68, 0.12)",
      percentage: 30,
    },
    {
      icon: <FaClipboard />,
      digits: 50,
      isMoney: false,
      title: "Orders",
      color: "rgba(38, 234, 255, 0.68)",
      bgColor: "rgba(35, 234, 255, 0.68, 0.12)",
      percentage: 30,
    },
    {
      icon: <FaChartBar />,
      digits: 500,
      isMoney: true,
      title: "Earnings",
      color: "rgba(123, 234, 255, 0.68)",
      bgColor: "rgba(132, 234, 255, 0.68, 0.12)",
      percentage: 60,
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
      </MainStats>
      <SideStats></SideStats>
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
