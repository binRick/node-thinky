var thinky = require('thinky')();
var pj = require('prettyjson');

var type = thinky.type;

// Create a model - the table is automatically created
var Server = thinky.createModel("Server", {
    id: String,
    hostname: String,
//    vms: Array
});

// You can also add constraints on the schema
var VM = thinky.createModel("VM", {
    id: type.string(),
    hostname: type.string().min(5),
    ctid: type.string().min(5),
});

// Join the models
VM.belongsTo(Server, "server", "idVM", "id");



var server = new Server({
hostname: 'enterprise',
});

// Create a new author
var vm = new VM({
    hostname: "some.hostname",
    ctid: '123123',
});

// Join the documents
vm.server = server;


vm.saveAll().then(function(result) {
console.log(result);
if(result.id)
    VM.get(result.id).getJoin().run().then(function(result) {
if(result)
        console.log(pj.render(result));
    });
});

