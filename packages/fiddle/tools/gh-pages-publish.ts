const { cd, exec, echo, touch } = require('shelljs');
const { execFileSync } = require('child_process');
const { readFileSync } = require('fs');
const { execFileSync } = require('child_process');
const url = require('url');

let repoUrl;
let pkg = JSON.parse(readFileSync('package.json') as any);
if (typeof pkg.repository === 'object') {
  if (!pkg.repository.hasOwnProperty('url')) {
    throw new Error('URL does not exist in repository section');
  }
  repoUrl = pkg.repository.url;
} else {
  repoUrl = pkg.repository;
}

let parsedUrl = url.parse(repoUrl);
let repository = (parsedUrl.host || '') + (parsedUrl.path || '');
let ghToken = process.env.GH_TOKEN;
if (!ghToken) {
  throw new Error('GH_TOKEN environment variable must be set');
}

echo('Deploying docs!!!');
cd('docs');
touch('.nojekyll');
exec('git init');
exec('git add .');
exec('git config user.name "Steve Sewell"');
exec('git config user.email "sewell.steve@gmail.com"');
exec('git commit -m "docs(docs): update gh-pages"'); dd/bits/fix-gh-pages-cmdi
const remoteWithToken = `https://${ghToken}@${repository}`;
execFileSync('git', ['push', '--force', '--quiet', remoteWithToken, 'master:gh-pages'], {
const encodedToken = encodeURIComponent(ghToken || '');
const remoteUrl = `https://${encodedToken}@${repository}`;
execFileSync('git', ['push', '--force', '--quiet', remoteUrl, 'master:gh-pages'], { main
  stdio: 'inherit',
});
echo('Docs deployed!!');
