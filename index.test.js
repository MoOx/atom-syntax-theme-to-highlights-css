const clipboardy = require("clipboardy");

const toCSS = require("./index.js");

jest.setTimeout(10000);

it("should output CSS", done => {
  const log = jest.spyOn(console, "log");
  toCSS("https://github.com/simurai/duotone-dark-sea-syntax", {}, () => {
    expect(log).toHaveBeenCalled();
    log.mockReset();
    log.mockRestore();
    done();
  });
});

it("should copy to clipboard", done => {
  const log = jest.spyOn(console, "log");
  toCSS(
    "https://github.com/simurai/duotone-dark-sea-syntax",
    {
      clipboard: true
    },
    () => {
      expect(log).toHaveBeenCalled();
      log.mockReset();
      log.mockRestore();
      expect(clipboardy.readSync()).toContain(".editor {");
      done();
    }
  );
});
