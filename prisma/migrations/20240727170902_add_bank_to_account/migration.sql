-- Add the new column with a default value for existing rows
ALTER TABLE "Account" ADD COLUMN "bank" TEXT DEFAULT 'Unknown';

-- Update existing rows to set the default value for the new column
UPDATE "Account" SET "bank" = 'Unknown' WHERE "bank" IS NULL;

-- Remove the default value to enforce that it should always be specified in the future
ALTER TABLE "Account" ALTER COLUMN "bank" DROP DEFAULT;

-- Alter the column to be not null
ALTER TABLE "Account" ALTER COLUMN "bank" SET NOT NULL;
