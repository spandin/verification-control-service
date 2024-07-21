/*
  Warnings:

  - The primary key for the `devices_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `devices_type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `devices_category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `devices_type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_typeId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ALTER COLUMN "typeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "devices_category" DROP CONSTRAINT "devices_category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "devices_category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "devices_type" DROP CONSTRAINT "devices_type_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "devices_type_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roleId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "devices_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "devices_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
