/*
  Warnings:

  - You are about to drop the column `date` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the `kontak` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gambar` to the `berita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judul` to the `berita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori` to the `berita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keterangan` to the `berita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagline` to the `berita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `berita` DROP COLUMN `date`,
    DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `title`,
    ADD COLUMN `gambar` VARCHAR(191) NOT NULL,
    ADD COLUMN `judul` VARCHAR(191) NOT NULL,
    ADD COLUMN `kategori` VARCHAR(191) NOT NULL,
    ADD COLUMN `keterangan` TEXT NOT NULL,
    ADD COLUMN `tagline` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `kontak`;

-- CreateTable
CREATE TABLE `layanan` (
    `id` VARCHAR(191) NOT NULL,
    `namaLayanan` VARCHAR(191) NOT NULL,
    `harga` VARCHAR(191) NOT NULL,
    `jadwal` VARCHAR(191) NOT NULL,
    `keterangan` TEXT NOT NULL,
    `gambar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
