/*排便の記録ができるAPIです。*/
const express = require("express")
const app = express()
app.use(express.json())
const dbfunc = require("./dbfunc")

//直近７回文の記録を取得
app.get("/haibenrecord/:username", (req, res) => {
    const username = req.params["username"]
    dbfunc.getRecords(username, (err, records) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else {
            res.json(records)
        }
    })
})

//ユーザー登録
app.post("/haibenrecord/register", (req, res) => {
    const username = req.body.name
    dbfunc.saveUser(username, (err) => {
        if (err !== null) {
            console.log(err)
            statusCode = 500
            res.json(err)
        } else {
            res.end()
        }
    })
})

//記録保存
app.post("/haibenrecord/:username", (req, res) => {
    const username = req.params["username"]
    dbfunc.saveRecord(username, (err) => {
        if (err !== null) {
            console.log(err)
            statusCode = 500
            res.json(err)
        } else {
            res.end()
        }
    })
})

//最新の記録を削除
app.delete("/haibenrecord/:username", (req, res) => {
    const username = req.params["username"]
    dbfunc.deleteRecord(username, (err) => {
        if (err !== null) {
            console.log(err)
            statusCode = 500
            res.json(err)
        } else {
            res.end()
        }
    })
})

app.listen(3000, () => {
    console.log("server start")
})
