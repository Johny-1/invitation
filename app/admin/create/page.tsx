import InvitationEditor from "@/components/admin/InvitationEditor";
import { DEFAULT_SAMPLE_INVITATION } from "@/lib/presets";

export default function CreateInvitationPage() {
  const newInvitation = {
    ...DEFAULT_SAMPLE_INVITATION,
    id: "inv-" + Math.random().toString(36).substring(2, 9),
    slug: "wedding-" + Math.random().toString(36).substring(2, 7),
    title: "دعوة زفاف جديدة",
    weddingDetails: {
      ...DEFAULT_SAMPLE_INVITATION.weddingDetails,
      groomName: "اسم العريس",
      brideName: "اسم العروس",
    },
    rsvpList: [],
    viewsCount: 0,
  };

  return <InvitationEditor initialData={newInvitation} isNew={true} />;
}
