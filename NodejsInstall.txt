Download Node.js
The official Node.js website has installation instructions for Node.js: https://nodejs.org
Download link: https://nodejs.org/en/download/
Recommended version : 6.11.2
Latest version : 8.4.0
Getting started
Install node js

Windows	OSX	Ubuntu
Installing	
Download windows installer (.msi)
Run this file for installing
null > 0456-02-node-js-setup-window.jpg	
Download macOS Installer (.pkg)
Run this file for installing
null > osx-yosemite-nodejs-install.png	

# for Node.js v4
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
# OR for Node.js v5
$ curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
# OR for Node.js v6
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
# OR for Node.js v7
$ curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
# OR for Node.js v8
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
 
# Then install the Node.js package.

$ sudo apt-get install -y nodejs

Checking version	

# checking node version
$ node -v
v7.1.0
 
# checking npm version
$ npm -v
3.10.0
 

Node console	

$ node
> console.log("hello world");
hello world
undefined
>


What is npm ?
npm makes it easy for JavaScript developers to share and reuse code, and it makes it easy to update the code that you're sharing.

If you've been working with JavaScript for a while, you might have heard of npm: npm makes it easy for JavaScript developers to share the code that they've created to solve particular problems, and for other developers to reuse that code in their own applications.
Your can read more at https://docs.npmjs.com/
npm install
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

alias: npm i
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]
This command installs a package, and any packages that it depends on. If the package has a package-lock or shrinkwrap file, the installation of dependencies will be driven by that, with an npm-shrinkwrap.json taking precedence if both files exist. See package-lock.json and npm-shrinkwrap.
A package is:
a) a folder containing a program described by a package.json file
b) a gzipped tarball containing (a)
c) a url that resolves to (b)
d) a <name>@<version> that is published on the registry (see npm-registry) with (c)
e) a <name>@<tag> (see npm-dist-tag) that points to (d)
f) a <name> that has a "latest" tag satisfying (e)
g) a <git remote url> that resolves to (a)
Even if you never publish your package, you can still get a lot of benefits of using npm if you just want to write a node program (a), and perhaps if you also want to be able to easily install it elsewhere after packing it up into a tarball (b).
npm install (in package directory, no arguments):
Install the dependencies in the local node_modules folder.
In global mode (ie, with -g or --global appended to the command), it installs the current package context (ie, the current working directory) as a global package.
By default, npm install will install all modules listed as dependencies in package.json.
With the --production flag (or when the NODE_ENV environment variable is set to production), npm will not install modules listed in devDependencies.

npm install <folder>:
Install the package in the directory as a symlink in the current project. Its dependencies will be installed before it's linked. If <folder> sits inside the root of your project, its dependencies may be hoisted to the toplevel node_modules as they would for other types of dependencies.

npm install <tarball file>:
Install a package that is sitting on the filesystem. Note: if you just want to link a dev directory into your npm root, you can do this more easily by using npm link. The filename must use .tar, .tar.gz, or .tgz as the extension.
Example: npm install ./package.tgz
You can read more at : https://docs.npmjs.com/cli/install
Sample web
Lets try to display "Hello World" in a web browser. Create a Node.js file named "app.js", and add the following code:
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);
Save the file on your workplace: ~sample\app.js
The code tells the computer to write "Hello World!" if anyone (e.g. a web browser) tries to access your computer on port 8080.
For now, you do not have to understand the code. It will be explained later.
Command Line Interface
Node.js files must be initiated in the "Command Line Interface" program of your computer.
he file you have just created must be initiated by Node.js before any action can take place.
Start your command line interface, write node myfirst.js and hit enter:
$ cd ~/sample
 
# starting web server
$ node app.js
 
Now, your computer works as a server!
If anyone tries to access your computer on port 8080, they will get a "Hello World!" message in return!
Start your internet browser, and type in the address: http://localhost:8080
 

