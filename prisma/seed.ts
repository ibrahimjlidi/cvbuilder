import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: "file:./prisma/dev.db",
  }),
});

async function main() {
  // Check if demo user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: "demo@example.com" },
  });

  if (existingUser) {
    console.log("Demo user already exists");
    return;
  }

  // Create demo user
  const hashedPassword = await bcrypt.hash("demo123", 10);
  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
      password: hashedPassword,
    },
  });

  console.log("✓ Demo user created:", user.email);

  // Create some sample job applications
  const applications = await Promise.all([
    prisma.jobApplication.create({
      data: {
        userId: user.id,
        jobTitle: "Senior Frontend Developer",
        company: "Google",
        position: "React Specialist",
        location: "Remote",
        status: "Interview",
        appliedDate: new Date("2025-03-15"),
        notes: "Great company, exciting project",
        rating: 5,
      },
    }),
    prisma.jobApplication.create({
      data: {
        userId: user.id,
        jobTitle: "Frontend Engineer",
        company: "Airbnb",
        position: "Full-time",
        location: "San Francisco, CA",
        status: "Applied",
        appliedDate: new Date("2025-03-20"),
        notes: "Leading travel tech company",
        rating: 4,
      },
    }),
    prisma.jobApplication.create({
      data: {
        userId: user.id,
        jobTitle: "React Developer",
        company: "Stripe",
        position: "Full-time",
        location: "Remote",
        status: "Rejected",
        appliedDate: new Date("2025-02-28"),
        notes: "Rejection received",
        rating: 3,
      },
    }),
  ]);

  console.log(`✓ Created ${applications.length} sample applications`);

  // Create a sample interview
  if (applications[0]) {
    await prisma.interview.create({
      data: {
        userId: user.id,
        jobApplicationId: applications[0].id,
        company: "Google",
        position: "Senior Frontend Developer",
        interviewDate: new Date("2025-04-15T10:00:00"),
        interviewType: "Technical",
        duration: 60,
        topics: "React, System Design, TypeScript",
      },
    });
    console.log("✓ Created sample interview");
  }

  console.log("\n Demo user ready for testing!");
  console.log("Email: demo@example.com");
  console.log("Password: demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
