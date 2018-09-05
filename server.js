// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// returns current time if no parameters are supplied
app.get('/api/timestamp/',(req,res)=>{
    res.json({'unix':(new Date()).getTime(),'utc':(new Date().toUTCString())});
})
//Accepts date in both unix and ISO8601 format
app.get('/api/timestamp/:date',(req,res)=>{
    const dateTest=/\d{4}-\d{2}-\d{2}/; // test the format of the date recieved
    const queriedData=req.params.date; //takes the supplied date

     if (dateTest.test(queriedData)){ //test date for the ISO8601 format
            let unix = (new Date(queriedData).getTime());
            let currentTime = (new Date(queriedData)).toUTCString();

            if (currentTime=="Invalid Date"){ //handles error 
                console.log(true, "there is a date format error");
                res.json({'error':'Invalid Date'});
            }
           else{res.json({'unix':unix, 'utc':currentTime});
             
        }
   }
   else{
       let unix = queriedData;
       let currentTime= (new Date(Number(queriedData))).toUTCString();
      
       if (currentTime=="Invalid Date"){ //handles error 
        console.log(true, "there is a date format error");
        res.json({'error':'Invalid Date'});
       }
        res.json({'unix':unix, 'utc':currentTime});
    }
   
   
   
   
    
   
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});