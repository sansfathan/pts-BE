function console2 (req,res,next){
    console.log("console 1")
    next()
}
module.exports = console2