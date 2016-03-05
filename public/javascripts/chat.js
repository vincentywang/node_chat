var eventId = eventId || 2;
var socket = io.connect('https://localhost:3000', {'multiplex': false});

/**
 * temp store feed in client side order by time stamp
 * @type {Array}
 */
var feedIndex = [];

/**
 * Send trigger to server, ask user socket join the room 
 * need return user_id from socket to set a global variable
 */
socket.emit('event', {eid: eventId});

var socketHandler = require('./io_connect.js')(socket);

socketHandler.receiveMessage(function (data) {
  feedIndex.push(data);
  prependFeed(data);
});

var chatWrapper = $('#event-chat'),
    feedWrapper = chatWrapper.find('.feed-wrapper'),
    feedInputBox = chatWrapper.find('.feed-input-box'),
    feedSubmitBtn = feedInputBox.find('.btn-wrapper');

feedSubmitBtn.on('click', function () {
  var text = feedInputBox.find('textarea.textarea').val();
  console.log(text);
  socketHandler.sendMessage(text);
});

console.log(chatWrapper);



/**
 * 1. located this element 
 * 2. prepare the HTML
 * 3. append to this element
 */
var prependFeed = function(txtMsg) {
  var chatFeed = require('./chat_feed.js')(txtMsg);
  var s = chatFeed.prepareHtml(txtMsg);
  var i = 0,
    len = feedIndex.length;
  // need require jQuery
  

  // for (; i < len; ++i) {
  //   // here mean where to insert the feed
  //   if (feedIndex[i] > feed.created2) {
  //     $(s).insertBefore($($('.feeds .feed', _sel).get(i)));
  //     if (os.user.id === feed.user_id) {
  //       $('.feed-' + feed.mkey).addClass('me');
  //     } else if (isModerator) {
  //       modBindMenu($('.feed-' + feed.mkey + ' .avatar', _sel));
  //     }
  //     $('.feed-' + feed.mkey)
  //       .data('uid', feed.user_id)
  //       .data('mkey', feed.mkey);
  //     feedIndex.splice(i, 0, feed.created2);
  //     return true;
  //   }
  // }
  // $('.feeds', _sel).append(s);

  // if (os.user.id === feed.user_id) {
  //   $('.feed-' + feed.mkey).addClass('me');
  // } else if (isModerator) {
  //   modBindMenu($('.feed-' + feed.mkey + ' .avatar', _sel));
  // }

  // $('.feed-' + feed.mkey)
  //   .data('uid', feed.user_id)
  //   .data('mkey', feed.mkey);

  // feedIndex.push(feed.created2);
  // // scroll for every new feed
  // doScroll(); 
};

var modBindMenu = function () {

};

var doScroll = function (flag) {
  var $feeds = $('div.feeds', _sel),                // wrapper of list single feed
      $feed = $('div.feed')[0],                     // single feed
      $feedContent = $('div.feed-content', _sel),   // the feed of view point
      feedsHeight = $feeds.outerHeight(),
      feedHeight = $($feed).outerHeight(),
      minFeedHeight = 35, //px
      maxFeedHeight = 80, //px
      feedContentHeight = $feedContent.outerHeight(),
      sFeedContentPaddingTop = $feedContent.css('padding-top'),
      sFeedContentPaddingBottom = $feedContent.css('padding-bottom'),
      iFeedContentPaddingTop,
      iFeedContentPaddingBottom,
      flag = flag || false;

  if(typeof sFeedContentPaddingTop !== 'undefined') {
    iFeedContentPaddingTop = parseInt(sFeedContentPaddingTop.replace('px', ''));
  }
  if (typeof sFeedContentPaddingBottom !== 'undefined') {
    iFeedContentPaddingBottom = parseInt(sFeedContentPaddingBottom.replace('px',''));
  }

  var iFeedContentPadding = iFeedContentPaddingTop + iFeedContentPaddingBottom;

  // feedsHeight == feedContentHeight + feedContent.scrollTop() - ifeedContentPadding  (true)
  var diffHeight = feedsHeight - (feedContentHeight - iFeedContentPadding) - $feedContent.scrollTop();

      
  if (Math.abs(diffHeight) > (maxFeedHeight * 3) && (!flag)
    && (($feedContent.get(0).scrollHeight - iFeedContentPadding) > $feedContent.height()) ) { // avoid to show msg, before show scroll bar
    /* not scoll, show message div */
    //_allowScroll = false; //this is used for show msg account
    toggleUnreadSection(true);
    //showUnRead();
  } else {
    /* scroll */
    toggleUnreadSection(false);
    //_allowScroll = true; // this is used for show msg account
    //_temp_count = 1; // this is used for show msg account too
    $feedContent.scrollTop(feedsHeight);
  }  
};
