-- CreateTable
CREATE TABLE "UserAdrress" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "postalCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAdrress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdrress_userId_key" ON "UserAdrress"("userId");

-- AddForeignKey
ALTER TABLE "UserAdrress" ADD CONSTRAINT "UserAdrress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAdrress" ADD CONSTRAINT "UserAdrress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
