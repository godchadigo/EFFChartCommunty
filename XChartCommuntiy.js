// script2.js
module.exports = (function() {
    var canvas1;    
    var minX = 0;
    var minY = 0;        
    var paddingLastX = 0;
    var paddingLastY = 0;    
    var Env = 1;
    // XChart 的定義
    function XChart(con) {
        // 构造函数的实现
        minX = con.minX;
        // user defined properties  	
        this.canvas = con.canvas;
        this.minX = con.minX;  
        this.minY = con.minY;  
        this.maxX = con.maxX;  
        this.maxY = con.maxY;  
        this.reverseX = con.reverseX;
        this.reverseY = con.reverseY;
        this.pointRadius = con.pointRadius;
        this.unitsPerTickX = con.unitsPerTickX;  
        this.unitsPerTickY = con.unitsPerTickY;  
        this.labelFontSize = con.labelFontSize || "12pt"; // Default font size if not specified
        this.xLableColor = con.xLableColor;                 //x標線顏色
        this.xLableFontColor = con.xLableFontColor;         //x標線文字顏色
        this.yLableColor = con.yLableColor;                 //y標線顏色
        this.yLableFontColor = con.yLableFontColor;         //y標線文字顏色
        // constants  
        this.padding = 10;  
        this.tickSize = 10;  
        this.axisColor = "#555";  
        //this.pointRadius = 5;  
        this.font = `${this.labelFontSize} Calibri`;  
    
        this.fontHeight = 12;
    
        // relationships       
        this.context = this.canvas.getContext("2d");  
        this.rangeX = this.maxX - this.minX;  
        this.rangeY = this.maxY - this.minY;  	
        this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX);  
        this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY);  
        console.log("ticksx1" , this.numXTicks);
        this.x = this.getLongestValueWidth() + this.padding * 2;  
        this.y = this.padding * 2;  
        this.width = this.canvas.width - this.x - this.padding * 2;  
        this.height = this.canvas.height - this.y - this.padding - this.fontHeight;  
        this.scaleX = this.width / this.rangeX;  
        this.scaleY = this.height / this.rangeY;  
    
        //Global
        minX = this.minX;
        minY = this.minY;
        scaleX = this.scaleX;
        scaleY = this.scaleY;
        reverseX = this.reverseX;
        reverseY = this.reverseY;
    
        console.log("thisx" , this.x);
        console.log("thisy" , this.y);
        console.log("scaleX" , this.scaleX);
        console.log("scaleY" , this.scaleY);
        // draw x y axis and tick marks  
    }

    XChart.prototype = 
    {
        getLongestValueWidth: function() {
            this.context.font = this.font;  
            var longestValueWidth = 0;  
            for (var n = 0; n <= this.numYTicks; n++) {  
                var value = this.maxY - (n * this.unitsPerTickY);  
                longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);  
            }  
            return longestValueWidth;  
        },
        drawXAxis: function(labelColor = "black" , labelFontColor = "black") {
            var context = this.context;  
            context.save();  
            context.beginPath();  
            context.moveTo(this.x, this.y + this.height);  
            context.lineTo(this.x + this.width, this.y + this.height);  
            context.strokeStyle = this.axisColor;  
            context.lineWidth = 2;  		
            context.stroke();  
    
            //第一點偏移量
            paddingFirstX =this.x;
            paddingLastX = Math.abs(this.minX -this.maxX) * this.width / this.numXTicks + this.x, this.y + this.height;
    
            console.log("padding last x" , paddingLastX);
            // draw tick marks  
            for (var n = 0; n < this.numXTicks; n++) {  
                context.strokeStyle = labelColor;//繪製顏色
                context.beginPath();  
                context.moveTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height);  
                context.lineTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height - this.tickSize);  
                context.stroke();  
                //console.log("ticksx" , (n + 1) * this.width / this.numXTicks + this.x);
                
            }  
    
            // draw labels  
            context.font = this.font;  
            context.fillStyle = "black";  
            context.textAlign = "center";  
            context.textBaseline = "middle";  
    
            for (var n = 0; n <= this.numXTicks; n++) {  
                //var label = Math.round((n + 1) * this.maxX / this.numXTicks);
    
                var label;
                if (this.reverseX)
                {
                    label = Math.round((this.maxX - n + 0) * Math.abs(this.minX - this.maxX) / this.numXTicks);  
                }else{
                    label = Math.round((this.minX + n + 0) * Math.abs(this.minX - this.maxX) / this.numXTicks);  
                }
                context.save();                  
                console.log("x color" , labelFontColor);
                context.translate((n + 0) * this.width / this.numXTicks + this.x, this.y + this.height + this.padding);  
                context.fillStyle = labelFontColor;//繪製文字顏色
                context.fillText(label, 0, 0);  
                context.restore();  
                //console.log("label" , label);
            }  
            context.restore(); 
        },
        drawYAxis: function(labelColor = "black" , labelFontColor = "black") {
            var context = this.context;  
            context.save();  
            context.save();  
            context.beginPath();  
            context.moveTo(this.x, this.y);  
            context.lineTo(this.x, this.y + this.height);  
            context.strokeStyle = this.axisColor;  
            context.lineWidth = 2;  
            context.font = this.font;
            context.stroke();  
            context.restore();  
            
            //y軸第一點偏移量
            paddingFirstY =this.y;		
            paddingLastY = Math.abs(this.minY-this.maxY) * scaleY;
            //paddingLastY = 150;
            console.log("padding y" ,paddingLastY);
            // draw tick marks  
            for (var n = 0; n < this.numYTicks; n++) {  
                context.strokeStyle = labelColor;//繪製顏色
                context.beginPath();  
                context.moveTo(this.x, n * this.height / this.numYTicks + this.y);  
                context.lineTo(this.x + this.tickSize, n * this.height / this.numYTicks + this.y);  
                context.stroke();  
            }  
    
            // draw values  
            context.font = this.font;  
            context.fillStyle = "black";  
            context.textAlign = "right";  
            context.textBaseline = "middle";  
    
            for (var n = 0; n <= this.numYTicks; n++) {  
                //var value = Math.round(this.maxY - n * this.maxY / this.numYTicks);  
                var value;
                if (this.reverseY){
                    value = Math.round(this.minY + n * Math.abs(this.minY - this.maxY) / this.numYTicks);  
                }else{
                    value = Math.round(this.maxY - n * Math.abs(this.minY - this.maxY) / this.numYTicks);  
                }
                console.log("y" + value);
                context.save();  
                context.translate(this.x - this.padding, n * this.height / this.numYTicks + this.y);  
                context.fillStyle = labelFontColor;//繪製文字顏色
                context.fillText(value, 0, 0);  
                context.restore();  
            }  
            context.restore();  
        },
        drawLine: function(data, color = "blue", width = 3) {
            var offsetX = (Math.abs(this.minX-0)*this.scaleX);		
            var offsetY = (Math.abs(this.minY-0)*this.scaleY);
            var cur_x = 0;
            var cur_y = 0;
    
            if (this.reverseX){			
                cur_x = paddingLastX - this.x - (( data[0].x * this.scaleX) + offsetX);		
                console.log("cur_x1" , cur_x);
            }else{
                cur_x = ((data[0].x * this.scaleX) + offsetX);			
            }
    
            if (reverseY){
                cur_y = paddingLastY - (data[0].y * this.scaleY + offsetY);
                console.log(cur_y);
            }else{
                cur_y = data[0].y * this.scaleY + offsetY;
            }
            
            var context = this.context;  
            context.save();  
            //context.setLineDash();  //設置為實心
            this.transformContext();  
            context.lineWidth = width;  
            context.strokeStyle = color;  
            context.fillStyle = color;  
            context.beginPath();  
            context.moveTo(cur_x, cur_y);  
            console.log("scale" , this.scaleX,this.scaleY);
    
    
            for (var n = 0; n < data.length; n++) {  
                var point = data[n];  
                if (this.reverseX){
                    //cur_x = 700 -20 - (( point.x * this.scaleX) + offsetX);
                    cur_x = paddingLastX - this.x - (( point.x * this.scaleX) + offsetX);				
                }else{
                    cur_x = (( point.x * this.scaleX) + offsetX);				
                }
    
                if (reverseY){
                    cur_y = paddingLastY - (point.y * this.scaleY + offsetY);				
                }else{
                    cur_y = point.y * this.scaleY + offsetY;
                }
                
                
                // draw segment  
                context.lineTo(cur_x, cur_y);  
                context.stroke();  
                context.closePath();  
                context.beginPath();  
                context.arc(cur_x,cur_y, this.pointRadius, 0, 2 * Math.PI, false);  
                context.fill();  
                context.closePath();  
    
                // position for next segment  
                context.beginPath();  
                context.moveTo(cur_x, cur_y);  
            }  
            context.restore();  
        },
        transformContext: function() {
            var context = this.context;  
    
            // move context to center of canvas  
            this.context.translate(this.x, this.y + this.height);  
    
            // invert the y scale so that that increments  
            // as you move upwards  
            context.scale(1, -1); 
        },
        addLine: function(data, color, width) {
            this.drawLine(data, color, width);
        },
        init: function() {       
            this.drawXAxis(this.xLableColor , this.xLableFontColor);
            this.drawYAxis(this.yLableColor , this.yLableFontColor);            
            console.log("Init!");
        },
    }

    function Test()
    {
        console.log("this is Test!" , minX);
    }

    // 返回 LineChart 結構函數
    return {
        XChart: XChart,
        Test: Test,        
    };
})();
