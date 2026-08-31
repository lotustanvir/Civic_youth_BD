-- CreateTable
CREATE TABLE "partnership_inquiries" (
    "id" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "organization_type" TEXT,
    "website" TEXT,
    "partnership_interest" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partnership_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "partnership_inquiries_email_idx" ON "partnership_inquiries"("email");

-- CreateIndex
CREATE INDEX "partnership_inquiries_status_idx" ON "partnership_inquiries"("status");

-- CreateIndex
CREATE INDEX "partnership_inquiries_created_at_idx" ON "partnership_inquiries"("created_at");
