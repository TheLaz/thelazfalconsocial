# Falcon Social
 Angularjs, D3 Charting and Socket.IO.

### Installation

```bash
$ npm install
```

### Run

```bash
$ node app.js
```

UI available at http://localhost:3000.

#### Data Sources

```Publishing : http://jsonblob.com/api/jsonBlob/5208ac13e4b002188ed03bdf```

```Reach data : http://jsonblob.com/api/jsonBlob/5208a709e4b002188ed03bdd```

###  Todo features

+ Creating a database with mongoose with all its entities. 
+ Better rendering of real time charting: ```http://www.benh.co.uk/datasift/visualising-a-datasift-feed-with-node-and-d3/```
+ Implement better communication with the server
+ No validation (maybe should be in todo since it was not a base requirement)

###  Known bugs

+ If you leave the chart long enough then sometimes Socket.IO emit an error

##  General Flow

### App starts

+ Server Start at port 3000
+ Creating the DB 
+ Passing the DB to the relevant Store.

### Store

+ init the DB
+ load data from one of the data sources
+ data is passed through a transform for creating a unified way to interact with
the data.
+ saving data.


For the reach data base it is a little different since we want to trigger
the data load from the DB by ours-selfs.

### Constants 

Centralizing events name

## Styling

### Themes

Themes are the way to gain control over UI.

+ Declaring colors.
+ Colors are mapped to their components variables
+ Components variables are used in the site.less
