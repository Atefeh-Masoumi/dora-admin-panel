/* **********************************************************
 * Copyright (C) 2015-2017 VMware, Inc.  All Rights Reserved.
 * SPDX-License-Identifier: MIT
 * **********************************************************/

/*
 * wmks-sdk-example.js --
 *
 *      This file implements a set of JavaScript functions which,
 *      in conjunction with the vmrc-embed-example.html sample page,
 *      demonstrate how to use the WebMKS SDK API to embed a VMware
 *      Remote Console in a web page.
 */

/*
 * Globals
 */

var wmks = null;

/*
 *----------------------------------------------------------------------------
 *
 * value() --
 *
 *      Helper functions to simply look up the value of document elements
 *
 * Results:
 *      Document element, value
 *
 *----------------------------------------------------------------------------
 */
function value(id) {
  return document.getElementById(id).value;
}

/*
 *----------------------------------------------------------------------------
 *
 * log(msg) --
 *
 *      Print message to logging box.
 *
 * Results:
 *      None.
 *
 * Side effects:
 *      Appends message text to log box.
 *
 *----------------------------------------------------------------------------
 */
function log(text) {
  // $('#msgBox')[0].innerHTML += "<br />" + text;
  // $('#msgBox')[0].scrollTop = $('#msgBox')[0].scrollHeight;
}

/*
 *----------------------------------------------------------------------------
 *
 * This is the jQuery shorthand for document ready function,
 * called after all the DOM elements of the page are ready for use:
 *
 * $(document).ready(function() { ... });
 *
 *----------------------------------------------------------------------------
 */
$(function () {
  $('#selectLanguage').change(function () {
    if (!wmks) return;
    var keyboardLayoutId = $(this).find(":selected").val();

    wmks.setOption('keyboardLayoutId', keyboardLayoutId);
    log('keyboardLayoutId : ' + keyboardLayoutId);
  })
});

/*
 *----------------------------------------------------------------------------
 *
 * onConnectionStateChangeHandler --
 * onScreenSizeChangeHandler --
 * onFullscreenChangeHandler --
 * onErrorHandler --
 *
 *      Event handlers for the corresponding WMKS SDK generated events
 *
 * Results:
 *      None.
 *
 * Side effects:
 *      Display log message boxes with specific event details.
 *
 *----------------------------------------------------------------------------
 */
function onConnectionStateChangeHandler(event, data) {
  log('onConnectionStateChange - connectionState: ' + data.state);
  if (data.state == WMKS.CONST.ConnectionState.DISCONNECTED) {
    log("reason is " + data.reason + ", code is" + data.code);
  }
}

function onScreenSizeChangeHandler(event, data) {
  log('onScreenSizeChange - width: ' + data.width + ', height: ' + data.height);
}

function onFullscreenChangeHandler(event, data) {
  log('onFullscreenChange - fullscreen: ' + data.isFullScreen);
}

function onErrorHandler(event, data) {
  log('onErrorHandler - error type ' + data.errorType);
}

function onLedChangeHandler(event, data) {
  log('onLEDChange , key is ' + data);
}

function onHeartbeatHandler(event, data) {
  log('on Heartbeat Event, interval is ' + data);
}

/*
 *----------------------------------------------------------------------------
 *
 * registerEvents() --
 *
 *      register events callback for the WMKS core object wmks
 *
 * Results:
 *      None
 *
 *----------------------------------------------------------------------------
 */
function registerEvents() {
  if (!wmks) return;
  var constEvent = WMKS.CONST.Events;
  wmks.register(constEvent.CONNECTION_STATE_CHANGE, onConnectionStateChangeHandler)
    .register(constEvent.REMOTE_SCREEN_SIZE_CHANGE, onScreenSizeChangeHandler)
    .register(constEvent.FULL_SCREEN_CHANGE, onFullscreenChangeHandler)
    .register(constEvent.ERROR, onErrorHandler)
    .register(constEvent.KEYBOARD_LEDS_CHANGE, onLedChangeHandler)
    .register(constEvent.HEARTBEAT, onHeartbeatHandler);
}

/*
 *----------------------------------------------------------------------------
 *
 * createWMKS() --
 *
 *      Invoked by the sample page in response to clicking the 'createWMKS' button.
 *      Calls the WMKS.createWMKS() method with the user specific options value.
 *      After createWMKS, call registerEvents to register events callback for wmks.
 *
 * Results:
 *      None.
 *
 *----------------------------------------------------------------------------
 */
function createWMKS() {

  var rescale = $("#rescale")[0].checked;
  var changeResolution = $("#changeResolution")[0].checked;
  var position = parseInt($("#position")[0].selectedIndex) === 0 ? WMKS.CONST.Position.CENTER : WMKS.CONST.Position.LEFT_TOP;

  var options = {
    rescale: rescale,
    changeResolution: changeResolution,
    position: position
  };

  wmks = WMKS.createWMKS("wmksContainer", options);
  // here for demo to make the console float on the right, set the canvas position as relative
  $("#mainCanvas").css("position", "relative");
  registerEvents();
  log("createWMKS successfully!");
}

/*
 *----------------------------------------------------------------------------
 *
 * destroy() --
 *
 *      Invoked by the sample page when clicking the destroy button.
 *      Destroy the wmks core object.
 *
 * Results:
 *      None.
 *
 * Side effects:
 *      Invokes destroy() method, disconnect the WMKS connection (if active)
 *      and remove the widget from the associated element.
 *
 *----------------------------------------------------------------------------
 */
function destroy() {
  try {
    wmks.destroy();
  } catch (err) {
    log('destroy call failed: ' + err.description);
    return;
  }
  log('destroy call returned successfully');
}

/*
 *----------------------------------------------------------------------------
 *
 * getVersion() --
 *
 * Invoked by the sample page when clicking the 'getVersion' button.
 *
 * Results:
 *      the version of current WMKS SDK.
 *
 *
 *----------------------------------------------------------------------------
 */
function getVersion() {
  if (!wmks) return;
  log('getVersion returned "' + wmks.getVersion() + '"');
}

/*
 *----------------------------------------------------------------------------
 *
 * connect() --
 *
 *      Invoked by the sample page when clicking the 'connect' button.
 *
 * Results:
 *      None.
 *
 * Side effects:
 *      Invokes WMKS SDK connect() method, passing in the specified parameters
 *      from the sample page. Displays return value in log box.
 *
 *----------------------------------------------------------------------------
 */
function connect() {
  if (!wmks) {
    log("Please createWMKS first!");
    return;
  }
  const params = new URLSearchParams(window.location.search);

  var url = params.get("url");

  try {
    wmks.connect(url);
    // enterFullScreen();
    log('connect succeeded');
  } catch (err) {
    log('connect failed: ' + err);
  }
}

/*
 *----------------------------------------------------------------------------
 *
 * disconnect() --
 *
 *      Invoked by sample page when clicking the 'disconnect' button.
 *
 * Results:
 *      None.
 *
 * Side effects:
 *      Invokes WMKS SDK disconnect() method, terminates any related
 *      connection-specific child processes.
 *
 *----------------------------------------------------------------------------
 */
function disconnect() {
  try {
    wmks.disconnect();
    log('disconnect succeeded');
  } catch (err) {
    log('disconnect failed: ' + err);
  }
}

/*
 *----------------------------------------------------------------------------
 *
 * getConnectionState() --
 * setRemoteScreenSize() --
 * getRemoteScreenSize() --
 * updateScreen() --
 * canFullScreen() --
 * isFullScreen() --
 * enterFullScreen() --
 * exitFullScreen() --
 * sendInputString() --
 * sendCAD() --
 * enableKeyboard() --
 * disableKeyboard() --
 * enableExtendedKeyboard() --
 * disableExtendedKeyboard() --
 * enableTrackpad() --
 * disableTrackpad() --
 * showKeyboard() --
 * hideKeyboard() --
 * toggleExtendedKeypad() --
 * toggleTrackpad() --
 *
 *      Common WMKS SDK API methods
 *
 *
 *----------------------------------------------------------------------------
 */

function getConnectionState() {
  if (!wmks) return;
  log("getConnectionState returned : " + wmks.getConnectionState());
}

function setRemoteScreenSize() {
  if (!wmks) return;
  var width = value("width");
  var height = value("height");
  wmks.setRemoteScreenSize(width, height);
}

function getRemoteScreenSize() {
  if (!wmks) return;
  var size = wmks.getRemoteScreenSize();
  $("#lableW")[0].innerHTML = "Width: " + size.width;
  $("#lableH")[0].innerHTML = "Height: " + size.height;
}

function updateScreen() {
  if (!wmks) return;
  wmks.updateScreen();
  log("updateScreen!!");
}

function canFullScreen() {
  if (!wmks) return;
  log("canFullScreen : " + wmks.canFullScreen());
}

function isFullScreen() {
  if (!wmks) return;
  log("isFullScreen : " + wmks.isFullScreen());
}

function enterFullScreen() {
  if (!wmks) return;
  wmks.enterFullScreen();
}

function exitFullScreen() {
  if (!wmks) return;
  wmks.exitFullScreen();
}

function sendInputString() {
  if (!wmks) return;
  var text = value("sendStringText");
  wmks.sendInputString(text);
}

function sendKeyCodes() {
  if (!wmks) return;
  wmks.sendKeyCodes([13]);
  log("send Enter");
}

function sendCAD() {
  if (!wmks) return;
  wmks.sendCAD();
  log("send Ctrl + Alt + Delete");
}

function enableKeyboard() {
  if (!wmks) return;
  wmks.enableInputDevice(WMKS.CONST.InputDeviceType.KEYBOARD);
  log("enableKeyboard !");
}

function disableKeyboard() {
  if (!wmks) return;
  wmks.disableInputDevice(WMKS.CONST.InputDeviceType.KEYBOARD);
  log("disableKeyboard !");
}

function showKeyboard() {
  if (!wmks) return;
  wmks.showKeyboard();
  log("showKeyboard !");
}

function hideKeyboard() {
  if (!wmks) return;
  wmks.hideKeyboard();
  log("hideKeyboard !");
}

function toggleExtendedKeypad() {
  if (!wmks) return;
  wmks.toggleExtendedKeypad();
  log("toggleExtendedKeypad !");
}

function toggleTrackpad() {
  if (!wmks) return;
  wmks.toggleTrackpad();
  log("toggleTrackpad!!");
}

function toggleRelativePad() {
  if (!wmks) return;
  wmks.toggleRelativePad();
  log("toggleRelativePad!!");
}

