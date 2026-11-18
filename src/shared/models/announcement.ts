export type AnnouncementSeverity = "INFO" | "WARNING" | "CRITICAL";

/** The system announcement admins can set, e.g. for planned maintenance. */
export type Announcement = {
  message: string;
  severity: AnnouncementSeverity;
  updatedAt?: string | null;
  updatedBy?: string | null;
};

export type SetAnnouncementRequest = {
  message: string;
  severity?: AnnouncementSeverity;
};
