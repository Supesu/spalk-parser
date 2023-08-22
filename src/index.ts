import { InputStream } from "./lib/stream";
import { Parser } from "./lib/parser";

(async () => {
  let uniquePids = new Set<number>();
  let parser = new Parser();

  const handlePacket = (packet: Buffer) => {
    const { PID } = parser.parsePacket(packet);

    uniquePids.add(PID);
  };

  const handleClose = () => {
    let sortedPids = Array.from(uniquePids).sort();
    sortedPids.forEach((pid) => {
      console.log("0x" + pid.toString(16));
    });
  };

  new InputStream(process.stdin, handlePacket, handleClose);
})();
