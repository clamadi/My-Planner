// The current date update function 
function updateCurrentDay() {
  var currentDayElement = document.getElementById('currentDay');
  var currentDay = dayjs().format('dddd, MMMM, D');
  currentDayElement.textContent = currentDay;
}

// Color coding for present,past and future
function colorCodeTimeBlocks() {
  var currentHour = dayjs().hour();

  $('.time-block').each(function() {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);

    if (blockHour > currentHour) {
      $(this).addClass('future');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('past');
    }
  });
}

//load events from local storage
function loadEvents() {
  $('.time-block').each(function() {
    var blockHour = $(this).attr('id');
    var event = localStorage.getItem(blockHour);

    if (event) {
      $(this).find('.description').val(event);
    }
  });
}

//Save to local storage
function saveEvent() {
  var blockHour = $(this).closest('.time-block').attr('id');
  var event = $(this).siblings('.description').val();

  localStorage.setItem(blockHour, event);
}

// Run functions on page
$(document).ready(function() {
  updateCurrentDay();
  colorCodeTimeBlocks();
  loadEvents();

  // Save button event listener
  $('.saveBtn').on('click', saveEvent);
});