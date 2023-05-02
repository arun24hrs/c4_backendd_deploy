const {Router} = require("express");
const PostModel = require("../Model/post.model");
const postRouter = Router();

postRouter.post("/create", async(req, res)=>{
    console.log(req.body);
    try {
        const post = new PostModel(req.body);
        await post.save();
        res.status(200).send({msg: "New post has been added."})
    } catch (error) {
        res.status(400).send({msg: "Error adding the post."})
    }
})

postRouter.get("/", async(req, res) => {
    try {
        const posts = await PostModel.find({authorId: req.body.authorId})
        console.log(posts);
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({msg: "Error fetching the posts. Make sure to login."})
    }
})

postRouter.patch("/update/:postId", async(req, res) => {
    const {postId} = req.params
    try {
        await PostModel.findByIdAndUpdate({authorId: req.body.authorId, _id: postId}, req.body);
        res.status(200).send({msg: `The post with ${postId} has been updated.`});
    } catch (error) {
        res.status(400).send({msg: "Error updating the posts. Make sure to login."})
    }
})

postRouter.delete("/update/:postId", async(req, res) => {
    const {postId} = req.params
    try {
        await PostModel.findByIdAndDelete({authorId: req.body.authorId, _id: postId});
        res.status(200).send({msg: `The post with ${postId} has been delete.`});
    } catch (error) {
        res.status(400).send({msg: "Error deleting the posts. Make sure to login."})
    }
})

module.exports = postRouter;