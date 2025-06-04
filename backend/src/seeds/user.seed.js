import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "jonathan.joestar@example.com",
    fullName: "Jonathan Joestar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "dio.brando@example.com",
    fullName: "Dio Brando",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "joseph.joestar@example.com",
    fullName: "Joseph Joestar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "caesar.zeppeli@example.com",
    fullName: "Caesar Zeppeli",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "jotaro.kujo@example.com",
    fullName: "Jotaro Kujo",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "noriaki.kakyoin@example.com",
    fullName: "Noriaki Kakyoin",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "jean.polnareff@example.com",
    fullName: "Jean Pierre Polnareff",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "josuke.higashikata@example.com",
    fullName: "Josuke Higashikata",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  {
    email: "okuyasu.nijimura@example.com",
    fullName: "Okuyasu Nijimura",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "giorno.giovanna@example.com",
    fullName: "Giorno Giovanna",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "bruno.bucciarati@example.com",
    fullName: "Bruno Bucciarati",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "jolyne.cujoh@example.com",
    fullName: "Jolyne Cujoh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "trish.una@example.com",
    fullName: "Trish Una",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "johnny.joestar@example.com",
    fullName: "Johnny Joestar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "gyro.zeppeli@example.com",
    fullName: "Gyro Zeppeli",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};


seedDatabase();
