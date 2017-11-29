var CellFunction=function(i, cur, array){
	//传输游戏块内容*********************************************************************************
	var data = {
		data:JSON.stringify({
			'cmd': 'gameInfo',
			'num': cur,
			'array': array
		})
	};
	$.ajax({
		url: '/',
		type: 'post',
		datatype: 'JSON',
		data: data,
		error:function(){
			alert("Read List Fail!");
		},
		success:function(data){
			if(data.isBought){
				$("#PlayBuyBtnLabel"+i).html("Play");
				$("#PlayBuyBtn"+i).unbind('click').click(function(){
					window.open(data.gameURL);
				});
			}
			else{
				$("#PlayBuyBtnLabel"+i).html("Buy $"+data.price);
				$("#PlayBuyBtn"+i).unbind('click').click(function(){
					var data = {
						data:JSON.stringify({
							'cmd': 'Buy',
							'num': window.cur,
							'array': window.array
						})
					};
					$.ajax({
						url: '/',
						type: 'post',
						datatype: 'JSON',
						data: data,
						error:function(){
							alert("Buy Fail!");
						},
						success:function(data){
							if(data.result){
								$("#PlayBuyBtnLabel"+i).html("Play");
								$("#balanceInfo").html(data.balanceInfo);
								$("#stockSizeInfo").html(data.stockSizeInfo);
								$("#PlayBuyBtn"+i).unbind('click').click(function(){
									window.open(data.gameURL);
								});
							}
							else{
								alert("Not Enough Money!");
							}
						}
					});
				})
			}
			$("#GameName"+i).html(data.gameName);
			$("#cellImg"+i).css("background-image","url("+data.gameImgURL+")");
			//$("#infoVideo"+i).attr("src",data.gameVideoURL);
			$("#classificationLabel"+i).html(data.classification);
			var goodHeight=data.goodNum/(data.goodNum+data.badNum)*240;
			var badHeight=data.badNum/(data.goodNum+data.badNum)*240;
			$("#good"+i).css("height",goodHeight+"px");
			$("#bad"+i).css("height",badHeight+"px");
			if(data.goodNum/data.badNum>5){
				$("#comment"+i).html("好评如潮");
			}
			else if(data.goodNum/data.badNum>1.2){
				$("#comment"+i).html("好评");
			}
			else if(data.goodNum/data.badNum<1/5){
				$("#comment"+i).html("差评如潮");
			}
			else if(data.goodNum/data.badNum<1/1.2){
				$("#comment"+i).html("差评");
			}
			else{
				$("#comment"+i).html("褒贬不一");
			}
			$("#soldNum"+i).html(data.soldNum);
			$("#classificationIcon"+i).attr("src",data.classificationIcon);
			$("#addGood"+i).click(function(){
				//点赞传输*********************************************************************************
				var data = {
					data:JSON.stringify({
						'cmd': 'isGood',
						'num': cur,
						'array': array
					})
				};
				$.ajax({
					url: '/',
					type: 'post',
					datatype: 'JSON',
					data: data,
					error:function(){
						alert("Add Good Fail!");
					},
					success:function(data){
						var goodHeight=data.goodNum/(data.goodNum+data.badNum)*240;
						var badHeight=data.badNum/(data.goodNum+data.badNum)*240;
						$("#good"+i).css("height",goodHeight+"px");
						$("#bad"+i).css("height",badHeight+"px");
						if(data.goodNum/data.badNum>5){
							$("#comment"+i).html("好评如潮");
						}
						else if(data.goodNum/data.badNum>1.2){
							$("#comment"+i).html("好评");
						}
						else if(data.goodNum/data.badNum<1/5){
							$("#comment"+i).html("差评如潮");
						}
						else if(data.goodNum/data.badNum<1/1.2){
							$("#comment"+i).html("差评");
						}
						else{
							$("#comment"+i).html("褒贬不一");
						}
					}
				});
			})
			$("#addBad"+i).click(function(){
				//差评传输*****************************************************************************
				var data = {
					data:JSON.stringify({
						'cmd': 'isBad',
						'num': cur,
						'array': array
					})
				};
				$.ajax({
					url: '/',
					type: 'post',
					datatype: 'JSON',
					data: data,
					error:function(){
						alert("Add Bad Fail!");
					},
					success:function(data){
						var goodHeight=data.goodNum/(data.goodNum+data.badNum)*240;
						var badHeight=data.badNum/(data.goodNum+data.badNum)*240;
						$("#good"+i).css("height",goodHeight+"px");
						$("#bad"+i).css("height",badHeight+"px");
						if(data.goodNum/data.badNum>5){
							$("#comment"+i).html("好评如潮");
						}
						else if(data.goodNum/data.badNum>1.2){
							$("#comment"+i).html("好评");
						}
						else if(data.goodNum/data.badNum<1/5){
							$("#comment"+i).html("差评如潮");
						}
						else if(data.goodNum/data.badNum<1/1.2){
							$("#comment"+i).html("差评");
						}
						else{
							$("#comment"+i).html("褒贬不一");
						}
					}
				});
			})
		}
	});
}

var CellsFunction=function(i, cur, array){
	if(i==8){
		return;
	}
	//传输游戏块内容*********************************************************************************
	var data = {
		data:JSON.stringify({
			'cmd': 'gameInfo',
			'num': cur,
			'array': array
		})
	};
	$.ajax({
		url: '/',
		type: 'post',
		datatype: 'JSON',
		data: data,
		error:function(){
			alert("Read List Fail!");
		},
		success:function(data){
			if(data.isBought){
				$("#PlayBuyBtnLabel"+i).html("Play");
				$("#PlayBuyBtn"+i).unbind('click').click(function(){
					window.open(data.gameURL);
				});
			}
			else{
				$("#PlayBuyBtnLabel"+i).html("Buy $"+data.price);
				$("#PlayBuyBtn"+i).unbind('click').click(function(){
					var data = {
						data:JSON.stringify({
							'cmd': 'Buy',
							'num': cur,
							'array': array
						})
					};
					$.ajax({
						url: '/',
						type: 'post',
						datatype: 'JSON',
						data: data,
						error:function(){
							alert("Buy Fail!");
						},
						success:function(data){
							if(data.result){
								$("#PlayBuyBtnLabel"+i).html("Play");
								$("#balanceInfo").html(data.balanceInfo);
								$("#stockSizeInfo").html(data.stockSizeInfo);
								$("#PlayBuyBtn"+i).unbind('click').click(function(){
									window.open(data.gameURL);
								});
							}
							else{
								alert("Not Enough Money!");
							}
						}
					});
				})
			}
			$("#GameName"+i).html(data.gameName);
			$("#cellImg"+i).css("background-image","url("+data.gameImgURL+")");
			//$("#infoVideo"+i).attr("src",data.gameVideoURL);
			$("#classificationLabel"+i).html(data.classification);
			var goodHeight=data.goodNum/(data.goodNum+data.badNum)*240;
			var badHeight=data.badNum/(data.goodNum+data.badNum)*240;
			$("#good"+i).css("height",goodHeight+"px");
			$("#bad"+i).css("height",badHeight+"px");
			if(data.goodNum/data.badNum>5){
				$("#comment"+i).html("好评如潮");
			}
			else if(data.goodNum/data.badNum>1.2){
				$("#comment"+i).html("好评");
			}
			else if(data.goodNum/data.badNum<1/5){
				$("#comment"+i).html("差评如潮");
			}
			else if(data.goodNum/data.badNum<1/1.2){
				$("#comment"+i).html("差评");
			}
			else{
				$("#comment"+i).html("褒贬不一");
			}
			$("#soldNum"+i).html(data.soldNum);
			$("#classificationIcon"+i).attr("src",data.classificationIcon);
			$("#addGood"+i).click(function(){
				//点赞传输*********************************************************************************
				var data = {
					data:JSON.stringify({
						'cmd': 'isGood',
						'num': cur,
						'array': array
					})
				};
				$.ajax({
					url: '/',
					async: false,
					type: 'post',
					datatype: 'JSON',
					data: data,
					error:function(){
						alert("Add Good Fail!");
					},
					success:function(data){
						var goodHeight=data.goodNum/(data.goodNum+data.badNum)*240;
						var badHeight=data.badNum/(data.goodNum+data.badNum)*240;
						$("#good"+i).css("height",goodHeight+"px");
						$("#bad"+i).css("height",badHeight+"px");
						if(data.goodNum/data.badNum>5){
							$("#comment"+i).html("好评如潮");
						}
						else if(data.goodNum/data.badNum>1.2){
							$("#comment"+i).html("好评");
						}
						else if(data.goodNum/data.badNum<1/5){
							$("#comment"+i).html("差评如潮");
						}
						else if(data.goodNum/data.badNum<1/1.2){
							$("#comment"+i).html("差评");
						}
						else{
							$("#comment"+i).html("褒贬不一");
						}
					}
				});
			})
			$("#addBad"+i).click(function(){
				//差评传输*****************************************************************************
				var data = {
					data:JSON.stringify({
						'cmd': 'isBad',
						'num': cur,
						'array': array
					})
				};
				$.ajax({
					url: '/',
					async: false,
					type: 'post',
					datatype: 'JSON',
					data: data,
					error:function(){
						alert("Add Bad Fail!");
					},
					success:function(data){
						var goodHeight=data.goodNum/(data.goodNum+data.badNum)*240;
						var badHeight=data.badNum/(data.goodNum+data.badNum)*240;
						$("#good"+i).css("height",goodHeight+"px");
						$("#bad"+i).css("height",badHeight+"px");
						if(data.goodNum/data.badNum>5){
							$("#comment"+i).html("好评如潮");
						}
						else if(data.goodNum/data.badNum>1.2){
							$("#comment"+i).html("好评");
						}
						else if(data.goodNum/data.badNum<1/5){
							$("#comment"+i).html("差评如潮");
						}
						else if(data.goodNum/data.badNum<1/1.2){
							$("#comment"+i).html("差评");
						}
						else{
							$("#comment"+i).html("褒贬不一");
						}
					}
				});
			})	

			CellsFunction(i+1,cur+1,array);		
		}
	});
}