var RoleTransferResource = {}

RoleTransferResource.Run = function(creep, data) 
{
    if (this.CanTransfer(creep))
    {
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
        
        return true
        
    }
    else
    {
        return false
    }
}

RoleTransferResource.CanTransfer = function(creep)
{
    return creep.carry.energy > 0
}

module.exports = RoleTransferResource;