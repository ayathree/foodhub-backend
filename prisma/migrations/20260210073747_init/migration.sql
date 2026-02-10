-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'PROVIDER', 'ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';
