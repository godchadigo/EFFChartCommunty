# EFFChart Weintek NC XY高速圖表

### 請先閱讀
此圖表本身只包含*xy LineChart*功能，EFFChart是基於[*Ashwani Tyagi*](https://www.c-sharpcorner.com/members/ashwani-tyagi)的[Canvas LineChart](https://www.c-sharpcorner.com/UploadFile/18ddf7/html5-line-graph-using-canvas/)移植的，開原版本只開放移植的原始碼以及過程。
### 開發原因
由於工作需求，客戶要求我在人機上添加xy LineChart功能用於顯示nc加工路徑，並且還要能夠顯示刀子當前位置，單純的我最初使用人機內建的xy曲線圖，做是做出來了，但發現加上一個一定的小點不太好處理，如果都是在第一象限那很簡單，就是利用移動物件加上比例算換，然後人機獲取座標做轉換顯示到畫面上，但是呢! 如果要全部象限都要很順暢地顯示呢就會變得稍加複雜，這部分不是本文探討重點，有興趣可以加入[*台灣自動化交流群*]()Tag我(小黃)，於是呢要能夠保證準確度以及開發不太複雜，我直接用上了[ChartJS](https://www.chartjs.org/)這也是最有效率省時的開發方法，但是呢就遇到了一個致命的問題ChartJS在每次更新都會調用clearRect()然後重新繪製，這導致在本來就效能不足的嵌入式平台負荷了過多的刷新效能，導致畫面卡頓刷新起來根本不能看，會被客戶打槍的那種，既然套件不行，於是呢我就直接創造一個圖表，所以EFFChart就誕生了。
### 介紹
EFFChart用於xy LineChart上，可以在Weintek人機上高速刷新座標點。但是此版本僅試用於專業版。至於為甚麼呢，因為他就是本套件的know how @_@

#### 範例影片

#### Communty(社群版)
- 移植原理
- 威倫範例
- 開源板套件(封裝好的js文件)
- XY Lable文字大小
- X軸Label顏色
- X軸Tick顏色
- Y軸Label顏色
- Y軸Tick顏色
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
***
