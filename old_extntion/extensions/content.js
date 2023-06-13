
jQuery.expr[':'].regex = function(elem, index, match) {
   var matchParams = match[3].split(','),
       validLabels = /^(data|css):/,
       attr = {
           method: matchParams[0].match(validLabels) ?
                       matchParams[0].split(':')[0] : 'attr',
           property: matchParams.shift().replace(validLabels,'')
       },
       regexFlags = 'ig',
       regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
   return regex.test(jQuery(elem)[attr.method](attr.property));
}



jQuery.extend($.expr[":"], {
"containsIN": function(elem, i, match, array) {
return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
}
});



////////////////////////////////////////////



const getStorageData = key =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );


const setStorageData = data =>
  new Promise((resolve, reject) =>
    chrome.storage.local.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )
  
  /////////////////////////////////////////////////////////////////





/*var url_data={
"urls":[{"url":"https://www.karlflammerford.com/new/","phpFile":"ford_new_172.php","sdeId":"172","cruntPage":"0","isUsed":"0","is_done":"0"},{"url":"https://www.karlflammerford.com/used/","phpFile":"ford_used_172.php","sdeId":"172","cruntPage":"0","isUsed":"1","is_done":"0"}]
}; 



var url_data={
"urls":[{"url":"https://capitalford.com/newvehicles","phpFile":"finv_new_33.php","sdeId":"33","cruntPage":"0","isUsed":"0","is_done":"0"},{"url":"https://capitalford.com/preownedvehicles","phpFile":"finv_used_33.php","sdeId":"33","cruntPage":"0","isUsed":"1","is_done":"0"}]
}; 
*/

var url_data={
"urls":[{"url":"https://www.capitalfordhillsborough.com/newvehicles","phpFile":"finv_new_387.php","sdeId":"387","cruntPage":"0","isUsed":"0","is_done":"0"},{"url":"https://www.capitalfordhillsborough.com/preownedvehicles","phpFile":"finv_used_387.php","sdeId":"387","cruntPage":"0","isUsed":"1","is_done":"0"}]
}; 



const delay = t => new Promise(resolve => setTimeout(resolve, t));

/////////////////////////////////////////////////////////

async function inv_html_data_fetch()
{
 
 var d = new Date();
 let day = d.getDay();
 //copy table
 window.open('http://smartdealerdev1.com/dev_script/cron/copy_showroom_invy_tbl.php?act=copy_showroom_invy_tbl&capcha='+day   , "MsgWindow", "width=200,height=100" );
 
 var obj=  await getStorageData('is_set_data');
 if(obj.is_set_data!='1')
 {   
 	 /*
	 url_data.urls = await fetch("http://smartdealerdev1.com/dev_script/cron/json_dealers_ajax_inventory_fetch.php"  )
	 .then(res => res.json()   )
	 .then((  data ) => data )
	 .catch(e => console.log("something went wrong: " + e)); */
	 await setStorageData({ 'data': url_data.urls , 'is_set_data': '1' });
 }
 
 var urls_obj=  await getStorageData('data');
 console.log(urls_obj);
 
 //////////////////////////////
 for (var i = 0; urls_obj.data.length > i ; i++)
 {
	
	
	await set_data_in_page();
	if(urls_obj.data[i].is_done=='0')
	{
		 if(urls_obj.data[i].cruntPage=='0')
		 {

			console.log("waiting "+'http://smartdealerdev1.com/dev_script/cron/'+urls_obj.data[i].phpFile+'?del_inv=1');
			//window.open('http://smartdealerdev1.com/dev_script/cron/'+urls_obj.data[i].phpFile+'?del_inv=1'  , "MsgWindow", "width=200,height=100" );
			await delay(1000) ;
			console.log("3000 waiting ") 
			 
			 
		 }
		window.open(urls_obj.data[i].url , "crol_page");
 		console.log(i);
		await setStorageData({ 'cIndex': ''+i   });
 		await is_complite_fetch_data(); 
	}
	
	
	
  }
 
  
}


async function set_data_in_page()
{
	var obj=  await getStorageData('data');
 	document.getElementById("json_data_here").innerHTML=JSON.stringify(obj.data);
 	
}


var setObJ;

///////////////////////////////////////////////////////////
 
function is_complite_fetch_data()
{ 
  return new Promise(resolve => {
    setObJ=setInterval( async () => {
	  var obj=  await getStorageData('data');
	  var cIndex_obj=  await getStorageData('cIndex');
	   if(obj.data[parseInt(cIndex_obj.cIndex)].is_done=='1')
	   {
 	   		clearInterval(setObJ);
			resolve('resolved');
	   } 
	   console.log("reslove wait");
	   
     }, 10000);
   });
}

  


///////////////////////////////////////////////////

	//page data fetch

////////////////////////////////////////////////



async function fetch_data_from_url()
{
	 var obj=  await getStorageData('is_set_data');
	 if(obj.is_set_data!='1')
	 {   
		alert('plz open main page');
	 }
	 var obj=  await getStorageData('data');
	 var cIndex_obj=  await getStorageData('cIndex');
	
	
	if(obj.data[parseInt(cIndex_obj.cIndex)].crol_type == undefined )
	{
		
		obj.data[parseInt(cIndex_obj.cIndex)].crol_type=await page_crol_type();
		await setStorageData({ 'data': obj.data   });
		obj=  await getStorageData('data');
		console.log(obj);
		
	}
 	
	if(obj.data[parseInt(cIndex_obj.cIndex)].crol_type=='scrol_invy')
	{
		var count=0;
		var ary=new Array();
		
		var scrollInterval = setInterval( async function()
						{
 							var obj=  await getStorageData('data');
							var cIndex_obj=  await getStorageData('cIndex');
 							 ary[count]=$(document).height();
 							 $(document).scrollTop($(document).height());
							 
							 var len1=ary.length-1;
							 var len2=ary.length-2;
							 var len3=ary.length-3;
							 
							 if( (ary[len1]==ary[len2]  && ary[len2]==ary[len3]) || count>500 )
							 {
 								
								 
								
								save_inv_data(obj.data[parseInt(cIndex_obj.cIndex)]  );
								await delay(1000) ;
								
								 
								
								obj.data[parseInt(cIndex_obj.cIndex)].cruntPage=ary.length;
								obj.data[parseInt(cIndex_obj.cIndex)].is_done=1;
								await setStorageData({ 'data': obj.data   });
								
								obj=  await getStorageData('data');
								console.log('///////after complete page////////////////');
 								console.log(obj);
								clearInterval(scrollInterval);
								window.top.close();
							 }
							 count++;
							 
						},2000);
		
	}
	else if(obj.data[parseInt(cIndex_obj.cIndex)].crol_type=='crol_by_page')
	{
		var scrollInterval = setInterval( async function()
		{
			
 			var page_href=  await getStorageData('pageHref');
			var pageCall=await getStorageData('same_page_called');
			
			console.log(pageCall);
			console.log(page_href);
			
			if(page_href.pageHref==document.location.href )
			{
				pageCall.same_page_called=parseInt(pageCall.same_page_called)+1;
				await setStorageData( { 'pageHref': document.location.href , "same_page_called": pageCall.same_page_called  } );
			}
			else
			{
				pageCall.same_page_called=0;
				await setStorageData( { 'pageHref': document.location.href , "same_page_called":pageCall.same_page_called  } );
			}
			
			obj.data[parseInt(cIndex_obj.cIndex)].cruntPage=parseInt(obj.data[parseInt(cIndex_obj.cIndex)].cruntPage)+1;
			
			$(document).scrollTop($(document).height());
			await delay(1000);
			var nxt_obj=find_next_btn();
			if(find_next_btn()== undefined  ||  pageCall.same_page_called > 1   || obj.data[parseInt(cIndex_obj.cIndex)].cruntPage>70 )
			{
				obj.data[parseInt(cIndex_obj.cIndex)].is_done=1;
				save_inv_data(obj.data[parseInt(cIndex_obj.cIndex)]  );
				await delay(1000);

				
			}
			else
			{
				save_inv_data(obj.data[parseInt(cIndex_obj.cIndex)]  );
				await delay(1000);
				nxt_obj.click();
			}
			await setStorageData({ 'data': obj.data   });
			if(obj.data[parseInt(cIndex_obj.cIndex)].is_done==1      )
			{
				obj=  await getStorageData('data');
									console.log('///////after complete page////////////////');
									console.log(obj);
									clearInterval(scrollInterval);
									 window.top.close();
			}
 		} ,9000);
		
	}
}
///////////////////////////////////////////////////////////

function find_next_btn()
{
	var nc_avlable=new Array( "pageNavigation" , "pagination"  , "search-pagination"  , "aw-pagination" );
	for(  var scls of nc_avlable   )
	{
 		
		
		//$("."+scls+" a:containsIN('next')")[0].click();
		
		if($("."+scls+" a:containsIN('next')").length>0)
		{
			return $("."+scls+" a:containsIN('next')")[0];
		}
		
		/*if($('[class*='+scls+']').length>0)
		{
 			for(  var i=0 ; i<$('[class*='+scls+']').length; i++   )
			 {  
			 	  if($('[class*='+scls+']')[i].getElementsByTagName("a").length>0)
				  {
					  for(  var hobj of $('[class*='+scls+']')[i].getElementsByTagName("a")  )
					  {
							 if(  hobj.innerHTML.search(/Next/ig)>-1  )
							  {
                                  return hobj;
                              
                              }
					  }
				  }
			}
 		}*/
 	}
  }


/////////////////////////////////////////////

function save_inv_data( obj   )
{
 	
	/*var isNew="new";
	if(obj.isUsed==1){  isNew="used";  }
	var data_need_to_submit=document.body.innerHTML.replace(/textarea/ig , "ttt")   ;
 	
	if(document.getElementById('inject_frm_data'))
 	{
		
	}
	else
	{
		var elemDiv = document.createElement('div');
		elemDiv.setAttribute("id","inject_frm_data")
		document.body.appendChild(elemDiv);			
	}
	
	
	document.getElementById('inject_frm_data').innerHTML ='';
	document.getElementById('inject_frm_data').innerHTML = '<form action="//smartdealerdev1.com/dev_script/cron/'+obj.phpFile+'"  id="nfrm_'+obj.sdeId+'"   name="nfrm_'+obj.sdeId+'" method="post" target="_blank"><textarea  id="html_'+isNew+'_'+obj.sdeId+'"  name="html_'+isNew+'_'+obj.sdeId+'" rows="10" style="width:100%;"></textarea><button type="submit">Fetch New Inventory</button></form>';
	
	
	
	setTimeout(function(){
						
	document.getElementById('html_'+isNew+'_'+obj.sdeId).value=document.body.innerHTML.replace(/textarea/ig , "ttt") ;
	document.getElementById("nfrm_"+obj.sdeId).submit(); 
						
						}, 500);*/
  	
}

// AI for what type croler
function page_crol_type()
{ 
   var count=0;
   var doc_height=new Array( 0, 0,0);
   return new Promise(resolve => {
   var myInterval= setInterval( async () => {
	doc_height[count]=$(document).height();
	$(document).scrollTop($(document).height());
	 let len1=count-1;
	 let len2=count-2;
	 let len3=count-3;
	  
	  if( count > 2 )
	  {
	  
	  	console.log(doc_height);
	  
		  if( doc_height[len3]< doc_height[len2] &&  doc_height[len2] < doc_height[len1] )
		  {
			 resolve('scrol_invy');
			 clearInterval(myInterval);
		  }
		  else if(   doc_height[len3] == doc_height[len1]   )
		  {
			  resolve('crol_by_page');
			  clearInterval(myInterval);
		  }/**/
	  }
	  count++;
	  
     }, 8000);
   });
}


////////////////////////////////////////////////////////////////////////////////////////////

if(  document.location.href.search(/\/inven\/fetch.html/g)>0  )
{
	inv_html_data_fetch();
}
else if(  document.location.href.search(/smartdealerdev1.com\/dev_script\/cron\//g)>0  )
{
	setTimeout(function(){
		 window.top.close();
		}, 2000);
}
else
{
	fetch_data_from_url();
}
var site_type="";
setTimeout(function(){

}, 1000);
