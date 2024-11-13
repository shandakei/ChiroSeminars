require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); 
    }
});

const upload = multer({ storage: storage });

// Route to handle profile photo upload
router.post('/chiro/user/uploadProfilePhoto', upload.single('profilePhoto'), async (req, res) => {
    try {
        // Check if file exists in request
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log('Received Data:', req.body);
        console.log('Uploaded Image:', req.file);

        const filePath = req.file.path; // Path to save in database
        const email = req.body.email;

        // Update user's profile_pic_url in the database
        const updatedUser = await User.updateProfilePic(email, filePath);

        res.status(201).json({ imageUrl: filePath, user: updatedUser });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Image upload failed', error: err });
    }
});



// Existing route
router.get('/chiro/user/:email', (req, res) => {
    return User.findByEmail(req.params.email)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User not found', error: err }));
});

router.post('/chiro/favourite/:favSem_id/:user_id', (req, res) => {
    const {favSem_id, user_id} = req.params
    return User.addFavouriteSeminar(favSem_id, user_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User not found', error: err }));
});

router.delete('/chiro/favourite/:favSem_id/:user_id', (req, res) => {
    const {favSem_id, user_id} = req.params
    return User.removeFavouriteSeminar(favSem_id, user_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User not found', error: err }));
});

router.delete('/chiro/user/delete/:user_id', (req, res) => {
    const {user_id} = req.params
    return User.deleteUser(user_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User could not be deleted', error: err }));
});


module.exports = router;
