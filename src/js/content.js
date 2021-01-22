chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.command == 'populateWorkingTime'){

        chrome.storage.sync.get('settings', function(response){
            var weekdays;
            
            if (response.settings && response.settings.weekdays){
                weekdays = response.settings.weekdays;
            } 
            else {
                weekdays = defaultWeekdays;
            }

            $('[id^=ctl00_ContentPlaceHolder1_Change_183_]').each(function(i){
                if (isEditable($(this))){
                    if (weekdayMatches($(this), weekdays)){
                        $(this).attr('value', 1);
                    }
                }
            });

            $('[id^=ctl00_ContentPlaceHolder1_StartTime_183_]').each(function(i){
                if (isEditable($(this))){
                    if (weekdayMatches($(this), weekdays)){
                        $(this).attr('value', request.data[i].startTime);
                    }
                }
            });

            $('[id^=ctl00_ContentPlaceHolder1_EndTime_183_]').each(function(i){
                if (isEditable($(this))){
                    if (weekdayMatches($(this), weekdays)){
                        $(this).attr('value', request.data[i].endTime);
                    }
                }
            });
        });
    }
});

function isEditable(elem){
    if (elem.closest('tr').css('background-color') == 'rgb(255, 255, 255)') return true;
    
    return false;
}

function weekdayMatches(elem, weekdays){
    var dateString = elem.closest('tr').find('[id^=ctl00_ContentPlaceHolder1_Date_183_]').text();
    return weekdays.includes(moment(dateString).format('dddd').toLowerCase());
}
