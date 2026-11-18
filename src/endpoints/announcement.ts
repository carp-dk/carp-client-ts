import { Announcement as AnnouncementModel } from "@/shared";
import Endpoint from "./endpoint";

/**
 * Endpoint for reading the system announcement. Needs no authentication;
 * admins set it through the admin endpoint.
 */
class Announcement extends Endpoint {
  endpoint: string = "/api/announcement";

  /**
   * Get the current announcement
   * @returns The announcement, or null when none is set
   */
  async get() {
    const response = await this.actions.get<AnnouncementModel | "">(
      this.endpoint,
    );

    // No announcement is a 204 with an empty body.
    return response.data || null;
  }
}

export default Announcement;
