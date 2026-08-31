-- CreateTable
CREATE TABLE "volunteer_applications" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "institution" TEXT,
    "skills" TEXT,
    "interests" TEXT,
    "experience" TEXT,
    "availability" TEXT,
    "motivation" TEXT NOT NULL,
    "portfolio_url" TEXT,
    "consent" BOOLEAN NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "volunteer_applications_email_idx" ON "volunteer_applications"("email");

-- CreateIndex
CREATE INDEX "volunteer_applications_status_idx" ON "volunteer_applications"("status");

-- CreateIndex
CREATE INDEX "volunteer_applications_created_at_idx" ON "volunteer_applications"("created_at");
