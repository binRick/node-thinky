var thinky = require('thinky')();
var pj = require('prettyjson');

var type = thinky.type;

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
    created: type.boolean(),
    running: type.boolean(),
    createdAt: type.date(),
    createdLog: type.string(),
});

VM.ensureIndex('running');
VM.ensureIndex('created');
VM.ensureIndex('ctid');



// Join the models
VM.belongsTo(Server, "server", "idVM", "id");



var server = new Server({
    hostname: 'enterprise',
});

// Create a new author
var vm = new VM({
    hostname: "some.hostname",
    ctid: '123123',
    created: false,
    running: false,
});

// Join the documents
vm.server = server;


//if (false)
    vm.saveAll().then(function(result) {
        console.log(result);
        if (result.id)
            VM.get(result.id).getJoin().run().then(function(result) {
                if (result)
                    console.log(pj.render(result));
            });
    });

VM.filter({
    created: true,
}).run().then(function(result) {
    console.log(pj.render(result));
}).error(console.log);
VM.orderBy({
    index: "created"
}).run().then(function(result) {
    console.log(pj.render(result));
}).error(console.log);
