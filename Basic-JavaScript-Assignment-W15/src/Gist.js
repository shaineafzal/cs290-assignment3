
function getGists(){
	var pages = document.getElementsByName('pages')[0].value
	var language = [];
	var gUrl;
	if(document.getElementsByName('language1')[0].checked == true){
		language.push("Python");
	}
	if(document.getElementsByName('language2')[0].checked == true){
		language.push("JSON");
	}
	if(document.getElementsByName('language3')[0].checked == true){
		language.push("JavaScript");
	}
	if(document.getElementsByName('language4')[0].checked == true){
		language.push("SQL");
	}
	
	for(var j=1; j < (pages+1); ++j){
	var xhr = new XMLHttpRequest();
	
	if(!xhr){
		throw 'Unable to complete HTTP request';		
	}
	
	var url = 'https://api.github.com/gists';
	url + '?page=' + j;
	xhr.onreadystatechange = function(){
		if(this.readyState === 4){
			var gist = JSON.parse(this.responseText)
			var desc,gLang, tmp;
			
			for(var i = 0; i < gist.length; i++){
				for(var files in gist[i]){
						gLang = files[0].language;
					}
				
				tmp = JSON.stringify(gist[i].description);
				if(tmp === 'undefined' || tmp === 'null' || tmp === '""'){
					desc = "No description";
				}
				else{
					desc = tmp;
				}
				
				gUrl = JSON.stringify(gist[i].url);
				createLink(desc, gUrl);
				console.log(desc);
				console.log(gUrl);
			}
		}
	}
	xhr.open('GET', url);
	xhr.send();
	}
}

function createLink(desc, url){
	JSON.stringify(url);
	var unorderedList = document.createElement('ul');
	var listItem = document.createElement('li');
	listItem.innerHTML = '<a href=' + url + '>' + desc + '</a>';
	document.body.appendChild(unorderedList);
	unorderedList.appendChild(listItem);
}