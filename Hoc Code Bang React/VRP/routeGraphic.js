let grp = {
    pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
        var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
            darkColor : lightColor;
    },
    createTimeStartIcon()
    {
        let timeStartIcon = document.createElement("div")
        timeStartIcon.className ="arrive"
        let timeStartIconTruck = document.createElement("span")
        timeStartIconTruck.className="truck"
        timeStartIconTruck.innerHTML='<i class="fas fa-truck"></i>'
        let timeStartIconHome = document.createElement("span")
        timeStartIconHome.className="home"
        timeStartIconHome.innerHTML='<i class="fas fa-home"></i>'
        timeStartIcon.appendChild(timeStartIconTruck)
        timeStartIcon.appendChild(timeStartIconHome)
        return timeStartIcon
    },

    createTimeEndIcon()
    {
        let timeEndIcon = document.createElement("div")
        timeEndIcon.className ="leave"
        let timeEndIconTruck = document.createElement("div")
        timeEndIconTruck.className="truck"
        timeEndIconTruck.innerHTML='<i class="fas fa-truck"></i>'
        let timeEndIconHome = document.createElement("div")
        timeEndIconHome.className="home"
        timeEndIconHome.innerHTML='<i class="fas fa-home"></i>'
        timeEndIcon.appendChild(timeEndIconHome)
        timeEndIcon.appendChild(timeEndIconTruck)
        return timeEndIcon
    }
    ,
    createRoute() {
        let route = document.createElement("div")
        route.className = "route"
        return route
    },
    createDepot(depotData, depotColor, depotIsLast = 0) {
        let depot = document.createElement("div")
        depot.className = "depotWrapper"

        //depot name
        let depotName = document.createElement("div")
        depotName.className = "depotName"
        depotName.innerHTML = depotData.name

        //depot timeService
        let depotTimeService = document.createElement("div")
        depotTimeService.className = "depot"
        depotTimeService.innerHTML = "";
        depotTimeService.style.backgroundColor = depotColor;
        depotTimeService.style.color = this.pickTextColorBasedOnBgColorSimple(depotColor, "#fff", "#000")

        //depot StartTime
        let timeWrapper = document.createElement("div")
        timeWrapper.className = "timeWrapper"
        let timeText = document.createElement("div")
        timeText.className="meta-text"
        let timeNumber = document.createElement("div")
        let time = document.createElement("div")
        time.className = "time"
        if (depotIsLast == 0)
        {
            timeNumber.innerHTML = depotData.startTime.toFixed(1) + "h"
            timeText.innerHTML="Đi:"
        }
        else
        {
            timeNumber.innerHTML = depotData.endTime.toFixed(1) + "h"
            timeText.innerHTML="Về:"
        }
            
            //attach
        time.appendChild(timeText)
        time.appendChild(timeNumber)
        timeWrapper.appendChild(time)
        depot.appendChild(depotName)
        depot.appendChild(depotTimeService)
        depot.appendChild(timeWrapper)

        //
        return depot


    },
    createLink(linkData) {
        let link = document.createElement("div")
        link.className = 'link'

        //van
        let van = document.createElement("i")
        van.className = "fas fa-shuttle-van"

        //timeTravel
        let timeTravel = document.createElement("span")
        timeTravel.innerHTML = linkData.timeTravel.toFixed(1) + "h"

        //attach
        link.appendChild(van)
        link.appendChild(timeTravel)

        //
        return link
    },
    createCustomer(cusData, cusColor) {
        let customer = document.createElement("div")
        customer.className = "customerWrapper"

        //depot name
        let cusName = document.createElement("div")
        cusName.className = "cusName"
        cusName.innerHTML = cusData.name

        //depot timeService
        let cusTimeService = document.createElement("div")
        cusTimeService.className = "cus"
        cusTimeService.innerHTML = cusData.serviceTime.toFixed(1) + "h"
        cusTimeService.style.backgroundColor = cusColor;
        cusTimeService.style.color = this.pickTextColorBasedOnBgColorSimple(cusColor, "#fff", "#000")

        //depot StartTime
        let timeWrapper = document.createElement("div")
        timeWrapper.className = "timeWrapper"
        
        let timeStart = document.createElement("div")
        let timeStartNumber = document.createElement("div")
        let timeStartText = document.createElement("div")
        let timeStartIcon = this.createTimeStartIcon()        
        timeStart.className = "time"
        timeStartNumber.innerHTML = cusData.startTime.toFixed(1) + "h"
        timeStartText.className="meta-text"
        timeStartText.innerHTML = "Đến:"
        //depot EndTime

        let timeEnd = document.createElement("div")
        let timeEndNumber = document.createElement("div")
        let timeEndText = document.createElement("div")
        let timeEndIcon = this.createTimeEndIcon()
        timeEnd.className = "time"
        timeEndNumber.innerHTML = cusData.endTime.toFixed(1) + "h"
        timeEndText.className="meta-text"
        timeEndText.innerHTML ="Đi:"

        //attach
        timeStart.appendChild(timeStartText)
        timeStart.appendChild(timeStartIcon)
        timeStart.appendChild(timeStartNumber)
        timeWrapper.appendChild(timeStart)

        timeEnd.appendChild(timeEndText)
        timeEnd.appendChild(timeEndIcon)
        timeEnd.appendChild(timeEndNumber)
        timeWrapper.appendChild(timeEnd)

        customer.appendChild(cusName)
        customer.appendChild(cusTimeService)
        customer.appendChild(timeWrapper)

        //
        return customer
    },
    createRouteName(routeData) {
        let routeName = document.createElement("div")
        routeName.className = "routeName"
        routeName.innerHTML = routeData.name
        return routeName
    },
    importGraphic(tblDiv) {
        this.tbl = tblDiv
    },
    importColors(clrs) {
        this.colors = clrs
    },
    importData(ids, db, routes, routific) {
        this.ids = ids
        this.db = db
        this.routes = routes
        this.routific = routific
    },
    getGraphicData() {
        let colors = this.colors
        let ids = this.ids
        let db = this.db
        let routific = this.routific
        let routes = this.routes
        let graphic = {}

        // tao cac diem
        graphic.routeNodess =
            routes.map(
                function(route, j) {
                    return route
                        .map(function(x, i) {
                            if (i == 0)
                                return {
                                    depotData: {
                                        name: ids[0].name,
                                        startTime: routific[j][0].startTime,
                                        endTime: routific[j][0].endTime
                                    },
                                    depotColor: colors[1],
                                    depotIsLast: 0
                                }
                            else if (i == route.length - 1) {
                                return {
                                    depotData: {
                                        name: ids[0].name,
                                        startTime: routific[j][0].startTime,
                                        endTime: routific[j][0].endTime
                                    },
                                    depotColor: colors[1],
                                    depotIsLast: 1
                                }
                            } else {
                                return {
                                    cusData: {
                                        name: ids[x].name,
                                        serviceTime: db[x].order.ServiceTime,
                                        startTime: routific[j][i].startTime,
                                        endTime: routific[j][i].endTime
                                    },
                                    cusColor: colors[j + 2]
                                }
                            }
                        })
                }
            )


        // tao cac link
        graphic.linkss = routes.map(
            function(route, j) {
                return route
                    .map(
                        function(node, i) {
                            if (i == route.length - 1)
                                return {
                                    linkData: {
                                        timeTravel: -1
                                    }
                                }
                            return {
                                linkData: {
                                    timeTravel: db[node].timetravels[route[i + 1]]
                                }
                            }
                        }
                    )
                    .filter(link => link.linkData.timeTravel != -1)
            })

        //tao route name
        graphic.routeNames = routes.map(function(route, i) {

            let totalWeight = route.filter(x => x != 0)
                .map(x => grp.db[x].order.weight)
                .reduce((a, b) => a + b)

            return {
                name: "Tuyến " + (i + 1) + ": " + totalWeight + "(kg)"
            }
        })

        //
        console.log(graphic)
        return graphic

    },
    drawRoute(index) {
        let routeDatas = this.getGraphicData()
        console.log(routeDatas)

        //graphicize
        let routeGrp = grp.createRoute()
        let routeNameGrp = grp.createRouteName(routeDatas.routeNames[index])
        let depotGrpBegin = grp.createDepot(
            routeDatas.routeNodess[index][0].depotData,
            routeDatas.routeNodess[index][0].depotColor
        )
        let depotGrpEnd = grp.createDepot(
            routeDatas.routeNodess[index][0].depotData,
            routeDatas.routeNodess[index][0].depotColor,
            1)

        let cusGrps = []
        for (let i = 1; i < routeDatas.routeNodess[index].length - 1; i++) {
            let cusGrp = grp.createCustomer(
                routeDatas.routeNodess[index][i].cusData,
                routeDatas.routeNodess[index][i].cusColor)

            cusGrps.push(cusGrp)
        }

        let linkGrps = []
        for (let i = 0; i < routeDatas.linkss[index].length; i++) {
            let linkGrp = grp.createLink(routeDatas.linkss[index][i].linkData)
            linkGrps.push(linkGrp)
        }

        // append
        routeGrp.appendChild(routeNameGrp)
        routeGrp.appendChild(depotGrpBegin)

        cusGrps.forEach(function(g, i) {
            routeGrp.appendChild(linkGrps[i])
            routeGrp.appendChild(g)
                //if(i < cusGrps.length - 1)

        })
        routeGrp.appendChild(linkGrps[linkGrps.length - 1])
        routeGrp.appendChild(depotGrpEnd)
        this.tbl.appendChild(routeGrp)

    },



}