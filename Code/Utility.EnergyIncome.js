// ##### Object ######
function UtilityEnergyIncoming()
{
    this._Debugging = true
}

UtilityEnergyIncoming.prototype.Calculate = function(room, worldState)
{
    var roomLevel = worldState.Rooms[room].RoomControllerLevel
    var energyAvailable = worldState.Rooms[room].EnergyAvailable
    var numberOfHarvesters = worldState.CreepInRoles.CREEP_HARVESTERS
    
    var result = 0.0
    
    if (numberOfHarvesters < 4 && energyAvailable > 0)
        result = 1.0
        
    console.log("result: " + result)
    
	return	{
				UtilType: 'ENERGY_INCOME', 
				Value: result
			}
}

// ##### Exports ######
module.exports = {
    UtilityEnergyIncoming: UtilityEnergyIncoming
};
