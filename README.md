yt-playlist-plugin
==================

A browser plugin that consolidates all instances of YouTube that are open and creates a playlist and saves it to your YouTube account.

The current build is based off an Extentionizr boilerplate with the following parameters

http://extensionizr.com/!#{"modules":["browser-mode","with-bg","with-persistent-bg","no-options","no-override","inject-js","jquerymin"],"boolean_perms":["tabs"],"match_ptrns":["http://youtube.com"]}


OK, so we're getting a list of youtube tabs.
============================================

It looks like hooking up the OAuth youtube API stuff might be a little trickier

Below is a dump of references

Hacky load into background.js??? - http://stackoverflow.com/a/18682135/313990

Potential library - http://smus.com/oauth2-chrome-extensions/

Once I have a token I can set it - https://groups.google.com/forum/#!topic/google-api-javascript-client/LS5wPf4YO48

Creating a playlist looks fairly simple - https://developers.google.com/youtube/v3/docs/playlists/insert#try-it

App reference - https://code.google.com/apis/youtube/dashboard/gwt/index.html#product/AI39si4y8ouFJhSeoWkaRZr_JkyPKCnXGCHBNRWfWyPr8q2505acD-6A_Yqp3eqpNEVEUcUq8cXJKyytE4njlePQaQLDGwRddA