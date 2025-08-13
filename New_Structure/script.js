const { MongoClient } = require("mongodb");
const { STR_DB_NAME, MONGODB_URL } = require("./src/libs/common/constants");

async function RenameEmail() {
  const client = new MongoClient(MONGODB_URL);

  try {
    await client.connect();
    const db = client.db(STR_DB_NAME);

    const collections = ["movies", "comments", "embedded_movies"];

    for (const colName of collections) {
      const collection = db.collection(colName);

      const result = await collection.updateMany(
        {},
        { $set: { chrStatus: "N" } }
      );

      console.log(`✅ ${colName}: Updated ${result.modifiedCount} documents`);
    }
  } catch (error) {
    console.error("❌ Error updating:", error);
  } finally {
    await client.close();
  }
}

// RenameEmail();

const users = [
  {
    strUserId: "U1001",
    strName: "Kavin Kumar",
    strEmail: "kavin@example.com",
    strPassword: "$2a$10$hashedpassword",
    chrStatus: "A",
    arrRoles: ["customer"],
    dtCreated: "2025-07-20T10:00:00Z",
  },
  {
    strUserId: "U1002",
    strName: "John Doe",
    strEmail: "john@example.com",
    strPassword: "$2a$10$hashedpassword",
    chrStatus: "A",
    arrRoles: ["customer", "premium"],
    dtCreated: "2025-07-21T09:00:00Z",
  },
];
const products = [
  {
    strProductId: "P2001",
    strName: "Laptop",
    numPrice: 65000,
    strCategory: "Electronics",
    numStock: 20,
    chrStatus: "A",
  },
  {
    strProductId: "P2002",
    strName: "Smartphone",
    numPrice: 25000,
    strCategory: "Electronics",
    numStock: 50,
    chrStatus: "A",
  },
];

const orders = [
  {
    strOrderId: "O3001",
    strUserId: "U1001",
    arrItems: [
      { strProductId: "P2001", numQty: 1 },
      { strProductId: "P2002", numQty: 2 },
    ],
    numTotal: 115000,
    dtOrder: "2025-08-05T15:00:00Z",
  },
];

const students = [
  {
    strStudentId: "S101",
    strName: "Aishwarya",
    numAge: 20,
    arrSubjects: ["Math", "Physics"],
    chrStatus: "A",
  },
  {
    strStudentId: "S102",
    strName: "Vignesh",
    numAge: 22,
    arrSubjects: ["Chemistry", "Biology"],
    chrStatus: "A",
  },
];

const courses = [
  { strCourseId: "C501", strName: "Math", numCredits: 4 },
  { strCourseId: "C502", strName: "Physics", numCredits: 3 },
];

const enrollments = [
  { strStudentId: "S101", strCourseId: "C501", dtEnroll: "2025-01-15" },
  { strStudentId: "S101", strCourseId: "C502", dtEnroll: "2025-01-20" },
];

const socilausers = [
  {
    strUserId: "U5001",
    strName: "Meena",
    strEmail: "meena@example.com",
    arrFriends: ["U5002", "U5003"],
    chrStatus: "A",
  },
  {
    strUserId: "U5002",
    strName: "Raj",
    strEmail: "raj@example.com",
    arrFriends: ["U5001"],
    chrStatus: "A",
  },
];

const posts = [
  {
    strPostId: "P9001",
    strUserId: "U5001",
    strContent: "Hello world!",
    arrLikes: ["U5002"],
    dtPosted: "2025-08-01T10:00:00Z",
  },
  {
    strPostId: "P9002",
    strUserId: "U5002",
    strContent: "Good morning!",
    arrLikes: ["U5001"],
    dtPosted: "2025-08-02T09:00:00Z",
  },
];

const comments = [
  {
    strCommentId: "C7001",
    strPostId: "P9001",
    strUserId: "U5002",
    strComment: "Nice!",
    dtCommented: "2025-08-01T11:00:00Z",
  },
];

async function seedData() {
  const client = new MongoClient(MONGODB_URL);

  try {
    await client.connect();

    // SHOP DB
    const shopDB = client.db("shopDB");
    await shopDB.collection("users").insertMany(users);
    await shopDB.collection("products").insertMany(products);
    await shopDB.collection("orders").insertMany(orders);

    // SCHOOL DB
    const schoolDB = client.db("schoolDB");
    await schoolDB.collection("students").insertMany(students);
    await schoolDB.collection("courses").insertMany(courses);
    await schoolDB.collection("enrollments").insertMany(enrollments);

    // SOCIAL DB
    const socialDB = client.db("socialDB");
    await socialDB.collection("users").insertMany(socilausers);
    await socialDB.collection("posts").insertMany(posts);
    await socialDB.collection("comments").insertMany(comments);

    console.log("✅ Dummy data inserted");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedData();
