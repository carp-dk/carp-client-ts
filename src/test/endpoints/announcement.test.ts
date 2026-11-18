import { beforeAll, describe, expect, test } from "vitest";
import CarpTestClient from "../client/carpTestClient";
import { setupTestClient } from "@/test/utils";

// Everyone, signed in or not, sees the same announcement, so the portal can
// show it on every page.
describe("Announcement", () => {
  let testClient: CarpTestClient;

  beforeAll(async () => {
    const { client } = await setupTestClient();
    testClient = client;
  });

  test("any user can read the announcement", async () => {
    const announcement = await testClient.announcement.get();

    // Either no announcement (null, not an empty string) or a complete one.
    if (announcement !== null) {
      expect(announcement.message).toBeTruthy();
      expect(["INFO", "WARNING", "CRITICAL"]).toContain(announcement.severity);
    }
  });
});
