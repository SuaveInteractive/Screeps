
var roomHelper = require('RoomHelper');
var hiveAgent = require('HiveAgent');

module.exports.loop = function () {
    for (var i in Game.spawns) {
        roomHelper.ParseRoom(Game.spawns[i].room)
    }
}