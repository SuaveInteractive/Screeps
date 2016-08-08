var roleHarvester = {}

roleHarvester.Run = function(creep, data) 
{
    if (data.HarvestSite == null)
        console.log("##### RoleHarvester: Need harvest site to work  #####")
        
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
    else
    {
        return false
    }
    return true
}

roleHarvester.CanHarvest = function(creep)
{
    return creep.carry.energy < creep.carryCapacity && creep.memory.transfering != true
}

module.exports = roleHarvester;