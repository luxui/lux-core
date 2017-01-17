/* eslint-env node */
/* eslint no-console: ["off"] */
const exec = require('child_process').exec;

const peers = require('./package.json').peerDependencies;

const listOfPeers = Object.keys(peers);
const prefix = str => `[ peerDependencies ] ${str}`;

if (!listOfPeers.length) {
  console.log(prefix('No "peerDependecies" to install.'));
} else {
  const cb = dep => error => (error
    ? console.error(error)
    : console.log(prefix(`Installing ${dep}`)));

  listOfPeers
    .forEach((peer) => {
      const dep = `${peer}@${peers[peer]}`;

      exec(`npm install ${dep}`, cb(dep));
    });
}
