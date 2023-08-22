import { Parser } from "../../../src/lib/parser";

describe("Parser", () => {
  let parser: Parser;
  let packet: Buffer;

  beforeEach(() => {
    parser = new Parser();
    packet = Buffer.from([0x47, 0x80, 0x00, 0x10]);
  });

  test("parsePacket should return correct values", () => {
    const result = parser.parsePacket(packet);

    expect(result.syncByte).toBe(0x47);
    expect(result.transportErrorIndicator).toBe(1);
    expect(result.payloadUnitStartIndicator).toBe(0);
    expect(result.transportPriority).toBe(0);
    expect(result.PID).toBe(0);
    expect(result.scramblingControl).toBe(0);
    expect(result.adaptationFieldExist).toBe(0);
    expect(result.containsPayload).toBe(1);
    expect(result.continuityCounter).toBe(0);
  });
});
