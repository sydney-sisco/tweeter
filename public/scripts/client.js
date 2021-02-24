/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// luxon library is used to format timestamps on tweets
var DateTime = luxon.DateTime;

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}



const createTweetElement = (data) => {
  // return $(`<article class="tweet">Hello world</article>`);

  const markup = `
  <article class="tweet">
    <header>
      <div>
        <img src="${data.user.avatars}">
        <h3>${data.user.name}</h3>
      </div>
      <span>${data.user.handle}</span>
    </header>

    <p>${data.content.text}</p>

    <footer>
      <span>
        ${DateTime.fromMillis(data.created_at).toRelative()}
      </span>
      <div>
        <img src="/images/flag-solid.svg" alt="report">
        <img src="/images/retweet-solid.svg" alt="retweet">
        <img src="/images/heart-regular.svg" alt="like">
      </div>
    </footer>
  </article>
  `;

  return markup;

};

const $tweet = createTweetElement(tweetData);


$(document).ready(function() {

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});

