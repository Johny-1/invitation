import { NextResponse } from "next/server";
import { getInvitationByIdOrSlug, saveInvitation, deleteInvitation, incrementInvitationViews } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const inv = getInvitationByIdOrSlug(params.id);
    if (!inv) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }
    // Increment view count if requested with increment flag
    const url = new URL(req.url);
    if (url.searchParams.get("view") === "1") {
      incrementInvitationViews(params.id);
    }

    return NextResponse.json({ success: true, data: inv });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to get invitation" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const existing = getInvitationByIdOrSlug(params.id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    const updated = saveInvitation({
      ...existing,
      ...body,
      id: existing.id, // protect ID
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update invitation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = deleteInvitation(params.id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Invitation not found or could not be deleted" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete invitation" },
      { status: 500 }
    );
  }
}
