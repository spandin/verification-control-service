/*
  Warnings:

  - You are about to drop the column `device_category` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `device_type` on the `devices` table. All the data in the column will be lost.
  - Added the required column `category` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "devices" DROP COLUMN "device_category",
DROP COLUMN "device_type",
ADD COLUMN     "category" "DeviceCategory" NOT NULL,
ADD COLUMN     "type" "DeviceType" NOT NULL;
