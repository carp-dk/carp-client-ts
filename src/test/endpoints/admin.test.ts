import { beforeAll, describe, expect, test } from "vitest";
import CarpTestClient from "../client/carpTestClient";
import { setupTestClient } from "@/test/utils";
import { CarpServiceError } from "@/shared";

// The test account is a researcher, not an admin. Instance-wide data (every
// study, every researcher, server health) and the announcement must stay out
// of a researcher's reach.
describe("Admin", () => {
  let testClient: CarpTestClient;

  beforeAll(async () => {
    const { client } = await setupTestClient();
    testClient = client;
  });

  const expectForbidden = async (call: () => Promise<unknown>) => {
    expect.assertions(2);
    try {
      await call();
    } catch (error) {
      expect(error).toBeInstanceOf(CarpServiceError);
      expect((error as CarpServiceError).code).toBe(403);
    }
  };

  test("a researcher cannot set the announcement", () =>
    expectForbidden(() =>
      testClient.admin.setAnnouncement({ message: "Not allowed" }),
    ));

  test("a researcher cannot clear the announcement", () =>
    expectForbidden(() => testClient.admin.clearAnnouncement()));

  test("a researcher cannot list all studies", () =>
    expectForbidden(() => testClient.admin.getStudies({ live: true })));

  test("a researcher cannot list all researchers", () =>
    expectForbidden(() => testClient.admin.getResearchers()));

  test("a researcher cannot read server info", () =>
    expectForbidden(() => testClient.admin.getServerInfo()));
});
