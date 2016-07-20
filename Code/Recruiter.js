var roomHelper = require('RoomHelper');

module.exports = {
    ERR_NO_SPAWNER_AVAILIBLE: -18,
    
    SpawnCreep: function(room)
    {
        var spawner = this.GetBestSpawner(room)
        if (spawner)
        {
            return Game.structures[spawner].createCreep([WORK, CARRY, MOVE])
        }
        else
        {
            console.log("Could not find a spawner to use in room [" + room + "]")
            return this.ERR_NO_SPAWNER_AVAILIBLE
        }
    },
    
    GetBestSpawner: function(room)
    {
        var spawners = roomHelper.GetStructures(room, STRUCTURE_SPAWN)
        for (var s in spawners)
        {
            if (!s.spawningobject)
                return s
        };
    }
};