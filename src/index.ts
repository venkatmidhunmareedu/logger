import type { LOG } from "./types.ts";

/**
 * A basic logger util for better log context
 * @param storageKey (String) - optional
 * @param defaultOpen (Boolean)  - optional
 */
export class Logger {
  private storageKey: string;
  constructor({
    storageKey = "web-logger",
    defaultOn = false,
  }: {
    storageKey?: string;
    defaultOn?: boolean;
  }) {
    this.storageKey = storageKey;
    if (typeof window !== "undefined") {
      if (!localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, JSON.stringify(defaultOn));
      }
    } else {
      throw new Error("Can't find window object");
    }
  }
  private print(message: string, level: string, log_type: "LOG" | "INFO" | "WARN" | "ERR") {
    const timestamp = new Date().toISOString();
    message = `[${timestamp}]: [${log_type}] ${level} ${message}`;
    const show_logs = Boolean(JSON.parse(localStorage.getItem(this.storageKey) ?? "false"));
    if (!show_logs) {
      return;
    }
    switch (log_type) {
      case "LOG":
        console.log(message);
        break;
      case "ERR":
        console.error(message);
        break;
      case "INFO":
        console.info(message);
        break;
      case "WARN":
        console.warn(message);
        break;
      default:
        console.log(message);
        break;
    }
  }
  public log({ message, level }: LOG) {
    this.print(message, level, "LOG");
  }
  public info({ message, level }: LOG) {
    this.print(message, level, "INFO");
  }
  public warn({ message, level }: LOG) {
    this.print(message, level, "WARN");
  }
  public error({ message, level }: LOG) {
    this.print(message, level, "ERR");
  }
}
