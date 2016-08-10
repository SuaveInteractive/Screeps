var RoleBuilder = {}

RoleBuilder.Run = function (creep, data) 
{
    if (data.ConstructionSite == null)
        console.log("##### RoleBuilder: Need harvest site to work  #####")
    
    console.log("++++ 11")
    if (this.CanBuild(creep)) 
    {
        var constructionSite = Game.getObjectById(data.ConstructionSite)
        
        console.log("++++ 12")
        var result = creep.build(constructionSite)
        if (result == ERR_NOT_IN_RANGE) 
        {
            console.log("++++ 13")
            creep.moveTo(data.ConstructionSite)
        }
        else if (result != OK)
        {
           console.log("##### RoleBuilder: Error in build [" + result + "]  ConstructionSite [" + data.ConstructionSite + "] #####") 
        }
        console.log("++++ 14")
        return true
    }
    console.log("++++ 15")
    return false
}

RoleBuilder.CanBuild = function(creep)
{
    return creep.carry.energy > 0 && creep.carryCapacity > 0
}

module.exports = RoleBuilder;