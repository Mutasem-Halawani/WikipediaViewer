// let searchTerm = 'Jerusalem'; 

$('button').on('click',function(){

	let query = $('#searchForm').val();
	searchWiki(query);
	console.log(query);
	// console.log(this.value);
})


let searchWiki = function (searchTerm){
	$.ajax({
		url: `https://en.wikipedia.org/w/api.php?action=query
		&format=json&list=search&continue=-%7C%7C
		&srsearch=${searchTerm}&srlimit=10&sroffset=10`,
		dataType: 'jsonp',
		success: function(data) {
			console.log(data.query.search[0].title);
			console.log(data.query.search[0].pageid);
			console.log(data.query.search[0].snippet);

			let resultTitle = data.query.search[0].title;
			let resultSnippet = data.query.search[0].snippet;
			let pageId = data.query.search[0].pageid;
			let resultLink = `https://en.wikipedia.org/w/api.php?action=query
			&prop=info&pageids=${pageId}&inprop=url`
			
			let html = `
			<div class="cards-section">
				<div class="card">
					<a href="${resultLink}">
						<div class="card-body">
							<h4 class="card-title">${resultTitle}</h4>
							<p class="card-text">${resultSnippet}</p>
						</div>
					</a>
				</div>
			</div>
			`
			$('.search-section').append(html);
		}
	})
}
