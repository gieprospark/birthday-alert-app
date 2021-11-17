### Event birthday notifier app
App bundle : 
Framework : ExpressJS
Database : Sqlite
Orm : Sequelize
Datetime library : MomentJS

Hookbin url : https://hookbin.com/wNMpOw07rksqJmrrJ7pa

Step to run the app: 
1. npm install -> to install package required
2. node_modules/.bin/sequelize db:migrate   -> to create the table required
3. DEBUG=birthday-alert-app:* npm start  -> to serve in debug mode
4. yarn start -> to serve  the app

**API Docs**

**Get all users **
URL : http://localhost:3000/users
Method : GET

**Create a users **
URL : http://localhost:3000/users
Method : POST
Body :
{
	"first_name":"Perdana",
	"last_name":"Anggi",
	"birth_day":"2021-11-16",
	"anniversary":"2021-12-16",
	"location":"AU"
}

**Delete a users **
URL : http://localhost:3000/users/:id
Method : DELETE

**Update a users **
URL : http://localhost:3000/users/:id
Method : PUT
Body :
{
	"first_name":"Perdana",
	"last_name":"Kusuma",
	"birth_day":"2021-11-17",
	"anniversary":"2021-11-17",
	"location":"AU"
}


