var roomHelper = require('RoomHelper');

module.exports.loop = function () {
    for (var i in Game.spawns) {
        roomHelper.ParseRoom(Game.spawns[i].room)
    }
}