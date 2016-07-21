// ##### Object ######
function UtilityEnergyIncoming()
{
    this._Debugging = true
}

UtilityEnergyIncoming.prototype.Calculate = function(world)
{
	return	{
				UtilType: 'ENERGY_INCOME', 
				Value: 1.0
			}
}

// ##### Exports ######
module.exports = {
    UtilityEnergyIncoming: UtilityEnergyIncoming
};