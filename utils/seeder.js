const mongoose = require('mongoose');
const User = require('../models/usersModel.js');
const Category = require('../models/categoryModel.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const connectDB = require('../config/db.js');
const cloudinary = require('./cloudinary.js');
const path = require('path');
const fs = require('fs');

const seedUsers = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // // Xóa tất cả người dùng trong database
        // const deleteResult = await User.deleteMany();
        // console.log(`Deleted ${deleteResult.deletedCount} users.`);

        // // Tạo một mảng chứa dữ liệu người dùng
        // const usersData = [
        //     {
        //         fullName: "Nguyễn Văn Admin",
        //         email: "anhquan12052003@gmail.com",
        //         mobile: "0339637402",
        //         username: "admin",
        //         password: "admin",
        //         role: "admin",
        //         bio: "Tui là admin hehe",
        //         avatar: "/img/lab-personnel/admin.jpg",
        //         jobTitles: [], // Không có thông tin, để mảng rỗng
        //         degree: {
        //             vi: null,
        //             en: null
        //         }
        //     },
        //     {
        //         fullName: "Lê Anh Cường",
        //         email: "leanhcuong@tdtu.edu.vn",
        //         mobile: "+84 123 456 789",
        //         username: "leanhcuong",
        //         password: "password123",
        //         role: "personnel",
        //         scholarID: "fpBTRIUAAAAJ",
        //         bio: "Experienced researcher in NLP and AI.",
        //         avatar: "/img/lab-personnel/leanhcuong.jpg",
        //         jobTitles: [
        //             { vi: "Phó Trưởng Khoa", en: "Vice Dean" },
        //             { vi: "Trưởng bộ môn Khoa học máy tính", en: "Head of Computer Science Department" },
        //             { vi: "Trưởng phòng Lab NLP-KD", en: "Head of NLP-KD Lab" }
        //         ],
        //         degree: {
        //             vi: "PGS.TS.",
        //             en: "Assoc. Prof."
        //         }
        //     },
        //     {
        //         fullName: "Trần Thanh Phước",
        //         email: "tranthanhphuoc@tdtu.edu.vn",
        //         mobile: "+84 987 654 321",
        //         username: "tranthanhphuoc",
        //         password: "password123",
        //         role: "personnel",
        //         scholarID: "kq_KpT0AAAAJ",
        //         bio: "Specialist in machine learning applications.",
        //         avatar: "/img/lab-personnel/tranthanhphuoc.jpg",
        //         jobTitles: [
        //             { vi: "Trưởng bộ môn Hệ thống thông tin", en: "Head of Information Systems Department" }
        //         ],
        //         degree: {
        //             vi: "TS.",
        //             en: "PhD."
        //         }
        //     },
        //     {
        //         fullName: "Nguyễn Chí Thiện",
        //         email: "nguyenchithien@tdtu.edu.vn",
        //         mobile: "+84 456 789 123",
        //         username: "nguyenchithien",
        //         password: "password123",
        //         role: "personnel",
        //         scholarID: "r0W3l7kAAAAJ",
        //         bio: "Researcher in data science and AI systems.",
        //         avatar: "/img/lab-personnel/nguyenchithien.jpg",
        //         jobTitles: [
        //             { vi: "Giảng viên", en: "Lecturer" }
        //         ],
        //         degree: {
        //             vi: "TS.",
        //             en: "PhD."
        //         }
        //     },
        //     {
        //         fullName: "Trần Lương Quốc Đại",
        //         email: "tranluongquocdai@tdtu.edu.vn",
        //         mobile: "+84 321 654 987",
        //         username: "tranluongquocdai",
        //         password: "password123",
        //         role: "personnel",
        //         scholarID: "0u07s1YAAAAJ",
        //         bio: "Expert in natural language processing.",
        //         avatar: "/img/lab-personnel/tlqd.jfif",
        //         jobTitles: [
        //             { vi: "Giảng viên", en: "Lecturer" }
        //         ],
        //         degree: {
        //             vi: "TS.",
        //             en: "PhD."
        //         }
        //     },
        //     {
        //         fullName: "Hồ Thị Linh",
        //         email: "hothilinh@tdtu.edu.vn",
        //         mobile: "+84 159 753 456",
        //         username: "hothilinh",
        //         password: "password123",
        //         role: "personnel",
        //         scholarID: "efbV62EAAAAJ",
        //         bio: "Specialist in computer vision.",
        //         avatar: "/img/lab-personnel/hothilinh.jpg",
        //         jobTitles: [
        //             { vi: "Giảng viên", en: "Lecturer" }
        //         ],
        //         degree: {
        //             vi: "TS.",
        //             en: "PhD."
        //         }
        //     },
        //     {
        //         fullName: "Huynh Van Nam",
        //         email: "huynhvannam@collaborator.com",
        //         mobile: "+84 741 852 963",
        //         username: "huynhvannam",
        //         password: "password123",
        //         role: "colab",
        //         scholarID: "XVThR3QAAAAJ",
        //         bio: "Collaborator in AI research projects.",
        //         avatar: "/img/lab-personnel/huynhvannam.jpg",
        //         jobTitles: [],
        //         degree: {
        //             vi: "PGS.TS.",
        //             en: "Assoc. Prof."
        //         }
        //     },
        //     {
        //         fullName: "Nguyen Le Minh",
        //         email: "nguyenleminh@collaborator.com",
        //         mobile: "+84 852 963 741",
        //         username: "nguyenleminh",
        //         password: "password123",
        //         role: "colab",
        //         scholarID: "vM9772wAAAAJ",
        //         bio: "Collaborator in NLP and machine learning.",
        //         avatar: "/img/lab-personnel/nguyenleminh.jpg",
        //         jobTitles: [],
        //         degree: {
        //             vi: "PGS.TS.",
        //             en: "Assoc. Prof."
        //         }
        //     },
        // ];

        // // Thêm dữ liệu mới
        // for (const userData of usersData) {
        //     const avatarPath = userData.avatar;

        //     // Tải hình ảnh lên Cloudinary nếu có đường dẫn avatar
        //     if (avatarPath) {
        //         try {
        //             // Xây dựng đường dẫn đầy đủ đến file hình ảnh
        //             const localImagePath = path.join(__dirname, '..', 'public', avatarPath);
        //             const filename = `${userData.username}-${Date.now()}`;

        //             if (fs.existsSync(localImagePath)) {
        //                 console.log(`File found at: ${localImagePath}`);
        //                 const uploadResult = await cloudinary.uploader.upload(localImagePath, {
        //                     public_id: `avatars/${filename}`,
        //                     folder: 'NLP-KD',
        //                     use_filename: true,
        //                     unique_filename: false,
        //                     overwrite: true,
        //                 });
        //                 userData.avatar = uploadResult.secure_url;
        //                 console.log(`Uploaded avatar for ${userData.fullName}: ${userData.avatar}`);
        //                 // fs.unlinkSync(localImagePath); // Comment nếu không muốn xóa file
        //             } else {
        //                 console.error(`File not found at: ${localImagePath}`);
        //                 userData.avatar = null;
        //             }
        //         } catch (uploadError) {
        //             console.error(`Failed to upload avatar for ${userData.fullName}:`, uploadError);
        //             userData.avatar = null;
        //         }
        //     }

        //     // Lưu user vào database
        //     const user = new User(userData);
        //     await user.save();
        //     console.log(`Added user: ${user.fullName}`);
        // }

        // // Kiểm tra số lượng user trong database
        // const userCount = await User.countDocuments();
        // console.log(`Total users in database: ${userCount}`);
        // console.log('Seeding completed successfully.');

        // Xóa dữ liệu cũ của Category
        const deleteCategoryResult = await Category.deleteMany();
        console.log(`Deleted ${deleteCategoryResult.deletedCount} categories.`);

        // Dữ liệu category cho nghiên cứu NLP và AI
        const categoriesData = [
            {
                name: "Natural Language Processing",
                description: "Research on processing and understanding human language."
            },
            {
                name: "Machine Learning",
                description: "Study of algorithms that improve automatically through experience."
            },
            {
                name: "Computer Vision",
                description: "Development of techniques for image and video analysis."
            },
            {
                name: "Data Science",
                description: "Exploration and analysis of large datasets to extract insights."
            },
            {
                name: "Artificial Intelligence",
                description: "Broad field of creating intelligent systems and machines."
            },
            {
                name: "Deep Learning",
                description: "Advanced techniques using neural networks for complex tasks."
            },
            {
                name: "Speech Recognition",
                description: "Technology to convert spoken language into text."
            },
            {
                name: "Text Analytics",
                description: "Analysis of text data for patterns and insights."
            }
        ];

        // Thêm dữ liệu category
        for (const categoryData of categoriesData) {
            const category = new Category(categoryData);
            await category.save();
            console.log(`Added category: ${category.name}`);
        }

        const categoryCount = await Category.countDocuments();
        console.log(`Total categories in database: ${categoryCount}`);
    } catch (error) {
        console.error('Error seeding users:', error);
    } finally {
        // Đóng kết nối
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

// Chạy seed
seedUsers();