import User from './../models/user.model.js';
import Message from './../models/message.model.js';
import cloudinary from './../lib/cloudinary.js';

export const getUsersForSidebar = async (req, res) => {


    try {
        const loggedInUSerID = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUSerID } }).select("-password");

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("Error in getUSersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

};


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId }, // Find messages where sender is me and reciever is other User OR
                { senderId: userToChatId, receiverId: myId }  // Find messages where reciever is me and sender is other User
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages controller :", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //Uploading Image to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({ // Create a New Message
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        //todo : realtime fucntionality goes here => socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessages controller :", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}