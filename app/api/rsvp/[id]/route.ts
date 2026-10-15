import { NextResponse } from "next/server";
import { addRsvpEntry } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    if (!body.guestName || !body.status) {
      return NextResponse.json(
        { success: false, error: "Missing required RSVP fields" },
        { status: 400 }
      );
    }

    const rsvp = addRsvpEntry(params.id, {
      guestName: body.guestName,
      status: body.status,
      companionsCount: Number(body.companionsCount || 0),
      phone: body.phone || "",
      wishes: body.wishes || "",
    });

    if (!rsvp) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rsvp });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
