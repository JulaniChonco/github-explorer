/**
 * api.test.js
 * -----------
 * Unit test for getJSON helper (success and error cases).
 */

import { getJSON } from "../src/api.js";

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  fetch.mockReset();
});

test("getJSON returns parsed JSON on success", async () => {
  fetch.mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
  const data = await getJSON("/api/ok");
  expect(data.ok).toBe(true);
});

test("getJSON throws with server error payload", async () => {
  fetch.mockResolvedValueOnce(new Response(JSON.stringify({ error: "Boom" }), { status: 500, statusText: "Server Error" }));
  await expect(getJSON("/api/fail")).rejects.toThrow("Boom");
});
