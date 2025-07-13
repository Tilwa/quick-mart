-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "country" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bounce" BOOLEAN NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);
