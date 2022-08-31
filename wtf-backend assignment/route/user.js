const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



router.post("/register", (req, res) => {
 
    if (req.body.password.length < 8) {

        return res.status(501).json({
            status: 501,
            message: "Password must be minimum 8 characters long"
        })
    }

    if (req.body.mobile?.length > 10) {
        return res.status(501).json({
            status: 501,
            message: "mobile number should be 10 digits."

        })

    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(501).json({
                status: 501,
                message: "Server Error"
            })
        }
        else {
            User.findOne({ email: req.body.email }).then(result => {
                if (result) {
    
                    return res.status(501).json({
                        status: 501,
                        message: "email already exists."
                    })
                }
                else
                {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        password: hash,
                        role: req.body.role,
                        status: req.body.status
                    })
                    user.save()
                    .then(result => {
                        res.status(200).json({
                            status: 200,
                            message: "Account successfully created"
                        })
                    })
                    .catch(err => {
                        res.status(501).json({
                            status: 501,
                            message: err
                        })
                    })
                }
            })
           
                
            
        }
    })





})

router.post("/login", (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(501).json({
                    status: 501,
                    message: "user doesn't exist"
                })
            }
            if (user[0].role !== req.body.role) {
                return res.status(501).json({
                    status: 501,
                    message: "role doesn't match"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(501).json({
                        status: 501,
                        message: "password doesn't match"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        uuid: user[0]._id,
                        email: user[0].email
                    },
                        user[0].first_name + user[0].mobile,
                        {
                            expiresIn: "720h"
                        }
                    );
                    res.status(200).json({
                        status: 200,
                        message: "Logged in successfully",
                        data: {
                            first_name: user[0].first_name,
                            last_name: user[0].last_name,
                            email: user[0].email,
                            mobile: user[0].mobile,
                            role: user[0].role,
                            status: user[0].status,
                        },
                        token: token
                    })


                }
            })
        })
        .catch(err => {
            return res.status(501).json({
                status: 501,
                message: "Server error"
            })
        })
})

router.post("/getuserbyjwt", (req, res) => {
    const decode=jwt.decode(req.body.token)
    const {uuid}=decode
    User.find({_id: uuid}).then(user=>{
        if(user)
        {
            return res.status(200).json({
                status:200,
                data: {
                    first_name: user[0].first_name,
                    last_name: user[0].last_name,
                    email: user[0].email,
                    mobile: user[0].mobile,
                    role: user[0].role,
                    status: user[0].status,
                }
            })
        }
        else
        {
            return res.status(200).json({
                status:200,
                message:"Invalid token"
            })
        }
    })

})

router.post("/getuserby", (req, res) => {
    
    if(req.body.first_name)
    {
        User.find({first_name: req.body.first_name}).then(user=>{
            if(user)
            {
                return res.status(200).json({
                    status:200,
                    data: user
                })
            }
            else
            {
                return res.status(200).json({
                    status:200,
                    message:"Data not found"
                })
            }
        })
    }
    else if(req.body.last_name)
    {
        User.find({last_name: req.body.last_name}).then(user=>{
            if(user)
            {
                return res.status(200).json({
                    status:200,
                    data: user
                })
            }
            else
            {
                return res.status(200).json({
                    status:200,
                    message:"Data not found"
                })
            }
        })
    }
    else if(req.body.role)
    {
           User.find({role: req.body.role}).then(user=>{
                if(user.length>0)
                {
                    return res.status(200).json({
                        status:200,
                        data: user
                    })
                }
                else
                {
                    return res.status(200).json({
                        status:200,
                        message:"Data not found"
                    })
                }
                
            })       
       
    }
    else if(req.body.status)
    {
        User.find({status: req.body.status}).then(user=>{
            if(user.length>0)
            {
                return res.status(200).json({
                    status:200,
                    data: user
                })
            }
            else
            {
                return res.status(200).json({
                    status:200,
                    message:"Data not found"
                })
            }
            
        })       
    }
    else if(req.body.mobile)
    {
        User.find({mobile: req.body.mobile}).then(user=>{
            if(user.length>0)
            {
                return res.status(200).json({
                    status:200,
                    data: user
                })
            }
            else
            {
                return res.status(200).json({
                    status:200,
                    message:"Data not found"
                })
            }
            
        })       
    }
    else if(req.body.email)
    {
        User.find({email: req.body.email}).then(user=>{
            if(user.length>0)
            {
                return res.status(200).json({
                    status:200,
                    data: user
                })
            }
            else
            {
                return res.status(200).json({
                    status:200,
                    message:"Data not found"
                })
            }
            
        })       
    }



})


module.exports = router