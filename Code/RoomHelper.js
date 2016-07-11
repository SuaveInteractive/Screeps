
module.exports = {

    ParseRoom: function (room) {
        console.log("What up")

        var sourcesActive = room.find(FIND_SOURCES_ACTIVE)
        for (var i in sourcesActive) {
            console.log("ACTIVE SOURCE" + i)
        }

        var sources = room.find(FIND_SOURCES_ACTIVE)
        for (var i in sources) {
            console.log("ACTIVE SOURCE" + i)
        }
    }
};

