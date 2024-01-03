
      // Function to update the current day in the header
      function updateCurrentDay() {
        var currentDayElement = document.getElementById('currentDay');
        var currentDay = dayjs().format('dddd, MMMM, D');
        currentDayElement.textContent = currentDay;
      }

      // Function to color-code time blocks based on past, present, and future
      function colorCodeTimeBlocks() {
        var currentHour = dayjs().hour();

        $('.time-block').each(function() {
          var blockHour = parseInt($(this).attr('id').split('-')[1]);

          if (blockHour < currentHour) {
            $(this).addClass('past');
          } else if (blockHour === currentHour) {
            $(this).addClass('present');
          } else {
            $(this).addClass('future');
          }
        });
      }

      // Function to load events from local storage
      function loadEvents() {
        $('.time-block').each(function() {
          var blockHour = $(this).attr('id');
          var event = localStorage.getItem(blockHour);

          if (event) {
            $(this).find('.description').val(event);
          }
        });
      }

      // Function to handle saving events to local storage
      function saveEvent() {
        var blockHour = $(this).closest('.time-block').attr('id');
        var event = $(this).siblings('.description').val();

        localStorage.setItem(blockHour, event);
      }

      // Run functions on page load
      $(document).ready(function() {
        updateCurrentDay();
        colorCodeTimeBlocks();
        loadEvents();

        // Attach event listener for the save button
        $('.saveBtn').on('click', saveEvent);
      });