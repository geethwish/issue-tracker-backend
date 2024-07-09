import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config";

// Routes
import issueRoutes from "./routes/issueRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

dotenv.config();

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);

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
