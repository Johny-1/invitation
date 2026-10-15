import { notFound } from "next/navigation";
import { getInvitationByIdOrSlug, incrementInvitationViews } from "@/lib/db";
import AnimationContainer from "@/components/animations/AnimationContainer";
import SparklesCanvas from "@/components/guest/SparklesCanvas";
import AudioPlayer from "@/components/guest/AudioPlayer";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
  searchParams: { to?: string };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const invitation = getInvitationByIdOrSlug(params.id);
  if (!invitation) {
    return { title: "دعوة زفاف" };
  }

  const guest = searchParams.to ? ` - دعوة خاصة للأعزاء / ${searchParams.to}` : "";
  return {
    title: `دعوة زفاف ${invitation.weddingDetails.groomName} & ${invitation.weddingDetails.brideName}${guest}`,
    description: invitation.weddingDetails.welcomeMessage,
  };
}

import AtmosphereBackground from "@/components/guest/AtmosphereBackground";

export default function GuestInvitationPage({ params, searchParams }: PageProps) {
  const invitation = getInvitationByIdOrSlug(params.id);

  if (!invitation) {
    notFound();
  }

  // Increment view counter
  incrementInvitationViews(params.id);

  const guestName = searchParams.to ? decodeURIComponent(searchParams.to) : undefined;

  return (
    <main
      className="min-h-screen relative overflow-x-hidden flex flex-col items-center justify-center select-none"
      dir="rtl"
    >
      <AtmosphereBackground
        design={invitation.design}
        className="min-h-screen flex flex-col items-center justify-center"
      >
        {/* Romantic Audio Player */}
        <AudioPlayer
          audioUrl={invitation.design.audioUrl}
          autoPlay={invitation.design.autoPlayAudioOnOpen}
        />

        {/* Master Step-by-Step Interactive Animation Container */}
        <AnimationContainer
          design={invitation.design}
          weddingDetails={invitation.weddingDetails}
          guestName={guestName}
          invitationId={invitation.id}
        />
      </AtmosphereBackground>
    </main>
  );
}
