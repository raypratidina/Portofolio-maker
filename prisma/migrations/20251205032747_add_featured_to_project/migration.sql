-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "thumbnail" TEXT,
    "descriptionShort" TEXT,
    "descriptionLong" TEXT,
    "client" TEXT,
    "role" TEXT,
    "year" TEXT,
    "technologies" TEXT,
    "link" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("category", "client", "createdAt", "descriptionLong", "descriptionShort", "id", "link", "role", "slug", "status", "technologies", "thumbnail", "title", "updatedAt", "year") SELECT "category", "client", "createdAt", "descriptionLong", "descriptionShort", "id", "link", "role", "slug", "status", "technologies", "thumbnail", "title", "updatedAt", "year" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
