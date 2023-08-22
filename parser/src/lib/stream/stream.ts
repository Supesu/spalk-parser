import { Readable } from "stream";
import { PACKET_SIZE, SYNC_BYTE } from "../../utils";

/**
 * InputStream class for processing a mpeg transport data stream and splitting it into packets
 * @since 22nd August 2023
 */
export class InputStream {
  private callback: (packet: Buffer) => void;
  private buffer: Buffer = Buffer.alloc(0);
  private packetNumber: number = 0;

  /**
   * Constructor for InputStream class
   * @param {Readable} inputStream - The input stream to process
   * @param {Function} callback - The callback function to handle processed packets
   * @param {Function} onClose - The function to handle 'end' event
   * @since 22nd August 2023
   */
  constructor(
    inputStream: Readable,
    callback: (packet: Buffer) => void,
    onClose: () => void
  ) {
    this.callback = callback;
    inputStream.on("data", this.processData);
    inputStream.on("end", onClose);
  }

  /**
   * Method to process data from the input stream and verify its got a sync byte
   * @param {Buffer} data - The data to process
   * @since 22nd August 2023
   */
  private processData = (data: Buffer) => {
    this.buffer = Buffer.concat([this.buffer, data]);

    while (this.buffer.length >= PACKET_SIZE) {
      const packet = this.buffer.subarray(0, PACKET_SIZE);
      this.buffer = this.buffer.subarray(PACKET_SIZE);
      this.packetNumber++;

      if (packet[0] !== SYNC_BYTE) {
        console.error(
          `Error: No sync byte present in packet ${this.packetNumber}, offset ${
            PACKET_SIZE * this.packetNumber
          }`
        );
        process.exit(1);
      }

      this.callback(packet);
    }
  };
}
