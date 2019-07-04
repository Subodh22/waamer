

console.log("jumba");


window.onload=function()
{

	//console.log(window);
var script=document.getElementsByTagName("script");
var dont=document.createElement("FORM");
dont.name="myForm";
dont.method='POST';
dont.action='http://localhost:3000/form';
prod_id=document.createElement('INPUT');
prod_id.type='TEXT';
prod_id.name='product_id';
prod_name=document.createElement('INPUT');
prod_name.type='TEXT';
prod_name.name='product_name';
prod_price=document.createElement('INPUT');
prod_price.type='TEXT';
prod_price.name='product_price';
prod_imgs=document.createElement('INPUT');
prod_imgs.type='TEXT';
prod_imgs.name='product_imgs';
prod_sku=document.createElement('INPUT');
prod_sku.type='TEXT';
prod_sku.name='product_sku';
prod_desc=document.createElement('INPUT');
prod_desc.type='TEXT';
prod_desc.name='product_descs';
prod_url=document.createElement('INPUT');
prod_url.type='TEXT';
prod_url.name='product_url';

prod_cc=document.createElement('INPUT');
prod_cc.type='TEXT';
prod_cc.name='product_url';

dont.appendChild(prod_id);
dont.appendChild(prod_name);
dont.appendChild(prod_imgs);
dont.appendChild(prod_price);
dont.appendChild(prod_sku);
dont.appendChild(prod_url);
dont.appendChild(prod_desc);
dont.appendChild(prod_cc);
var fot=document.getElementById("root");
fot.appendChild(dont);
for(i=0;i<script.length;i++)
{
	//console.log(script[i].outerHTML.search("runParams"));
	var carb= /(?<=\{)(.*?)(?=\};)/g;
	if(script[i].outerHTML.search("runParams")>=1)
	{
		//console.log(script[i].innerHTML);
		var fold= script[i].innerHTML.toString();
		var hold=fold.split("data:");
		var coler=hold[1].split("csrfToken");
		//console.log(coler[0]);
		var gotee=coler[0].trimRight();
		var got=gotee+"lolicon";
			var clit=got.split(",lolicon");
		//var newcoler=(coler[0].toString()).replace(/ /g,'').slice(0,-1);
		
		// var newcoler=coler[0].charAt(coler[0].length-1);
	//	console.log(clit[0]);
		 
			//my_tb.value=clit[0];
			var doles=JSON.parse(clit[0]);
			console.log(doles);	
			//console.log(window.location.href);
			prod_name.setAttribute("value",doles.titleModule.subject);
			var prod_skus_price=
			{
				sku_attr:JSON.stringify(doles.skuModule.productSKUPropertyList),
				sku_PriceList:JSON.stringify(doles.skuModule.skuPriceList)
			}
			prod_sku.setAttribute("value",JSON.stringify(prod_skus_price));
			prod_price.setAttribute("value",doles.priceModule.formatedPrice);
			prod_desc.setAttribute("value",JSON.stringify(doles.specsModule.props));
			prod_imgs.setAttribute("value",JSON.stringify(doles.imageModule.imagePathList));
			prod_cc.setAttribute("value",doles.commonModule.currencyCode);
			prod_url.setAttribute("value",window.location.href);
			console.log(dont);
			 dont.submit();
		// console.log(johm.imageModule.imagePathList[0]);
			}
}
// console.log(script[0]);
	
}
function search()
{
	console.log("okacy it swokring");
}

