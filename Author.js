var thinky = require('thinky')();
var pj = require('prettyjson');

var type = thinky.type;

// Create a model - the table is automatically created
var Post = thinky.createModel("Post", {
    id: String,
    title: String,
    content: String,
    idAuthor: String
});

// You can also add constraints on the schema
var Author = thinky.createModel("Author", {
    id: type.string(), // a normal string
    name: type.string().min(2), // a string of at least two characters
    email: type.string().email() // a string that is a valid email
});

// Join the models
Post.belongsTo(Author, "author", "idAuthor", "id");




// Create a new post
var post = new Post({
    title: "Hello World!",
    content: "This is an example."
});

// Create a new author
var author = new Author({
    name: "Michel",
    email: "orphee@gmail.com"
});

// Join the documents
post.author = author;


post.saveAll().then(function(result) {
    Post.get(result.id).getJoin().run().then(function(result) {
        console.log(pj.render(result));
    });
});

//console.log(result);
/*
post = result = {
  id: "0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a",
  title: "Hello World!",
  content: "This is an example.",
  idAuthor: "3851d8b4-5358-43f2-ba23-f4d481358901",
  author: {
    id: "3851d8b4-5358-43f2-ba23-f4d481358901",
    name: "Michel",
    email: "orphee@gmail.com"
  }
}
*/
