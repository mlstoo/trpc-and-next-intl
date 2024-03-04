-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TranslationKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "parentKey" TEXT,
    CONSTRAINT "TranslationKey_parentKey_fkey" FOREIGN KEY ("parentKey") REFERENCES "TranslationKey" ("key") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Locale" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LocaleTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "translationKeyId" TEXT NOT NULL,
    "localeCode" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "LocaleTranslation_translationKeyId_fkey" FOREIGN KEY ("translationKeyId") REFERENCES "TranslationKey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LocaleTranslation_localeCode_fkey" FOREIGN KEY ("localeCode") REFERENCES "Locale" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "UserData_email_key" ON "UserData"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TranslationKey_key_key" ON "TranslationKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Locale_code_name_key" ON "Locale"("code", "name");

-- CreateIndex
CREATE UNIQUE INDEX "LocaleTranslation_translationKeyId_localeCode_key" ON "LocaleTranslation"("translationKeyId", "localeCode");
