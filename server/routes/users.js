const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart:req.user.cart,
        history:req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/add_to_cart", auth, (req, res) => {
    //먼저 user collection에 해당 유저의 정보를 가져오기
    User.findOne({_id:req.user._id},
        (err, userInfo)=>{
             //가져온 정보에서 카트에다 넣으려하는 상품이 이미 들어있는지 확인
            let duplicate= false
            userInfo.cart.forEach((item)=>{
                if(item.id===req.body.productId){
                    duplicate=true;
                }
            })
            if(duplicate){
                //상품이 이미 있을 때
                User.findOneAndUpdate(
                    {_id:req.user._id,"cart.id":req.body.productId},
                    {$inc:{"cart.$.quantity":1}},
                    {new:true},
                    (err,userInfo)=>{
                        if(err){
                            return res.status(400).json({success:false,err});
                        }
                        res.status(200).send(userInfo.cart)
                    }
                )
    
            }else{
                //상품이 없을 때
                User.findOneAndUpdate(
                    {_id:req.user._id},
                    {
                        $push:{
                            cart:{
                                id:req.body.productId,
                                quantity:1,
                                date:Date.now()
                            }
                        }
                    },
                    {new : true},
                    (err, userInfo)=>{
                        if(err){
                            return res.status(400).json({success:false,err});
                        }
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
        })
});

router.get('/removeFromCart',auth,(req,res)=>{
    //먼저 카트 안의 내가 지우려고한 상품 지워주기
    User.findOneAndUpdate(
        {_id:req.user._id},
        {
            "$pull":
                {"cart":{"id":req.query.id}}

        },
        {new:true},
        (err,userInfo)=>{
            let cart =userInfo.cart;
            let array= cart.map(item=>{
                return item.id 
            })


            Product.find({_id:  {$in:array}})
            .populate('writer')
            .exec((err, productInfo)=>{
                return res.status(200).json({
                  productInfo,
                  cart,
                });
            })

            //produt collection에서 현재 남아있는 상품들의 정보를 가져오기
        }
    )

    
})
module.exports = router;
