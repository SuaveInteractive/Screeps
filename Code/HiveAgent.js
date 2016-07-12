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

         var currentPlans = Memory.HiveMind.CurrentPlans

         // Test to see if any current plans should be removed
         currentPlans = evalPlans.Evaluate(currentPlans)

         // Calaculate the needs of the Colony based on the current plans
         var needs = calculateNeeds.Calculate(currentPlans)

         // Create new plans based on needs
         var newPlans = createPlans.Create(needs)

         // Prioritise the plans based of Hive Mind Personallity
         newPlans = prioritisePlans.Prioritise(newPlans)

         // Select new plans and add them to the current plans
         currentPlans.append(selectPlans.Select(newPlans))

         // Execute the current plans
         executePlans.Execute(currentPlans)
     }
};