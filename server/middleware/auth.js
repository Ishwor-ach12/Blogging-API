
const authenticate = ((req,res,next) => {
  const header = req.headers['authorization'];

  if(!header){
    return res.status(401).json({"message": "No token provided by the user "});
  }

  const token = header.split(' ')[1];

  if(token != "mysecrettoken"){
    return res.status(401).json({"message" : "Unauthorized user "})
  }
  
  next();
})

export default authenticate;