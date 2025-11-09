-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_userID_fkey";

-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "guestEmail" TEXT,
ADD COLUMN     "guestFirstName" TEXT,
ADD COLUMN     "guestLastName" TEXT,
ADD COLUMN     "guestPhone" TEXT,
ALTER COLUMN "userID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userID_fkey" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
