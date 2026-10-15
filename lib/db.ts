import fs from "fs";
import path from "path";
import { Invitation, RsvpEntry } from "@/types/invitation";
import { DEFAULT_SAMPLE_INVITATION } from "./presets";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "invitations.json");

function ensureDbExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialData: Invitation[] = [DEFAULT_SAMPLE_INVITATION];
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
  }
}

export function getInvitations(): Invitation[] {
  ensureDbExists();
  try {
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content) as Invitation[];
  } catch (error) {
    console.error("Error reading invitations db:", error);
    return [DEFAULT_SAMPLE_INVITATION];
  }
}

export function getInvitationByIdOrSlug(idOrSlug: string): Invitation | null {
  const invitations = getInvitations();
  const match = invitations.find(
    (inv) => inv.id === idOrSlug || inv.slug === idOrSlug
  );
  return match || null;
}

export function saveInvitation(invitation: Invitation): Invitation {
  ensureDbExists();
  const list = getInvitations();
  const index = list.findIndex((item) => item.id === invitation.id);

  const updatedInvitation = {
    ...invitation,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    list[index] = updatedInvitation;
  } else {
    list.unshift(updatedInvitation);
  }

  fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), "utf-8");
  return updatedInvitation;
}

export function deleteInvitation(id: string): boolean {
  ensureDbExists();
  const list = getInvitations();
  const filtered = list.filter((item) => item.id !== id);
  if (filtered.length !== list.length) {
    fs.writeFileSync(DB_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}

export function addRsvpEntry(idOrSlug: string, entry: Omit<RsvpEntry, "id" | "createdAt">): RsvpEntry | null {
  ensureDbExists();
  const list = getInvitations();
  const inv = list.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
  if (!inv) return null;

  const newRsvp: RsvpEntry = {
    id: "rsvp-" + Math.random().toString(36).substring(2, 9),
    ...entry,
    createdAt: new Date().toISOString(),
  };

  if (!inv.rsvpList) {
    inv.rsvpList = [];
  }
  inv.rsvpList.unshift(newRsvp);
  inv.updatedAt = new Date().toISOString();

  fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newRsvp;
}

export function incrementInvitationViews(idOrSlug: string): void {
  ensureDbExists();
  const list = getInvitations();
  const inv = list.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
  if (inv) {
    inv.viewsCount = (inv.viewsCount || 0) + 1;
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), "utf-8");
  }
}
