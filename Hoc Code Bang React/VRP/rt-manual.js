let manual = {

    // drivers gom cac thuoc tinh id, ten, so chuyen trong thang, so chuyen trong ngay - viet bang tieng anh
    //mode = 0 thì là theo phần trăm, số khác tượng trưng cho pixel mẫu của 1 h 
    setGraphicMode(mode = 0) {
        this.mode = mode
    },
    prepare() {
        this.zoom_time = 4
    },
    importData(vehicles, drivers, ids, db, routes, routific = []) {
        this.vehicles = vehicles
        this.drivers = drivers
        this.ids = ids
        this.db = db
        this.routes = routes
        this.routific = routific
    },
    importColors(clrs) {
        this.colors = clrs
    },
    importGraphic(tblDiv) {
        this.tbl = tblDiv
    },
    getTextColor(colorInHTML) {

    },
    getTimeText(hour) {
        let minute = Math.floor((hour - Math.floor(hour)) * 60)
        if (hour < 1)
            return minute + "'";
        if (minute < 1)
            return Math.floor(hour) + "h"
        return Math.floor(hour) + "h" + minute + "'"

    },

    createDriver(driver) {
        let dr = document.createElement("div")
        let dr_name = document.createElement("div")
        let dr_total_drive_month = document.createElement("div")
        let dr_total_drive_day = document.createElement("div")

        dr.className = "dr-container"
        dr_name.className = "dr-name"
        dr_total_drive_month.className = "dr-total-route"
        dr_total_drive_day.className = "dr-today-route"

        dr_name.innerHTML = driver.name
        dr_total_drive_month.innerHTML = driver.total_inMonth
        dr_total_drive_day.innerHTML = driver.total_inDay

        dr.appendChild(dr_name)
        dr.appendChild(dr_total_drive_month)
        dr.appendChild(dr_total_drive_day)

        return dr
    },
    createDepot() {
        let rt_depot = document.createElement("div")
        let rt_depot_icon = document.createElement("i")

        rt_depot.className = "rt-depot"
        rt_depot_icon.className = "fas fa-warehouse"

        rt_depot.appendChild(rt_depot_icon)

        return rt_depot
    },
    createCustomer(index) {
        let rt_cus = document.createElement("div")
        let rt_cus_name = document.createElement("div")

        rt_cus.className = "rt-cus"
        rt_cus_name.className = "rt-cus-name"

        let service_time = this.db[index].order.ServiceTime
        rt_cus_name.innerHTML = this.ids[index].name

        if (this.mode == 0)
            rt_cus.style.width = (service_time * 100 / this.zoom_time) + "%"
        else
            rt_cus.style.width = service_time * this.mode + "px";

        let tempCusWidth = rt_cus.style.width
        if (tempCusWidth.replace("px", "") < 50) {
            rt_cus.classList.add("rt-cus-mini")
        }

        rt_cus.appendChild(rt_cus_name)
        return rt_cus
    },
    createLink(indexStartPoint, indexEndPoint) {
        let rt_link = document.createElement("div")
        rt_link.className = "rt-link"
        let rt_shiptime = document.createElement("div")
        rt_shiptime.className = "rt-shiptime"
        let rt_line = document.createElement("div")
        rt_line.className = "rt-line"

        let timeTravel = this.db[indexStartPoint].timetravels[indexEndPoint]
        let timeText = this.getTimeText(timeTravel)
        rt_shiptime.innerHTML = timeText
        if (this.mode == 0)
            rt_link.style.width = (timeTravel * 100 / this.zoom_time) + "%"
        else {
            rt_link.style.width = (timeTravel * this.mode / 1) + "px"
            if (timeTravel * this.mode < 10) {
                rt_link.classList.add("rt-link-mini")
            }
        }


        rt_link.appendChild(rt_shiptime)
        rt_link.appendChild(rt_line)

        return rt_link
    },
    createCapacityMeasure(routeIndex) {
        let capacity_container = document.createElement("div")
        capacity_container.className = "capacity-container"
        let capacity_percentage = document.createElement("div")
        capacity_percentage.className = "capacity-percentage"
        let capacity_percentage_present = document.createElement("div")
        capacity_percentage_present.className = "present"
        let capacity_percentage_expected = document.createElement("div")
        capacity_percentage_expected.className = "expected"
        let capacity_number = document.createElement("div")
        capacity_number.className = "capacity-number"
        let capacity_number_present = document.createElement("div")
        capacity_number_present.className = "present"
        let capacity_number_add = document.createElement("div")
        capacity_number_add.className = "add"

        let totalWeight = this.routes[routeIndex].filter(x => x != 0)
            .map(x => manual.db[x].order.weight)
            .reduce((a, b) => a + b)

        capacity_number_present.innerHTML =
            Math.floor(totalWeight * 100 / vehicles.weight_limit) + "%"
        capacity_percentage_present.style.width =
            capacity_number_present.innerHTML
        capacity_percentage_expected.style.width =
            capacity_percentage_present.style.width
        capacity_percentage_expected.style.display = "none"

        capacity_percentage.appendChild(capacity_percentage_present)
        capacity_percentage.appendChild(capacity_percentage_expected)
        capacity_number.appendChild(capacity_number_present)
        capacity_number.appendChild(capacity_number_add)
        capacity_container.appendChild(capacity_percentage)
        capacity_container.appendChild(capacity_number)

        return capacity_container
    },
    createRoute(routeIndex) {
        let routing_container = document.createElement("div")
        routing_container.className = "routing-container"
        let rt_container = document.createElement("div")
        rt_container.className = "rt-container"

        let dr = this.createDriver(this.drivers[routeIndex])
        let capacity_container = this.createCapacityMeasure(routeIndex)

        let rt_depot = this.createDepot()
        let rt_cuss = this.routes[routeIndex].filter(x => x != 0)
            .map(index => manual.createCustomer(index))
        let rt_links = this.routes[routeIndex].filter(function(x, i) {
            if (i == manual.routes[routeIndex].length - 1)
                return false
            return true
        }).map(function(x, i) {
            if (i == manual.routes[routeIndex] - 2)
                return -1;
            return manual.createLink(x, manual.routes[routeIndex][i + 1])
        }).filter(x => x != -1)

        rt_container.appendChild(rt_depot)
        rt_links.forEach(function(rt_link, i) {
            rt_container.appendChild(rt_link)
            if (i < rt_cuss.length)
                rt_container.appendChild(rt_cuss[i])
        })
        routing_container.appendChild(dr)
        routing_container.appendChild(capacity_container)
        routing_container.appendChild(rt_container)

        return routing_container

    }









}