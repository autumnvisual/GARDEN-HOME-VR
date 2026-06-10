(function(){
    var script = {
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "children": [
  "this.MainViewer",
  "this.Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0AEF1C12_16A3_8FB1_4188_D5C88CE581C3",
  "this.Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B",
  "this.Container_381217E8_17DC_0505_41A2_85B8D0083AEA",
  "this.Container_2792A64E_17CC_071D_41B0_BEA23997C067",
  "this.Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1",
  "this.Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F",
  "this.Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5"
 ],
 "height": "100%",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Player",
 "borderSize": 0,
 "vrPolyfillScale": 1,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 20,
 "propagateClick": false,
 "scripts": {
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "existsKey": function(key){  return key in window; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getKey": function(key){  return window[key]; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "registerKey": function(key, value){  window[key] = value; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "unregisterKey": function(key){  delete window[key]; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); }
 },
 "defaultVRPointer": "laser",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "downloadEnabled": false,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "verticalAlign": "top",
 "layout": "absolute",
 "paddingTop": 0,
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "overflow": "visible",
 "mouseWheelEnabled": true,
 "scrollBarWidth": 10,
 "definitions": [{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -66.92,
   "backwardYaw": 60.95,
   "distance": 1,
   "panorama": "this.panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA",
 "thumbnailUrl": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_t.jpg",
 "label": "2nd FLOOR Bath Room",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_98886CF7_B244_EFE6_41E0_A5289D6DC278"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_camera"
},
{
 "class": "PlayList",
 "id": "playList_82A91D92_B24C_AE3E_41D5_2E5A6697257B",
 "items": [
  {
   "begin": "this.loopAlbum(this.playList_82A91D92_B24C_AE3E_41D5_2E5A6697257B, 0)",
   "media": "this.album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8",
   "class": "PhotoAlbumPlayListItem",
   "player": "this.ViewerAreaLabeled_386D08AA_17CC_0B05_41A7_5EF26F48CDAFPhotoAlbumPlayer"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154.91,
   "backwardYaw": 96.12,
   "distance": 1,
   "panorama": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF",
 "thumbnailUrl": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_t.jpg",
 "label": "2nd FLOOR Bed Room 2",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_98F82C87_B247_AE25_41E5_F16BFA066178"
 ]
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE",
   "camera": "this.panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E",
   "camera": "this.panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9",
   "camera": "this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE",
   "camera": "this.panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C",
   "camera": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3",
   "camera": "this.panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F",
   "camera": "this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186",
   "camera": "this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5",
   "camera": "this.panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7",
   "camera": "this.panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5",
   "camera": "this.panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1",
   "camera": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5",
   "camera": "this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7",
   "camera": "this.panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA",
   "camera": "this.panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00",
   "camera": "this.panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A",
   "camera": "this.panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF",
   "camera": "this.panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCEC286_B1C7_355C_41D5_761075151FD6",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.15,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_82E43DAE_B24C_AE67_41E1_7770F5811408"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 120.11,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_832C2DCE_B24C_AE27_41E1_62C37BB24D7F"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -143.92,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80EDAE88_B24C_AA2A_41C6_903AA78FB2A2"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 153.9,
   "backwardYaw": -47.83,
   "distance": 1,
   "panorama": "this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5",
 "thumbnailUrl": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_t.jpg",
 "label": "BASEMENT Multymedia",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_94C2D4AA_B244_5E6F_41E2_5BD73FCFB8D7"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.8,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_808F8E7D_B24C_AAE5_41B8_0A4D5C39E4EB"
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR Dinning Room 2",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_2",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_2_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_2.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.41,
   "backwardYaw": -52.1,
   "distance": 1,
   "panorama": "this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE",
 "thumbnailUrl": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_t.jpg",
 "label": "Front_360",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AA0E7971_B1C4_56FA_41E3_6B53FE893588"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 163.2,
   "backwardYaw": -33.26,
   "distance": 1,
   "panorama": "this.panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5",
 "thumbnailUrl": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_t.jpg",
 "label": "BASEMENT Bath",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_94D5320C_B24D_DA27_41B4_868FE692F334"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 127.9,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_8378BDDE_B24C_AE27_41E3_2F91047830FE"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.89,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_831B4DCE_B24C_AE27_41DB_03D8F9910569"
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR Dinning Room",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_3",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_3_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_3.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 146.74,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80544E5D_B24C_AA25_41E1_FABAE9C951D3"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 150.89,
   "backwardYaw": 31.56,
   "distance": 1,
   "panorama": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A",
 "thumbnailUrl": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_t.jpg",
 "label": "2nd FLOOR Pantry",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_98B5B5BD_B244_5E65_41D6_8F43A9575DBA"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "displayOriginPosition": {
  "hfov": 165,
  "class": "RotationalCameraDisplayPosition",
  "yaw": 0,
  "stereographicFactor": 1,
  "pitch": -90
 },
 "initialSequence": "this.sequence_AA60E988_B1C4_762A_41D0_BF9BDAE92D99",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_camera",
 "displayMovements": [
  {
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "linear"
  },
  {
   "targetPitch": 0,
   "duration": 3000,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetStereographicFactor": 0,
   "easing": "cubic_in_out"
  }
 ]
},
{
 "duration": 5000,
 "label": "Imags BASEMENT Garage Room",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_19",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_19_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_19.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -59.89,
   "backwardYaw": 45.38,
   "distance": 1,
   "panorama": "this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 60.95,
   "backwardYaw": -66.92,
   "distance": 1,
   "panorama": "this.panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00",
 "thumbnailUrl": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_t.jpg",
 "label": "2nd FLOOR Bath Tube",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_9BD897DE_B244_5A27_41E4_9243119F5AAB",
  "this.overlay_987628A4_B244_761A_41D5_C26372E79BDC"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.63,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80FDDE7D_B24C_AAE5_41A3_4C95EA79D2B2"
},
{
 "duration": 5000,
 "label": "Right",
 "id": "album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_4",
 "thumbnailUrl": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_4_t.png",
 "width": 1448,
 "image": {
  "levels": [
   {
    "url": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_4.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1086
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -46.45,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_8365BDEE_B24C_A9E7_41B1_F1FBAE99AEF0"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -70.19,
   "backwardYaw": -35.52,
   "distance": 1,
   "panorama": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3",
 "thumbnailUrl": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_t.jpg",
 "label": "1st FLOOR Bath",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_963ACC77_B244_AEE6_41CD_3F7013FBEB6C"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -83.88,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_809FCE6D_B24C_AAEA_41E0_401A2D6AFD36"
},
{
 "label": "Photo Album Interior",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_t.png",
 "playList": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_AlbumPlayList",
 "class": "PhotoAlbum"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -16.8,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83A1FDFE_B24C_A9E7_41CB_94E2A6FD7613"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -22.2,
   "backwardYaw": 36.08,
   "distance": 1,
   "panorama": "this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -3.36,
   "backwardYaw": 36.08,
   "distance": 1,
   "panorama": "this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -3.36,
   "backwardYaw": -16.68,
   "distance": 1,
   "panorama": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E",
 "thumbnailUrl": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_t.jpg",
 "label": "REAR_360",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AF9B89B9_B24C_566D_41C6_593DCB4BD3B3",
  "this.overlay_AEF3257F_B24C_7EE5_41D7_4651BA22E518"
 ]
},
{
 "duration": 5000,
 "label": "Rear",
 "id": "album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_3",
 "thumbnailUrl": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_3_t.png",
 "width": 1448,
 "image": {
  "levels": [
   {
    "url": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_3.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1086
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 113.08,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83447DF8_B24C_A9EA_41CB_774AF941FC33"
},
{
 "duration": 5000,
 "label": "Imags 2nd FLOOR Pantry",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_16",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_16_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_16.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1920
},
{
 "duration": 5000,
 "label": "Imags 2nd FLOOR Bath Room",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_9",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_9_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_9.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_camera"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_camera"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_camera"
},
{
 "duration": 5000,
 "label": "Front",
 "id": "album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_1",
 "thumbnailUrl": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_1_t.png",
 "width": 1448,
 "image": {
  "levels": [
   {
    "url": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_1.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1086
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -148.44,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83DBFE1E_B24C_AA27_41CF_DFCA30A50F61"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 132.17,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83778DE3_B24C_AE1E_41DB_C0BE7636673F"
},
{
 "duration": 5000,
 "label": "3D",
 "id": "album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_0",
 "thumbnailUrl": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_0_t.png",
 "width": 1448,
 "image": {
  "levels": [
   {
    "url": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_0.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1086
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -143.92,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80DBFE8D_B24C_AA25_41D4_E9515FABA539"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -173.19,
   "backwardYaw": 90.85,
   "distance": 1,
   "panorama": "this.panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -35.52,
   "backwardYaw": -70.19,
   "distance": 1,
   "panorama": "this.panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 77.53,
   "backwardYaw": 3.17,
   "distance": 1,
   "panorama": "this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -16.68,
   "backwardYaw": -3.36,
   "distance": 1,
   "panorama": "this.panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 165.96,
   "backwardYaw": -148.06,
   "distance": 1,
   "panorama": "this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C",
 "thumbnailUrl": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_t.jpg",
 "label": "1st FLOOR Kitchen Room",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_93B81DBE_B244_AE67_41D7_1E395D7291D6",
  "this.overlay_901096CF_B244_5A25_41A2_065E598E8D05",
  "this.overlay_961A3B48_B27D_EA2A_41CF_7C9A39C2E853",
  "this.overlay_90E4D979_B27C_D6ED_41DC_09E9712DC0FD",
  "this.overlay_9623A43A_B243_BE6E_41D7_5C6E42546B05"
 ]
},
{
 "duration": 5000,
 "label": "Left",
 "id": "album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_2",
 "thumbnailUrl": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_2_t.png",
 "width": 1448,
 "image": {
  "levels": [
   {
    "url": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_2.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1086
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.1,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80292E2E_B24C_AA66_41BA_174BE67024D4"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 109.81,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_82DDEDAE_B24C_AE67_41C1_8726583CC6D5"
},
{
 "class": "PlayList",
 "id": "ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist",
 "items": [
  {
   "media": "this.panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE",
   "camera": "this.panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E",
   "camera": "this.panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9",
   "camera": "this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE",
   "camera": "this.panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C",
   "camera": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3",
   "camera": "this.panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F",
   "camera": "this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186",
   "camera": "this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5",
   "camera": "this.panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7",
   "camera": "this.panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5",
   "camera": "this.panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1",
   "camera": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5",
   "camera": "this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7",
   "camera": "this.panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA",
   "camera": "this.panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00",
   "camera": "this.panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A",
   "camera": "this.panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF",
   "camera": "this.panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_ADCEC286_B1C7_355C_41D5_761075151FD6",
   "camera": "this.panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 18, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.65,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80765E4D_B24C_AA25_41CE_B0F1BACDEFF3"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 36.08,
   "backwardYaw": -22.2,
   "distance": 1,
   "panorama": "this.panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -174.69,
   "backwardYaw": -4.37,
   "distance": 1,
   "panorama": "this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186",
 "thumbnailUrl": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_t.jpg",
 "label": "BASEMENT Garage",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_9422AD63_B244_AE1D_41AF_AD290B6024F0",
  "this.overlay_95387B4D_B245_AA2A_41B8_394083B2494D"
 ]
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR Kitchen Room 2",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_6",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_6_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_6.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1704
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 162.32,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83ED9E1E_B24C_AA27_41D1_0C2730857D40"
},
{
 "duration": 5000,
 "label": "Imags BASEMENT Bath",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_17",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_17_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_17.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.94,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83308DBE_B24C_AE67_41C5_28A5FCAB827A"
},
{
 "viewerArea": "this.ViewerAreaLabeled_386D08AA_17CC_0B05_41A7_5EF26F48CDAF",
 "class": "PhotoAlbumPlayer",
 "id": "ViewerAreaLabeled_386D08AA_17CC_0B05_41A7_5EF26F48CDAFPhotoAlbumPlayer",
 "buttonPrevious": [
  "this.IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D",
  "this.IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F"
 ],
 "buttonNext": [
  "this.IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6",
  "this.IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_camera"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 5.31,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_803B1E2E_B24C_AA66_41D5_B273F30358CE"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.09,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_8016EE3E_B24C_AA66_41CE_BE1A97CD85F5"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.79,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80A05E6D_B24C_AAEA_41E5_207247AAC0C0"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -102.47,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83CBEE28_B24C_AA6B_41B1_5D81F86FC79E"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 3.17,
   "backwardYaw": 77.53,
   "distance": 1,
   "panorama": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -4.37,
   "backwardYaw": -174.69,
   "distance": 1,
   "panorama": "this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -47.83,
   "backwardYaw": 153.9,
   "distance": 1,
   "panorama": "this.panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F",
 "thumbnailUrl": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_t.jpg",
 "label": "BASEMENT Lobby",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_964D2252_B244_5A3E_41D3_5771F7873E3F",
  "this.overlay_95677329_B244_DA6A_41D0_D47B919F036E",
  "this.overlay_983636B8_B244_7A6B_41D2_D357F3A59B0F",
  "this.overlay_94A16688_B244_7A2A_41C3_A9FD8DF61892"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 31.56,
   "backwardYaw": 150.89,
   "distance": 1,
   "panorama": "this.panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 96.12,
   "backwardYaw": 154.91,
   "distance": 1,
   "panorama": "this.panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 166.21,
   "backwardYaw": 28.54,
   "distance": 1,
   "panorama": "this.panorama_ADCEC286_B1C7_355C_41D5_761075151FD6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.11,
   "backwardYaw": 92.35,
   "distance": 1,
   "panorama": "this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -17.68,
   "backwardYaw": -118.17,
   "distance": 1,
   "panorama": "this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1",
 "thumbnailUrl": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_t.jpg",
 "label": "2nd FLOOR Lobby",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_9500324C_B24C_DA2B_41C8_352FA3DAA8E3",
  "this.overlay_95A37AF1_B24C_ABFD_41CD_75E00E26E23D",
  "this.overlay_959590A8_B24C_566A_41BC_B3C9BE1E8E32",
  "this.overlay_9A793F91_B24C_6A3A_41E2_2B9685CE653D",
  "this.overlay_948C56E3_B24F_BA1D_41E0_5BCF564B12F4"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_camera"
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR Kitchen Room",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_7",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_7_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_7.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR 2",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_0",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_0_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_0.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1704
},
{
 "duration": 5000,
 "label": "Imags BASEMENT Lobby",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_20",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_20_t.png",
 "width": 1260,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_20.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 840
},
{
 "viewerArea": "this.ViewerAreaLabeled_2F7D75D9_1744_0506_41B5_EA00300636BE",
 "class": "PhotoAlbumPlayer",
 "id": "ViewerAreaLabeled_2F7D75D9_1744_0506_41B5_EA00300636BEPhotoAlbumPlayer",
 "buttonPrevious": [
  "this.IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D",
  "this.IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F"
 ],
 "buttonNext": [
  "this.IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6",
  "this.IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.64,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_82C49DBE_B24C_AE67_41AA_5024BD788F3F"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.83,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_82C9EDB9_B24C_AE6A_41E2_2CCE0A47D4F9"
},
{
 "label": "Photo Album Exterior",
 "id": "album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8",
 "thumbnailUrl": "media/album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_t.png",
 "playList": "this.album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_AlbumPlayList",
 "class": "PhotoAlbum"
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR Bath",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_1",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_1_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_1.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -163.89,
   "backwardYaw": -71.94,
   "distance": 1,
   "panorama": "this.panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -148.06,
   "backwardYaw": 165.96,
   "distance": 1,
   "panorama": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -52.1,
   "backwardYaw": 0.41,
   "distance": 1,
   "panorama": "this.panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -118.17,
   "backwardYaw": -17.68,
   "distance": 1,
   "panorama": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9",
 "thumbnailUrl": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_t.jpg",
 "label": "1st FLOOR Great Room",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AD67858C_B244_FE2B_41E5_2AD68E46E45A",
  "this.overlay_9238510B_B24C_B62E_41E4_D99EEC4BEFDB",
  "this.overlay_96DF81A0_B27D_F61A_41DD_709DEDCDD43E",
  "this.overlay_90727DD6_B27D_AE26_41E0_93B0F70D5625"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_camera"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_camera"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 61.83,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_8064FE4D_B24C_AA25_41E2_CA61A722278D"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_camera"
},
{
 "duration": 5000,
 "label": "Imags 2nd FLOOR Bed Room 2",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_11",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_11_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_11.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -14.04,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_838F9E0E_B24C_AA27_41C7_45256CA0F408"
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR Great Room",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_5",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_5_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_5.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1704
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": "this.sequence_83FDCE19_B24C_AA2A_41E0_4EE640BE79D7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.59,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83FDEE19_B24C_AA2A_41D8_1AEB312484B8"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 28.54,
   "backwardYaw": 166.21,
   "distance": 1,
   "panorama": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCEC286_B1C7_355C_41D5_761075151FD6",
 "thumbnailUrl": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_t.jpg",
 "label": "2nd FLOOR Bed Room 3",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_993655B3_B244_DE7E_41DD_3BB259421D63"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_camera"
},
{
 "duration": 5000,
 "label": "Imags 2nd FLOOR Lobby",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_14",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_14_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_14.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1920
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR Great Room 2",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_4",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_4_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_4.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1704
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": [
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB"
 ],
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -33.26,
   "backwardYaw": 163.2,
   "distance": 1,
   "panorama": "this.panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7",
 "thumbnailUrl": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_t.jpg",
 "label": "BASEMENT Bed Room",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_94E6E414_B244_5E3B_419F_40170A70D4B2",
  "this.overlay_9A36B74A_B243_DA2E_41E5_ECD48F97F3CF"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 108.06,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83907DFE_B24C_A9E7_41D4_764DE5112C2C"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 144.48,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_83B25DFE_B24C_A9E7_41D8_D954257886E6"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.81,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80426E5D_B24C_AA25_41B9_A7745CAA7E5F"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_camera"
},
{
 "duration": 5000,
 "label": "Imags BASEMENT Multymedia Room",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_21",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_21_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_21.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -134.62,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_8354DDEE_B24C_A9E7_41E3_5A0A6E06C32D"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.46,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_8006FE48_B24C_AA2A_41D6_9627A1C2D0F8"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 90.85,
   "backwardYaw": -173.19,
   "distance": 1,
   "panorama": "this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -71.94,
   "backwardYaw": -163.89,
   "distance": 1,
   "panorama": "this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE",
 "thumbnailUrl": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_t.jpg",
 "label": "1st FLOOR Dinning Room",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_93380C58_B24D_AE2B_41B0_3AC641F6CFA2",
  "this.overlay_9184E895_B27F_F63A_41CA_1D3D75F1F556",
  "this.overlay_9004FB2E_B27F_AA67_41E1_9229A00BD393"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.11,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80B27E67_B24C_AAE5_41C2_AFF990DC65C8"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_camera"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -119.05,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_82EA0D9E_B24C_AE26_41DC_958380822814"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -129.47,
   "backwardYaw": 133.55,
   "distance": 1,
   "panorama": "this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7",
 "thumbnailUrl": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_t.jpg",
 "label": "2nd FLOOR Closet",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_98342C26_B244_AE66_41E5_3CD1AAD39747"
 ]
},
{
 "class": "PlayList",
 "id": "playList_82A49D94_B24C_AE3A_41E4_A687E5137E69",
 "items": [
  {
   "begin": "this.loopAlbum(this.playList_82A49D94_B24C_AE3A_41E4_A687E5137E69, 0)",
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB",
   "class": "PhotoAlbumPlayListItem",
   "player": "this.ViewerAreaLabeled_2F7D75D9_1744_0506_41B5_EA00300636BEPhotoAlbumPlayer"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 45.38,
   "backwardYaw": -59.89,
   "distance": 1,
   "panorama": "this.panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 92.35,
   "backwardYaw": -2.11,
   "distance": 1,
   "panorama": "this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 133.55,
   "backwardYaw": -129.47,
   "distance": 1,
   "panorama": "this.panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5",
 "thumbnailUrl": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_t.jpg",
 "label": "2nd FLOOR Master Bed Room",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_9A41AD96_B24D_AE26_41D9_D522759AFEA8",
  "this.overlay_9A87024E_B24C_5A27_41DD_A8B499204C02",
  "this.overlay_9AC13C6A_B24C_6EEF_41AD_9AEF7A5180B1",
  "this.overlay_98883F8A_B243_EA2E_41D1_DCEE79DE1058"
 ]
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_camera"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_camera"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 50.53,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_830AADD9_B24C_AE2A_41C8_46A38EDCBD7F"
},
{
 "duration": 5000,
 "label": "Imags BASEMENT Bed Room",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_18",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_18_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_18.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "duration": 5000,
 "label": "Imags 2nd FLOOR Closet",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_13",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_13_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_13.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1704
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_camera"
},
{
 "duration": 5000,
 "label": "Imags 2nd FLOOR Bed Room 3",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_12",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_12_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_12.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "duration": 5000,
 "label": "Imags 2nd FLOOR Master Bed Room",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_15",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_15_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_15.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1706
},
{
 "duration": 5000,
 "label": "Imags 2nd FLOOR Bath Tube",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_10",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_10_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_10.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1704
},
{
 "duration": 5000,
 "label": "Imags 1st FLOOR Lobby",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_8",
 "thumbnailUrl": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_8_t.png",
 "width": 2560,
 "image": {
  "levels": [
   {
    "url": "media/album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_8.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "Photo",
 "height": 1704
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -29.11,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80193E3E_B24C_AA66_41E4_74914E98099E"
},
{
 "manualRotationSpeed": 197,
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.32,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_80CB4E8D_B24C_AA25_41E0_88DF1A775D20"
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 10,
 "data": {
  "name": "Main Viewer"
 },
 "toolTipBorderSize": 1,
 "id": "MainViewer",
 "left": 0,
 "toolTipPaddingTop": 7,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingLeft": 10,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 50,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 0.5,
 "toolTipFontSize": 13,
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 0,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0
},
{
 "children": [
  "this.Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
  "this.Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA"
 ],
 "id": "Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "right": "0%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "height": "12.832%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "--- MENU"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "backgroundOpacity": 0,
 "width": 115.05,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "class": "Container",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": 641,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "-- SETTINGS"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_0A7329D7_16A2_88BF_418A_F3BE254A76EE",
  "this.Container_33F2D10A_17CC_3D05_4199_54BCA881FB17",
  "this.Label_0A5C65D9_16A5_98B3_41B4_573FE3033A1F",
  "this.Label_0B130419_16A3_7FB3_41A4_E5F9FA0AC39B"
 ],
 "id": "Container_0AEF1C12_16A3_8FB1_4188_D5C88CE581C3",
 "left": 30,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 573,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": 25,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": 116,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "--STICKER"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_386EC8AA_17CC_0B05_41A6_7EFCA2EDC23B",
  "this.Container_386C28AA_17CC_0B05_41B7_3334E854CA29"
 ],
 "id": "Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "--INFO photoalbum"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_3811F7E8_17DC_0505_417B_3406AEA143C9"
 ],
 "id": "Container_381217E8_17DC_0505_41A2_85B8D0083AEA",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_381217E8_17DC_0505_41A2_85B8D0083AEA, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_2792F64D_17CC_071F_415E_8686768A06D3"
 ],
 "id": "Container_2792A64E_17CC_071D_41B0_BEA23997C067",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2792A64E_17CC_071D_41B0_BEA23997C067, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "--LOCATION"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_245BFB6E_173C_0D1A_41B3_7C2B11B7D45E"
 ],
 "id": "Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "--FLOORPLAN"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_20EC97A3_174C_050A_41B2_EEE2BFFB8076"
 ],
 "id": "Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_183FA20E_17B1_6AC3_41A6_A5FD4E159AED",
  "this.Container_1830920E_17B1_6AC3_41B2_4E4AC4718E27"
 ],
 "id": "Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "--CONTACT"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "class": "IconButton",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "toggle",
 "paddingTop": 0,
 "height": 58,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "class": "IconButton",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "toggle",
 "paddingTop": 0,
 "height": 58,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "data": {
  "name": "IconButton MUTE"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.58,
   "image": "this.AnimatedImageResource_86961DD4_B244_6E3B_41C7_8146C01589B4",
   "yaw": -66.92,
   "pitch": -3.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_98886CF7_B244_EFE6_41E0_A5289D6DC278",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00, this.camera_82EA0D9E_B24C_AE26_41DC_958380822814); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -66.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.58,
   "image": "this.AnimatedImageResource_86956DD4_B244_6E3B_41D9_745D14509F39",
   "yaw": 154.91,
   "pitch": -3.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_98F82C87_B247_AE25_41E5_F16BFA066178",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1, this.camera_809FCE6D_B24C_AAEA_41E0_401A2D6AFD36); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.54,
   "image": "this.AnimatedImageResource_869AADD4_B244_6E3B_41DF_3F7DE2BA0D37",
   "yaw": 153.9,
   "pitch": -7.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_94C2D4AA_B244_5E6F_41E2_5BD73FCFB8D7",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F, this.camera_83778DE3_B24C_AE1E_41DB_C0BE7636673F); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_AEAB6EFB_B244_EBEE_41D1_D19D25C9F1D6",
   "yaw": 0.41,
   "pitch": -0.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AA0E7971_B1C4_56FA_41E3_6B53FE893588",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9, this.camera_8378BDDE_B24C_AE27_41E3_2F91047830FE); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_8699ADD4_B244_6E3B_41E0_BCEF1B7E7B08",
   "yaw": 163.2,
   "pitch": 2.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_94D5320C_B24D_DA27_41B4_868FE692F334",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7, this.camera_80544E5D_B24C_AA25_41E1_FABAE9C951D3); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 163.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.53,
   "image": "this.AnimatedImageResource_86953DD4_B244_6E3B_41E4_D2A5819072C5",
   "yaw": 150.89,
   "pitch": -8.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_98B5B5BD_B244_5E65_41D6_8F43A9575DBA",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1, this.camera_83DBFE1E_B24C_AA27_41CF_DFCA30A50F61); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 150.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.01
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "class": "PanoramaCameraSequence",
 "id": "sequence_AA60E988_B1C4_762A_41D0_BF9BDAE92D99",
 "movements": [
  {
   "yawDelta": 18.5,
   "class": "DistancePanoramaCameraMovement",
   "easing": "cubic_in",
   "yawSpeed": 7.96
  },
  {
   "yawDelta": 323,
   "class": "DistancePanoramaCameraMovement",
   "easing": "linear",
   "yawSpeed": 7.96
  },
  {
   "yawDelta": 18.5,
   "class": "DistancePanoramaCameraMovement",
   "easing": "cubic_out",
   "yawSpeed": 7.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.57,
   "image": "this.AnimatedImageResource_86966DD4_B244_6E3B_41DA_F019041F9B09",
   "yaw": -59.89,
   "pitch": -4.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9BD897DE_B244_5A27_41E4_9243119F5AAB",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5, this.camera_8354DDEE_B24C_A9E7_41E3_5A0A6E06C32D); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -59.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.58,
   "image": "this.AnimatedImageResource_8696ADD4_B244_6E3B_41D7_FE7762DB9891",
   "yaw": 60.95,
   "pitch": -3.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_987628A4_B244_761A_41D5_C26372E79BDC",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA, this.camera_83447DF8_B24C_A9EA_41CB_774AF941FC33); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 60.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.4,
   "image": "this.AnimatedImageResource_869C9DD4_B244_6E3B_41C2_E32F3C5B854D",
   "yaw": -70.19,
   "pitch": -14.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_963ACC77_B244_AEE6_41CD_3F7013FBEB6C",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C, this.camera_83B25DFE_B24C_A9E7_41D8_D954257886E6); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -70.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.04
  }
 ]
},
{
 "class": "PhotoPlayList",
 "id": "album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_AlbumPlayList",
 "items": [
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.30",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.38"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_8",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.57",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.72"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_5",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.33",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.47"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_4",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.37",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.72"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_0",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.60",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.36"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_3",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.35"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_2",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.44",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.51"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_6",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.44",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.41"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_7",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.68",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.57"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_1",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.74",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.31"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_20",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.70",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.45"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_21",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.41",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.31"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_19",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.27",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.55"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_18",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.58",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.31"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_17",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.29",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.75"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_14",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.71",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.31"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_15",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.48",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.36"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_13",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.51",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.73"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_10",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.40",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.57"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_9",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.54",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.25"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_16",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.36",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.43"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_11",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.68",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.64"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_BC2D68E4_B1C3_B61B_41E4_A24F43EA4ADB_12",
   "class": "PhotoPlayListItem"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_9652CFCA_B244_6A2F_41E3_E4F14B3B15A0",
   "yaw": -22.2,
   "pitch": -2.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AF9B89B9_B24C_566D_41C6_593DCB4BD3B3",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186, this.camera_80EDAE88_B24C_AA2A_41C6_903AA78FB2A2); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -22.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.26,
   "image": "this.AnimatedImageResource_96525FCA_B244_6A2F_4172_31A8F41AACB4",
   "yaw": -3.36,
   "pitch": 18.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AEF3257F_B24C_7EE5_41D7_4651BA22E518",
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C, this.camera_80CB4E8D_B24C_AA25_41E0_88DF1A775D20); this.mainPlayList.set('selectedIndex', 7); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 18.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.54,
   "image": "this.AnimatedImageResource_97167EF2_B244_6BFF_41D7_71E1DB0F1903",
   "yaw": 77.53,
   "pitch": -7.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_93B81DBE_B244_AE67_41D7_1E395D7291D6",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F, this.camera_82C9EDB9_B24C_AE6A_41E2_2CCE0A47D4F9); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 77.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.57,
   "image": "this.AnimatedImageResource_9716EEF2_B244_6BFF_41D3_6353CD19DF20",
   "yaw": -16.68,
   "pitch": -4.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_901096CF_B244_5A25_41A2_065E598E8D05",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E, this.camera_82C49DBE_B24C_AE67_41AA_5024BD788F3F); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -16.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.24,
   "image": "this.AnimatedImageResource_869D9DD4_B244_6E3B_41C6_48CA2F4926A3",
   "yaw": -173.19,
   "pitch": -18.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_961A3B48_B27D_EA2A_41CF_7C9A39C2E853",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE, this.camera_82E43DAE_B24C_AE67_41E1_7770F5811408); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.5,
   "image": "this.AnimatedImageResource_869DCDD4_B244_6E3B_41DC_49AF88E7062D",
   "yaw": 165.96,
   "pitch": -9.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_90E4D979_B27C_D6ED_41DC_09E9712DC0FD",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9, this.camera_83308DBE_B24C_AE67_41C5_28A5FCAB827A); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 165.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.55,
   "image": "this.AnimatedImageResource_869C0DD4_B244_6E3B_41D2_D8F1D4F2992D",
   "yaw": -35.52,
   "pitch": -6.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9623A43A_B243_BE6E_41D7_5C6E42546B05",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3, this.camera_82DDEDAE_B24C_AE67_41C1_8726583CC6D5); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_869A1DD4_B244_6E3B_41D3_9EB059CD1F3B",
   "yaw": 36.08,
   "pitch": -2.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9422AD63_B244_AE1D_41AF_AD290B6024F0",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E, this.camera_808F8E7D_B24C_AAE5_41B8_0A4D5C39E4EB); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 36.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_869A6DD4_B244_6E3B_41D8_C94E5A322D24",
   "yaw": -174.69,
   "pitch": -1.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_95387B4D_B245_AA2A_41B8_394083B2494D",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F, this.camera_80FDDE7D_B24C_AAE5_41A3_4C95EA79D2B2); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -174.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.73
  }
 ]
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "data": {
  "name": "Viewer info 1"
 },
 "toolTipBorderSize": 1,
 "id": "ViewerAreaLabeled_386D08AA_17CC_0B05_41A7_5EF26F48CDAF",
 "left": 0,
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "right": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 6,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#000000",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "minWidth": 1,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": 0,
 "bottom": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0
},
{
 "transparencyActive": true,
 "maxHeight": 130,
 "id": "IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D.png",
 "class": "IconButton",
 "width": "8%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 70,
 "borderSize": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 70,
 "paddingTop": 0,
 "height": "8%",
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D_rollover.png",
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D_pressed.png",
 "data": {
  "name": "IconButton left arrow"
 },
 "cursor": "hand",
 "maxWidth": 130
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "id": "IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F.png",
 "class": "IconButton",
 "width": "10%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 70,
 "borderSize": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 70,
 "paddingTop": 0,
 "height": "10%",
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F_rollover.png",
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F_pressed.png",
 "data": {
  "name": "IconButton left arrow"
 },
 "cursor": "hand",
 "maxWidth": 150
},
{
 "transparencyActive": true,
 "maxHeight": 130,
 "id": "IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6.png",
 "class": "IconButton",
 "width": "8%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 70,
 "borderSize": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 70,
 "paddingTop": 0,
 "height": "8%",
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6_rollover.png",
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6_pressed.png",
 "data": {
  "name": "IconButton right arrow"
 },
 "cursor": "hand",
 "maxWidth": 130
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "id": "IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33.png",
 "class": "IconButton",
 "width": "10%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 70,
 "borderSize": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 70,
 "paddingTop": 0,
 "height": "10%",
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33_rollover.png",
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33_pressed.png",
 "data": {
  "name": "IconButton right arrow"
 },
 "cursor": "hand",
 "maxWidth": 150
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.52,
   "image": "this.AnimatedImageResource_869CCDD4_B244_6E3B_41E4_BD2FCAB37948",
   "yaw": -47.83,
   "pitch": -8.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_964D2252_B244_5A3E_41D3_5771F7873E3F",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5, this.camera_80292E2E_B24C_AA66_41BA_174BE67024D4); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -47.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.39,
   "image": "this.AnimatedImageResource_869B3DD4_B244_6E3B_41C6_564E6E7DF104",
   "yaw": 3.17,
   "pitch": 14.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_95677329_B244_DA6A_41D0_D47B919F036E",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C, this.camera_83CBEE28_B24C_AA6B_41B1_5D81F86FC79E); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 14.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_869B7DD4_B244_6E3B_41C1_C482D8D704C9",
   "yaw": -4.37,
   "pitch": -1.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_983636B8_B244_7A6B_41D2_D357F3A59B0F",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186, this.camera_803B1E2E_B24C_AA66_41D5_B273F30358CE); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_869BDDD4_B244_6E3B_41DD_0F1869CF48A6",
   "yaw": -12.91,
   "pitch": -2.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_94A16688_B244_7A2A_41C3_A9FD8DF61892",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -12.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.64,
   "image": "this.AnimatedImageResource_86981DD4_B244_6E3B_41D1_A48ABA28B0E3",
   "yaw": -17.68,
   "pitch": -31.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9500324C_B24C_DA2B_41C8_352FA3DAA8E3",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9, this.camera_8064FE4D_B24C_AA25_41E2_CA61A722278D); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -17.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.48,
   "image": "this.AnimatedImageResource_86987DD4_B244_6E3B_41DF_03CE3DE9CFB8",
   "yaw": 31.56,
   "pitch": -10.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_95A37AF1_B24C_ABFD_41CD_75E00E26E23D",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A, this.camera_80193E3E_B24C_AA66_41E4_74914E98099E); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 31.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.52,
   "image": "this.AnimatedImageResource_8698DDD4_B244_6E3B_41E5_39FE41DE1419",
   "yaw": 96.12,
   "pitch": -8.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_959590A8_B24C_566A_41BC_B3C9BE1E8E32",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF, this.camera_8016EE3E_B24C_AA66_41CE_BE1A97CD85F5); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.54,
   "image": "this.AnimatedImageResource_86973DD4_B244_6E3B_41D1_3DEF6EE4806A",
   "yaw": 166.21,
   "pitch": -7.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9A793F91_B24C_6A3A_41E2_2B9685CE653D",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCEC286_B1C7_355C_41D5_761075151FD6, this.camera_8006FE48_B24C_AA2A_41D6_9627A1C2D0F8); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.56,
   "image": "this.AnimatedImageResource_86978DD4_B244_6E3B_41E1_7665D496C194",
   "yaw": -2.11,
   "pitch": -5.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_948C56E3_B24F_BA1D_41E0_5BCF564B12F4",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5, this.camera_80765E4D_B24C_AA25_41CE_B0F1BACDEFF3); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.49
  }
 ]
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "data": {
  "name": "Viewer photoalbum"
 },
 "toolTipBorderSize": 1,
 "id": "ViewerAreaLabeled_2F7D75D9_1744_0506_41B5_EA00300636BE",
 "left": 0,
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "right": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 6,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#000000",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "minWidth": 1,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": 0,
 "bottom": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0
},
{
 "class": "PhotoPlayList",
 "id": "album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_AlbumPlayList",
 "items": [
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.55",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.49"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_0",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.26",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.34"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_1",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.59",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.61"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_2",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.68",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.32"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_3",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "targetPosition": {
     "x": "0.56",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1.1,
     "y": "0.39"
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "zoomFactor": 1,
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside"
   },
   "media": "this.album_ADED8C21_B1C4_AE1D_41E5_EA5802360DF8_4",
   "class": "PhotoPlayListItem"
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.51,
   "image": "this.AnimatedImageResource_9719FEF2_B244_6BFF_41E3_986CE0B7B244",
   "yaw": -52.1,
   "pitch": -9.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AD67858C_B244_FE2B_41E5_2AD68E46E45A",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE, this.camera_83FDEE19_B24C_AA2A_41D8_1AEB312484B8); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -52.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.38,
   "image": "this.AnimatedImageResource_9718DEF2_B244_6BFF_41B4_01E2C5055E54",
   "yaw": -118.17,
   "pitch": 14.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9238510B_B24C_B62E_41E4_D99EEC4BEFDB",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1, this.camera_83ED9E1E_B24C_AA27_41D1_0C2730857D40); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -118.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 14.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.36,
   "image": "this.AnimatedImageResource_869F8DD4_B244_6E3B_41E3_9244AB1F9CD3",
   "yaw": -163.89,
   "pitch": -15.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_96DF81A0_B27D_F61A_41DD_709DEDCDD43E",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE, this.camera_83907DFE_B24C_A9E7_41D4_764DE5112C2C); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.58,
   "image": "this.AnimatedImageResource_869FFDD4_B244_6E3B_41D9_0F4DBB6949E0",
   "yaw": -148.06,
   "pitch": -3.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_90727DD6_B27D_AE26_41E0_93B0F70D5625",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C, this.camera_838F9E0E_B24C_AA27_41C7_45256CA0F408); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.74
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "class": "PanoramaCameraSequence",
 "id": "sequence_83FDCE19_B24C_AA2A_41E0_4EE640BE79D7",
 "movements": [
  {
   "yawDelta": 18.5,
   "class": "DistancePanoramaCameraMovement",
   "easing": "cubic_in",
   "yawSpeed": 7.96
  },
  {
   "yawDelta": 323,
   "class": "DistancePanoramaCameraMovement",
   "easing": "linear",
   "yawSpeed": 7.96
  },
  {
   "yawDelta": 18.5,
   "class": "DistancePanoramaCameraMovement",
   "easing": "cubic_out",
   "yawSpeed": 7.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.55,
   "image": "this.AnimatedImageResource_8695CDD4_B244_6E3B_41E5_B06F4AF489E6",
   "yaw": 28.54,
   "pitch": -6.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_993655B3_B244_DE7E_41DD_3BB259421D63",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1, this.camera_80A05E6D_B24C_AAEA_41E5_207247AAC0C0); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.5
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 37,
 "id": "IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
 "backgroundOpacity": 0,
 "width": 49,
 "paddingRight": 0,
 "right": 30,
 "paddingLeft": 0,
 "class": "IconButton",
 "iconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "bottom": 8,
 "minWidth": 1,
 "mode": "push",
 "paddingTop": 0,
 "height": 37,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand",
 "maxWidth": 49
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "class": "IconButton",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "paddingTop": 0,
 "height": 58,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "horizontalAlign": "center",
 "visible": false,
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "class": "IconButton",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "toggle",
 "paddingTop": 0,
 "height": 58,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "data": {
  "name": "IconButton HS "
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "class": "IconButton",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "toggle",
 "paddingTop": 0,
 "height": 58,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "data": {
  "name": "IconButton GYRO"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.57,
   "image": "this.AnimatedImageResource_86991DD4_B244_6E3B_41D5_1E6C5875C09B",
   "yaw": -33.26,
   "pitch": 4.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_94E6E414_B244_5E3B_419F_40170A70D4B2",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5, this.camera_83A1FDFE_B24C_A9E7_41CB_94E2A6FD7613); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -33.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_86995DD4_B244_6E3B_41D9_20A008C0E1F7",
   "yaw": 171.74,
   "pitch": 1.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9A36B74A_B243_DA2E_41E5_ECD48F97F3CF",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.58,
   "image": "this.AnimatedImageResource_9717DEF2_B244_6BFF_41E5_B83D65309EC4",
   "yaw": -105.61,
   "pitch": -3.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_93380C58_B24D_AE2B_41B0_3AC641F6CFA2",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -105.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.38,
   "image": "this.AnimatedImageResource_869E6DD4_B244_6E3B_41E4_C44C6EC1C54D",
   "yaw": -71.94,
   "pitch": -14.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9184E895_B27F_F63A_41CA_1D3D75F1F556",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9, this.camera_80B27E67_B24C_AAE5_41C2_AFF990DC65C8); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -71.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.47,
   "image": "this.AnimatedImageResource_869EADD4_B244_6E3B_41D4_982DFB1277F9",
   "yaw": 90.85,
   "pitch": -11.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9004FB2E_B27F_AA67_41E1_9229A00BD393",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C, this.camera_80426E5D_B24C_AA25_41B9_A7745CAA7E5F); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_8697BDD4_B244_6E3B_41C7_A306DDADA01A",
   "yaw": -129.47,
   "pitch": -2.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_98342C26_B244_AE66_41E5_3CD1AAD39747",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5, this.camera_8365BDEE_B24C_A9E7_41B1_F1FBAE99AEF0); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -129.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_8697CDD4_B244_6E3B_41E0_E2A030CA328D",
   "yaw": 45.38,
   "pitch": -2.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9A41AD96_B24D_AE26_41D9_D522759AFEA8",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00, this.camera_832C2DCE_B24C_AE27_41E1_62C37BB24D7F); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 45.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.51,
   "image": "this.AnimatedImageResource_86965DD4_B244_6E3B_41DB_B467327732A1",
   "yaw": 133.55,
   "pitch": -9.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9A87024E_B24C_5A27_41DD_A8B499204C02",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7, this.camera_830AADD9_B24C_AE2A_41C8_46A38EDCBD7F); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.37,
   "image": "this.AnimatedImageResource_86968DD4_B244_6E3B_41D9_5A3256EC40A3",
   "yaw": -134.5,
   "pitch": -15.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9AC13C6A_B24C_6EEF_41AD_9AEF7A5180B1",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -134.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.57,
   "image": "this.AnimatedImageResource_8696FDD4_B244_6E3B_41E2_57D9B7462647",
   "yaw": 92.35,
   "pitch": -4.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_98883F8A_B243_EA2E_41D1_DCEE79DE1058",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1, this.camera_831B4DCE_B24C_AE27_41DB_03D8F9910569); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.24
  }
 ]
},
{
 "maxHeight": 2,
 "id": "Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_outside",
 "paddingRight": 0,
 "right": "0%",
 "class": "Image",
 "url": "skin/Image_9511127C_9B79_D2C1_41D8_D080B87BFD84.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "bottom": 53,
 "minWidth": 1,
 "paddingTop": 0,
 "height": 2,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "white line"
 },
 "maxWidth": 3000
},
{
 "children": [
  "this.Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
  "this.Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
  "this.Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
  "this.Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
  "this.Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
  "this.Button_33E0F47E_11C1_A20D_419F_BB809AD89259"
 ],
 "id": "Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 30,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 1199,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "gap": 3,
 "paddingTop": 0,
 "height": 51,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "-button set container"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "backgroundOpacity": 0,
 "width": 110,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "class": "Container",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "horizontal",
 "gap": 10,
 "paddingTop": 0,
 "height": 110,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "button menu sup"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "right": "0%",
 "width": "91.304%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 3,
 "paddingTop": 0,
 "height": "85.959%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "visible": false,
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_0A7329D7_16A2_88BF_418A_F3BE254A76EE",
 "left": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 188,
 "class": "Container",
 "borderSize": 0,
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0.01
 ],
 "top": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 44,
 "verticalAlign": "top",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "minWidth": 1,
 "paddingTop": 0,
 "backgroundColor": [
  "#FF361B"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "red block"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "shadowVerticalLength": 0,
 "id": "Container_33F2D10A_17CC_3D05_4199_54BCA881FB17",
 "left": "0%",
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 286,
 "class": "Container",
 "shadowOpacity": 0.5,
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": 48,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 68,
 "verticalAlign": "top",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "minWidth": 1,
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "white block"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 10,
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "data": {
  "name": "text 1"
 },
 "id": "Label_0A5C65D9_16A5_98B3_41B4_573FE3033A1F",
 "left": 11,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 349,
 "class": "Label",
 "borderRadius": 0,
 "borderSize": 0,
 "textShadowColor": "#000000",
 "text": "Copyright of Garden Street Partnership 2025",
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "textShadowOpacity": 1,
 "bottom": 27,
 "minWidth": 1,
 "fontSize": "18px",
 "fontColor": "#FFFFFF",
 "textShadowHorizontalLength": 0,
 "paddingTop": 0,
 "fontStyle": "normal",
 "textShadowBlurRadius": 10,
 "height": 35,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "textShadowVerticalLength": 0,
 "fontWeight": "bold",
 "textDecoration": "none"
},
{
 "fontFamily": "Oswald",
 "data": {
  "name": "text 2"
 },
 "id": "Label_0B130419_16A3_7FB3_41A4_E5F9FA0AC39B",
 "left": 10,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 336,
 "class": "Label",
 "borderRadius": 0,
 "borderSize": 0,
 "textShadowColor": "#000000",
 "text": "GARDEN HOME",
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": -11,
 "textShadowOpacity": 1,
 "minWidth": 1,
 "fontSize": "50px",
 "fontColor": "#FFFFFF",
 "textShadowHorizontalLength": 0,
 "paddingTop": 0,
 "fontStyle": "normal",
 "textShadowBlurRadius": 10,
 "height": 69,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "textShadowVerticalLength": 0,
 "fontWeight": "bold",
 "textDecoration": "none"
},
{
 "children": [
  "this.Container_386D38AA_17CC_0B05_4199_8338E0FE7991",
  "this.Container_386DA8AA_17CC_0B05_41A8_EBE6620047C3"
 ],
 "shadowVerticalLength": 0,
 "id": "Container_386EC8AA_17CC_0B05_41A6_7EFCA2EDC23B",
 "left": "10%",
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "shadowOpacity": 0.3,
 "right": "10%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "5%",
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "shadow": true,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Global"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0"
 ],
 "id": "Container_386C28AA_17CC_0B05_41B7_3334E854CA29",
 "left": "10%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "right",
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_3811E7E8_17DC_0505_4189_A53F22044B22",
  "this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B"
 ],
 "shadowVerticalLength": 0,
 "id": "Container_3811F7E8_17DC_0505_417B_3406AEA143C9",
 "left": "15%",
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "shadowOpacity": 0.3,
 "right": "15%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "shadow": true,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_2792E64D_17CC_071F_41B6_648718DBC7B5",
  "this.WebFrame_245FE213_17C4_1F0B_41A4_D9A473C556C8"
 ],
 "shadowVerticalLength": 0,
 "id": "Container_2792F64D_17CC_071F_415E_8686768A06D3",
 "left": "15%",
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "shadowOpacity": 0.3,
 "right": "15%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 4,
 "shadow": true,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_245BCB6E_173C_0D1A_419A_5D9B9177800A",
  "this.MapViewer"
 ],
 "shadowVerticalLength": 0,
 "id": "Container_245BFB6E_173C_0D1A_41B3_7C2B11B7D45E",
 "left": "15%",
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "shadowOpacity": 0.3,
 "right": "15%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 4,
 "shadow": true,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_20EC87A3_174C_050A_4198_F9830A58FD09",
  "this.Container_2F7D65D9_1744_0506_41B3_4FD17B01B645"
 ],
 "shadowVerticalLength": 0,
 "id": "Container_20EC97A3_174C_050A_41B2_EEE2BFFB8076",
 "left": "15%",
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "shadowOpacity": 0.3,
 "right": "15%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 6,
 "shadow": true,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_183F920E_17B1_6AC3_4174_65DF01CAE26A",
  "this.Container_1830320E_17B1_6AC3_41B6_E59ACE72BE82"
 ],
 "shadowVerticalLength": 0,
 "id": "Container_183FA20E_17B1_6AC3_41A6_A5FD4E159AED",
 "left": "10%",
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "shadowOpacity": 0.3,
 "right": "10%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "5%",
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "shadow": true,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Global"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6"
 ],
 "id": "Container_1830920E_17B1_6AC3_41B2_4E4AC4718E27",
 "left": "10%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "right",
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86961DD4_B244_6E3B_41C7_8146C01589B4",
 "levels": [
  {
   "url": "media/panorama_ADCFF6B1_B1C7_1AB7_41A5_8683F46608BA_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86956DD4_B244_6E3B_41D9_745D14509F39",
 "levels": [
  {
   "url": "media/panorama_ADC93E79_B1C7_0DB4_41C6_EC0D430562AF_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869AADD4_B244_6E3B_41DF_3F7DE2BA0D37",
 "levels": [
  {
   "url": "media/panorama_ADCBD6D7_B1C6_FAFC_41B2_F9E06DFEFCD5_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_AEAB6EFB_B244_EBEE_41D1_D19D25C9F1D6",
 "levels": [
  {
   "url": "media/panorama_ADCC1B24_B1D9_0B5D_41CC_8B6278F9F6EE_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8699ADD4_B244_6E3B_41E0_BCEF1B7E7B08",
 "levels": [
  {
   "url": "media/panorama_ADCAE61A_B1C7_1D75_41C1_5AF9DC9D39F5_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86953DD4_B244_6E3B_41E4_D2A5819072C5",
 "levels": [
  {
   "url": "media/panorama_ADCF624E_B1C7_15EC_41E2_FFA1CAD7011A_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86966DD4_B244_6E3B_41DA_F019041F9B09",
 "levels": [
  {
   "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8696ADD4_B244_6E3B_41D7_FE7762DB9891",
 "levels": [
  {
   "url": "media/panorama_ADC92A89_B1C7_1557_41DD_597F4B96DA00_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869C9DD4_B244_6E3B_41C2_E32F3C5B854D",
 "levels": [
  {
   "url": "media/panorama_AD7725CB_B1C7_7ED4_41BC_D93E3C99B0D3_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9652CFCA_B244_6A2F_41E3_E4F14B3B15A0",
 "levels": [
  {
   "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_96525FCA_B244_6A2F_4172_31A8F41AACB4",
 "levels": [
  {
   "url": "media/panorama_ADD85382_B1D9_1B54_41E1_007AB52AF99E_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_97167EF2_B244_6BFF_41D7_71E1DB0F1903",
 "levels": [
  {
   "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9716EEF2_B244_6BFF_41D3_6353CD19DF20",
 "levels": [
  {
   "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869D9DD4_B244_6E3B_41C6_48CA2F4926A3",
 "levels": [
  {
   "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869DCDD4_B244_6E3B_41DC_49AF88E7062D",
 "levels": [
  {
   "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869C0DD4_B244_6E3B_41D2_D8F1D4F2992D",
 "levels": [
  {
   "url": "media/panorama_ADC3C248_B1C7_15D5_41D9_9C902D9D6C6C_0_HS_6_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869A1DD4_B244_6E3B_41D3_9EB059CD1F3B",
 "levels": [
  {
   "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869A6DD4_B244_6E3B_41D8_C94E5A322D24",
 "levels": [
  {
   "url": "media/panorama_ADCE5EC7_B1C7_0ADC_41D7_89F2D3EDB186_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869CCDD4_B244_6E3B_41E4_BD2FCAB37948",
 "levels": [
  {
   "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869B3DD4_B244_6E3B_41C6_564E6E7DF104",
 "levels": [
  {
   "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869B7DD4_B244_6E3B_41C1_C482D8D704C9",
 "levels": [
  {
   "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869BDDD4_B244_6E3B_41DD_0F1869CF48A6",
 "levels": [
  {
   "url": "media/panorama_ADCFD2E9_B1C6_FAD4_4176_ED88453CA98F_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86981DD4_B244_6E3B_41D1_A48ABA28B0E3",
 "levels": [
  {
   "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86987DD4_B244_6E3B_41DF_03CE3DE9CFB8",
 "levels": [
  {
   "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8698DDD4_B244_6E3B_41E5_39FE41DE1419",
 "levels": [
  {
   "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86973DD4_B244_6E3B_41D1_3DEF6EE4806A",
 "levels": [
  {
   "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86978DD4_B244_6E3B_41E1_7665D496C194",
 "levels": [
  {
   "url": "media/panorama_ADCA0A51_B1C7_35F4_41E2_AB3477018CB1_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9719FEF2_B244_6BFF_41E3_986CE0B7B244",
 "levels": [
  {
   "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9718DEF2_B244_6BFF_41B4_01E2C5055E54",
 "levels": [
  {
   "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869F8DD4_B244_6E3B_41E3_9244AB1F9CD3",
 "levels": [
  {
   "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869FFDD4_B244_6E3B_41D9_0F4DBB6949E0",
 "levels": [
  {
   "url": "media/panorama_ADCF6E0D_B1C7_0D6C_41D4_E0E41BB063B9_0_HS_5_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8695CDD4_B244_6E3B_41E5_B06F4AF489E6",
 "levels": [
  {
   "url": "media/panorama_ADCEC286_B1C7_355C_41D5_761075151FD6_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86991DD4_B244_6E3B_41D5_1E6C5875C09B",
 "levels": [
  {
   "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86995DD4_B244_6E3B_41D9_20A008C0E1F7",
 "levels": [
  {
   "url": "media/panorama_ADC99A61_B1C7_15D4_41D2_5F78D90AEAF7_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9717DEF2_B244_6BFF_41E5_B83D65309EC4",
 "levels": [
  {
   "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869E6DD4_B244_6E3B_41E4_C44C6EC1C54D",
 "levels": [
  {
   "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_869EADD4_B244_6E3B_41D4_982DFB1277F9",
 "levels": [
  {
   "url": "media/panorama_ADCB39E3_B1C7_76DB_41D1_902369F1A2BE_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8697BDD4_B244_6E3B_41C7_A306DDADA01A",
 "levels": [
  {
   "url": "media/panorama_ADCC267A_B1C7_3DB4_41C8_8699404EEEC7_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8697CDD4_B244_6E3B_41E0_E2A030CA328D",
 "levels": [
  {
   "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86965DD4_B244_6E3B_41DB_B467327732A1",
 "levels": [
  {
   "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_86968DD4_B244_6E3B_41D9_5A3256EC40A3",
 "levels": [
  {
   "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8696FDD4_B244_6E3B_41E2_57D9B7462647",
 "levels": [
  {
   "url": "media/panorama_ADCDBE4B_B1C7_0DD4_41D7_DA6EC5BF63A5_0_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Button house info"
 },
 "paddingRight": 0,
 "width": 120,
 "class": "Button",
 "borderRadius": 0,
 "borderSize": 0,
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "propagateClick": false,
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B, true, 0, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontSize": 18,
 "iconHeight": 0,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "HOUSE INFO",
 "fontStyle": "italic",
 "height": 40,
 "gap": 5,
 "shadow": false,
 "rollOverShadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Button panorama list"
 },
 "paddingRight": 0,
 "width": 140,
 "class": "Button",
 "borderRadius": 0,
 "borderSize": 0,
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "propagateClick": false,
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_381217E8_17DC_0505_41A2_85B8D0083AEA, true, 0, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "PANORAMA LIST",
 "fontStyle": "italic",
 "height": 40,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "visible": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Button location"
 },
 "paddingRight": 0,
 "width": 100,
 "class": "Button",
 "borderRadius": 0,
 "borderSize": 0,
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "propagateClick": false,
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_2792A64E_17CC_071D_41B0_BEA23997C067, true, 0, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "LOCATION",
 "fontStyle": "italic",
 "height": 40,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Button floorplan"
 },
 "paddingRight": 0,
 "width": 113,
 "class": "Button",
 "borderRadius": 0,
 "borderSize": 0,
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "propagateClick": false,
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1, true, 0, null, null, false)",
 "rollOverFontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "FLOORPLAN",
 "fontStyle": "italic",
 "height": 40,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "visible": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Button photoalbum"
 },
 "paddingRight": 0,
 "width": 122,
 "class": "Button",
 "borderRadius": 0,
 "borderSize": 0,
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "propagateClick": false,
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F, true, 0, null, null, false)",
 "rollOverFontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "PHOTOALBUM",
 "fontStyle": "italic",
 "height": 40,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_33E0F47E_11C1_A20D_419F_BB809AD89259",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Button contact"
 },
 "paddingRight": 0,
 "width": 100,
 "class": "Button",
 "borderRadius": 0,
 "borderSize": 0,
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "propagateClick": false,
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5, true, 0, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "CONTACT",
 "fontStyle": "italic",
 "height": 40,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "transparencyActive": true,
 "maxHeight": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 60,
 "class": "IconButton",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "toggle",
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "paddingTop": 0,
 "height": 60,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "data": {
  "name": "image button menu"
 },
 "cursor": "hand",
 "maxWidth": 60
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "class": "IconButton",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "click": "this.shareTwitter(window.location.href)",
 "paddingTop": 0,
 "height": 58,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton TWITTER"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "class": "IconButton",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "click": "this.shareFacebook(window.location.href)",
 "paddingTop": 0,
 "height": 58,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton FB"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "children": [
  "this.ViewerAreaLabeled_386D08AA_17CC_0B05_41A7_5EF26F48CDAF",
  "this.Container_386D68AA_17CC_0B05_41B3_8E850505A16B"
 ],
 "id": "Container_386D38AA_17CC_0B05_4199_8338E0FE7991",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "width": "85%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.Container_386D98AA_17CC_0B05_41AE_A3E113DCCC00",
  "this.Container_386D88AA_17CC_0B05_41B1_9A2C832D4E62",
  "this.Container_386DC8AA_17CC_0B05_418D_1F78D6A291FF"
 ],
 "id": "Container_386DA8AA_17CC_0B05_41A8_EBE6620047C3",
 "backgroundOpacity": 1,
 "paddingLeft": 50,
 "scrollBarColor": "#0069A3",
 "paddingRight": 50,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "class": "Container",
 "borderSize": 0,
 "width": "50%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "verticalAlign": "top",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "shadow": false,
 "paddingBottom": 20,
 "horizontalAlign": "left",
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "id": "IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0.jpg",
 "class": "IconButton",
 "width": "25%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 40,
 "borderSize": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 40,
 "click": "this.setComponentVisibility(this.Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B, false, 0, null, null, false)",
 "paddingTop": 0,
 "height": "75%",
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0_rollover.jpg",
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "children": [
  "this.HTMLText_3811C7E8_17DC_0505_4199_1B551680AC34",
  "this.IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E"
 ],
 "id": "Container_3811E7E8_17DC_0505_4189_A53F22044B22",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 80,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FF361B"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "header"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "scrollBarWidth": 10,
 "id": "ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B",
 "itemLabelFontStyle": "normal",
 "paddingLeft": 70,
 "scrollBarColor": "#FF361B",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "class": "ThumbnailGrid",
 "itemMaxWidth": 1000,
 "itemThumbnailOpacity": 1,
 "rollOverItemThumbnailShadowColor": "#FF361B",
 "borderRadius": 5,
 "minHeight": 1,
 "width": "100%",
 "itemLabelFontFamily": "Oswald Regular",
 "itemMaxHeight": 1000,
 "verticalAlign": "middle",
 "itemPaddingRight": 3,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "rollOverItemLabelFontSize": 16,
 "minWidth": 1,
 "itemPaddingLeft": 3,
 "selectedItemLabelFontColor": "#C1280E",
 "itemLabelPosition": "bottom",
 "height": "100%",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemBackgroundOpacity": 0,
 "itemHorizontalAlign": "center",
 "itemOpacity": 1,
 "shadow": false,
 "itemThumbnailBorderRadius": 0,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "itemWidth": 220,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "backgroundOpacity": 0,
 "selectedItemThumbnailShadow": true,
 "paddingRight": 70,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemMinHeight": 50,
 "selectedItemLabelFontSize": 16,
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "propagateClick": false,
 "borderSize": 0,
 "rollOverItemLabelFontColor": "#C1280E",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist",
 "scrollBarMargin": 2,
 "itemLabelFontSize": 16,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemVerticalAlign": "top",
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#666666",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "gap": 26,
 "itemThumbnailHeight": 125,
 "itemHeight": 160,
 "paddingTop": 30,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "horizontalAlign": "center",
 "data": {
  "name": "ThumbnailList5161"
 },
 "itemLabelGap": 7,
 "itemPaddingBottom": 3,
 "itemThumbnailWidth": 220
},
{
 "children": [
  "this.HTMLText_2792D64D_17CC_071F_4198_A70438B191B7",
  "this.IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14"
 ],
 "id": "Container_2792E64D_17CC_071F_41B6_648718DBC7B5",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 80,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FF361B"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "header"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "id": "WebFrame_245FE213_17C4_1F0B_41A4_D9A473C556C8",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "class": "WebFrame",
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14376.151861634273!2d-73.99351941263586!3d40.75732561349075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1ses!2ses!4v1542287427714\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollEnabled": true,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "insetBorder": false,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "WebFrame52781"
 },
 "height": "100%"
},
{
 "children": [
  "this.HTMLText_245BDB6E_173C_0D1A_41AA_78BDF4EE53FF",
  "this.IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14"
 ],
 "id": "Container_245BCB6E_173C_0D1A_419A_5D9B9177800A",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 80,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FF361B"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "header"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "data": {
  "name": "Floor Plan"
 },
 "toolTipBorderSize": 1,
 "id": "MapViewer",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "minWidth": 1,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": 12,
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0
},
{
 "children": [
  "this.HTMLText_20ECF7A3_174C_050A_41A5_0B8AD2C6B179",
  "this.IconButton_20ECE7A3_174C_050A_41B4_AF609035102C"
 ],
 "id": "Container_20EC87A3_174C_050A_4198_F9830A58FD09",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 80,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FF361B"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "header"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.ViewerAreaLabeled_2F7D75D9_1744_0506_41B5_EA00300636BE",
  "this.Container_2F7D05DA_1744_0505_41A1_C7BCABBECBE0"
 ],
 "id": "Container_2F7D65D9_1744_0506_41B3_4FD17B01B645",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "-photoalbum"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.Image_182FD4E7_17B7_EF41_41AA_D495544C1972"
 ],
 "id": "Container_183F920E_17B1_6AC3_4174_65DF01CAE26A",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "width": "85%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.Container_1830220E_17B1_6AC3_4178_5E7AD867CE60",
  "this.Container_1830020E_17B1_6AC3_4194_70380D44B9C6",
  "this.Container_1830A20E_17B1_6AC3_41B1_7B5CC3A88353"
 ],
 "id": "Container_1830320E_17B1_6AC3_41B6_E59ACE72BE82",
 "backgroundOpacity": 1,
 "paddingLeft": 50,
 "scrollBarColor": "#0069A3",
 "paddingRight": 50,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "class": "Container",
 "borderSize": 0,
 "width": "50%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "verticalAlign": "top",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "shadow": false,
 "paddingBottom": 20,
 "horizontalAlign": "left",
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "id": "IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6.jpg",
 "class": "IconButton",
 "width": "25%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 40,
 "borderSize": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 40,
 "click": "this.setComponentVisibility(this.Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5, false, 0, null, null, false)",
 "paddingTop": 0,
 "height": "75%",
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6_rollover.jpg",
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "children": [
  "this.IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D",
  "this.Container_386D48AA_17CC_0B05_41AC_EB6F45FE66D5",
  "this.IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6"
 ],
 "id": "Container_386D68AA_17CC_0B05_41B3_8E850505A16B",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "horizontal",
 "gap": 10,
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Container arrows"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "show": "this.ViewerAreaLabeled_386D08AA_17CC_0B05_41A7_5EF26F48CDAF.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_82A91D92_B24C_AE3E_41D5_2E5A6697257B.set('selectedIndex', -1); }, this); this.playList_82A91D92_B24C_AE3E_41D5_2E5A6697257B.set('selectedIndex', 0)"
},
{
 "id": "Container_386D98AA_17CC_0B05_41AE_A3E113DCCC00",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "right",
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.HTMLText_386DF8AA_17CC_0B05_41AE_D7BDB2970D08"
 ],
 "id": "Container_386D88AA_17CC_0B05_41B1_9A2C832D4E62",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "class": "Container",
 "borderSize": 0,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 520,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 30,
 "horizontalAlign": "left",
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "id": "Container_386DC8AA_17CC_0B05_418D_1F78D6A291FF",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 370,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "minWidth": 1,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 40
},
{
 "id": "HTMLText_3811C7E8_17DC_0505_4199_1B551680AC34",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 80,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "width": "77.115%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 0,
 "borderSize": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "paddingTop": 17,
 "height": 80,
 "shadow": false,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.64vh;font-family:'Oswald';\"><B>PANORAMA LIST/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "id": "IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E",
 "backgroundOpacity": 0,
 "width": 50,
 "paddingRight": 0,
 "right": 15,
 "paddingLeft": 0,
 "class": "IconButton",
 "iconURL": "skin/IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 40,
 "verticalAlign": "top",
 "top": 15,
 "minWidth": 40,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_381217E8_17DC_0505_41A2_85B8D0083AEA, false, 0, null, null, false)",
 "paddingTop": 0,
 "height": 50,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E_rollover.jpg",
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "id": "HTMLText_2792D64D_17CC_071F_4198_A70438B191B7",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 80,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "width": "77.115%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 0,
 "borderSize": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "paddingTop": 17,
 "height": 80,
 "shadow": false,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.64vh;font-family:'Oswald';\"><B>LOCATION/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "id": "IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14",
 "backgroundOpacity": 0,
 "width": 70,
 "paddingRight": 0,
 "right": 15,
 "paddingLeft": 0,
 "class": "IconButton",
 "iconURL": "skin/IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 40,
 "verticalAlign": "top",
 "top": 15,
 "minWidth": 40,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_2792A64E_17CC_071D_41B0_BEA23997C067, false, 0, null, null, false)",
 "paddingTop": 0,
 "height": 70,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14_rollover.jpg",
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "id": "HTMLText_245BDB6E_173C_0D1A_41AA_78BDF4EE53FF",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 80,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "width": "77.115%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 0,
 "borderSize": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "paddingTop": 17,
 "height": 80,
 "shadow": false,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.64vh;font-family:'Oswald';\"><B>FLOORPLAN/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "id": "IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14",
 "backgroundOpacity": 0,
 "width": 70,
 "paddingRight": 0,
 "right": 15,
 "paddingLeft": 0,
 "class": "IconButton",
 "iconURL": "skin/IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 40,
 "verticalAlign": "top",
 "top": 15,
 "minWidth": 40,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1, false, 0, null, null, false)",
 "paddingTop": 0,
 "height": 70,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14_rollover.jpg",
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "id": "HTMLText_20ECF7A3_174C_050A_41A5_0B8AD2C6B179",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 80,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "width": "77.115%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 0,
 "borderSize": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "paddingTop": 17,
 "height": 80,
 "shadow": false,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.64vh;font-family:'Oswald';\"><B>PHOTO ALBUM INTERIOR</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "id": "IconButton_20ECE7A3_174C_050A_41B4_AF609035102C",
 "backgroundOpacity": 0,
 "width": 50,
 "paddingRight": 0,
 "right": 15,
 "paddingLeft": 0,
 "class": "IconButton",
 "iconURL": "skin/IconButton_20ECE7A3_174C_050A_41B4_AF609035102C.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 40,
 "verticalAlign": "top",
 "top": 15,
 "minWidth": 40,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F, false, 0, null, null, false)",
 "paddingTop": 0,
 "height": 50,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_20ECE7A3_174C_050A_41B4_AF609035102C_rollover.jpg",
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_20ECE7A3_174C_050A_41B4_AF609035102C_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "children": [
  "this.IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F",
  "this.Container_2F7EC5DA_1744_0505_415B_75BFEE966C4E",
  "this.IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33"
 ],
 "id": "Container_2F7D05DA_1744_0505_41A1_C7BCABBECBE0",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "horizontal",
 "gap": 10,
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Container arrows"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "show": "this.ViewerAreaLabeled_2F7D75D9_1744_0506_41B5_EA00300636BE.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_82A49D94_B24C_AE3A_41E4_A687E5137E69.set('selectedIndex', -1); }, this); this.playList_82A49D94_B24C_AE3A_41E4_A687E5137E69.set('selectedIndex', 0)"
},
{
 "maxHeight": 894,
 "id": "Image_182FD4E7_17B7_EF41_41AA_D495544C1972",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_outside",
 "paddingRight": 0,
 "width": "100%",
 "class": "Image",
 "url": "skin/Image_182FD4E7_17B7_EF41_41AA_D495544C1972.jpg",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "0%",
 "minWidth": 1,
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image5820"
 },
 "maxWidth": 1341
},
{
 "id": "Container_1830220E_17B1_6AC3_4178_5E7AD867CE60",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 50,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "right",
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.HTMLText_1830E20E_17B1_6AC3_419B_A422A7600CB2",
  "this.Image_16B75461_1B87_4970_41B9_4F94F65FB1C1",
  "this.Button_1830D20E_17B1_6AC3_4198_688BED36E073"
 ],
 "id": "Container_1830020E_17B1_6AC3_4194_70380D44B9C6",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "class": "Container",
 "borderSize": 0,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 520,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 25,
 "shadow": false,
 "paddingBottom": 30,
 "horizontalAlign": "left",
 "data": {
  "name": "-Container text"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "id": "Container_1830A20E_17B1_6AC3_41B1_7B5CC3A88353",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 370,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "minWidth": 1,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": 40
},
{
 "id": "Container_386D48AA_17CC_0B05_41AC_EB6F45FE66D5",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "84%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": "30%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Container separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "HTMLText_386DF8AA_17CC_0B05_41AE_D7BDB2970D08",
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarColor": "#FF361B",
 "paddingRight": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:5.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.88vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.95vh;font-family:'Oswald';\"><B>GARDEN HOME</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.76vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.88vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff361b;font-size:2.43vh;font-family:'Oswald Regular';\">Copyright of Garden Street Partnership 2025</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.43vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.88vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;text-indent:60px;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">Prices, promotions, incentives, features, options, floor plans, elevations, designmaterials, specifications, community development plans, amenities, schedules, and available homes are subject to change without notice. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">Square footages and dimensions are approximate only, may vary in actual construction, and should not be relied upon as a representation of the actual or precise size of any home or amenity space. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">All photographs, artistic renderings, and other depictions of the residence, community and other features are preliminary and for illustrative and conceptual purposes only. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">Model homes and depictions of people do not reflect racial preference. Windows, decks, doors and other design features vary in the community.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">Views are not guaranteed. Actual views may vary and change in the future. Site plans and maps are not to scale and are for relative location purposes only. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">School and school district information is subject to change over time. No warranty or guarantee is made that any particular school or school district will serve the community.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">The information provided does not constitute an offer to sell nor</SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">a solicitation of an offer to purchase real property.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">Exclusively marketed and sold by April Cashion, Adventure Park Realty TREC License #279188.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "id": "Container_2F7EC5DA_1744_0505_415B_75BFEE966C4E",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "80%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": "30%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Container separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "HTMLText_1830E20E_17B1_6AC3_419B_A422A7600CB2",
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarColor": "#FF361B",
 "paddingRight": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "paddingTop": 0,
 "height": "62.894%",
 "shadow": false,
 "paddingBottom": 3,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff361b;font-size:4.74vh;font-family:'Oswald';\"><B>______</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.95vh;font-family:'Oswald';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.76vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.88vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff361b;font-size:2.76vh;font-family:'Oswald Regular';\"><B>Dolor sit amet, consectetur adipiscing elit. Nunc porttitor ac nulla vitae.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.54vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.88vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.54vh;font-family:'Oswald';\"><B>www.loremipsum.com</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.54vh;font-family:'Oswald';\"><B>info@loremipsum.com</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.54vh;font-family:'Oswald';\"><B>Tlf.: +11 111 111 111</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.54vh;font-family:'Oswald';\"><B>Address line 1</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.54vh;font-family:'Oswald';\"><B>Address line 2</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "maxHeight": 120,
 "id": "Image_16B75461_1B87_4970_41B9_4F94F65FB1C1",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "width": "70%",
 "class": "Image",
 "url": "skin/Image_16B75461_1B87_4970_41B9_4F94F65FB1C1.jpg",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingTop": 0,
 "height": "30%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Image logo"
 },
 "maxWidth": 211
},
{
 "fontFamily": "Oswald Regular",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_1830D20E_17B1_6AC3_4198_688BED36E073",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Button Contact"
 },
 "paddingRight": 0,
 "width": 140,
 "class": "Button",
 "borderRadius": 0,
 "borderSize": 0,
 "iconBeforeLabel": true,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "propagateClick": false,
 "minHeight": 1,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "shadowColor": "#000000",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#FF361B"
 ],
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontSize": "2.83vh",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "CONTACT",
 "fontStyle": "normal",
 "minWidth": 1,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#C1280E"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "height": 59,
 "fontWeight": "normal",
 "shadowSpread": 1
}],
 "backgroundPreloadEnabled": true,
 "data": {
  "name": "Player468"
 },
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
