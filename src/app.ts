import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config";
import swaggerSetup from "./swagger";

// Routes
import issueRoutes from "./routes/issueRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

dotenv.config();

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Middleware to parse JSON
app.use(express.json());

// Swagger setup
swaggerSetup(app);

app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
