const tmp = require("tmp");
const clipboardy = require("clipboardy");
const trash = require("trash");
const shell = require("shelljs");
const less = require("less");

const clipboardSuccess = "✅ CSS output copied to your clipboard!";

const opts = { silent: true };
const toCSS = (repository, { clipboard } = {}, done = () => {}) => {
  const cloneDir = tmp.dirSync();
  const clone = cloneDir.name;
  if (shell.exec(`git clone "${repository}" "${clone}"`, opts).code !== 0) {
    console.error("Error: Git clone failed");
    shell.exit(1);
  }
  if (shell.exec(`npm install --prefix ${clone}`, opts).code !== 0) {
    console.error("Error: installing Atom theme dependencies failed");
    shell.exit(2);
  }

  less.render(
    shell.cat(`${clone}/index.less`),
    { paths: [clone, `${clone}/styles`] },
    (err, result) => {
      if (err) {
        console.error("Error: Compiling Atom theme failed: ");
        console.error(err.message);
        trash(clone);
        shell.exit(3);
      }

      const css = result.css.replace(/atom-text-editor/g, ".editor");

      if (clipboard) {
        clipboardy.writeSync(css);
        console.log(clipboardSuccess);
      } else {
        console.log(css);
      }

      trash(clone);
      done();
    }
  );
};

toCSS.clipboardSuccess = clipboardSuccess;

module.exports = toCSS;
