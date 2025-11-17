import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      bio,
      experienceYears,
      skills,
      location,
      education,
      preferredRoles,
      isVegetarian,
      isNonSmoker,
      spiritualPractice,
    } = body;

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        bio,
        experienceYears,
        skills,
        location,
        education,
        preferredRoles,
        isVegetarian,
        isNonSmoker,
        spiritualPractice,
      },
      create: {
        userId: session.user.id,
        bio,
        experienceYears,
        skills,
        location,
        education,
        preferredRoles,
        isVegetarian,
        isNonSmoker,
        spiritualPractice,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Error updating seeker profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
