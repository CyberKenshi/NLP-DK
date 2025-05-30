const mongoose = require('mongoose');
const User = require('../models/usersModel.js');
const dotenv = require('dotenv').config();
const connectDB = require('../config/db.js');

const studentData = [
    { studentCode: "52100095", fullName: "Nguyễn Anh Quân" },
    { studentCode: "521H0286", fullName: "Lý Mạnh Phi" },
    { studentCode: "521H0505", fullName: "Nguyễn Ngọc Minh" },
    { studentCode: "521H0390", fullName: "Vi Thành Đạt" },
    { studentCode: "52100894", fullName: "Lý Hoàng Gia Huy" },
    { studentCode: "521H0220", fullName: "Bùi Hải Dương" },
    { studentCode: "52100911", fullName: "Võ Luyện" },
    { studentCode: "521H0511", fullName: "Nguyễn Hoàng Phúc" },
    { studentCode: "521H0508", fullName: "Bùi Anh Phú" },
    { studentCode: "52100637", fullName: "Nguyễn Thái Khôi" },
    { studentCode: "52100303", fullName: "Trần Phước Sang" },
    { studentCode: "521H0514", fullName: "Nguyễn Lê Phước Tiến" },
];

const seedUsers = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        for (const student of studentData) {
            const username = student.studentCode.toLowerCase();
            const email = `${username}@student.tdtu.edu.vn`;

            const userData = {
                fullName: student.fullName,
                username: username,
                email: email,
                password: '123456',
                role: 'intern',
                major: 'Khoa học máy tính',
                school: 'TDTU',
                studentCode: student.studentCode
            };

            const existingUser = await User.findOne({ username: userData.username });
            if (existingUser) {
                console.log(`User ${userData.username} already exists. Skipping...`);
                continue;
            }

            const user = new User(userData);
            await user.save();
            console.log(`Added student: ${user.fullName} (${user.username})`);
        }

        const userCount = await User.countDocuments();
        console.log(`Total users in database: ${userCount}`);
    } catch (error) {
        console.error('Error seeding students:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedUsers();
