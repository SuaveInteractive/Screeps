
module.exports = {
    Plan:
    {
        PlanRoom: null,
        
        GetPlanRoomName: function()
        {
            return this.PlanRoomName
        },
        
        SetPlanRoomName: function(roomName)
        {
            this.PlanRoomName = roomName
        },
        
        GetSerializedData: function()
        {
            console.log("Plan.GetSerializedData: " + this.PlanRoomName)
            return {}
        },
        
        Load: function()
        {
        
        },
    }
};