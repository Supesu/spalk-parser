import { PACKET_SIZE, SYNC_BYTE } from "../../src/utils/constants";

describe("Constants", () => {
  test("PACKET_SIZE should be 188", () => {
    expect(PACKET_SIZE).toBe(188);
  });

  test("SYNC_BYTE should be 0x47", () => {
    expect(SYNC_BYTE).toBe(0x47);
  });
});
