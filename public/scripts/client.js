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

  // add a listener to the form toggle
  $('.compose').click(composeClickHandler);
  
  loadtweets();
});

// handler for the new tweet form
const formSubmissionHandler = function(event) {
  event.preventDefault();

  // clear any existing error messages
  $('.error-msg').empty();
  $(".error-msg").slideUp(100);

  // get the tweet text from the textarea
  const $tweetTextElement = $('#tweet-text');
  const tweetText = $tweetTextElement.val();

  // if there is no tweet text, show error
  if (!tweetText || !tweetText.length) {
    $('.error-msg').append('❗Did you forget something?❗');
    $(".error-msg").slideDown(100);
    return;
  }

  // if tweet text is too long, show error
  if (tweetText.length > 140) {
    $('.error-msg').append('❗Too long. Please keep your thoughts to 140 characters or less.❗');
    $(".error-msg").slideDown(100);
    return;
  }

  // POST the tweet data using AJAX
  $.post('tweets/', $(this).serialize())
  .then((data) => {
    console.log('data returned from server:', data);
    $tweetTextElement.val('');
    loadtweets();
  });
};

// loads tweets from the server using AJAX
const loadtweets = function() {
  $.get('/tweets', function(tweets) {
    console.log(tweets);
  }).then(function(tweets) {
    renderTweets(tweets);
  });
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
          <img class="avatar" src="${tweet.user.avatars}">
          <h3 class="username" >${tweet.user.name}</h3>
        </div>
        <span class="handle" >${tweet.user.handle}</span>
      </header>
      <p>${escapeText(tweet.content.text)}</p>
      <footer>
        <span class="timestamp">
          ${DateTime.fromMillis(tweet.created_at).toRelative()}
        </span>
        <div class="action-icons">
          <img src="/images/flag-solid.svg" alt="report">
          <img src="/images/retweet-solid.svg" alt="retweet">
          <img src="/images/heart-regular.svg" alt="like">
        </div>
      </footer>
    </article>
  `;

  return $tweet;
};

// helper function used to prevent XSS in tweets
const escapeText = (string) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};

// toggles the new-tweet form
const composeClickHandler = function(event) {
  $('.new-tweet').slideToggle();
  $('#tweet-text').focus();
}
