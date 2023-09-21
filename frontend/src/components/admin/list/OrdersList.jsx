import styled from "styled-components";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productsDelete } from "../../../slices/productsSlice";
import { ordersFetch } from "../../../slices/ordersSlice";


export default function OrdersList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.orders);


    React.useEffect(() => {
        dispatch(ordersFetch());
    }, [dispatch]);
 
    const rows = list && list.map((item) => {
        return {
            id: item._id,
            imageUrl: item.image?.url,
            pName: item.name,
            pDesc: item.desc,
            price: item.price?.toLocaleString(),
            };
        });

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'imageUrl', headerName: 'Image', width: 80, 
        renderCell: (params) => {
            return
            <></>
                ;
            },
        },
        { field: 'pName', headerName: 'Name', width: 130 },
        {
        field: 'pDesc',
        headerName: 'Description',
        width: 130,
        },
        {
        field: 'price',
        headerName: 'Price',
        width: 80,
        },
        {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 170,
        renderCell: (params) => {
            return
            <></>
               ; 

            },
        },
    ];

    const handleDelete = (id) =>{
        dispatch(productsDelete(id))
    }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}


const DispatchBtn = styled.button`
    background-color: rgb(38, 198, 249);
`;
const DeliveryBtn = styled.button`
    background-color: rgb(102, 108, 255);
`;
const View = styled.button`
    background-color: rgb(114, 255, 40);
`;
const Pending = styled.div`
    color: rgb(253, 181, 40);
    background: rgba(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;
const Dispatched = styled.div`
    color: rgb(38, 198, 249);
    background: rgba(38, 198, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;
const Delivered = styled.div`
    color: rgb(102, 108, 255);
    background: rgba(102, 108, 255, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;
