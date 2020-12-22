-- CreateTable
CREATE TABLE "GetInTouchMessages" (
"id" SERIAL,
    "email" TEXT NOT NULL DEFAULT E'No Email was Provided',
    "name" TEXT NOT NULL DEFAULT E'No Name was Provided',
    "message" TEXT NOT NULL DEFAULT E'No Message was Provided',

    PRIMARY KEY ("id")
);
