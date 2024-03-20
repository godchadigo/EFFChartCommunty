# EFFChart Weintek NC XY高速圖表

### 請先閱讀
1. 此圖表本身只包含*xy LineChart*功能，EFFChart是基於[*Ashwani Tyagi*](https://www.c-sharpcorner.com/members/ashwani-tyagi)的[Canvas LineChart](https://www.c-sharpcorner.com/UploadFile/18ddf7/html5-line-graph-using-canvas/)移植的，開原版本只開放移植的原始碼以及過程。
2. 支援CMT全系列，不支援MT系列。
### 開發原因
由於工作需求，客戶要求我在人機上添加xy LineChart功能用於顯示nc加工路徑，並且還要能夠顯示刀子當前位置，單純的我最初使用人機內建的xy曲線圖，做是做出來了，但發現加上一個一定的小點不太好處理，如果都是在第一象限那很簡單，就是利用移動物件加上比例算換，然後人機獲取座標做轉換顯示到畫面上，但是呢! 如果要全部象限都要很順暢地顯示呢就會變得稍加複雜，這部分不是本文探討重點，有興趣可以加入[*台灣自動化交流群Line*](https://line.me/ti/g2/Hj9P6TXw7oQUBFyc7hMmkc4QCv7VZ_mGyXutPQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default)**Tag我(小黃)**，於是呢要能夠保證準確度以及開發不太複雜，我直接用上了[ChartJS](https://www.chartjs.org/)這也是最有效率省時的開發方法，但是呢就遇到了一個致命的問題ChartJS在每次更新都會調用clearRect()然後重新繪製，這導致在本來就效能不足的嵌入式平台負荷了過多的刷新效能，導致畫面卡頓刷新起來根本不能看，會被客戶打槍的那種，既然套件不行，於是呢我就直接創造一個圖表，所以EFFChart就誕生了。
### 介紹
1. EFFChart用於xy LineChart上，可以在Weintek人機上高速刷新座標點。但是此版本僅試用於專業版。至於為甚麼呢，因為他就是本套件的know how @_@
2. 雖然不放上來，不過我還是可以說說原理的，其實就是在創建一個canvas疊在上面。如果動手能力強的就可以自己實現了，不過專業版已經實現這些功能，如果是應付專案的話可以直接考慮專業板呦^^

#### 移植原理
1. 去原作者那把文章看完。
2. 準備一個編輯器。
3. 把canvasId置換成canvas，後期我們直接丟入Canvas物件即可。
4. 在威綸的JS物件中開始編輯，照我的方法編輯即可:
```javascript

//創建畫布
var canvas1 = new Canvas();
this.widget.add(canvas1);
//設定圖表配置
var conf = {
    canvas: canvas1,  //<---這個地方改成威倫創建的canvas物件。
    minX: 0,  
    minY: 0,  
    maxX: 140,  
    maxY: 100,  
    unitsPerTickX: 10,  
    unitsPerTickY: 10  
};
//實力化圖表
var _chart = new LineChart(conf);
//Fake Data 假數據
var data = [{  
    x: 0,  
    y: 0  
}, {  
    x: 20,  
    y: 10  
}, {  
    x: 40,  
    y: 15  
}, {  
    x: 60,  
    y: 40  
}, {  
    x: 80,  
    y: 60  
}, {  
    x: 100,  
    y: 50  
}, {  
    x: 120,  
    y: 85  
}, {  
    x: 140,  
    y: 100  
}];  
//繪製一段線條   
_chart.drawLine(data, "blue", 3);  
```
#### 範例下載
- 範例已經在github上，直接下載即可。
#### 範例影片
[電腦模擬畫面](https://www.youtube.com/watch?v=aDhAljWH8c4)
[ChartJS會卡的範例](https://www.youtube.com/shorts/hpHIM0aRDxE)
[EFFChart範例](https://www.youtube.com/shorts/bCXjcD4fKfw)
#### 範例照片
![Photo/社群板.png]
![Photo/專業板.png]
#### Communty(社群版)
- 移植原理
- 威倫範例
- 開源板套件(封裝好的js文件)
- XY Lable文字大小
- X軸Label顏色
- X軸Tick顏色
- Y軸Label顏色
- Y軸Tick顏色
### 社群版使用範例
```javascript
// Require EFFChartCommuntiy.js 引入套件庫
const chartLib = require('./EFFChartCommuntiy.js');
//把威倫的this.config放置全局變數
const _config = this.config;
//創建畫布
var canvas1 = new Canvas();
this.widget.add(canvas1);
//實例畫圖表

var _chart = new chartLib.EFFChart(
    {
        canvas:canvas1,             //Canvas物件
        minX:-5,                    //最小x
        minY:-2,                    //最小y
        maxX:20,                    //最大x
        maxY:2,                     //最大y
        xLableColor: "black",       //x軸標線顏色
        xLableFontColor: "red",     //x軸標籤文字顏色
        yLableColor: "green",       //y軸標線顏色
        yLableFontColor: "orange",  //y軸標籤文字顏色
        unitsPerTickX:1,            //x劃分等分
        unitsPerTickY:1,            //y劃分等分
        reverseX:false,             //反轉x軸象限
        reverseY:false,             //反轉y軸象限
        pointRadius:0,              //關節點小圓點半徑
        labelFontSize:"10px",       //整體文字大小
    });
// Init Chart 初始化圖表
_chart.init();
// Fake data 假數據
var data1 = [{ x: 0, y: 0 }, { x: 2.0, y: 1.0 },{ x: 3.0, y: -1.3 } /* ...More data... */ ];
var data2 = [{ x: 2.0, y: 1.5 }, { x: 4.0, y: 1.3 }, /* ...More data... */ ];
//新增線條
_chart.addLine(data1, "blue", 3);
_chart.addLine(data2, "red", 3);
```
***
#### Pro(專業版)
- 移植原理 + 刷新小球原理
- 威倫範例
- 一點動態刷新的小球(如需多組需要客製化，另外討論)
- XY Lable文字大小
- X軸Label顏色
- X軸Tick顏色
- Y軸Label顏色
- Y軸Tick顏色
- X軸副網格
- Y軸副網格
- 自由背景顏色
- 可任意座標繪製文字
- 更新最新版本第一時間使用
### 專業版使用範例
- 專業板還有更多參數，後續慢慢更新，例如副網格顏色，繪製文字，繪製背景等等。
```javascript
// Require chart.js
const chartLib = require('./XChart.js');
const _config = this.config;

//創建畫布
var canvas1 = new Canvas();
var canvas2 = new Canvas();
this.widget.add(canvas1);
this.widget.add(canvas2);

var _chart;
_chart = new chartLib.XChart(
    {
        canvas:canvas1,             //Canvas物件
        minX:-5,                    //最小x
        minY:-2,                    //最小y
        maxX:20,                    //最大x
        maxY:2,                     //最大y
        xLableColor: "black",       //x軸標線顏色
        xLableFontColor: "red",     //x軸標籤文字顏色
        yLableColor: "green",       //y軸標線顏色
        yLableFontColor: "orange",  //y軸標籤文字顏色
        unitsPerTickX:1,            //x劃分等分
        unitsPerTickY:1,            //y劃分等分
        reverseX:false,             //反轉x軸象限
        reverseY:false,             //反轉y軸象限
        pointRadius:0,              //關節點小圓點半徑
        labelFontSize:"10px",       //整體文字大小
    });
// 初始化圖表
_chart.init();

// 繪製線條
var data1 = [{ x: 0, y: 0 }, { x: 2.0, y: 1.0 },{ x: 3.0, y: -1.3 } /* ...More data... */ ];
var data2 = [{ x: 2.0, y: 1.5 }, { x: 4.0, y: 1.3 }, /* ...More data... */ ];
//繪製線條1
_chart.addLine(data1, "blue", 3);
//繪製線條2
_chart.addLine(data2, "red", 3);
//繪製文字
_chart.drawText(5,0,"Hello World!");
//繪製移動點
chartLib.drawMovingPoint(canvas2,0,0);
```
***
