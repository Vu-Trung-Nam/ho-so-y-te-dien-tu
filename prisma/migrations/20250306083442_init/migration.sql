-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- CreateTable
CREATE TABLE "Admin" (
    "userId" TEXT NOT NULL,
    "fullName" TEXT,
    "phone" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
