var RoleTransferResource = {}

RoleTransferResource.Run = function(creep, data) 
{/*
    //if(creep.carry.energy < creep.carryCapacity && creep.memory.transfering != true) 
    if (this.CanHarvest(creep))
    {
        var harvestTarget = Game.getObjectById(data.HarvestSite)
        var result = creep.harvest(harvestTarget)
        if(result == ERR_NOT_IN_RANGE) 
        {
            var result = creep.moveTo(harvestTarget);
            
            if (result != OK)
                creep.say("Cant Move")
        }
    }
    else */
    {
    //    creep.memory.transfering = true
        
        var targets = creep.room.find(FIND_STRUCTURES, 
        {
                filter: (structure) => 
                {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
        });
        
        if(targets.length > 0) 
        {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(targets[0]);
            }
        }
        else
        {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(creep.room.controller);
            }
        }
        
      //  if (creep.carry.energy == 0)
      //      creep.memory.transfering = null
    }
}

module.exports = RoleTransferResource;