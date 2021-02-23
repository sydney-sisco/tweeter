$(document).ready(function() {
  console.log('we ready to go');

  $('#tweet-text').on('input', function(event) {
    const totalChars = 140;
    const currentChars = $(this).val().length
    const remainingChars = totalChars - currentChars;

    // find the element that shows the character count
    const counterElement = $(this).siblings('div').children('output');

    $(counterElement).text(remainingChars);
  });
});