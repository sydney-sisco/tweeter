$(document).ready(function() {
  console.log('we ready to go');

  $('#tweet-text').on('input', function(event) {
    const totalChars = 140;
    const currentChars = $(this).val().length
    const remainingChars = totalChars - currentChars;

    // find the element that shows the character count
    const counterElement = $(this).siblings('div').children('output');

    // turn the counter red if the user has typed too much
    // do this by adding the class 'toolong'
    if (remainingChars < 0) {
      $(counterElement).addClass('toolong');
    } else {
      $(counterElement).removeClass('toolong');
    }

    $(counterElement).text(remainingChars);
  });
});
