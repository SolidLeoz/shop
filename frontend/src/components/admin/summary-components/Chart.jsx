// import React, { PureComponent } from 'react';
import { 
    LineChart, 
    Line, XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer
 } from 'recharts';
import styled from 'styled-components';
import { setHeaders, url } from '../../../slices/api';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Chart = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    function compare(a,b) {
        if (a._id < b._id) {
            return 1;
        }
        
        if (a._id > b._id) {
            return -1;
        }
        return 0
        
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const res = await axios.get(`${url}/order/week-sales`, setHeaders());

                res.data.sort(compare);

                const newData = res.data.map((item) => {
                    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fry", "Sat"];

                    return {
                        day: DAYS[item._id -1],
                        amount: item.total / 100
                    };
                });
                setSales(newData) 
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

      
    return (<>
        {
            loading ? (
            <Loader> Loading Chart ...</Loader>
            ) : (
            <StyledChart>
            <h3>Last 7 Days Earnings(US $)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={sales}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </StyledChart>
        )}
    </>
    );
};

        
    
    


export default Chart;

const StyledChart = styled.div`
    width: 100%;
    height: 300 px;
    margin-top: 2rem;
    padding: 1rem;    
    border: 2px solid rgba(48, 51 78 0.2);
    border-radius: 5px;
    h3 {
        margin-bottom: 1rem;
    }
`;

const Loader = styled.p`
    margin-top: 2rem;
`
