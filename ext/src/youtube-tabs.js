var OAUTH2_CLIENT_ID = '87017487594';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
	console.log( "checkAuth" );
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
	console.log( 'auth result' );
	console.log( authResult );
  if (authResult) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    // handleAPILoaded();
    console.log( 'we got here' );
  });
}






function gapiloaded() {
	console.log( "YAY" );
	// gapi.client.setApiKey("AI39si4y8ouFJhSeoWkaRZr_JkyPKCnXGCHBNRWfWyPr8q2505acD-6A_Yqp3eqpNEVEUcUq8cXJKyytE4njlePQaQLDGwRddA");
	// loadAPIClientInterfaces();
	googleApiClientReady()
}

// gapi.auth.authorize({immediate: true});

// console.log( gapi.auth.getToken() );

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

