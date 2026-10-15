import { notFound } from "next/navigation";
import { getInvitationByIdOrSlug } from "@/lib/db";
import InvitationEditor from "@/components/admin/InvitationEditor";

export const dynamic = "force-dynamic";

export default function EditInvitationPage({ params }: { params: { id: string } }) {
  const invitation = getInvitationByIdOrSlug(params.id);

  if (!invitation) {
    notFound();
  }

  return <InvitationEditor initialData={invitation} isNew={false} />;
}
