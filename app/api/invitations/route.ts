import { NextResponse } from "next/server";
import { getInvitations, saveInvitation } from "@/lib/db";
import { Invitation } from "@/types/invitation";

export async function GET() {
  try {
    const invitations = getInvitations();
    return NextResponse.json({ success: true, data: invitations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch invitations" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newInvitation: Invitation = {
      ...body,
      id: body.id || "inv-" + Math.random().toString(36).substring(2, 9),
      slug: body.slug || ("wedding-" + Math.random().toString(36).substring(2, 7)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 0,
      rsvpList: [],
    };

    const saved = saveInvitation(newInvitation);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create invitation" },
      { status: 500 }
    );
  }
}
