export class Parser {
  public parsePacket(packet: Buffer) {
    const syncByte = packet[0];
    const transportErrorIndicator = (packet[1] & 0x80) >> 7;
    const payloadUnitStartIndicator = (packet[1] & 0x40) >> 6;
    const transportPriority = (packet[1] & 0x20) >> 5;
    const PID = ((packet[1] & 0x1f) << 8) | packet[2];
    const scramblingControl = (packet[3] & 0xc0) >> 6;
    const adaptationFieldExist = (packet[3] & 0x20) >> 5;
    const containsPayload = (packet[3] & 0x10) >> 4;
    const continuityCounter = packet[3] & 0x0f;

    return {
      syncByte,
      transportErrorIndicator,
      payloadUnitStartIndicator,
      transportPriority,
      PID,
      scramblingControl,
      adaptationFieldExist,
      containsPayload,
      continuityCounter,
    };
  }
}
