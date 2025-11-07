-- Clean up duplicate emails before adding unique constraint
-- Keep only the most recent user for each email

WITH duplicates AS (
  SELECT id, email,
    ROW_NUMBER() OVER (PARTITION BY email ORDER BY "createdAt" DESC) as rn
  FROM "User"
)
DELETE FROM "User"
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);
