let vrp = {
    routes : [],
    import : function(ids, db)
    {
        this.ids = ids;
        this.db = db;
    },
    importDb(db)
    {
        this.db = db
    },
    importStartTime(startTime)
    {
        this.startTime = startTime;
    },
    importFleet(fleets)
    {
        this.cars = cars;
        this.bikes = bikes;
    },
    importCars(cars)
    {
        this.cars = cars
    },
    createNewRoute : function(){
        let route = [0,0]
        this.routes.push(route);
    },
    getRoutes: function()
    {
        return this.routes.filter(r => r.length > 2)
    },
    insertNode: function(route, node)
    {
        route.shift()
        route.unshift(node)
        route.unshift(0)
    },
    isRouteEmty : function(route)
    {
        if(route.length < 3)
            return true
        return false
    },
    getTravelTime: function(startNode, endNode)
    {
        let timetravels = this.db.map(x => x.timetravels)
        return timetravels[startNode][endNode]
    },
    getDistances()
    {
        let distances = this.db.map(x=> x.distances)
        return distances
    },
    getServiceTimes(){
        return this.db.map(x => x.order.ServiceTime) 
    },
    getSortedTravelTimes: function(startNode)
    {
        let timetravels = this.db.map(x => x.timetravels)
        let unSortedTimeTravels = timetravels[startNode].map(function(x,i){
            return[[startNode,i],x];
        })

        let sortedTimeTravels = unSortedTimeTravels .map(x=>x)
                                                    .sort((a, b) =>{
                                                        if(a[1] == b[1])
                                                            return 0
                                                        if(a[1] < b[1])
                                                            return -1
                                                        return 1
                                                    })
        return sortedTimeTravels.filter(x => x[0][0]!=x[0][1])

    },
    getSortedTravelTimesOnEndNodes: function(endNode)
    {
        let timetravels = this.db.map(x => x.timetravels)
        let unSortedTimeTravels = timetravels.map(tt => tt[endNode])
                                            .map(function(x,i){
                                                return [[i,endNode],x]
                                            })
        let sortedTimeTravels = unSortedTimeTravels.map(x=>x)
                                                    .sort((a, b) =>{
                                                        if(a[1] == b[1])
                                                            return 0
                                                        if(a[1] < b[1])
                                                            return -1
                                                        return 1
                                                    })
        return sortedTimeTravels.filter(x => x[0][0]!=x[0][1])
    },
    getServiceTime: function(node)
    {
        let serviceTimes = this.db.map(x => x.order.ServiceTime)
        return serviceTimes[node]
    },
    getTimeWindow: function(node)
    {
        let timeWindows = this.db.map(x => x.order.timeWindow)
        return timeWindows[node]
    },
    calculateTimeAfterServiced: function(startNode, endNode, timeStart)
    {
        let timeArrived = timeStart + 
                            this.getTravelTime(startNode, endNode); 
        //arrive early
        let timeToCallCus;
        if (timeArrived < this.getTimeWindow(endNode)[0])
            timeToCallCus = this.getTimeWindow(endNode)[0]
        else
            timeToCallCus = timeArrived

        return timeToCallCus+    
                this.getServiceTime(endNode)
    },
    isArrivedOnTime(node, arrivedTime)
    {
        let timeWindow = this.getTimeWindow(node)
        return arrivedTime < timeWindow[1]
    },
    isInCapacity : function(route)
    {
        let weights = this.db.filter(x => x!=db[0])
                        .map(x => x.order.weight)
        let routeTotalWeight = route.filter(x=> x!=0)
                                    .map(x => weights[x-1])
                                    .reduce((a,b) => a+b)
        return routeTotalWeight <= this.cars.capacity;

    },

    isRouteAchievable: function(route, startTime)
    {
        let sTime = startTime;
        for(let i = 0; i < route.length - 3; i++)
        {
            sTime = this.calculateTimeAfterServiced(route[i], route[i+1], sTime)
        }
        let timeArrivedLastNode = sTime + this.getTravelTime(route[route.length - 3], route[route.length - 2])
        return this.isArrivedOnTime(route[route.length - 2], timeArrivedLastNode) &&
                this.isInCapacity(route)
        //return false
    },
    isOKtoPut: function(route, node, startTime)
    {
        if(this.isRouteEmty(route))
            return true
        
        let copiedRoute = route.map(x=>x)
        this.insertNode(copiedRoute, node)

        return this.isRouteAchievable(copiedRoute,startTime)
    },

    createCustomers : function(numberOfCustomers)
    {
        let cus = []
        for(let i = 1; i < numberOfCustomers; i++)
        {
            cus.push(i)
        }
        return cus
    },
    find : function()
    {
        let cus = this.createCustomers(this.ids.length)
        while(cus.length > 0)
        {
            if(this.routes.length == 0)
                this.createNewRoute();

            let latestRoute = this.routes[this.routes.length - 1]
            let sortedTimeTravels = this.getSortedTravelTimesOnEndNodes(latestRoute[0])
                                        .filter(x => cus.includes(x[0][0]))
                                        
            
            while(cus.length > 0 && sortedTimeTravels.length > 0)
            {
                if(this.isOKtoPut(latestRoute, sortedTimeTravels[0][0][0],this.startTime))
                {
                    this.insertNode(latestRoute,sortedTimeTravels[0][0][0])
                    cus = cus.filter(x => x!= sortedTimeTravels[0][0][0])
                }
                sortedTimeTravels.shift()
                 
            }
            this.createNewRoute()
        }
    },
    getTotalDistances(){
        let routes = vrp.getRoutes()
        let totalDistance = routes.map(function(r,i){
            let distances = r.map(function(node, ii){
                if(ii == r.length - 1)
                    return 0;
                
                let dis = vrp.getDistances()
                return dis[node][r[ii+1]]
            })
            return distances.reduce((a,b)=> a+b)
        })
        .reduce((a,b)=> a+b)
        return totalDistance
    }
  }