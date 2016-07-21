
var roomHelper = require('RoomHelper');
var hiveAgent = require('HiveAgent');

var roleHarvester = require('CreepRole.Harvester');

module.exports = {
    loop: function () 
    {
        for (var i in Game.spawns) 
        {
            roomHelper.ParseRoom(Game.spawns[i].room)
        }

        hiveAgent.Run();
        
        for(var name in Game.creeps) 
        {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') 
            {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') 
            {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') 
            {
                roleBuilder.run(creep);
            }
        }
    },
};