var utilityTypes = require('Utility.Types');

module.exports = {

    Calculate: function (world)
    {
		return	{
					UtilType: utilityTypes.UTILITY_ENERGY_INCOMING, 
					Value: 1.0
				}
    }
};