// ##### Object ######
function UtilityBuildContainer()
{
    this._Debugging = false
}

UtilityBuildContainer.prototype.Calculate = function(room, worldState)
{
    var availableStructures = worldState.Rooms[room].AvailableStructures
    var numberOfContainersAvailable = availableStructures.container
    var numberOfHarvesters = worldState.CreepInRoles.CREEP_HARVESTERS
     
    var result = 0.00
    
    if (numberOfHarvesters >= 3)
        result = numberOfContainersAvailable / 5
        
	return	{
				UtilType: 'BUILD_CONTAINER', 
				Value: result
			}
}

// ##### Exports ######
module.exports = {
    UtilityBuildContainer: UtilityBuildContainer
};
