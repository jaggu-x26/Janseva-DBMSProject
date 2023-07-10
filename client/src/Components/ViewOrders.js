import React, { useEffect, useState } from 'react'
import Navigation from './Navigation';
import '../styles/ViewOrders.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const now = new Date();
const year = now.getFullYear();
const custID = localStorage.getItem('ltk');
const orderurl = `http://localhost:8000/vieworders/${custID}`;
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const buttonstyle = 
{
    bgcolor : "#F7C04A",
    color : "#675D50",
    padding : "10px",
}

const MySwal = withReactContent(Swal); 

export default function ViewOrders() {

  const [orders, setOrders] = useState("");
  const nav = useNavigate();

  useEffect(() =>
        {
            fetch(orderurl,{method:'GET'} )
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            })
        }, [])

    function handleview(orderid, pilgName)
    {

        if(window.confirm("Tracking order for orderID " + orderid))
        {
            localStorage.setItem('orderpilgName', pilgName);            
            nav(`/trackorder/${orderid}`)
        }
        
        
    }

    function handlecancel(orderid) {
        const cancelurl = `http://localhost:8000/cancel?orderid=${orderid}`
        fetch(cancelurl,{method:'GET'} )
            .then((res) => res.json())
            .then((data) => {
                if(data.auth=='success')
                {
                    alert("Order was successfully cancelled! Amount will be refunded soon to source bank!");
                }
                else{
                    alert("Cancel request failed");
                }
            })

    }

    // check whether that order has feedback entry or not //
    function checkfeedback(orderid)
    {
        const feedbackurl = `http://localhost:8000/checkfeedback/${orderid}`;
        fetch(feedbackurl,{method:'GET'} )
            .then((res) => res.json())
            .then((data) => {
                if(data.length==0)
                {
                     nav(`/addFeedback/${orderid}`)
                }
                else{
                    MySwal.fire({
                        icon: "success",
                        title: "Feedback already Submitted",
                        time: 4000,
                      });
                }

            })

    }

    const renderorders = (data) =>{
        if(data.length > 0){
            return data.map((item) => { 
                return(
                <>
                <tr>
                    <td data-th="Order ID">
                    {item.orderID}
                    </td>
                    <td data-th="Pilg Name">
                    {item.pilgName}
                    </td>
                    <td data-th="Pack Name">
                    {item.packName}
                    </td>
                    <td data-th="Order Date">
                    {new Intl.DateTimeFormat('en-US',{month:'2-digit',day:'2-digit', year:'numeric'}).format(new Date(item.orderDate))}
                    </td>
                    {item.orderStatus==='delivered' ? <td style={{'color':'green','fontWeight':'800'}}>Delivered</td> : <td data-th="Order status">
                    {item.orderStatus}
                    </td>}
                    <td data-th="Net Amount">
                    Rs {item.amount}
                    </td>
                    {(item.orderStatus==='delivered') ? (<td>
                        <button className='btn btn-warning' onClick={e=>checkfeedback(item.orderID)}>Feedback</button>
                    </td>): (item.orderStatus==='cancelled')? (<td style={{'color':'red','fontWeight':'800'}}>Order cancelled</td>):(<td style={{'display':'flex'}}><button className='btn btn-success' onClick={e=>handleview(item.orderID,item.pilgName)}>Track</button>&nbsp;
                    <button className='btn btn-danger'onClick={e=>handlecancel(item.orderID)}>Cancel</button>
                    </td>)}
                    
                </tr>
                </>
                )
            })
        }
        else{
            return(
                <>
                    <tr>
                       <td colSpan={7} style={{'textAlign':'center'}}>No Orders made so far!!!</td>
                    </tr>
                </>
            )
        }
    }


  return (
   <>
    <Navigation/>
    <div className='container'>
       <div className='row back_order'>
        <div className='col-12'>
            <h1 className='orderhead'> Order History </h1>
            <div class="container">
            <table class="rwd-table mb-5">
                <tbody>
                <tr>
                    <th>Order ID</th>
                    <th>Pilgrimage Name</th>
                    <th>Package Name</th>
                    <th>Order Time</th>
                    <th>Order Status</th>
                    <th>Net Amount</th>
                    <th>Actions</th>
                </tr>
                {renderorders(orders)}
                </tbody>
            </table>
            </div>
           
        </div>
       </div>
      

    </div>
    {/*Footer*/}
    <div className="container-fluid  ">
        <div className="row justify-content-center">
          <div className="col-5 col-sm-4 col-md-3 col-lg-2">
            <h3 className="brand foot">JanSeva &copy; {year}</h3>
          </div>
        </div>
      </div>
   </>
  )
}
