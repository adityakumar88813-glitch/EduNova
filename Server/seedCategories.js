require("dotenv").config();

const mongoose = require("mongoose");
const Category = require("./models/Category");

const categories = [
  {
    Name: "Web Development",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and full-stack development.",
  },
  {
    Name: "Programming",
    description:
      "Learn programming languages, coding and problem solving.",
  },
  {
    Name: "Data Science",
    description:
      "Learn data analysis, machine learning and data science.",
  },
  {
    Name: "Artificial Intelligence",
    description:
      "Learn AI and modern artificial intelligence technologies.",
  },
  {
    Name: "Cyber Security",
    description:
      "Learn cybersecurity and network security.",
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB connected");

    for (const category of categories) {
      const exists = await Category.findOne({
        Name: category.Name,
      });

      if (!exists) {
        await Category.create(category);
        console.log(`Created: ${category.Name}`);
      } else {
        console.log(`Already exists: ${category.Name}`);
      }
    }

    console.log("Categories seeded successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();