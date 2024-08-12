const serverless = require("serverless-http");
const express = require("express");
const app = express();
const Mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const compression = require('compression');
const multer = require('multer')
const cors = require('cors')


require('dotenv').config()
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(compression());


/**Connecting to the mongodb database......................................... */
const mongoUrl = process.env.MONGODB_URL
Mongoose.connect(mongoUrl).then((res)=>{

  console.log('Database connected')
})
.catch((error)=>{
  console.log('Error ' + error)
})
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////




/**Setting the routes and getting details...................................................................... */
require('./schema')
const Items = Mongoose.model('Items')
const User = Mongoose.model('Users')
const Orders = Mongoose.model('Orders')





/**The Home route.........................................................................................
 * .......................................................................................................
 */
app.get("/", async(req, res, next) => {

try{
  const ITems = await Items.find({})//Getting all data from the items collection in database
  const mainItems = []//Contains also items gotten from "ITems"


  if (ITems.length){
    ITems.forEach((item)=>{
      const {_id, name, price, image} = item

        mainItems.push({//Appending the mainItems array with an edited version of "ITems" data
          _id,
          name,
          price,
          image:{
            filename:image.filename,
            data:image.data.toString('base64'),
            contentType:image.contentType
          }
        })
  
    })
  }
  

  return res.status(200).json({items: mainItems});//Sending the items to the client side

}
catch(err){

  res.send({msg: 'Error Occured'})
}

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





/**The product details Route.............................................................................................
 * .....................................................................................................................
*/
app.get('/product/:id', async(req, res)=>{

const id = req.params.id

try{
  const product = await Items.findById(id)
  const {_id, name, price, image } = product


  res.send({product:{
    _id,
    name,
    price,
    image:{
      filename:image.filename,
      data:image.data.toString('base64'),
      contentType:image.contentType
    }
  }, status:200})

}
catch(err){

  res.send({msg: 'An Error Occured ' + err})
}
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





/**Registration/SignUp route.........................................................................................
 * .................................................................................................................
 */
app.post('/register', async(req, res, next)=>{

  try{

      const {firstname, lastname, email, password} = req.body

      const oldUser = await User.findOne({email:email.trim()})//Checking if a user already exist..............................
      if (oldUser){

           res.status(201).json({ success: false, msg:'Email has already been used'});

      }
      else{
        /**Creates a new User................................ */
        const encryptedPassword = await bcrypt.hash(password, 10) //Generating an encrypted password of the user original password

        const user = {
          firstname:firstname.trim(),
          lastname:lastname.trim(),
          email:email.trim(),
          password:encryptedPassword.trim()
        }
        /**This command creates a new user in the database */
        await User.create(user)
        /**................................................. */
      
      
        res.status(200).json({ success: true, data:user, msg:'Successfully Registered'});
    }



  }
  catch(err){
    res.status(500).json({success:false, msg: "Internal server error",});

  }

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





/**Login/SignIn route..........................................................................................
 * ...........................................................................................................
 */
app.post('/login', async(req, res)=>{

  try{

    const {email, password} = req.body//Getting data from the client....
 
    const user = await User.findOne({email: email.trim()})//Confirming if the user exist in the database
 
    if (user){
       const isPassword = await bcrypt.compare(password, user.password)
       

       /**Authenticate users password..................................................... */
       if (isPassword){

         res.status(200).json({ success: true, data:user, msg:'Successfully logged in'});
       }
       else{

        res.status(201).json({ success: false, msg:'Invalid email or password'});

       }
       /**............................................................................. */
       /**............................................................................. */


    }
    else{
      //Response retured if the user does not exist..........................
      res.status(201).json({ success: false, msg:'Invalid email or password'});
      
    }

  }
  catch(err){

    res.status(201).json({ success: false,  msg:'Error: ' + err});

  }


})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/**Admin Section Route****************************************************************************************** */


/**Orders route (Posting customers orders to the database)........................*/
  app.post('/orders', async(req, res)=>{

    try{
      const customerCheckoutInfo = req.body
      const {items, totalItemPrice, user, address, phoneNumber} = customerCheckoutInfo


      /**Create new orders......................................... */
      const orders = await Orders.create(customerCheckoutInfo)
      /**.............................................................. */

      
      res.status(200).json({msg: 'PaymentSuccessful', data:{address, phoneNumber}})
    }
    catch(err){

      res.status(500).json({msg:'An error occured: ' + err})
    }
  })
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////




/**GetOrders route (getting customers orders from the database).......................................... */
app.get('/getorders', async(req, res)=>{

  try{

    const allorders = await Orders.find({})//returning all ordered product from the database

  
    res.status(200).json({msg:'Items gotten successfully', allorders})

  }
  catch(err){

    res.status(500).json({msg:'An error occured o' + err})
    
  }

})
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////




/**AddProduct route (Adding new product to the data base).................................... */

const fileFilter = (req, file, cb) => {
  // Accept image files only
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('File type not supported'), false);
  }


  cb(null, true);

}

// Set up multer for file storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/upload', upload.single('image'), async(req, res)=>{

  try{
    const {originalname, buffer, mimetype} = req.file;

    const newProduct = req.body
    const {name, price,} = newProduct


    const itemUploaded = await Items.create({
      name,
      price,
      image:{
        filename: originalname,
        data: buffer,
        contentType: mimetype,
      }
    })

    
    res.status(200).json({msg:'Item successfully uploaded ', data: itemUploaded })
  }
  catch(err){

    res.status(500).json({msg:'An error occured: ' + err})
  }


})
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////



app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


exports.handler = serverless(app);