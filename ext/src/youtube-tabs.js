$('button.get-list').click(function(){
	console.log('lets get the list');
	loadWindowList();
});

focusedWindowId = undefined;
currentWindowId = undefined;

function loadWindowList() {
	// console.log( gapi );
	// console.log( 'loadWindowList' );
	chrome.windows.getAll({ populate: true }, function(windowList) {
		tabs = {};
		tabIds = [];
		tabURLs = [];
		tabTitles = [];
		for (var i = 0; i < windowList.length; i++) {
			windowList[i].current = (windowList[i].id == currentWindowId);
			windowList[i].focused = (windowList[i].id == focusedWindowId);

			for (var j = 0; j < windowList[i].tabs.length; j++) {
				tabIds[tabIds.length] = windowList[i].tabs[j].id;
				// console.log( windowList[i].tabs[j].url.split( "?" )[0] );
				if( windowList[i].tabs[j].url.split( "?" )[0] == "http://www.youtube.com/watch" ||
					windowList[i].tabs[j].url.split( "?" )[0] == "https://www.youtube.com/watch" )
				{
					tabURLs.push(windowList[i].tabs[j].url);
					tabTitles.push(windowList[i].tabs[j].title);
				}
				// tabURLs[tabURLs.length] = windowList[i].tabs[j].url;
				tabs[windowList[i].tabs[j].id] = windowList[i].tabs[j];
			}
		}

		console.log( "got tabz?" );
		console.log( tabURLs );
		console.log( "titles" );
		console.log( tabTitles );

	});
}

