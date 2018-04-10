$("#find-beanie").click(function(){

	var pathStartImg = "http://tycollector.com/boos/boo-images/";
	var pathEndImg;
	var searchName = $("#beanie-name").val();
	var searchCode = $("#beanie-code").val();
	var searchSize = $("#beanie-size").val();

	if(searchSize == "-med" || searchSize == "-lg"){
		pathEndImg = ".png";
	} else {
		pathEndImg = ".jpg";
	}

	var imgPath = pathStartImg+searchName+searchSize+"-"+searchCode+pathEndImg;

	$("#beanie-img").attr("src", imgPath);

	$.getJSON('http://allorigins.me/get?url=http%3A//tycollector.com/boos/'+searchName+searchSize+"-"+searchCode+'.htm&callback=?', function(data){

		var name = $(data.contents).find(".itemname")[0].innerText;
		var species = $(data.contents).find("td .style4")[3].innerText;
		var birthday = $(data.contents).find("td .style4")[6].innerText;
		var poem = removeExtra($(data.contents).find("td .style5")[2].innerText);

		document.querySelector("#beanieName").innerText = name;
		document.querySelector("#beanieSpecies").innerText = species;
		document.querySelector("#beanieBirth").innerText = birthday;
		document.querySelector("#beaniePoem").innerText = poem;
		
		$("#beanie-boo-info").show();

		$("#namePost").val(name);
		$("#speciesPost").val(species);
		$("#birthdayPost").val(birthday);
		$("poemPost").val(poem.toString());

	});
});

function removeExtra(str){
	var splitStr = str.split("");
	var reconstructedString="";
	var flag ="";
	for(var i = 8; i < splitStr.length; i++){
		if(splitStr[i] === "S" && splitStr[i+1] === "W" || splitStr[i] === "A" && splitStr[i+1] === "D"){
			break;
		} else {
			if(isNaN(splitStr[i]) || splitStr[i] === " " && splitStr[i] !== "!"){
				reconstructedString += splitStr[i];
			}	
		}
	}
	return reconstructedString;
}

function addToPath(){
	console.log("ADDTOPATH WORKING");
	console.log("username: " +document.getElementsByName("username").value);
	var action_src = "http://localhost:5000/profile/" + document.getElementsByName("username")[0].value;
    var your_form = document.getElementById('searchForm');
    your_form.action = action_src ;
    return your_form;
}