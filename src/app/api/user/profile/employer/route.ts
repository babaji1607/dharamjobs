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
      orgName,
      orgType,
      missionStatement,
      location,
      websiteUrl,
      vegetarianOnly,
      providesStay,
      providesFood,
    } = body;

    const employerProfile = await prisma.employerProfile.upsert({
      where: { userId: session.user.id },
      update: {
        orgName,
        orgType,
        missionStatement,
        location,
        websiteUrl,
        vegetarianOnly,
        providesStay,
        providesFood,
      },
      create: {
        userId: session.user.id,
        orgName,
        orgType,
        missionStatement,
        location,
        websiteUrl,
        vegetarianOnly,
        providesStay,
        providesFood,
      },
    });

    // Update user role to EMPLOYER
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "EMPLOYER" },
    });

    return NextResponse.json({ success: true, employerProfile });
  } catch (error) {
    console.error("Error updating employer profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
