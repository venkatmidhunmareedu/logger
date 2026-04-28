import { expect, test, vi } from "vite-plus/test";
import { Logger } from "../src/index.ts";

test.each([
  { method: "log" as const, tag: "[LOG]", consoleFn: "log" },
  { method: "error" as const, tag: "[ERR]", consoleFn: "error" },
  { method: "info" as const, tag: "[INFO]", consoleFn: "info" },
  { method: "warn" as const, tag: "[WARN]", consoleFn: "warn" },
])("logger [$method] outputs correct format", ({ method, tag, consoleFn }) => {
  const logger = new Logger({ defaultOn: true });
  const spy = vi.spyOn(console, consoleFn as any).mockImplementation(() => {});

  logger[method]({
    level: "AUTH",
    message: "Hello, tsdown!",
  });

  expect(spy).toHaveBeenCalledWith(expect.stringContaining(`${tag} AUTH Hello, tsdown!`));

  spy.mockRestore();
});
