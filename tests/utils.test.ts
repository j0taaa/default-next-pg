import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and removes falsy values", () => {
    expect(cn("text-sm", false && "hidden", "font-bold")).toBe(
      "text-sm font-bold"
    );
  });

  it("resolves tailwind class conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
