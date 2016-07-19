var roomHelper = require('RoomHelper');

module.exports = {
    SpawnCreep: function(room)
    {
        var spawner = this.GetBestSpawner(room)
        if (spawner)
        {
            console.log("Game.spawns[spawner]: " + Game.structures[spawner])
            Game.structures[spawner].createCreep([WORK, CARRY, MOVE])
        }
        else
        {
            console.log("Could not find a spawner to use in room [" + room + "]")
        }
    },
    
    GetBestSpawner: function(room)
    {
        var spawners = roomHelper.GetStructures(room, STRUCTURE_SPAWN)
        for (var s in spawners)
        {
            console.log("s: " + s)
            if (!s.spawningobject)
                return s
        };
    }
};