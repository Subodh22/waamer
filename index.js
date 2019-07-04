const express =require ('express');
const multer = require ('multer');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
const bodyparser= require('body-parser');
const Post = require('./backend/models/post.js');
const mongoose = require('mongoose');
const multiparty= require('multiparty');
const util=require('util');
mongoose.connect("mongodb+srv://Subodh_1:Mathers22@cluster0-aiti6.mongodb.net/angular?retryWrites=true&w=majority").
then(()=>
{
    console.log("connected to the Database my guy");

}).catch(()=>
{
console.log("WOWO database connect weakaf boi");
});

const port = process.env.PORT || 3000;
const app = express();
app.set('views',path.join(__dirname,'backend'));
app.set('view engine','ejs');
app.engine('html',ejs.renderFile);
// app.use(bodyparser.urlencoded({
//     extended:false
// }));
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyparser.json());
app.use(cors());
app.get('/',(req,res)=>res.render('index.html'));
app.use("/images",express.static(path.join("public/uploads")));


var rawr="";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
      },
    filename : function(req, file, cb)
    {
        var name= file.originalname.toLowerCase().split('.');
        var first_name=name[0].split(' ').join('-');
    //    var path.basename(file.originalname);
    rawr=first_name + '-'+ Date.now() + path.extname(file.originalname);
        cb(null,rawr);

    }

});
const upload = multer({
    storage : storage,
   fileFilter : function(req, file ,cb)
   {
       checkFileType(file,cb);

   }
}).single('image');

function checkFileType(file, cb)
{
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype&& extname)
    {

        return cb(null,true);
    }else
    {
        cb('Error :Images Only');
        console.log("BURH");
    }

}



app.post("/form",(req,res,next)=>
{
   
        console.log(req.body.product_name);
        console.log(JSON.parse(req.body.product_imgs));
        res.send(req.body);
         upload(req,res,(err)=>{
         if(err)
         {
             res.render('index',
             {
                 msg:err
             });
         }else{
        
             //console.log(req.file);
             res.send('test');
         }
     });
    //}
   // console.log(req.body);
    var form = new multiparty.Form();
    //var Data_app = [];
    form.parse(req, function(err, fields, files) {
       // res.writeHead(200, {'content-type': 'text/plain'});
      //  res.write('received upload:\n\n');
     // console.log(JSON.parse(fields));
        var title_name=fields.title[0]
        var content_name=fields.content[0];
       // console.log(req.file.filename);
        var url = req.protocol + '://'+req.get("host");
      
     const poste=new Post({
        title: title_name,
        content : content_name,
        imagePath:url+"/images/"+ rawr 
    });
    poste.save((err)=>
    {
        if(err)
        {
            res.send(err);
            console.log(err);
        }
        rawr="";
    });

    });
  //console.log(req.file);
   
    // console.log(req.file);
    

    // console.log(poste);
    //res.send("wow thank you");
});
app.get("/form",(req,res,next)=>
{
    Post.find().
    then(documents=>
        {
            console.log(documents);
            res.status(200).json({
                message : "gobble",
                datas: documents
            });
        });
})

app.get("/cunt",(req,res,next)=>
{
    res.send("cunt is working");
})


app.listen(port,()=>console.log('server is a go'));