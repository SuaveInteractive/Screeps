this._Debugging = true

if (!Memory.HiveMind)
{
    Memory.HiveMind = {}
}

var evalPlans = require('EvaluateCurrentPlans');
var calculateNeeds = require('CalculateNeeds');
var createPlans = require('CreatePlans');
var prioritisePlans = require('PrioritisePlans');
var selectPlans = require('SelectPlans');
var executePlans = require('ExecutePlans');
    
module.exports = {

     Run: function ()
     {
        console.log("HiveAgent - Run");
     }
};