import { exec } from "child_process";

describe("Index test", () => {
  it("should run index.ts piping in fail.ts and fail", (done) => {
    exec(
      "cat tests/fail.ts | ts-node src/index.ts",
      (error, _stdout, _stderr) => {
        expect(error).toBeTruthy();
        done();
      }
    );
  });

  it("should run index.ts piping in pass.ts and pass", (done) => {
    exec(
      "cat tests/pass.ts | ts-node src/index.ts",
      (error, _stdout, _stderr) => {
        expect(error).toBeFalsy();
        done();
      }
    );
  });
});
