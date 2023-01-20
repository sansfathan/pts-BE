function console1 (req,res,next){
    console.log("console 1")
    next()
}
module.exports = console1