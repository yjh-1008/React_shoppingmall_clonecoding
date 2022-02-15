
const express = require('express');
const multer  = require('multer');
const router = express.Router();
const {product} =require('../models/Product');
//product

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage }).single("file");

router.post('/image',(req,res)=>{

    //가져온 이미지를 저장을 해주면 된다.
    upload(req,res,err=>{
        if(err){
            return res.json({success:false,arr})
        }
        return res.json({success:true,filePath: res.req.file.path,  fileName: res.req.file.filename})
    })

});

router.post('/',(req,res)=>{

  //가져온 이미지를 저장을 해주면 된다.
  const p=new product(req.body);
  p.save((err=>{
    if(err){return res.status(400).json({success : false,err})}
    return res.status(200).json({success:true});
  }));

});


module.exports = router;
