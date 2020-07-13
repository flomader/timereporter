chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.command == 'populateWorkingTime'){
        $('[id^=ctl00_ContentPlaceHolder1_Change_183_]').each(function(i){
            if (isWorkday($(this))){
                $(this).attr('value', 1);
            }
        });

        $('[id^=ctl00_ContentPlaceHolder1_StartTime_183_]').each(function(i){
            if (isWorkday($(this))){
                $(this).attr('value', request.data[i].startTime);
            }
        });

        $('[id^=ctl00_ContentPlaceHolder1_EndTime_183_]').each(function(i){
            if (isWorkday($(this))){
                $(this).attr('value', request.data[i].endTime);
            }
        });
    }
});

function isWorkday(elem){
    if (elem.closest('tr').css('background-color') == 'rgb(255, 255, 255)') return true;
    
    return false;
}
