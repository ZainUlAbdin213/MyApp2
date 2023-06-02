const myModel = require('../model/userModel')
const bcrypt = require('bcrypt-inzi');
const jwt = require('../middleware/jwtMiddleware')

exports.createUser = async (req, res)=> {
    try {
        const { name, email, password } = req.body
        const existing = await myModel.findOne({email})
        if (existing) {
            return res.status(400).json({
                message: 'User already exists'
                })
    }
    if(!name||!email||!password){
        return res.status(400).json({
            message: 'Please provide all the required fields'
            })
    }
    //hashpswd
    const hashpwsd = await bcrypt.stringToHash(password,10)
    //create user
    const user = await new myModel({
        name,
        email,
        password:hashpwsd
        })
        await user.save()
        const token = jwt.sign(req.body)
        return res.status(200).json(token)

    }
    
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error,error:error.meassage'
            })
    }
}
exports.login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        //find user if available
        const user = await myModel.findOne({ email })
        //verifyHash
        const verifyHash = await bcrypt.varifyHash(password,user.password)
        if (!verifyHash){
        return res.status(400).json({
            message: 'Wrong Password'})
            }
            return res.status(200).json(user)
}
catch(error){
    return res.status(500)
    .json({ message: 'Internal server error,error:error.message'
        })

}

}
exports.getUser = async (req,res)=>{
    try{
        const user = await myModel.find()
        return res.status(200).json(user)
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Internal server error,error:error.message'
            })

}
}

exports.getOne = async (req,res)=>{
    try {
      const token = req.params.token; 
      const user = await myModel.findOne({token}); 
      
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error,error: error.message'
      });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const token=req.params.token;
      const updatedUserData=req.body;
  
      const updatedUser = await myModel.findOneAndUpdate({ token }, updatedUserData, { new: true });
  
      if(!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error,error: error.message'
      });
    }
  }

  
            

