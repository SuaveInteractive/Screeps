module.exports = {

    ParseRoom: function (room)
    {
        if (HasRoomBeenParsed(room))
            return

        console.log("What up")

        var sourcesActive = room.find(FIND_SOURCES_ACTIVE)
        for (var i in sourcesActive)
        {
            console.log("ACTIVE SOURCE" + i)
        }

        var sources = room.find(FIND_SOURCES_ACTIVE)
        for (var i in sources)
        {
            console.log("ACTIVE SOURCE" + i)
        }

        Memory.ParsedRooms[room].Parsed = true
    },

    HasRoomBeenParsed: function(room)
    {
        for (var i in Memory.ParsedRooms)
        {
            if (i == room)
                return room.Parsed ? room.Parsed : false
        }
        return false
    }
};

