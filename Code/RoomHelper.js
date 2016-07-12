Memory.ParsedRooms = {}

module.exports = {

    ParseRoom: function (room)
    {
        if (this.HasRoomBeenParsed(room))
            return

        Memory.ParsedRooms[room] = {};

        Memory.ParsedRooms[room].Sources = {};
        var sources = room.find(FIND_SOURCES)
        _.forEach(sources, function (source)
        {
            var sourcePos = source.pos
            var harvesterPositions = []
           // console.log((sourcePos.y - 1) + " - " + (sourcePos.x - 1) + " - " + (sourcePos.y + 1) + " - " + (sourcePos.x + 1))

            var area = room.lookForAtArea(LOOK_TERRAIN, sourcePos.y - 1, sourcePos.x - 1, sourcePos.y + 1, sourcePos.x + 1, false)

            _.each(area, function (col, y)
            {
                _.each(col, function (cell, x)
                {
                    for (i = 0; i < cell.length; i++)
                    {
                        console.log(i + " pos " + x + " " + y + " cell.length: " + cell.length, " cell: " + cell);

                        if (cell == "plain")
                        {
                            harvesterPositions.push[cell]
                        }
                    }
                });
            });

            // console.log(result.length)
            //for (var i=1; result.length; i++)
            //{
            //  console.log(result[i])
            //}

            Memory.ParsedRooms[room].Sources[source] =
                {
                    SourcePos: sourcePos,
                    HarvesterPositions: harvesterPositions
                }
        });

        var sourcesActive = room.find(FIND_SOURCES_ACTIVE)
        for (var i in sourcesActive) {
            console.log("SOURCE ACTIVE" + i)
        }


        // Memory.ParsedRooms[room].Parsed = true;
    },

    HasRoomBeenParsed: function (room)
    {
        for (var i in Memory.ParsedRooms)
        {
            console.log(i + " -- " + room)
            if (i == room)
                return Memory.ParsedRooms[room].Parsed;
        }
        return false;
    }

};

