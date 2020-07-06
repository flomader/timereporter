chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.command == "populateWorkingTime"){
        $("[id^=ctl00_ContentPlaceHolder1_Change_183_]").each(function(i){
            $(this).attr('value', 1);
        });

        $("[id^=ctl00_ContentPlaceHolder1_StartTime_183_]").each(function(i){
            $(this).attr('value', request.data[i].startTime);
        });

        $("[id^=ctl00_ContentPlaceHolder1_EndTime_183_]").each(function(i){
            $(this).attr('value', request.data[i].endTime);
        })
    }
})