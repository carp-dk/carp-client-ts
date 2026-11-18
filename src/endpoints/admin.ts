import {
  AdminResearcher,
  AdminStudy,
  Announcement,
  ServerInfo,
  SetAnnouncementRequest,
} from "@/shared";
import Endpoint from "./endpoint";

/**
 * Endpoint for instance-wide administration. Only CARP and system admins
 * can use it.
 */
class Admin extends Endpoint {
  endpoint: string = "/api/admin";

  /**
   * Set the system announcement, replacing the current one
   * @param request The message and severity (the server defaults to INFO)
   * @returns The announcement, or null when an empty message cleared it
   */
  async setAnnouncement(request: SetAnnouncementRequest) {
    const response = await this.actions.put<Announcement | "">(
      `${this.endpoint}/announcement`,
      request,
    );

    // Clearing is a 204 with an empty body.
    return response.data || null;
  }

  /**
   * Remove the system announcement
   */
  async clearAnnouncement() {
    await this.actions.put(`${this.endpoint}/announcement`, { message: "" });
  }

  /**
   * Get every study on this instance, newest first
   * @param live Only live (true) or only non-live (false) studies; all when omitted
   */
  async getStudies({ live }: { live?: boolean } = {}) {
    const params = new URLSearchParams();
    if (live !== undefined) params.set("live", String(live));
    const queryString = params.toString();

    const response = await this.actions.get<AdminStudy[]>(
      `${this.endpoint}/studies${queryString ? `?${queryString}` : ""}`,
    );

    return response.data;
  }

  /**
   * Get every researcher account on this instance, newest first
   */
  async getResearchers() {
    const response = await this.actions.get<AdminResearcher[]>(
      `${this.endpoint}/researchers`,
    );

    return response.data;
  }

  /**
   * Get the server version, runtime and dependency health
   */
  async getServerInfo() {
    const response = await this.actions.get<ServerInfo>(
      `${this.endpoint}/server-info`,
    );

    return response.data;
  }
}

export default Admin;
