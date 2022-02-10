const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./haiben.db")

//現在時刻を取得する関数
const getPresentTime = () => {
    let time = new Date()
    time.setMonth(time.getMonth() + 1)
    const present = {
        year: time.getFullYear(),
        month: time.getMonth(),
        day: time.getDate(),
        hour: time.getHours(),
        minite: time.getMinutes()
    }
    return `${present.year}年${present.month}月${present.day}日${present.hour}時${present.minite}分`
}

//ユーザーネームからidを取得する関数
const getUserId = (username, callback) => {
    db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
        if (err !== null) {
            callback(err, undefined)
        } else if (row === undefined) {
            callback(null, undefined)
        } else {
            callback(null, row.id)
        }
    })
}

//直近の７回分の記録を取得する関数
exports.getRecords = (username, callback) => {
    db.serialize(() => {
        getUserId(username, (err1, userid) => {
            if (err1 !== null) {
                callback(err1, undefined)
            } else {
                db.all("SELECT * FROM haibenrecord WHERE userid = ? ORDER BY id DESC LIMIT 7", userid, (err2, rows) => {
                    if (err2 !== null) {
                        callback(err2, undefined)
                    } else {
                        const records = rows.map(row => {
                            return row.record
                        })
                        callback(null, records)
                    }
                })
            }
        })
    })
}

//ユーザー登録をする関数
exports.saveUser = (username, callback) => {
    db.serialize(() => {
        db.run("INSERT INTO users (username) VALUES (?)", username, (err) => {
            if (err !== null) {
                callback(err)
            } else {
                callback(null)
            }
        })
    })
}

//記録を保存する関数
exports.saveRecord = (username, callback) => {
    const presenttime = getPresentTime()
    db.serialize(() => {
        getUserId(username, (err1, userid) => {
            if (err1 !== null) {
                callback(err1)
            } else {
                db.run("INSERT INTO haibenrecord (userid, record) VALUES (?, ?)", userid, presenttime, (err2) => {
                    if (err2 !== null) {
                        callback(err2)
                    } else {
                        callback(null)
                    }
                })
            }
        })
    })
}

//一番最後に保存した記録を消去する関数
exports.deleteRecord = (username, callback) => {
    db.serialize(() => {
        getUserId(username, (err1, userid) => {
            if (err1 !== null) {
                callback(err1)
            } else {
                db.run("DELETE FROM haibenrecord WHERE id IN (SELECT max(id) from haibenrecord WHERE userid = ?)", userid, (err2) => {
                    if (err2 !== null) {
                        callback(err2)
                    } else {
                        callback(null)
                    }
                })
            }
        })
    })
}