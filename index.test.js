const clipboardy = require("clipboardy");

const toCSS = require("./index.js");

it("should output CSS", () => {
  const log = jest.spyOn(console, "log");
  toCSS("https://github.com/simurai/duotone-dark-sea-syntax");
  expect(log).toHaveBeenCalled();
  log.mockReset();
  log.mockRestore();
});

it("should copy to clipboard", () => {
  const log = jest.spyOn(console, "log");
  toCSS("https://github.com/simurai/duotone-dark-sea-syntax", {
    clipboard: true
  });
  expect(log).toHaveBeenCalled();
  log.mockReset();
  log.mockRestore();
  expect(clipboardy.readSync()).toContain(".editor {");
});
