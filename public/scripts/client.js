/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// luxon library is used to format timestamps on tweets
const DateTime = luxon.DateTime;

$(document).ready(function() {
  
  // form submission for new tweets
  $('main form').submit(formSubmissionHandler);
  
  loadtweets();
});

// handler for the new tweet form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // get the tweet text from the textarea
  const $tweetTextElement = $(this).children('#tweet-text');
  const tweetText = $tweetTextElement.val();

  // if there is no tweet text, show error
  if (!tweetText || !tweetText.length) {
    alert("You cannot submit an empty tweet!");
    return;
  }

  // if tweet text is too long, show error
  if (tweetText.length > 140) {
    alert('Your tweet is too long!');
    return;
  }

  // POST the tweet data using AJAX
  $.post('tweets/', $(this).serialize(), (data) => {
    $tweetTextElement.val('');
    console.log(data);
    loadtweets(); //TODO: is this where to put this?
  });
};

// loads tweets from the server using AJAX
const loadtweets = function() {
  $.get('/tweets', function(tweets) {
    console.log(tweets);
  }).then(function(tweets) {
    renderTweets(tweets);
  }); //TODO: like this?
};

// loops through tweets and appends them to the container
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

// creates the HTML for a tweet
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
