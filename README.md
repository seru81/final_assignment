# HAIBEN record
HAIBEN recordは排便を記録することができるAPIです。
* ユーザー登録
    * `localhost:3000/haibenrecord/register`  にPOSTメソッドでリクエストを送ることでユーザーを登録します。
    * ボディにはnameでユーザーネームを指定します。
* 排便を記録
    * `localhost:3000/haibenrecord/:username` にPOSTメソッドでリクエストを送ることで排便した時間を記録できます。
* 記録を確認
    * `localhost:3000/haibenrecord/:username` にGETメソッドでリクエストを送ることで排便記録を取得できます。
* 記録の削除
    * `localhost:3000/haibenrecord/:username` にDELETEメソッドでリクエストを送ることで最新の排便記録を消去できます。