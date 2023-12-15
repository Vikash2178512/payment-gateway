var express = require('express');
var router = express.Router();
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: 'rzp_test_DmSSet4GqlBlkV',
  key_secret: 'UvZce6c8kJcbFHlrlljZ1ju5',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create/orderId",function(req,res,next){
  var options = {
    amount:"100",  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send(order)
  });
})
router.post("/api/payment/verify",function(req,res,next){
  let razorpayOrderId = req.body.response.razorpayOrderId
  let razorpayPaymentId = req.body.response.razorpayPaymentId
  let  signature =  req.body.response.signature
  let secret = "UvZce6c8kJcbFHlrlljZ1ju5"


var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
const result =  validatePaymentVerification({
  "order_id": razorpayOrderId,
   "payment_id": razorpayPaymentId
   }, signature, secret);
   res.send(result)
   if (result==true) {
    alert="payment succesful"
   }
   else{
    alert = "payment Failed"
   }
})
module.exports = router;
