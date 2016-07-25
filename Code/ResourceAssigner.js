var ResourceAssigner = {}
ResourceAssigner._Debugging = false

if (!Memory.ResourceSites)
{
    Memory.ResourceSites = {}
}

ResourceAssigner.GetAvailableMiningLocation = function(room, resource, position)
{
    if (this._Debugging)
        console.log(" ResourceAssigner.GetAvailableMiningLocation: " + position)
    
    if (!Memory.ResourceSites || !Memory.ResourceSites[room] || !Memory.ResourceSites[room].Parsed)
        this.CreateResourceSites(room)
    
    var sortedSource = this.GetClosestResourceSites(room, position)
    
    var selectedSite = null
    for (var i in sortedSource)
    {
        if (this._Debugging)
        {
            console.log(" Site: " + sortedSource[i].site)
            console.log(" Distance: " + sortedSource[i].distance)
            console.log(" Id: " + sortedSource[i].id)
            console.log(" AssignedWorkers: " + sortedSource[i].site.AssignedWorkers.length)
            console.log(" WorkingPositions: " + sortedSource[i].site.WorkingPositions)
            console.log(" MaximumWorkingCapacity: " + sortedSource[i].site.MaximumWorkingCapacity)
            console.log(" CurrentWorkingCapacity: " + sortedSource[i].site.CurrentWorkingCapacity)
        }
        
        if (sortedSource[i].site.CurrentWorkingCapacity < sortedSource[i].site.MaximumWorkingCapacity &&
            sortedSource[i].site.AssignedWorkers.length < sortedSource[i].site.WorkingPositions)
        {
            selectedSite = sortedSource[i].id
            break
        }
    }
    
    if (selectedSite == null)
    {
        console.log("Could not find a resource site to work [" + room + "]")
        return null    
    }
    else
    {
        return selectedSite
    }
}

ResourceAssigner.AssignCreepToSite = function(room, creepHarvester, miningSiteId)
{
    if (this._Debugging)
        console.log(" ResourceAssigner.AssignCreepToSite, creepHarvester: " + creepHarvester + ", miningSiteId: " + miningSiteId)
    
    if (!Memory.ResourceSites || !Memory.ResourceSites[room] || !Memory.ResourceSites[room].Parsed)
        this.CreateResourceSites(room)
        
    var roomSites = Memory.ResourceSites[room]
    var miningSite = roomSites.Sites[miningSiteId]

    miningSite.AssignedWorkers.push(creepHarvester)
    
    miningSite.CurrentWorkingCapacity = this.GetCurrentMiningCapacity(miningSite)
}

ResourceAssigner.UnassignCreepToSite = function(room, creep, miningSiteId)
{
    if (this._Debugging)
        console.log(" ResourceAssigner.UnassignCreepToSite, creep: " + creep + ", miningSiteId: " + miningSiteId)
    
    var roomSites = Memory.ResourceSites[room]
    var miningSite = roomSites.Sites[miningSiteId]

    var index = miningSite.AssignedWorkers.indexOf(creep)
    miningSite.AssignedWorkers.splice(index, 1)

    miningSite.CurrentWorkingCapacity = this.GetCurrentMiningCapacity(miningSite)
}

ResourceAssigner.GetCurrentMiningCapacity = function(miningSite)
{
    var total = 0
    
    for (var i in miningSite.AssignedWorkers)
    {
        var worker = miningSite.AssignedWorkers[i]
        for (var j in worker.body)
        {
            var part = worker.body[j]
            if (part.type == WORK)
                total += HARVEST_POWER
        }
    }
    
    if (total > 0)
        total = (total * ENERGY_REGEN_TIME) / SOURCE_ENERGY_CAPACITY
   
    return total
}

ResourceAssigner.UpdateCreeps = function(room)
{
    if (!Memory.ResourceSites || !Memory.ResourceSites[room])
        return 
        
    if (this._Debugging)
        console.log(" ResourceAssigner.UpdateCreeps")
        
    for (var resSiteRoom in Memory.ResourceSites[room].Sites)
    {
        var site = Memory.ResourceSites[room].Sites[resSiteRoom]
        for (var i in site.AssignedWorkers)
        {
            for (var j in site.AssignedWorkers)
            {
                var worker = site.AssignedWorkers[j]
                
                if (!Game.creeps[worker.name])
                    this.UnassignCreepToSite(room, worker.id, site.id)
            }
        }
    }
}

ResourceAssigner.GetClosestResourceSites = function(room, position)
{
    var sortedSources = []
    
    for (var id in Memory.ResourceSites[room].Sites)
    {
        var site = Memory.ResourceSites[room].Sites[id]
        var source = Memory.ParsedRooms[room].Sources[id]
        var distance = position.getRangeTo(new RoomPosition(source.SourcePos.x, source.SourcePos.y, source.SourcePos.roomName))
        sortedSources.push({site: site, distance: distance, id: source.id})
    }
  
    sortedSources.sort(function (a, b) 
    {
        if (a.distance > b.distance) 
        {
            return 1;
        }
        if (a.distance < b.distance) 
        {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    
    return sortedSources
}

ResourceAssigner.CreateResourceSites = function(room)
{
    if (!Memory.ResourceSites)
    {
        Memory.ResourceSites = {}
    }
    Memory.ResourceSites[room] = {}
    Memory.ResourceSites[room].Sites = {}
    
    var roomSources = Memory.ParsedRooms[room].Sources
    
    for (var hash in roomSources)
    {
        var source = roomSources[hash]

        Memory.ResourceSites[room].Sites[source.id] = 
        {
            id: source.id,
            AssignedWorkers: [],
            WorkingPositions: source.HarvesterPositions.length,
            MaximumWorkingCapacity: 1.0,
            CurrentWorkingCapacity: 0,
        }
    }
    Memory.ResourceSites[room].Parsed = true
}

ResourceAssigner.SerializedData = function()
{
    var data = {}
    return data
}

ResourceAssigner.DeserializedData = function(data)
{

}

module.exports = ResourceAssigner;