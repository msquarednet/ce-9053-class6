var models = require("../../models/models");
var Person = models.Person;
var db = require("../../config/db");


describe("models", function() {
    var ids = {};
    beforeEach(function(done) {
        db.connect(function() {
            models.seed(function(err,moe,larry,curly, rock,paper,scissors) {
                ids.moeId = moe._id;
                ids.laryyId = larry._id;
                ids.curlyId = curly._id;
                ids.rockId = rock._id;
                ids.paperId = paper._id;
                ids.scissorsId = scissors._id;
                done();
            });
        });
    });
    afterEach(function(done) {
        db.disconnect(function() {
            done();
        });
    });
    
    describe("Person", function() {
        describe("getPersonByName", function() {
            var person;
            beforeEach(function(done) {
                Person.getOneByName("Moe", function(err, _person) {
                    person = _person;
                    done();
                });
            });
            it("person is moe", function() {
                expect(person.name).toEqual("Moe");
            });
        })
        
        describe("getPersonById", function() {
            var person;
            beforeEach(function(done) {
                Person.getOneById(ids.moeId, function(err, _person) {
                    person = _person;
                    done();
                });
            });
            it("returns moe", function() {
                expect(person.name).toEqual("Moe");
            });
        })
        
        describe("getAll", function() {
            var people;
            beforeEach(function(done) {
                Person.getAll(function(err, _people) {
                    people = _people.map(function(i) {
                        return i.name;
                    });
                    done();
                });
            });
            it("returns [curly, larry, moe]", function() {
                expect(people).toEqual(["Curly", "Larry", "Moe"]);
            });
        })
        
    });//end Person tests
    
    
    //Thing
    describe("Thing", function() {
        describe("getThingByName", function() {
            var person;
            beforeEach(function(done) {
                Person.getOneByName("Rock", function(err, _thing) {
                    thing = _thing;
                    done();
                });
            });
            it("thing is rock", function() {
                expect(thing.name).toEqual("Rock");
            });
        })
        
        describe("getThingById", function() {
            var person;
            beforeEach(function(done) {
                Person.getOneById(ids.rockId, function(err, _thing) {
                    thing = _thing;
                    done();
                });
            });
            it("is a rock", function() {
                expect(thing.name).toEqual("Rock");
            });
        })
        
        // describe("getAll", function() {
        //     var people;
        //     beforeEach(function(done) {
        //         Person.getAll(function(err, _people) {
        //             people = _people.map(function(i) {
        //                 return i.name;
        //             });
        //             done();
        //         });
        //     });
        //     it("returns [curly, larry, moe]", function() {
        //         expect(people).toEqual(["Curly", "Larry", "Moe"]);
        //     });
        // })

    });//end Thing tests
        
    
    
});
