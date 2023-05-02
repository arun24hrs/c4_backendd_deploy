const {Router} = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Model/user.model");
const userRoute = Router();

userRoute.post("/register", (req, res) => {
    console.log(req.body)
    const {email, password, name, gender} = req.body;
    bcrypt.hash(password, 5, async(err, hash)=> {
        console.log(hash)
        if(hash){
            const user = UserModel({email, password: hash, name, gender});
            await user.save();
            res.status(200).send({msg: "Registered User Successfully."})
        }
        else {
            res.send({msg: "Failed to Register User"})
        }
        if(err){
            res.status(400).send({msg: err.message})
        }
    });
});

userRoute.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    jwt.sign({authorId: user._id, authorName: user.name}, "social", (err, token) => {
                        if(token){
                            res.status(200).send({msg: "Login Successful.", token})
                        } else {
                            res.status(200).send({msg: "Invalid Credentials."})
                        }
                      });
                }else {
                    console.log(err)
                    res.status(400).send({msg: "Invalid Credentials."})
                }
            });
        }
    } catch (error) {
        
        res.status(400).send({msg: "Invalid Credentials."})
    }
})

module.exports = userRoute;