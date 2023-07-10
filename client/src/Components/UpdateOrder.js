import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const orderurl = `http://localhost:8000/allorders`;
const updateurl = `http://localhost:8000/update`;
export default function UpdateOrder() {

const [orders, setOrders] = useState("");

  useEffect(() =>
        {
            fetch(orderurl,{method:'GET'} )
            .then((res) => res.json())
            .then((data) => {
                setOrders(data)
                console.log('>>>Orders',data);
            })
        }, [])

    function handlechange(value, id)
    {
        console.log('>>> ID ',id);
        console.log('>>> Value',value);
        const auth = {
            'id': id,
            'status' : value
        }
        fetch(updateurl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(auth)
        })
  
        .then((res) => res.json())
        .then((data) => {
            if(data.auth=='success')
            {
                alert("Order status updated successfully");
            }
            else{
                alert("Order status cannot be updated");

            }

        })
    }
    const renderorders = (data) =>{
            if(data.length > 0){
                return data.map((item) => { 
                    return(
                        <>
                        <tr>
                            <td>{item.orderID}</td>
                            <td>{item.custID}</td>
                            <td>{item.pilgName}</td>
                            <td>{item.packName}</td>
                            <td>Rs {item.amount}</td>
                            <td>
                                {item.orderStatus==='delivered'? <select onChange={e=>handlechange(e.target.value, item.orderID)} disabled><option>delivered</option> </select>: <select onChange={e=>handlechange(e.target.value, item.orderID)}> 
                                    <option value={item.orderStatus} selected>{item.orderStatus}</option>
                                    {item.orderStatus==="order placed"? "" : <option value="order placed">order placed</option>}
                                    {item.orderStatus==="priest allocated"? "" : <option value="priest allocated">priest allocated</option>}
                                    {item.orderStatus==="divine on process"? "" : <option value="divine on process">divine on process</option>}
                                    {item.orderStatus==="out for delivery"? "" : <option value="out for delivery">out for delivery</option>}
                                    {item.orderStatus==="delivered"? "" : <option value="delivered">delivered</option>}
                                </select>}
                            </td>
                        </tr>   
                        </>
                    )
                }
                )}
            }


  return (
    <>
        <div class="container table-responsive py-5 tableback text-center"> 
        <h2>Admin Order Update Panel</h2>
        <br/>
        <table class="table table-bordered table-hover">
        <thead class="table-dark">
            <tr>
            <th scope="col">Order ID</th>
            <th scope="col">CUST ID</th>
            <th scope="col">PilgName</th>
            <th scope="col">Packname</th>
            <th scope='col'>Amount</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        {renderorders(orders)}
        </tbody>
        
        </table>
            <Link to="/admin" class="btn btn-outline-dark px-5">Back</Link>
        </div>
    </>
  )
}
