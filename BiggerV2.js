var allCode = [127,8239,8161,661,2389,1380,1360,1448,803,206,710,1322,3336,1831,8220,801,2878,368,574,1105,986,2789,536,1036,308,1020,648,2211,8237,2100,1866,82,583,8271,3899,3816,8182,1281,1087,1038,2038,170,1533,1321,926,261,8158,1217,1177,1766,1459,902,1101,1060,1588,1165,2039,362,3996,1557,1044,8247,1098,938,1543,2186,863,622,543,144,1132,1919,6108,169,1022,1239,2380,812,1300,85,715,1203,635,1055,8100,996,699,1508,2255,264,1886,992,585,327,1669,500,172,1180,837,80,8129,8279,726,1395,493,3908,3337,2348,1076,1530,2357,3396,8063,1816,399,2000,1019,273,2722,467,882,3773,1011,3399,579,794,722,1246,197,2328,1622,8046,8071,2488,2006,6196,1150,963,2308,1003,1883,974,1137,848,1639,1068,90,2999,2298,1488,966,987,708,6839,8105,260,2788,716,1262,1273,1778,1070,8361,376,109,1813,220,736,3344,198,2868,596,3800,1063,893,392,1339,2727,1355,3333,471,8369,1466,3315,8006,1528,978,3378,3377,2356,688,3818,605,3322,3382,3988,746,1480,1776,815,969,2699,651,8001,1811,560,1970,460,758,704,2883,388,538,39,3110,1052,8267,3799,2223,1270,1668,1359,8018,305,1314,6837,613,317,1833,272,707,3836,1330,336,2828,1398,54,183,2600,1328,2800,998,656,874,2686,880,268,5,1288,1143,1375,419,6030,111,1058,3888,587,476,2202,205,1349,209,31,1182,1662,3839,810,1613,735,1468,390,694,737,570,2799,1599,2666,1680,1381,1207,6136,465,806,1666,2318,35,906,101,1326,1929,2866,745,604,445,8037,3393,1363,2371,686,1027,1250,257,1918,1088,8167,818,1260,1538,138,787,1333,817,73,8290,982,8230,943,953,525,1476,2196,683,1495,241,3963,1102,1800,769,1499,1046,862,558,2020,8311,95,861,1031,1236,217,8307,2313,1362,237,821,606,338,1233,2014,6881,663,1415,692,1065,75,1297,8138,245,129,1777,10,498,3968,182,2369,354,1345,218,1157,632,2607,2193,136,590,371,1229,1336,2343,665,895,2339,8172,1566,2899,2009,2208,717,1282,798,222,6865,855,2388,8070,968,729,307,451,3933,328,2618,1358,777,8295,166,8325,343,291,410,1385,8090,8095,698,8101,2379,276,1139,1117,27,2333,382,3330,1527,3606,765,530,8156,952,8282,1171,403,3889,360,1029,3380,816,2188,8122,1683,1211,819,6198,1302,700,1898,727,3699,20,61,1035,951,911,296,1788,1108,550,750,2358,400,2345,2331,2282,1280,3993,8130,1112,2689,689,3969,1049,1030,552,8141,546,1822,8363,8150,8269,1057,799,6230,434,1327,916,2777,547,8041,2366,1882,2086,2018,2698,1039,2280,1428,718,1341,29,442,696,439,1470,988,8192,2238,510,1205,3326,8057,378,299,8175,1293,2669,8248,1818,6869,1991,8327,1447,1378,958,8326,8181,1980,8083,827,164,285,921,381,426,1718,8007,621,1332,3813,3882,1548,1515,283,269,175,1561,1899,1532,556,1386,8051,8078,8022,8207,630,15,2382,279,881,1053,8260,365,8345,1082,1568,802,660,1317,1478,835,572,612,8197,8301,1483,1979,3966,904,143,8340,8127,975,2323,2322,967,8265];
//取得某类型下的ID列表
//var allCode = [527,1478,15,8051,921,1053,8127,1499,6108,2382,1899,381,279,8078,365,8083,510,175,547,2689];
var allInfo = [];
getCode2Name();
//取得列表下的历史数据
function getAllHistInfo(){
	var lng = allCode.length ;
	allInfo =  {};
	var apiPrefix= "https://xueqiu.com/stock/forchartk/stocklist.json?symbol=";
		for(i  = 0 ;i < lng; i++){
		  var aCode = allCode[i];
		  (function(aCode){
		    //console.log(aCode);
		    var apiUrl = apiPrefix+ PrefixInteger(aCode,5) + "&period=1day&type=normal&begin="+parseInt(Date.parse(new Date()) - 1000* 3600*24*90) +"&end="+Date.parse(new Date())+"&_=1474011320174";
		    $.get(
				  apiUrl,function(data) {  allInfo["\'"+aCode+"\'"] = data; 
				},
				"text"
				);		    
		  })(aCode);
		}
}
//取得名称对应关系
var allCode2Name = {};
var tmpArr = [];
function getCode2Name(){
	tmpArr = [] ;
	for(i = 0 ; i  <  26 ; i++){
		
		    var apiUrl =  "https://xueqiu.com/stock/cata/stocklist.json?page="+(i+1)+"&size=100&order=desc&orderby=percent&type=30&isdelay=1&_=1504366046095";
		    $.get(
				  apiUrl,function(data) {  eval("a="+data+";") ; tmpArr = tmpArr.concat( a.stocks); 
				  	for(j =0 ; j < a.stocks.length; j++) {
				  		allCode2Name["\'"+(a.stocks[j]['symbol'])+"\'"] = a.stocks[j]['name'];
				  		}
				},
				"text"
				);		    
  }
}

//均线多头向上
function calAvgPrize(){
	var iTick = 0;
	var iTickLeft = 0;iTickRight = 2;	
	for(key in allInfo){
		 iTick ++ ;
		 if(iTick < iTickLeft || iTick > iTickRight ){}
	   var aData = allInfo[key] ; 
	   eval("var jsonData="+ aData +";");
	   var leftDay = '2010-2-2' ,rightDay = '2050-2-2';
	  // console.log(jsonData);
	   var chartlist = jsonData.chartlist;
	   for(i = chartlist.length -2 ; i >=0  ; i -- ){
	   		var left5 = chartlist[i].ma5;
	   		var right5 = chartlist[i+ 1 ].ma5;
	   		var dir5 = right5 - left5;
	   		var left10 = chartlist[i].ma10;
	   		var right10 = chartlist[i+1].ma10;
	   		var dir10 = right10 - left10;
	   		var left20 = chartlist[i].ma20;
	   		var right20 = chartlist[i+1 ].ma20;
	   		var dir20 = right20 - left20;
	   		var left30 = chartlist[i].ma30;
	   		var right30 = chartlist[i+1 ].ma30;
	   		var dir30 = right30 - left30;
	   		var nCountUp = 0;
	   		if(dir5 > 0 ) nCountUp ++; 
	   		if(dir10 > 0 ) nCountUp ++;
	   		if(dir20 > 0 ) nCountUp ++;
	   		if(dir30 > 0 ) nCountUp ++;
	   		var curDate = new Date(chartlist[i].time);
	   		curDate = curDate.Format("yyyy-MM-dd");
	   	  
	   	  //算金叉
	   		var isCross = (left5 - left10)*(right5 - right10) < 0 
	   		if(isCross ) console.log("crossOn:"+curDate+"::"+ jsonData.stock.symbol);	
	   		if(right5 > right10 && right10 > right20 && right20 > right30 && dir5> 0 &&nCountUp >4) { 
	   			//console.log("goneUpAt:"+curDate+"::"+ jsonData.stock.symbol);
	   			rightDay = curDate;
	   		  console.log("多头向上："+curDate+"::"+ allCode2Name["'"+jsonData.stock.symbol+"'"],"https://xueqiu.com/S/"+jsonData.stock.symbol);
	   		  break;
	   		}	   
	   } 
	   
	    for(i = 0 ; i < chartlist.length - 1 ; i ++ ){
	   		var left5 = chartlist[i].ma5;
	   		var right5 = chartlist[i+ 1 ].ma5;
	   		var dir5 = right5 - left5;
	   		var left10 = chartlist[i].ma10;
	   		var right10 = chartlist[i+1].ma10;
	   		var dir10 = right10 - left10;
	   		var left20 = chartlist[i].ma20;
	   		var right20 = chartlist[i+1 ].ma20;
	   		var dir20 = right20 - left20;
	   		var left30 = chartlist[i].ma30;
	   		var right30 = chartlist[i+1 ].ma30;
	   		var dir30 = right30 - left30;
	   		var nCountUp = 0;
	   		if(dir5 > 0 ) nCountUp ++; 
	   		if(dir10 > 0 ) nCountUp ++;
	   		if(dir20 > 0 ) nCountUp ++;
	   		if(dir30 > 0 ) nCountUp ++;
	   		var curDate = new Date(chartlist[i].time);
	   		curDate = curDate.Format("yyyy-MM-dd");
	   	  //if(nCountUp >2) console.log("goneUpAt:"+curDate+"::"+ jsonData.stock.symbol); //两个向上的
	   	  //算金叉
	   		var isCross = (left5 - left10)*(right5 - right10) < 0 ;
	   		if(isCross ) console.log("crossOn:"+curDate+"::"+ jsonData.stock.symbol);	
	   		if(right5 > right10 && right10 > right20 && right20 > right30 && dir5> 0 && nCountUp >2 ) { 
	   		  console.log("多头向上："+curDate+"::"+ allCode2Name["'"+jsonData.stock.symbol+"'"],"https://xueqiu.com/S/"+jsonData.stock.symbol);
	   		  leftDay = curDate;
	   		  break;
	   		}	   
	   }
	   //如果两者之间相差5天 或者与最新日期差5天内
	   if(dayDif(leftDay,rightDay) || dayDif(rightDay,new Date())){
	   	 console.log("inner five days::" , jsonData.stock.symbol);
	   	 console.log("https://xueqiu.com/S/"+jsonData.stock.symbol);
	   	 //window.open("https://xueqiu.com/S/"+jsonData.stock.symbol);
	   }
	}	 
	//if(iTick == allCode.length) window.open("https://xueqiu.com/S/"+jsonData.stock.symbol);
}

//MACD指标金叉
function calcMACD(){
var iTick = 0;
var iTickLeft = 0;iTickRight = 2;	
for(key in allInfo){
	 iTick ++ ;
	 if(iTick < iTickLeft || iTick > iTickRight ){}
   var aData = allInfo[key] ; 
   eval("var jsonData="+ aData +";");
   var leftDay = '2010-2-2' ,rightDay = '2050-2-2';
   var chartlist = jsonData.chartlist;
   for(i = chartlist.length -2 ; i >=0  ; i -- ){
   		var macd = chartlist[i].macd;  //>0
   		var leftDif = chartlist[i].dif;
   		var rightDif = chartlist[i+1 ].dif;
   		var leftDea = chartlist[i].dea;
   		var rightDea = chartlist[i+1 ].dea;
   		var dirDea = parseFloat(rightDea )- parseFloat(leftDea);
   		var dirDif = parseFloat(rightDif )- parseFloat(leftDif); 
   		var isCross = (leftDif <= leftDea && rightDif >= rightDea) ;
   	//	console.log(leftDif - leftDea,rightDif-rightDea);
   		var curDate = new Date(chartlist[i].time);
   		curDate = curDate.Format("yyyy-MM-dd");
   		if(macd > 0.0 && dirDif > 0.0 && dirDea >= 0.0  ){
   			  console.log("多头向上："+curDate+ ":" + jsonData.stock.symbol,"https://xueqiu.com/S/"+jsonData.stock.symbol);
   			  rightDay = curDate;
   			  break;
   		} 
   } 
   for(i = 0 ; i < chartlist.length -  1  ; i ++ ){
   		var macd = chartlist[i].macd;  
   		var leftDif = chartlist[i].dif;
   		var rightDif = chartlist[i+1 ].dif;
   		var leftDea = chartlist[i].dea;
   		var rightDea = chartlist[i+1 ].dea;
   		var dirDea = parseFloat(rightDea) - parseFloat(leftDea);
   		var dirDif = parseFloat(rightDif) - parseFloat(leftDif); 
   		var isCross = (leftDif <= leftDea && rightDif >= rightDea) ;
   	//	console.log(leftDif - leftDea,rightDif-rightDea);
   		var curDate = new Date(chartlist[i].time);
   		curDate = curDate.Format("yyyy-MM-dd");
   		if(macd > 0.0 && dirDif > 0.0 && dirDea >= 0.0  ){
   			  console.log("多头向上："+curDate+ ":" + jsonData.stock.symbol,"https://xueqiu.com/S/"+jsonData.stock.symbol);
   			  leftDay = curDate;
   			  break;
   		} 
   }
   
   //如果两者之间相差5天 或者与最新日期差5天内
   if(dayDif(leftDay,rightDay) || dayDif(rightDay,new Date())){
   	 console.log("macd::" , jsonData.stock.symbol,"https://xueqiu.com/S/"+jsonData.stock.symbol);
   	 //window.open("https://xueqiu.com/S/"+jsonData.stock.symbol);
   }
}	// if(iTick == allCode.length) window.open("https://xueqiu.com/S/"+jsonData.stock.symbol);
}

//成交量变
function calcVolChange(){
	var iTick = 0;
	var iTickLeft = 0;iTickRight = 2;	
	for(key in allInfo){
		 iTick ++ ;
		 if(iTick < iTickLeft || iTick > iTickRight ){}
	   var aData = allInfo[key] ; 
	   eval("var jsonData="+ aData +";");
	   var leftDay = '2010-2-2' ,rightDay = '2050-2-2';
	   var chartlist = jsonData.chartlist;
	   for(i = chartlist.length - 1  ; i >= 6  ; i -- ){
	   		var avgVol = 0,allVol_5 = 0;;
	   		var curVol = chartlist[i].volume;
	   		for(j = i -1  ; j >=  i - 5 ; j-- ) {
	   			 allVol_5 += chartlist[j].volume;
	   		}
	   		avgVol = parseInt(allVol_5*1.0/5) ;
	   		var percent = (curVol - avgVol)*1.0/avgVol ; 
	   	  var curDate = new Date(chartlist[i].time);
	   		curDate = curDate.Format("yyyy-MM-dd"); 
	   		if(parseFloat(percent) > 4) {
	   	    console.log("异动at "+curDate +"："+ percent +"::"+ jsonData.stock.symbol,"https://xueqiu.com/S/"+jsonData.stock.symbol);
	   	    rightDay = curDate;
	   	    break;
	   	  }
	   } 
	   for(i = 6 ; i < chartlist.length  ; i ++ ){
	   		var avgVol = 0,allVol_5 = 0;;
	   		var curVol = chartlist[i].volume;
	   		for(j = i -1  ; j >=  i - 5 ; j-- ) {
	   			 allVol_5 += chartlist[j].volume;
	   		}
	   		avgVol = parseInt(allVol_5*1.0/5) ;
	   		var percent = (curVol - avgVol)*1.0/avgVol ; 
	   	  var curDate = new Date(chartlist[i].time);
	   		curDate = curDate.Format("yyyy-MM-dd"); 
	   		if(parseFloat(percent) > 4) {
	   	    console.log("异动at "+curDate +"："+ percent +"::"+ jsonData.stock.symbol,"https://xueqiu.com/S/"+jsonData.stock.symbol);
	   	    leftDay = curDate;
	   	    break;
	   	  } 
	   }
	   
	   //如果两者之间相差5天 或者与最新日期差5天内dayDif(leftDay,rightDay) ||
	   if( dayDif(rightDay,new Date())){
	   	 console.log("volume change::" , jsonData.stock.symbol , "https://xueqiu.com/S/"+jsonData.stock.symbol);
	   	 //window.open("https://xueqiu.com/S/"+jsonData.stock.symbol);
	   }
	} 
}

//在10日线之上,且很近
function calcDifPrice(){
  var iTick = 0;
  var iTickLeft = 0;iTickRight = 2; 
  for(key in allInfo){
     iTick ++ ;
     if(iTick < iTickLeft || iTick > iTickRight ){}
     var aData = allInfo[key] ; 
     eval("var jsonData="+ aData +";");
     var leftDay = '2010-2-2' ,rightDay = '2050-2-2';
     var chartlist = jsonData.chartlist;
     //console.log(chartlist);
     var newInfo = chartlist[chartlist.length-1];
     if(typeof newInfo == 'undefined') continue;
     var close = newInfo.close;
     var ma10 =newInfo.ma10;
     if(close> ma10 && (close - ma10)/ma10 <= 0.02){
         console.log("price change::" , jsonData.stock.symbol , "https://xueqiu.com/S/"+jsonData.stock.symbol);
         //window.open("https://xueqiu.com/S/"+jsonData.stock.symbol);
         continue;
     }
     continue;     
  }
}