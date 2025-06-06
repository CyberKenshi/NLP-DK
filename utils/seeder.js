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

        // Xóa tất cả người dùng trong database
        const deleteResult = await User.deleteMany();
        console.log(`Deleted ${deleteResult.deletedCount} users.`);

        // Tạo một mảng chứa dữ liệu người dùng
        const usersData = [
            {
                fullName: "Nguyễn Văn Admin",
                email: "anhquan12052003@gmail.com",
                mobile: "0339637402",
                username: "admin",
                password: "admin",
                role: "admin",
                bio: {vi: "Quản trị viên hệ thống", en: "System Administrator"},
                avatar: "/img/lab-personnel/admin.jpg",
                jobTitles: [], 
                degree: {
                    vi: null,
                    en: null
                }
            },
            {
                fullName: "Lê Anh Cường",
                email: "leanhcuong@tdtu.edu.vn",
                mobile: "+84 123 456 789",
                username: "leanhcuong",
                password: "password123",
                role: "personnel",
                roleInLab: {
                    vi: "Trưởng nhóm",
                    en: "Group Leader"
                },
                scholarID: "fpBTRIUAAAAJ",
                bio: {vi: "Khoa Công nghệ thông tin", en: "Falcuty of Information Technology"},
                avatar: "/img/lab-personnel/leanhcuong.jpg",
                jobTitles: [
                    { vi: "Phó Trưởng Khoa", en: "Vice Dean" },
                    { vi: "Trưởng bộ môn Khoa học máy tính", en: "Head of Computer Science Department" },
                    { vi: "Trưởng phòng Lab NLP-KD", en: "Head of NLP-KD Lab" }
                ],
                degree: {
                    vi: "PGS.TS.",
                    en: "Assoc. Prof."
                }
            },
            {
                fullName: "Trần Thanh Phước",
                email: "tranthanhphuoc@tdtu.edu.vn",
                mobile: "+84 987 654 321",
                username: "tranthanhphuoc",
                password: "password123",
                role: "personnel",
                roleInLab: {
                    vi: "Thành viên chủ chốt",
                    en: "Key Member"
                },
                scholarID: "kq_KpT0AAAAJ",
                bio: {vi: "Khoa Công nghệ thông tin", en: "Falcuty of Information Technology"},
                avatar: "/img/lab-personnel/tranthanhphuoc.jpg",
                jobTitles: [
                    { vi: "Trưởng bộ môn Hệ thống thông tin", en: "Head of Information Systems Department" }
                ],
                degree: {
                    vi: "TS.",
                    en: "PhD."
                }
            },
            {
                fullName: "Trần Lương Quốc Đại",
                email: "tranluongquocdai@tdtu.edu.vn",
                mobile: "+84 321 654 987",
                username: "tranluongquocdai",
                password: "password123",
                role: "personnel",
                roleInLab: {
                    vi: "Thư ký, Thành viên chủ chốt",
                    en: "Secretary, Key Member"
                },
                scholarID: "0u07s1YAAAAJ",
                bio: {vi: "Khoa Công nghệ thông tin", en: "Falcuty of Information Technology"},
                avatar: "/img/lab-personnel/tranluongquocdai.jpg",
                jobTitles: [
                    { vi: "Giảng viên", en: "Lecturer" }
                ],
                degree: {
                    vi: "TS.",
                    en: "PhD."
                }
            },
            {
                fullName: "Hồ Thị Linh",
                email: "hothilinh@tdtu.edu.vn",
                mobile: "+84 159 753 456",
                username: "hothilinh",
                password: "password123",
                role: "personnel",
                roleInLab: {
                    vi: "Thành viên",
                    en: "Member"
                },
                scholarID: "efbV62EAAAAJ",
                bio: {vi: "Khoa Công nghệ thông tin", en: "Falcuty of Information Technology"},
                avatar: "/img/lab-personnel/hothilinh.jpg",
                jobTitles: [
                    { vi: "Giảng viên", en: "Lecturer" }
                ],
                degree: {
                    vi: "TS.",
                    en: "PhD."
                }
            },
            {
                fullName: "Huynh Van Nam",
                email: "huynhvannam@collaborator.com",
                mobile: "+84 741 852 963",
                username: "huynhvannam",
                password: "password123",
                role: "colab",
                roleInLab: {
                    vi: "Thành viên cộng tác",
                    en: "Collaborating Member"
                },
                scholarID: "XVThR3QAAAAJ",
                bio: {vi: "Japan Advanced Institute of Science and Technology (JAIST)", en: "Japan Advanced Institute of Science and Technology (JAIST)"},
                avatar: "/img/lab-personnel/huynhvannam.jpg",
                jobTitles: [],
                degree: {
                    vi: "GS.",
                    en: "Prof."
                }
            },
            {
                fullName: "Tran The Truyen",
                email: "truyen.tran@deakin.edu.au",
                mobile: "+84 852 963 741",
                username: "tranthetruyen",
                password: "password123",
                role: "colab",
                roleInLab: {
                    vi: "Thành viên cộng tác",
                    en: "Collaborating Member"
                },
                scholarID: "zvspVLwAAAAJ",
                bio: {vi: "Đại học Deakin, Úc", en: "Deakin University, Australia"},
                avatar: "/img/lab-personnel/tranthetruyen.jpg",
                jobTitles: [],
                degree: {
                    vi: "GS.",
                    en: "Prof."
                }
            },
            {
                fullName: "Ashwin Ittoo",
                mobile: "+84 852 963 741",
                username: "ashwin-ittoo",
                password: "password123",
                role: "colab",
                roleInLab: {
                    vi: "Thành viên cộng tác",
                    en: "Collaborating Member"
                },
                scholarID: "",
                bio: {vi: "Đại học Liège, Bỉ",en :"University of Liège, Belgium"},
                avatar: "/img/lab-personnel/ashwin-ittoo.jpg",
                jobTitles: [],
                degree: {
                    vi: "GS.",
                    en: "Prof."
                }
            },
            {
                fullName: "Phạm Văn Huy",
                email: "phamvanhuy@tdtu.edu.vn",
                mobile: "+84 741 852 963",
                username: "phamvanhuy",
                password: "password123",
                role: "personnel",
                roleInLab: {
                    vi: "Thành viên chủ chốt",
                    en: "Key Member"
                },
                scholarID: "uGbR014AAAAJ",
                bio: {vi: "Khoa Công nghệ thông tin", en: "Falcuty of Information Technology"},
                avatar: "/img/lab-personnel/phamvanhuy.jpg",
                jobTitles: [
                    { vi: "Trưởng khoa", en: "Dean" }
                ],
                degree: {
                    vi: "TS.",
                    en: "PhD."
                }
            },
            {
                fullName: "Trịnh Hùng Cường",
                email: "trinhhungcuong@tdtu.edu.vn",
                mobile: "+84 741 852 963",
                username: "trinhhungcuong",
                password: "password123",
                role: "personnel",
                scholarID: "S9dbSwEAAAAJ",
                bio: {vi: "Khoa Công nghệ thông tin", en: "Falcuty of Information Technology"},
                avatar: "/img/lab-personnel/trinhhungcuong.jpg",
                jobTitles: [
                    { vi: "Giảng viên", en: "Lecturer" }
                ],
                degree: {
                    vi: "TS.",
                    en: "PhD."
                }
            },
            {
                fullName: "Vũ Đình Hồng",
                email: "vudinhhong@tdtu.edu.vn",
                mobile: "+84 741 852 963",
                username: "vudinhhong",
                password: "password123",
                role: "personnel",
                scholarID: "hyoR2cwAAAAJ",
                bio: {vi: "Khoa Công nghệ thông tin", en: "Falcuty of Information Technology"},
                avatar: "/img/lab-personnel/vudinhhong.jpg",
                jobTitles: [
                    { vi: "Giảng viên", en: "Lecturer" }
                ],
                degree: {
                    vi: "ThS.",
                    en: "MSc."
                }
            },
        ];

        // Thêm dữ liệu mới
        for (const userData of usersData) {
            const avatarPath = userData.avatar;

            // Tải hình ảnh lên Cloudinary nếu có đường dẫn avatar
            if (avatarPath) {
                try {
                    // Xây dựng đường dẫn đầy đủ đến file hình ảnh
                    const localImagePath = path.join(__dirname, '..', 'public', avatarPath);
                    const filename = `${userData.username}-${Date.now()}`;

                    if (fs.existsSync(localImagePath)) {
                        console.log(`File found at: ${localImagePath}`);
                        const uploadResult = await cloudinary.uploader.upload(localImagePath, {
                            public_id: `avatars/${filename}`,
                            folder: 'NLP-KD',
                            use_filename: true,
                            unique_filename: false,
                            overwrite: true,
                        });
                        userData.avatar = uploadResult.secure_url;
                        console.log(`Uploaded avatar for ${userData.fullName}: ${userData.avatar}`);
                        // fs.unlinkSync(localImagePath); // Comment nếu không muốn xóa file
                    } else {
                        console.error(`File not found at: ${localImagePath}`);
                        userData.avatar = null;
                    }
                } catch (uploadError) {
                    console.error(`Failed to upload avatar for ${userData.fullName}:`, uploadError);
                    userData.avatar = null;
                }
            }

            // Lưu user vào database
            const user = new User(userData);
            await user.save();
            console.log(`Added user: ${user.fullName}`);
        }

        // Kiểm tra số lượng user trong database
        const userCount = await User.countDocuments();
        console.log(`Total users in database: ${userCount}`);
        console.log('Seeding completed successfully.');

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