/*
FileReader共有4種讀取方法：
1.readAsArrayBuffer(file)：將檔案讀取為ArrayBuffer。
2.readAsBinaryString(file)：將檔案讀取為二進位制字串
3.readAsDataURL(file)：將檔案讀取為Data URL
4.readAsText(file, [encoding])：將檔案讀取為文字，encoding預設值為'UTF-8'*/

var wb; //讀取完成的資料
var jsonObj; // input xlsx 的 json 檔

function importf(obj) { //匯入
    if (!obj.files) {
        return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        wb = XLSX.read(data, {
            type: 'binary'
        })

        //wb.SheetNames[0]是獲取Sheets中第一個Sheet的名字
        //wb.Sheets[Sheet名]獲取第一個Sheet的資料
        jsonObj = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        //console.log(jsonObj);
        //console.log(jsonObj.length);
        //console.log(Object.keys(jsonObj[0]).length);
    };

    reader.readAsBinaryString(f);
}