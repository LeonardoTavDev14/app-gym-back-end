-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "accountBlocked" BOOLEAN,
ADD COLUMN     "loginAttempts" INTEGER,
ADD COLUMN     "timeoutAccount" TIMESTAMP(3);
