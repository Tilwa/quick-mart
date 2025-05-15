/*
  Warnings:

  - You are about to drop the column `created_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `offer` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `offer_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `original_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `soldItem` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image1` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "created_at",
DROP COLUMN "label",
DROP COLUMN "offer",
DROP COLUMN "offer_price",
DROP COLUMN "original_price",
DROP COLUMN "soldItem",
DROP COLUMN "stock",
DROP COLUMN "tag",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image1" TEXT NOT NULL,
ADD COLUMN     "image2" TEXT,
ADD COLUMN     "image3" TEXT,
ADD COLUMN     "image4" TEXT,
ADD COLUMN     "image5" TEXT,
ADD COLUMN     "inStock" INTEGER,
ADD COLUMN     "offerPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL;

-- DropTable
DROP TABLE "ProductColor";

-- DropTable
DROP TABLE "ProductImage";
