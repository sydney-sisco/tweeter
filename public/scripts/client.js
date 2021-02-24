/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// luxon library is used to format timestamps on tweets
var DateTime = luxon.DateTime;

$(document).ready(function() {
  renderTweets(data);
  
  // form submission for new tweets
  $('main form').submit(formSubmissionHandler);

});

// handler for the new tweet form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // POST the tweet data using AJAX
  $.post('tweets/', $(this).serialize(), (data) => {
    console.log(data);
  })
}

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// loops through tweets and appends them to the container
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

const createTweetElement = (tweet) => {
  
  let $tweet = `
    <article class="tweet">
      <header>
        <div>
          <img src="${tweet.user.avatars}">
          <h3>${tweet.user.name}</h3>
        </div>
        <span>${tweet.user.handle}</span>
      </header>

      <p>${tweet.content.text}</p>

      <footer>
        <span>
          ${DateTime.fromMillis(tweet.created_at).toRelative()}
        </span>
        <div>
          <img src="/images/flag-solid.svg" alt="report">
          <img src="/images/retweet-solid.svg" alt="retweet">
          <img src="/images/heart-regular.svg" alt="like">
        </div>
      </footer>
    </article>
  `;

  return $tweet;
};
