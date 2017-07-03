$("#title").html("Welcome! "+$.cookie('user'));//设置欢迎
var column=new Array();
var dic=["即时","大陆","国际","台湾","社会","军事","港澳","历史","财经","娱乐"];//词典映射
var dataNum=0;	//用来表示已经接受到的新闻数量
var pos=new Array();	//用来保存每个栏目的位置


function addColumn0(){	//添加即时新闻
	$('#personality').after('\
		<section class="boss-cta-area" id="boss-cta">\
	            <div class="boss-dark-overlay"></div>\
	            <!-- container -->\
	            <div class="container">\
	                <div class="row">\
	                    <div class="col-md-12 text-center">\
	                        <div class="boss-header wow fadeInLeft">\
	                            <h1>即时新闻</h1>\
	                        </div>\
	                    </div>\
	                </div>\
	            </div>\
	            <!--/ container -->\
	        </section>\
		<section class="boss-work-area" id="works">\
            <!-- boss owl -->\
            <!-- START work area -->\
            <div class="boss-owl wow fadeIn owl-carousel owl-theme animated" style="opacity: 1; display: block; visibility: visible; animation-name: fadeIn;">\
            <div class="owl-item" style="width: 241px;"><div class="boss-item">\
                    <img src="'+column[0][0]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
                    <div class="boss-caption text-center">\
                        <h3>THIS IMAGE SI DESEND &amp; PERFECT LIKUA  IS 100% BAFLE .</h3>\
                    </div>\
                </div></div><div class="owl-item" style="width: 241px;"><div class="boss-item">\
                    <img src="'+column[0][1]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
                    <div class="boss-caption text-center">\
                        <h3>THIS IMAGE SI DESEND &amp; PERFECT LIKUA  IS 100% BAFLE .</h3>\
                    </div>\
                </div></div><div class="owl-item" style="width: 241px;"><div class="boss-item">\
                    <img src="'+column[0][3]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
                    <div class="boss-caption text-center">\
                        <h3>THIS IMAGE SI DESEND &amp; PERFECT LIKUA  IS 100% BAFLE .</h3>\
                    </div>\
                </div></div><div class="owl-item" style="width: 241px;"><div class="boss-item">\
                    <img src="'+column[0][3]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
                    <div class="boss-caption text-center">\
                        <h3>THIS IMAGE SI DESEND &amp; PERFECT LIKUA  IS 100% BAFLE .</h3>\
                    </div>\
                </div></div><div class="owl-item" style="width: 241px;"><div class="boss-item">\
                    <img src="'+column[0][0]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
                    <div class="boss-caption text-center">\
                        <h3>THIS IMAGE SI DESEND &amp; PERFECT LIKUA  IS 100% BAFLE .</h3>\
                    </div>\
                </div></div><div class="owl-item" style="width: 241px;"><div class="boss-item">\
                    <img src="'+column[0][0]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
                    <div class="boss-caption text-center">\
                        <h3>THIS IMAGE SI DESEND &amp; PERFECT LIKUA  IS 100% BAFLE .</h3>\
                    </div>\
                </div></div></div>\
            </div>\
            <!--/ boss owl -->\
        </section>\
		');
	/*$("#personality").after('\
	        <section class="boss-cta-area" id="boss-cta">\
	            <div class="boss-dark-overlay"></div>\
	            <!-- container -->\
	            <div class="container">\
	                <div class="row">\
	                    <div class="col-md-12 text-center">\
	                        <div class="boss-header wow fadeInLeft">\
	                            <h1>即时新闻</h1>\
	                        </div>\
	                    </div>\
	                </div>\
	            </div>\
	            <!--/ container -->\
	        </section>\
	        <section class="boss-work-area" id="works">\
	            <div class="boss-owl wow fadeIn" id="photo1">\
	            <div class="boss-item">\
	                    <img src="'+column[0][0]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
	                    <div class="boss-caption text-center">\
	                        <h3>腾讯NOW直播：不着急赚钱 内容生态更重要</h2>\
	                    </div>\
	                </div>\
	                <div class="boss-item">\
	                    <img src="'+column[0][1]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
	                    <div class="boss-caption text-center">\
	                        <h3>腾讯NOW直播：不着急赚钱 内容生态更重要</h2>\
	                    </div>\
	                </div>\
	            </div>\
	            <!--/ boss owl -->\
	        </section>')*/
	/*for(i=0;i<column[0].length;i++)
		$("#photo1").append('<div class="boss-item">\
	                    <img src="'+column[0][i]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" alt="boss slider">\
	                    <div class="boss-caption text-center">\
	                        <h3>腾讯NOW直播：不着急赚钱 内容生态更重要</h2>\
	                    </div>\
	                </div>');*/
}

function addcolumn(i){
	var p=pos.indexOf(i-1)+1;
	$("#position"+p).after('\
		<section class="boss-cta-area" id="boss-cta">\
	            <div class="boss-dark-overlay"></div>\
	            <!-- container -->\
	            <div class="container">\
	                <div class="row">\
	                    <div class="col-md-12 text-center">\
	                        <div class="boss-header wow fadeInLeft">\
	                            <h1>'+dic[i]+'新闻</h1>\
	                        </div>\
	                    </div>\
	                </div>\
	            </div>\
	            <!--/ container -->\
	        </section>\
		<section class="boss-about-area" id="column'+p+'"">\
        </section>');
	for(j=0;j<column[i].length;j++)
	$("#column"+p).append('\
		<!-- container -->\
            <div class="container">\
                <div class="row">\
                    <div class="col-md-5 col-md-offset-1 text-center" style="margin-bottom:30px;margin-top:0px">\
                        <div class="boss-big-logo wow fadeInLeft">\
                            <img src="'+column[i][j]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]+'" class="img-responsive center-block">\
                        </div>\
                    </div>\
                    <div class="col-md-5">\
                        <div class="boss-company-history wow fadeInRight" style="margin-top:100px">\
                           <a name="{i:'+i+',j:'+j+'}" onclick="jump(this)"><h3 href="'+column[i][j]['href']+'"">'+column[i][j]['title']+'</h3></a>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <!--/ container -->\
		');
}

function getData(i){
	$.post("/getColumn/"+i,	//发送post请求，获取新闻数据
			{
				user:$.cookie('user')
			},
			function(data,status){
				column[i]=data;
				if(i==0)
					addColumn0;
				else
					addcolumn(i);
				dataNum++;
				if(dataNum==10){	//新闻数据获取完毕之后再设置感兴趣新闻栏目
					$.post("/getData",
						{
							user:$.cookie('user')
						},
						function(data,status){
							for(i=1;i<5;i++){
								var columnNum=0;
								eval("var temp=data[0]['like"+i+"']");
								columnNum=dic.indexOf(temp);
								$("#like"+i+"img").attr("src",column[columnNum][0]['content'].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]);
								$("#like"+i+"p").html(temp+"栏目: "+column[columnNum][0]['title']);
							}
						});
				}
			});
}

//请求获取所有新闻数据
function getAllData(){
	for(var i=0;i<10;i++){
		getData(i);
	}
}

function jump(e){
	eval("var temp="+e.name);
	$.post("/add/"+temp.i,
			{
			user:$.cookie('user')
			},
			function(data,status){
				if(data=="success")
					window.location.href='/text/?i='+temp.i+'&j='+temp.j;
			}
	);	//增加该用户的数据

}


$.post("/getPos",
	{
		user:$.cookie('user')
	},
	function(data,status){
		clickNum=new Array();
		for(i=0;i<9;i++){
			clickNum[i]=data[0][dic[i+1]];
		}
		for(i=0;i<9;i++){
			max=clickNum[0];
			index=0;	//最大值下标
			for(j=0;j<9;j++){
				if(clickNum[j]>max){
					max=clickNum[j];
					index=j;
				}
			}
			pos[i]=index;
			clickNum[index]=-1;
		}
		getAllData();
	}
);





