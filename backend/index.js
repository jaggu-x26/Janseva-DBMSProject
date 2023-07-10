var express = require('express');
var app = express();
var router = express.Router();
var port = 8000;
const mysql = require("./connection").con
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');



//body parser//
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//stripe//
const Stripe = require('stripe')(process.env.SECKRET_KET);

//cors //
const cors = require('cors');
app.use(cors({
    origin: '*'
}));


// Landing api response //
app.get('/', function(req, res) {
    res.send("<h1>JANSEVA BACKEND API !!!!</h1><h2>Pilgrimage Done </h2>");
    res.end();
});

// pilgrimagess //

// pilgrimage on query params //
app.get("/pilgrimage", (req, res) => {
    var query = req.query;
    if(Object.keys(query).length ==0) // check length of query response //
    {
        var qry = "select * from pilgrimage";
        
    }
    else{
        var qry = "select * from pilgrimage where pilgID ="+req.query.pilID;
    }
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });
   
   

});
// pilgrimage using id //
app.get("/pilgrimage/:Pilid", (req, res) => {
    var id = req.params.Pilid;
    let qry = "select * from pilgrimage where pilgID =?";
    mysql.query(qry,[id] ,(err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });
});
// priest//
app.get("/priest", (req, res) => {
    var query = req.query;
    if(Object.keys(query).length ==0) // check length of query response //
    {
        var qry = "select * from priest";
        
    }
    else{
        var qry = "select * from priest where pilgID ="+req.query.pilID;
    }
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
});



// priest using pilg ID//
app.get("/priest/:Pilid", (req, res) => {
    var id = req.params.Pilid;
    let qry = "select * from priest where pilgID =?";
    mysql.query(qry,[id] ,(err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });
});
});


// package //

app.get("/package/:Pilid", (req, res) => {
    var id = req.params.Pilid;
    let qry = "select * from package where pilgID =?";
    mysql.query(qry,[id] ,(err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });
});


// place order //

app.get('/placeorder', (req, res) => {
    const pilgID = req.query.pilgID;
    const packID = req.query.packID;
    const qry = "SELECT pilgrimage.pilgName, pilgrimage.pilgLoc , pilgrimage.pilgCity, pilgrimage.pilgPin, pilgrimage.userExp , package.packName, package.packCost , package.packContent FROM package INNER JOIN pilgrimage ON package.pilgID=pilgrimage.pilgID where pilgrimage.pilgID = ? AND package.packID = ?"
    mysql.query(qry,[pilgID,packID] ,(err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });
});

//payment //

app.post('/payment', async(req, res) => {
    let state , error;
    const {amount,token,orderdetails,order_id, timestamp , custID}= req.body;
    console.log(timestamp);
    const qry = 'INSERT INTO orders (orderID, orderDate, pilgName,packName,custID,amount ,orderStatus,payID,paymentstatus) VALUES (?,?,?,?,?,?,?,?,?)'
    if(token)
    {
        const orderstatus = 'order placed';
        const state = 'success';
        mysql.query(qry,[order_id,timestamp,orderdetails[0].pilgName,orderdetails[0].packName,custID,amount,orderstatus,token.id,state] ,(err, results) => {
            if (err) throw err
            else {
                if(results.affectedRows=1)
                        {
                            res.json({"status" : state});
                        }
                else{
                    res.json({"status" : 'payment error'});
                }
            }
        });

    }
    else{
        res.json({"status" : 'error'});
    }
    
 });

// view orders //

app.get('/vieworders/:custID', (req, res) => {
    const id = req.params.custID;
    const qry = `SELECT * FROM orders WHERE custID = ${id} order by orderDate desc`;
    mysql.query(qry,[id],(err, result) => {
        //console.log(result);
        res.send(result);
    })

})
// track orders // 
app.get('/trackorders', (req, res) => {
    const order = req.query.orderID;
    //console.log(req.query);
    const qry = `SELECT * FROM orders WHERE orderID = ${order}`;
    mysql.query(qry,[order],(err, result) => {
        //console.log(result);
        res.send(result);
    })

});



// admin  orders //
app.get('/allorders', (req, res) => {
    const id = req.params.custID;
    const qry = `SELECT * FROM orders order by orderDate desc`;
    mysql.query(qry,[id],(err, result) => {
        //console.log(result);
        res.send(result);
    })

});

//admin update order//
app.post('/update', (req, res) => {
    const {id, status} = req.body;
    //console.log(req.body);
    const qry = 'UPDATE orders SET orderStatus =? WHERE orderID = ?';
    mysql.query(qry,[status,id],(err, result) => {
        if (err) throw err
            else {
                if(result.affectedRows=1)
                        {
                            console.log('>>>>orders status affected with',status)
                            res.json({"auth" : 'success'});
                        }
                else{
                    res.json({"auth" : 'error'});
                }
            }
        });
        
    })
// cancel orders //

app.get('/cancel', function(req, res) {

    const id = req.query.orderid;
    const status = 'cancelled';
    const qry = 'UPDATE orders SET orderStatus =? WHERE orderID = ?';
    mysql.query(qry,[status,id],(err, result) => {
        if (err) throw err
            else {
                if(result.affectedRows=1)
                        {
                            console.log('>>>>orders status affected with',status)
                            res.json({"auth" : 'success'});
                        }
                else{
                    res.json({"auth" : 'error'});
                }
            }
        });
        
    });
// allocate priest // 
app.get('/priestAllocate', function(req, res){
    const pilgname = req.query.pilgName;
    //console.log(req.query);
    const qry = 'select priName from priest where pilgID IN (select pilgID from pilgrimage where pilgName = ?)';
    mysql.query(qry,[pilgname],(err, result) => {
        if (err) throw err;
        else
        {
            res.send(result);
        }

    })
});
// check if priest already exists //
app.get('/priestexists', (req, res) => {
    console.log(req.query);
    const orderid = req.query.orderID;
    //console.log(orderid);
    const qry='SELECT priName FROM orders WHERE orderID =?';
    mysql.query(qry,[orderid],(err, result) => {
        if (err) throw err;
        else
        {
            //console.log(result);
            res.json(result);
        }
    })
});

// update the priest in order tracking if doest not exists //

app.get('/priestupdate',(req, res)=>{
    console.log(req.query);
    const orderid = req.query.orderID;
    const name = req.query.priName;
    const qry = 'UPDATE orders SET priName =? WHERE orderID = ?'
    mysql.query(qry,[name,orderid],(err, result) => {
        if (err) throw err
            else {
                if(result.affectedRows=1)
                        {
                            console.log('>>>>priest updated with ',name)
                            res.json({"auth" : 'success'});
                        }
                else{
                    res.json({"auth" : 'error'});
                }
            }
        });


})
 // login //
 app.post('/login',(req,res) => {
    username = req.body.email;
    const query = `select * from customer where custEmail = '${username}'`;
    mysql.query(query, (err, user) => {
        //console.log(user[0].custID);
        console.log(`LOGIN MESSAGE ::  ${username} is logging in with ${req.body.password}`);
        if(err) { return  res.status(500).send({auth:false,token:'Error while login'})}
        if(user.length==0) {return  res.status(500).send({auth:false,token:'No user Found'})}
        else{
            if(req.body.password != user[0].custPassword)
            {
                return res.status(500).send({auth:false,token:'Invalid Password'})
            }
            else{
                return res.send({auth:true,token:user[0].custID})
            }
           
        }
    });
})
// user info //
app.get('/userInfo',(req,res) => {
    const query = 'select * from customer where custID = ?';
    var token = req.headers['x-access-token']
    if(token=='null') {
        //console.log('>>null token');
        return res.status(500).send({auth:false,token:'No Token Provided'})
    }
    //console.log(token);
    mysql.query(query, [token],(err, user) => {
        res.send({auth:true,token:user})
    })
   
});

app.get('/userdata' , (req, res) => {
    //console.log(req.query);
    var qry = `select * from customer where custID =${req.query.custID}`
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            //console.log('>>>>>> userdata passed to frontend');
            res.send(results);
        }
    });
})

//registration //

app.post('/registration', (req, res) => {
    //console.log('>>>>>> registration',req.body);
    var {name,age,gender,email,phone,address,pin,password} = req.body;
    const qry = 'SELECT * FROM customer WHERE custEmail = ? OR custContact = ?';
    mysql.query(qry, [email,phone],(err,results)=>
    {
        if (err) 
        {
            throw err;
        }
        else 
        {
            if(results.length > 0)
            {
                res.send({auth:false,status:"User with such mail or phone number already exists"});
            }
            else{
                const qry2 = 'INSERT INTO customer (custName, custAge, custGender, custEmail, custContact, custAddress, custPassword, custPin) VALUES (?,?,?,?,?,?,?,?)';
                mysql.query(qry2, [name,age,gender,email,phone,address,password,pin],(err, results) => {
                    if (err) throw err
                    else {
                        //console.log('>>>>>> userdata passed to frontend');
                        //console.log(results);
                        if(results.affectedRows=1)
                        {
                            res.send({auth:true,status:"Success"})
                        }
                        else{
                            res.send({auth:false,status:"Database Error"})
                        }
                    }
                });

            }
        }
    });
    


})
// user //

app.get('/userprofile/:id', (req,res)=>
{
    const custID = req.params.id;
    //console.log(custID);
    var qry = "select * from customer where custID = ?";
    mysql.query(qry, [custID],(err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });

})
// check feedback //

app.get('/checkfeedback/:id', (req, res) => {

    const orderID =  req.params.id;
    const qry = "select * from feedback where orderID = ?";
    mysql.query(qry, [orderID],(err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });


});

// add feedback into feedback table //
app.post('/addFeed', (req, res) => {
    console.log(req.body);
    const id = req.body.orderID;
    const feed = req.body.feedCont;
    const custID =req.body.custID;

    const qry = 'INSERT INTO feedback (feedContent, orderID, custID) VALUES (?,?,?)';
    mysql.query(qry, [feed,id,custID],(err, results) => {
        if (err) throw err
        else {
            console.log('>>>>>> feedback entered');
            if(results.affectedRows=1)
            {
                res.json({auth:true,status:"Success"})
            }
            else{
                res.json({auth:false,status:"Database Error"})
            }
        }
    });

    
});



// server listens at  //
app.listen(port, (err) => {
    if (err)
        throw err;
    else
        console.log("Server is running at port %d:", port);
});

