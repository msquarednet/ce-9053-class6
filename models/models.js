var mongoose = require("mongoose");

var PersonSchema = new mongoose.Schema({    //defines what each doc in collect can have
    name: String
});
PersonSchema.statics.getOneByName = function(name,cb) {  //add Person method
    this.findOne({name:name},cb); //wrap around native mongo method //this is on mongoose
}
PersonSchema.statics.getOneById = function(id,cb) {  //add Person method
   this.findOne({_id:id},cb);
}
PersonSchema.statics.getAll = function(cb) {  //add Person method
   //this.find({}, cb);   //{} means everything
   this.find({}).sort("name").exec(cb); 
}


var ThingSchema = new mongoose.Schema({
    name:String
})
ThingSchema.statics.getOneByName = function(name,cb) {  //add Person method
    this.findOne({name:name},cb); //wrap around native mongo method //this is on mongoose
}
ThingSchema.statics.getOneById = function(id,cb) {  //add Person method
  this.findById(id,cb);
  //this.findOne({_id:id},cb);
}
// ThingSchema.statics.getAll = function(cb) {  //add Person method
//   //this.find({}, cb);   //{} means everything
//   this.find({}).sort("name").exec(cb); 
// }

var Person = mongoose.model("Person", PersonSchema);
var Thing = mongoose.model("Thing", ThingSchema);

function seed(cb){
    people = [
        {name:"Moe"},
        {name:"Larry"},
        {name:"Curly"}
    ];
    things = [
        {name:"Rock"},
        {name:"Paper"},
        {name:"Scissors"}
    ];
    Person.remove({}, function() {
        Person.create(people, function(err, moe, larry, curly) {    //maybe args.array
            Thing.remove({}, function() {
                Thing.create(things, function(err, rock, paper, scissors) {   
                    //cb(err, moe, larry, curly);
                    cb(err, moe, larry, curly, rock, paper, scissors);
                });
            });
        });
    });
};






module.exports = {
    seed: seed,
    Person: Person,
    Thing: Thing
};