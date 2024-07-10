import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config";

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

app.use(express.json());
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

function availableRoutesString() {
  return app._router.stack
    .filter((r: { route: any }) => r.route)
    .map(
      (r: { route: { methods: {}; path: string } }) =>
        Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) + r.route.path
    )
    .join("\n");
}

console.log(availableRoutesString());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
