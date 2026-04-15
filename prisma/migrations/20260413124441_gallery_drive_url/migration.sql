-- AlterTable (IF NOT EXISTS: safe when column was added manually or migration was partially applied)
ALTER TABLE "GalleryImage" ADD COLUMN IF NOT EXISTS "driveUrl" TEXT;
