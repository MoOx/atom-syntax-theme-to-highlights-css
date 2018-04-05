const tmp = require("tmp");
const clipboardy = require("clipboardy");
const trash = require("trash");
const shell = require("shelljs");

const clipboardSuccess = "✅ CSS output copied to your clipboard!";

const opts = { silent: true };
const toCSS = (repository, { clipboard } = {}) => {
  const cloneDir = tmp.dirSync();
  const clone = cloneDir.name;
  if (shell.exec(`git clone "${repository}" "${clone}"`, opts).code !== 0) {
    shell.echo("Error: Git clone failed");
    shell.exit(1);
  }
  if (shell.exec(`npm install --prefix ${clone}`, opts).code !== 0) {
    shell.echo("Error: installing Atom theme dependencies failed");
    shell.exit(2);
  }
  if (
    shell.exec(
      `lessc --include-path="${clone}/styles" "${clone}/index.less" "${clone}/output.css"`,
      opts
    ).code !== 0
  ) {
    shell.echo("Error: Compiling Atom theme failed");
    shell.exit(3);
  }

  let css = shell.cat(`${clone}/output.css`);

  css = css.replace(/atom-text-editor/g, ".editor");

  if (clipboard) {
    clipboardy.writeSync(css);
    console.log(clipboardSuccess);
  } else {
    console.log(css);
  }

  trash(clone);
};

toCSS.clipboardSuccess = clipboardSuccess;

module.exports = toCSS;
