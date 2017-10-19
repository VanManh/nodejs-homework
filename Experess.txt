TechbaseVietNam > 【TechTeam - Training - Node JS】Build web application with Express JS > huong-dan-ket-noi-mongodb.jpg
What is Express Framework ?
Web Applications	Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
APIs	
With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.
Performance
Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.
Release version	4.15.4 is the current release.
Install	$ npm install express --save

What is mongoDB ?
Description	
MongoDB stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time
The document model maps to the objects in your application code, making data easy to work with
Ad hoc queries, indexing, and real time aggregation provide powerful ways to access and analyze your data
MongoDB is a distributed database at its core, so high availability, horizontal scaling, and geographic distribution are built in and easy to use
MongoDB is free and open-source, published under the GNU Affero General Public License
Release version	3.4
Install	
Install on Linux : Install the official builds of MongoDB Enterprise on Linux-based systems
Install on OS X: Install the official build of MongoDB Enterprise on OS X
Install on Windows: Install MongoDB Enterprise on Windows using the .msi installer.
Docs	https://docs.mongodb.com/?_ga=2.109660997.1541773379.1503995253-241358638.1503995253#using-mongodb
Required packages
No	Name	Description	Install
1	Express	Fast, unopinionated, minimalist web framework for Node.js	$ npm install express --save
2	mongoDB Driver	The recommended way to get started using the Node.js 2.0 driver is by using NPM (Node Package Manager) to install the dependency in your project.	$ npm install mongodb --save
3	async	Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. Although originally designed for use with Node.js and installable via npm install --save async, it can also be used directly in the browser.	$ npm install async --save
4	express-ejs-layouts	This template engine , we will use it for render html	$ npm install express-ejs-layouts --save
5	
Express application generator
Use the application generator tool, express-generator, to quickly create an application skeleton.
$ npm install express-generator -g
6	



Getting started
Express application generator
Use the application generator tool, express-generator, to quickly create an application skeleton.
The express-generator package installs the express command-line tool. Use the following command to do so:
$ npm install express-generator -g
Display the command options with the -h option:
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
For example, the following creates an Express app named myapp. The app will be created in a folder named myapp in the current working directory and the view engine will be set to ejs:
$ express --view=ejs myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.ejs
   create : myapp/views/error.ejs
   create : myapp/bin
   create : myapp/bin/www
Then install dependencies:
$ cd myapp
$ npm install
On MacOS or Linux, run the app with this command:
$ DEBUG=myapp:* npm start
On Windows, use this command:
> set DEBUG=myapp:* & npm start
Then load http://localhost:3000/ in your browser to access the app.
The generated app has the following directory structure:
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.ejs
    └── index.ejs

7 directories, 9 files
Custom and install other package
Let's custom skeleton of source for easy to using
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│	├── vendors // for storing jquery, bootstrap into this folder
│   ├── images
│   ├── js
│   │   └── app.js
│   └── css
│       └── style.css
├── controllers // for storing all controllers into this folder
├── models // for storing all models into this folder
├── helpers // for storing all helpers into this folder
├── libs // for storing all libs into this folder
│	└── db.js
├── configs // for storing all libs into this folder
│   ├── config.js
│	└── database.js
├── routes // for storing all routes into this folder
│   ├── web.js
│   └── api.js
└── views
	├── errors
	│	├── 400.ejs
	│	├── 404.ejs
	│	└── 500.ejs
	├── partials
	│	├── header.ejs
	│	├── sidebar.ejs
	│	└── footer.ejs
    ├── contents
	│	├── login.ejs
	│	└── dashboard.ejs
	├── layouts
	│	└── layout.ejs
    └── index.ejs

Module ejs-locals
Express 3.x layout, partial and block template functions for the EJS template engine.
Previously also offered include but you should use EJS 0.8.x's own method for that now
https://github.com/RandomEtc/ejs-locals
MongoDB Node.js Driver
This guide will show you how to set up a simple application using Node.js and MongoDB. Its scope is only how to set up the driver and perform the simple CRUD operations. For more in-depth coverage, see the tutorials.
http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/
