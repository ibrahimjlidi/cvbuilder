import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateSuccessRate } from "@/utils/formatters";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get all job applications
    const applications = await prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { appliedDate: "desc" },
    });

    // Get upcoming interviews
    const upcomingInterviews = await prisma.interview.findMany({
      where: { userId },
      orderBy: { interviewDate: "asc" },
      take: 5,
    });

    // Calculate stats
    const totalApplications = applications.length;
    const appliedCount = applications.filter((a) => a.status === "Applied").length;
    const interviewCount = applications.filter((a) => a.status === "Interview").length;
    const offerCount = applications.filter((a) => a.status === "Offer").length;
    const rejectionCount = applications.filter((a) => a.status === "Rejected").length;
    const successRate = calculateSuccessRate(totalApplications, interviewCount + offerCount);

    return NextResponse.json({
      totalApplications,
      appliedCount,
      interviewCount,
      offerCount,
      rejectionCount,
      successRate,
      recentApplications: applications.slice(0, 5),
      upcomingInterviews,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
