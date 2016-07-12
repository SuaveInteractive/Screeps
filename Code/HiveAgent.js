this._Debugging = true

if (!Memory.HiveMind)
{
    Memory.HiveMind = {}
    Memory.HiveMind.CurrentPlans = {}
}

var calculateNeeds = require('AI.CalculateNeeds');
var createPlans = require('AI.CreatePlans');
var evalPlans = require('AI.EvaluateCurrentPlans');
var executePlans = require('AI.ExecutePlans');
var prioritisePlans = require('AI.PrioritisePlans');
var selectPlans = require('AI.SelectPlans');

    
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
         currentPlans.concat(selectPlans.Select(newPlans))

         // Execute the current plans
         executePlans.Execute(currentPlans)
     }
};