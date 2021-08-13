-- CreateTable
CREATE TABLE "TrelloUser" (
    "discordId" INTEGER NOT NULL,
    "trelloId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TrelloUser.discordId_unique" ON "TrelloUser"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "TrelloUser.trelloId_unique" ON "TrelloUser"("trelloId");
