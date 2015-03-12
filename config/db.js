var mongoose = require("mongoose");

module.exports = {
    connect: connect,
    disconnect: disconnect
};

function connect(cb) {
    //mongoose.connect("mongodb://localhost/my_world_test");
    mongoose.connect(process.env.CONN);
    mongoose.connection.once("open", function() {
        cb();
    });
}
function disconnect(cb) {
    //mongoose.disconnect(cb);          //same
    mongoose.disconnect(function() {    //same
        cb();
    });
}