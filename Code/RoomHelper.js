this._Debugging = true

if (!Memory.ParsedRooms)
{
    Memory.ParsedRooms = {}
}

module.exports = {

    ParseRoom: function (room)
    {
        if (this.HasRoomBeenParsed(room))
            return

        Memory.ParsedRooms[room] = {};

        // ****** SOURCES *****
        Memory.ParsedRooms[room].Sources = {};
        var sources = room.find(FIND_SOURCES)
        _.forEach(sources, function (source)
        {
            var sourcePos = source.pos
            var harvesterPositions = []

            var area = room.lookForAtArea(LOOK_TERRAIN, sourcePos.y - 1, sourcePos.x - 1, sourcePos.y + 1, sourcePos.x + 1, false)

            _.forEach(area, function (col, y)
            {
                _.forEach(col, function (cell, x)
                {
                    for (i = 0; i < cell.length; i++)
                    {
                        if (cell == "plain")
                        {
                            harvesterPositions.push(new RoomPosition(x, y, room.name));
                        }
                    }
                });
            });

            Memory.ParsedRooms[room].Sources[source] =
                {
                    SourcePos: sourcePos,
                    HarvesterPositions: harvesterPositions,
                }
        });

        /*
        var sourcesActive = room.find(FIND_SOURCES_ACTIVE)
        for (var i in sourcesActive) {
            console.log("SOURCE ACTIVE" + i)
        }
        */
        
        // ****** STRUCTURES *****
        Memory.ParsedRooms[room].Spawns = {}
        
        var myStructures = room.find(FIND_MY_STRUCTURES)
        myStructures.forEach(function(struct)
        {
            if (struct.structureType == STRUCTURE_SPAWN)
            {
                Memory.ParsedRooms[room].Spawns[struct.id] = struct
            }
        });
        
        // DEBUG
        if (_Debugging)
        {
            console.log("Sources:")
            _.forEach(Memory.ParsedRooms[room].Sources, function (source) 
            {
                console.log("  Source Pos: " + source.sourcePos)

                _.forEach(source.HarvesterPositions, function (harvesterPositions)
                {
                    console.log("    Harvester Positions: " + harvesterPositions)
                });
            });
            
            console.log("Structures:")
            if (Memory.ParsedRooms[room].Spawns)
            {
                console.log("  Spawns:")
                for (var spawn in Memory.ParsedRooms[room].Spawns)
                {
                    console.log("    " + spawn)    
                }
            }
        }

         Memory.ParsedRooms[room].Parsed = true;
    },
    
    GetStructures: function(room, structure)
    {
        if (!this.HasRoomBeenParsed(room))
            return
            
        if (structure == STRUCTURE_SPAWN)
            return Memory.ParsedRooms[room].Spawns
    },

    HasRoomBeenParsed: function (room)
    {
        for (var i in Memory.ParsedRooms)
        {
            if (i == room)
                return Memory.ParsedRooms[room].Parsed;
        }
        return false;
    }
};

