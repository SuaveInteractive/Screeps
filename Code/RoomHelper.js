Memory.ParsedRooms = {}

module.exports = {

    ParseRoom: function (room) {
        if (this.HasRoomBeenParsed(room))
            return

        console.log("What up")

        var sourcesActive = room.find(FIND_SOURCES)
        for (var i in sourcesActive) {
            console.log("SOURCE" + i)
        }

        var sources = room.find(FIND_SOURCES_ACTIVE)
        for (var i in sources) {
            console.log("SOURCE ACTIVE" + i)
        }

        Memory.ParsedRooms[room] = {};
        Memory.ParsedRooms[room].Parsed = true;
    },

    HasRoomBeenParsed: function (room) {
        for (var i in Memory.ParsedRooms) {
            console.log(i + " -- " + room)
            if (i == room)
                return Memory.ParsedRooms[room].Parsed;
        }
        return false;
    }

};

