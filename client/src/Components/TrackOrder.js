import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import '../styles/TrackOrder.css';
import { useParams } from 'react-router';



export default function TrackOrder() {
    const [orders, setOrders] = useState("");
    //const [priest, setpriest] = useState("");
    const [name , setname] = useState("");
    const orderid = useParams().id;
    console.log(orderid)
    const orderurl = `http://localhost:8000/trackorders/?orderID=${orderid}`;
    const pilgName = localStorage.getItem('orderpilgName');
    const priesturl = `http://localhost:8000/priestAllocate/?pilgName=${pilgName}`;
    const existsurl = `http://localhost:8000/priestexists/?orderID=${orderid}`;
    
    //var priestName ;

    useEffect(() =>
        {
            fetch(orderurl,{method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            })

            fetch(existsurl,{method:'GET'})
            .then((res) => res.json())
            .then((data) => {
                console.log('>>from database prist name ',data);
                if(data[0].priName === '')
                {
                    fetch(priesturl,{method:'GET'})
                    .then((res) => res.json())
                    .then((data1) => {
                        const priestName = data1[Math.floor(Math.random() * data1.length)].priName;
                        const updateurl = `http://localhost:8000/priestupdate/?orderID=${orderid}&priName=${priestName}`;
                        fetch(updateurl,{method: 'GET'})
                        .then((res) => res.json())
                        .then((data2) => {
                            if(data2.auth=='success') {
                                //alert("Order Update! Priest has been allocated for your order!");
                                setname(priestName);
                            };
                            
                        });
                        
                    })  
                }
                else
                {
                    setname(data[0].priName)
                }
             })

        }, [])


        function allocatepriest( name ) {
            return (
                <>
                <div className="col-12 d-flex">
                    <div className="disp">
                            <p className="dsp"> <i class="bi bi-emoji-laughing"></i> Greetings! Priest has been allocated for your order</p>
                            <p className='dsp'>Priest Name : {name}</p>
                            </div>
                    </div>    
                </>
            )

        }

        //console.log(orders[0])

        const rendertracking = (data) =>{
            if(data.length > 0){
                return data.map((item) => { 
                    return(
            
                            <div className="container block">
                            <div className="row tracking justify-content-center">
                                <h2 className='ohead col-10'>Order Tracking </h2>
                                <h4 style={{'padding-left':"1.5rem","marginTop":"1.5rem","textAlign":"center"}}>Order ID #{item.orderID}</h4>
                            <div className="col-12 trackback ">

                            {item.orderStatus==='order placed'? <div className="circle" id="step1" style={{"backgroundColor":"rgb(10, 239, 6)"}}> <i class="bi bi-box-seam-fill iconsize"></i> </div> : <div className="circle" id="step1" style={{"backgroundColor":"rgb(172, 172, 172)"}}> <i class="bi bi-box-seam-fill iconsize"></i> </div>}
                            &nbsp;&nbsp;
                            {item.orderStatus==='priest allocated'?<div className="circle" id="step2" style={{"backgroundColor":"rgb(10, 239, 6)"}} > <i class="bi bi-person-check-fill iconsize"></i></div> : <div className="circle" id="step2" style={{"backgroundColor":"rgb(172, 172, 172)"}} > <i class="bi bi-person-check-fill iconsize"></i></div>}
                            &nbsp;&nbsp;
                            {item.orderStatus==='divine on process'?<div className="circle" id="step3" style={{"backgroundColor":"rgb(10, 239, 6)"}} > <i class="bi bi-hospital-fill iconsize"></i></div> : <div className="circle" id="step3" style={{"backgroundColor":"rgb(172, 172, 172)"}} > <i class="bi bi-hospital-fill iconsize"></i></div>}
                            &nbsp;&nbsp;
                            {item.orderStatus==='out for delivery'?<div className="circle" id="step4" style={{"backgroundColor":"rgb(10, 239, 6)"}} > <i class="bi bi-truck iconsize"></i></div> : <div className="circle" id="step4" style={{"backgroundColor":"rgb(172, 172, 172)"}} > <i class="bi bi-truck iconsize"></i></div>}
                            &nbsp;&nbsp;
                            {item.orderStatus==='delivered'?<div className="circle" id="step5" style={{"backgroundColor":"rgb(10, 239, 6)"}} > <i class="bi bi-check-circle-fill iconsize"></i></div> : <div className="circle" id="step3" style={{"backgroundColor":"rgb(172, 172, 172)"}} > <i class="bi bi-check-circle-fill iconsize"></i></div>}
                            &nbsp;&nbsp;
                        </div>
                                <div className="labels">
                                    <h4>Order Placed</h4>
                                    <h4>Priest Allocated</h4>
                                    <h4>Divine on Process</h4>
                                    <h4>Out for Delivery</h4>
                                    <h4>Delivered</h4>
                                </div>
                                <br/>
                                {item.orderStatus === "priest allocated" ? allocatepriest(name): <></>}
                                {item.orderStatus === "order placed" ? 
                                <div className="col-12 d-flex">
                                    <div className="disp">
                                            <p className="dsp"><i class="bi bi-check2-circle"></i> Your order has been placed successfully! Stay tuned while we work through your further proceedings. </p>
                                            </div>
                                </div> :
                                 <></>} 

                                 {item.orderStatus === "divine on process" ? 
                                <div className="col-12 d-flex">
                                    <div className="disp">
                                            <p className="dsp"><i class="bi bi-flower1"></i> Good News! Your prayers has finally reached where you desired it to be. Waiting for final dispatch</p>
                                            </div>
                                </div> :
                                 <></>} 
                                 {item.orderStatus === "out for delivery" ? 
                                <div className="col-12 d-flex">
                                    <div className="disp">
                                            <p className="dsp">Yayyy! Gifts and graces are on your way! Sit back and relax while our team process your delivery</p>
                                            </div>
                                </div> :
                                 <></>}  
                            </div>
                        </div>
                        )})}}
    
  return (
    <>
        <Navigation/>
        {rendertracking(orders)}
        
    </>
  )
}
