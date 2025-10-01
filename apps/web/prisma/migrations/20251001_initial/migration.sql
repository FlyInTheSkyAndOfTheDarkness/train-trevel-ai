-- Prisma initial migration for TrainTravel AI

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "password" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Account" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Account_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")
);

CREATE TABLE "Session" (
  "id" TEXT PRIMARY KEY,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "expires" TIMESTAMP NOT NULL,
  CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE ("identifier", "token")
);

CREATE TABLE "Search" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "originId" TEXT NOT NULL,
  "originName" TEXT NOT NULL,
  "destinationId" TEXT NOT NULL,
  "destinationName" TEXT NOT NULL,
  "dateOut" TIMESTAMP NOT NULL,
  "dateBack" TIMESTAMP,
  "passengers" INTEGER NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "Search_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE "FavoriteRoute" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "originId" TEXT NOT NULL,
  "originName" TEXT NOT NULL,
  "destinationId" TEXT NOT NULL,
  "destinationName" TEXT NOT NULL,
  "notes" TEXT,
  CONSTRAINT "FavoriteRoute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Hold" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "tripId" TEXT NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "classCode" TEXT,
  "priceMinor" INTEGER NOT NULL,
  "currency" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'CREATED',
  CONSTRAINT "Hold_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "AiAdviceLog" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "queryHash" TEXT NOT NULL,
  "originId" TEXT NOT NULL,
  "destinationId" TEXT NOT NULL,
  "month" TEXT,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "AiAdviceLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- enums
-- Prisma will handle enum mapping; store status as TEXT

