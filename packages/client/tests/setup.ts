import "@testing-library/jest-dom";
// import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { server } from "../src/mocks/server";

// extends Vitest's expect method with methods from react-testing-library
// expect!.extend(matchers!);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => cleanup());

beforeAll(() => {
  // console.log("beforeAll: server.listen");
  server.listen({ onUnhandledRequest: "error" });
});
afterAll(() => {
  // console.log("afterAll: server.close");
  server.close();
});
afterEach(() => {
  // console.log("afterEach: server.resetHandlers");
  server.resetHandlers();
});
