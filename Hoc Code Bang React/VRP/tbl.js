let tablize = {
    importData(db, ids) {
        this.db = db
        this.ids = ids
    },
    createInfoTable() {
        let tbl = document.createElement("table")
        let thead = document.createElement("thead")
        let tbody = document.createElement("tbody")
        let hdr = document.createElement("tr")
        let stt = document.createElement("th")
        let id = document.createElement("th")
        let ten = document.createElement("th")
        let lat = document.createElement("th")
        let long = document.createElement("th")
        let kl = document.createElement("th")
        let tg = document.createElement("th")
        let gio = document.createElement("th")
        let caption = document.createElement("caption")


        caption.innerHTML = "<span>Bảng 1</span>: Bảng Thông Tin Đặt Hàng"
        stt.innerHTML = "STT"
        id.innerHTML = "ID"
        ten.innerHTML = "Tên"
        lat.innerHTML = "Vĩ độ"
        long.innerHTML = "Kinh độ"
        kl.innerHTML = "Khối lượng (kg)"
        tg.innerHTML = "TG lắp đặt (h)"
        gio.innerHTML = "Giờ có thể nhận"

        hdr.appendChild(stt)
        hdr.appendChild(id)
        hdr.appendChild(ten)
        hdr.appendChild(lat)
        hdr.appendChild(long)
        hdr.appendChild(kl)
        hdr.appendChild(tg)
        hdr.appendChild(gio)
        tbl.appendChild(caption)
        thead.appendChild(hdr)
        tbl.appendChild(thead)
        tbl.appendChild(tbody)

        return {
            table: tbl,
            tbody: tbody
        }
    },
    toInfoDataOnTable(db, ids) {
        return ids
            .map(function (x, i) {
                let r = {}
                r.stt = i
                r.id = x.id
                r.ten = x.name
                r.kinhDo = db[i].order.lat
                r.viDo = db[i].order.long
                r.khoiLuong = db[i].order.weight
                r.thoiGianLapDat = db[i].order.ServiceTime
                    .toFixed(1)
                r.khungGioNhanHang = db[i].order.timeWindow
                    .map(x => x.toFixed(1))
                    .map(x => x + "h")
                    .join(" - ")
                return r
            })
            .filter(x => x.stt != 0)
            .map(function (x, i) {
                let tr = document.createElement("tr")
                let tdSTT = document.createElement("td")
                let tdTen = document.createElement('td')
                let tdID = document.createElement("td")
                let tdKD = document.createElement("td")
                let tdVD = document.createElement("td")
                let tdKL = document.createElement("td")
                let tdSV = document.createElement("td")
                let tdKG = document.createElement("td")
                //
                tdSTT.innerHTML = x.stt
                tdID.innerHTML = x.id
                tdTen.innerHTML = x.ten
                tdKD.innerHTML = x.kinhDo
                tdVD.innerHTML = x.viDo
                tdKL.innerHTML = x.khoiLuong
                tdSV.innerHTML = x.thoiGianLapDat
                tdKG.innerHTML = x.khungGioNhanHang
                //
                tr.appendChild(tdSTT)
                tr.appendChild(tdID)
                tr.appendChild(tdTen)
                tr.appendChild(tdKD)
                tr.appendChild(tdVD)
                tr.appendChild(tdKL)
                tr.appendChild(tdSV)
                tr.appendChild(tdKG)

                return tr
            })
    },
    toTravelTable(db, ids) {
        return db.map(function (x, i) {

            let tr = document.createElement("tr")
            let thTen = document.createElement("th")
            let tdThoiGianDiChuyens = x.timetravels.map(function (y, j) {
                let td = document.createElement("td")
                if(i==j)
                {
                    td.className = "cross"
                }
                td.innerHTML = (y * 60).toFixed(0)
                return td
            })

            //
            if (i == 0)
                thTen.innerHTML = 'Kho'
            else
                thTen.innerHTML = ids[i].name
            //
            tr.appendChild(thTen)
            tdThoiGianDiChuyens.forEach(td => tr.appendChild(td))

            return tr
        })
    },
    createTimeTable(db) {
        let tbl = document.createElement("table")
        let cap = document.createElement("caption")
        let hdr = document.createElement("tr")
        let thead = document.createElement("thead")
        let tbody = document.createElement("tbody")
        let rHdr = document.createElement("th")

        //
        cap.innerHTML='<span>Bảng 2 (bắt buộc)</span>: Bảng Ma Trận Thời Gian Di Chuyển Điểm - Điểm'
        rHdr.innerHTML = "Tên Khách/Kho"
        let ths = db.map(function (x, i) {
            let th = document.createElement("th")
            if (i == 0)
                th.innerHTML = "Kho"
            else
                th.innerHTML = ids[i].name
            return th
        })
        //
        hdr.appendChild(rHdr)
        ths.forEach(th => hdr.appendChild(th))
        thead.appendChild(hdr)
        tbl.appendChild(thead)
        tbl.appendChild(tbody)
        tbl.appendChild(cap)
        //
        return {
            table: tbl,
            tbody: tbody
        }
    }

}