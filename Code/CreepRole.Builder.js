var RoleBuilder = {}

RoleBuilder.Run = function (creep, data) 
{
    if (data.ConstructionSite == null)
        console.log("##### RoleBuilder: Need harvest site to work  #####")
    
    var constructionSite = Game.getObjectById(data.ConstructionSite)
    
    if (this.CanBuild(creep, constructionSite)) 
    {
        var result = creep.build(constructionSite)
        if (result == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(data.ConstructionSite)
        }
        else if (result != OK)
        {
           console.log("##### RoleBuilder: Error in build [" + result + "]  ConstructionSite [" + data.ConstructionSite + "] #####") 
        }
        return true
    }
    return false
}

RoleBuilder.CanBuild = function(creep, constructionSite)
{
    // Construction site no longer exists (finished?)
    if (constructionSite == null)
        return false
        
    return creep.carry.energy > 0 && creep.carryCapacity > 0
}

module.exports = RoleBuilder;