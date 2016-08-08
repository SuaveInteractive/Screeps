// ##### Object ######
function UtilityBuildContainer()
{
    this._Debugging = false
}

UtilityBuildContainer.prototype.Calculate = function(room, worldState)
{
    var availableStructures = worldState.Rooms[room].AvailableStructures
    var numberOfContainersAvailable = availableStructures.container
    var numberOfUnassignedCreeps = worldState.NumberOfUnassignedCreeps
     
    var result = 0.00
    
    if (numberOfUnassignedCreeps > 0 && numberOfContainersAvailable > 0)
        result = 1.0
        
	return	{
				UtilType: 'BUILD_CONTAINER', 
				Value: Math.min(result, 1.0)
			}
}

// ##### Exports ######
module.exports = {
    UtilityBuildContainer: UtilityBuildContainer
};
