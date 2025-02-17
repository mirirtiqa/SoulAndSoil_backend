import User from "../model/userModel.js"

export const signin = async(req, res)=>{
    try{
        const userData = req.body
        const {email}= userData;

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(200).json(userExist);
        }

        const augmentedUserData = new User({
            name:userData.name,
            email:userData.email,
            currentAddress: userData.currentAddress || "",
            age:userData.age || "",
            token: userData.token || "",
            currentReservations:[],
            pastReservations:[],

        })
        const savedUser = await augmentedUserData.save();
        res.status(200).json(savedUser);

    }
    catch{
        res.status(500).json({error:"Internal error"});
    }
}

export const getDetails = async(req,res)=>{
    try{
        const {userId} = req.params;
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json("User not found")

        }
        return res.status(200).json(user)

    }
    catch{
        return res.status(500).json("Internal Error")
    }
}

export const getCurrentReservations = async(req,res)=>{
    try{
        const {userId} = req.params
        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json("user not found")
        }

        const userReservations = user.currentReservations.sort((a, b) => {
               
            const dateComparison = new Date(a.startDate) - new Date(b.startDate);
            
            if (dateComparison !== 0) {
                return dateComparison; 
            }
        
           
            return new Date(`1970-01-01T${a.startTime}`) - new Date(`1970-01-01T${b.startTime}`);
        });
        return res.status(200).json(userReservations)

    }
    catch{

        return res.status(500).json({error:"Internal error"});

    }
}


export const getUserPastReservation = async(req,res)=>{

    try{
        const {userId} = req.params

        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json("user not found")

        }
        
        const userpastReservations = user.pastReservations.sort((a, b) => {
           
            const dateComparison = new Date(a.startDate) - new Date(b.startDate);
            
            if (dateComparison !== 0) {
                return dateComparison; 
            }
        
           
            return new Date(`1970-01-01T${a.startTime}`) - new Date(`1970-01-01T${b.startTime}`);
        });
  
        return res.status(200).json(userpastReservations)

    }
    catch{

        return res.status(500).json({error:"Internal error"});

    }
}
