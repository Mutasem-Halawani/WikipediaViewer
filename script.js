
$('button').on('click',function(){
	let query = $('#search-input').val();
	let form = document.querySelector('#search-form');
	form.reset();
	$('.cards-section').empty();
	searchWiki(query);
})

$('#search-form').on('submit',function(e){
	e.preventDefault();
	let query = e.currentTarget.searchTerm.value;
	let form = document.querySelector('#search-form');
	form.reset();
	$('.cards-section').empty();
	searchWiki(query);
})

let searchWiki = (searchTerm) => {
	$.ajax({
		url: `https://en.wikipedia.org/w/api.php?action=query
		&format=json&list=search&continue=-%7C%7C
		&srsearch=${searchTerm}&srlimit=10&sroffset=10`,
		dataType: 'jsonp',
		success: function(data) {

			let dataArray = data.query.search;
			let HTMLArr = buildHTML(dataArray);

			function buildHTML(dataArray){

				var htmlBlocks = [];
			
				for(let i=0;i<dataArray.length;i++){
					let resultTitle = data.query.search[i].title;
					let resultSnippet = data.query.search[i].snippet;
					let pageId = data.query.search[i].pageid;
					let resultLink = `https://en.wikipedia.org/w/api.php?action=query
					&prop=info&pageids=${pageId}&inprop=url`
					
					let html = `
					<div class="card">
					<a href="${'https://en.wikipedia.org/?curid=' + pageId}" target="_blank">
					<div class="card-body">
					<h4 class="card-title">${resultTitle}</h4>
					<p class="card-text">${resultSnippet}</p>
					</div>
					</a>
					</div>
					`
					htmlBlocks.push(html);
				}

				return htmlBlocks;
			};

			var HTML = '';
			HTMLArr.forEach(function(item){
				HTML += item;
			})

			$('.cards-section').append(HTML);
		}
	})
}