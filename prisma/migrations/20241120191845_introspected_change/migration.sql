-- CreateTable
CREATE TABLE "tarot_cards" (
    "id" BIGSERIAL NOT NULL,
    "inserted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "name" TEXT,
    "arcana" TEXT,
    "number" SMALLINT,
    "suit" TEXT,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "element" TEXT,
    "astrologicalSign" TEXT,
    "meanings_upright" JSONB,
    "meanings_reversed" JSONB,
    "keywords" JSONB,

    CONSTRAINT "tarot_cards_pkey" PRIMARY KEY ("id")
);
