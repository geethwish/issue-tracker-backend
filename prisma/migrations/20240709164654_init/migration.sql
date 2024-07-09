-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT,
    "priority" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Open',

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);
