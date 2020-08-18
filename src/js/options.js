$(document).ready(function(){
    $('#settingsForm').validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            minhours: {
                required: true,
                digits: true,
                min: 0,
                max: 11
            },
            maxhours: {
                required: true,
                digits: true,
                min: 1,
                max: 12,
                greaterThan: '#minhours'
            },
            earliestbegin: {
                required: true,
                time: true
            },
            latestbegin: {
                required: true,
                time: true,
                laterThan: '#earliestbegin'
            },
            weekday: {
                required: true
            }
        },
        messages: {
            minhours: {
                required: '"Min. Hours/Day" is a required field.',
                digits: '"Min. Hours/Day" accepts only digits.',
                min: jQuery.validator.format('"Min. Hours/Day" must be greater than {0}.'),
                max: jQuery.validator.format('"Min. Hours/Day" must be less or equal than {0}.')
            },
            maxhours: {
                required: '"Max. Hours/Day" is a required field.',
                digits: '"Max. Hours/Day" accepts only digits.',
                min: jQuery.validator.format('"Max. Hours/Day" must be greater than {0}.'),
                max: jQuery.validator.format('"Max. Hours/Day" must be less or equal than {0}.'),
                greaterThan: '"Max. Hours/Day" must be greater than "Min. Hours/Day".'
            },
            earliestbegin: {
                required: '"Earliest Begin" is a required field.',
                time: '"Earliest Begin" must be a valid time, between 00:00 and 23:59.'
            },
            latestbegin: {
                required: '"Latest Begin" is a required field.',
                time: '"Latest Begin" must be a valid time, between 00:00 and 23:59.',
                laterThan: '"Latest Begin" must be later than "Earliest Begin".'
            },
            weekday: {
                required: 'At least one weekday must be selected.'
            }
        },
        errorElement: 'div',
        errorClass: 'messagetext',
        errorPlacement: function(error, element) {
            error.wrap('<div class="message"></div>');
            $('<i class="ms-Icon ms-Icon--ErrorBadge erroricon"></i>').insertBefore(error);
            error.parent().appendTo($('#messagebar'));
        }
    });

    chrome.storage.sync.get('settings', function(response){
        if (typeof response.settings !== "undefined" && response.settings.minHours){
            $('#minhours').val(response.settings.minHours);
        }
        else
        {
            $('#minhours').val(defaultMinHours);
        }

        if (typeof response.settings !== "undefined" && response.settings.maxHours){
            $('#maxhours').val(response.settings.maxHours);
        }
        else
        {
            $('#maxhours').val(defaultMaxHours);
        }

        if (typeof response.settings !== "undefined" && response.settings.earliestBegin){
            $('#earliestbegin').val(response.settings.earliestBegin);
        }
        else
        {
            $('#earliestbegin').val(defaultEarliestBegin);
        }

        if (typeof response.settings !== "undefined" && response.settings.latestBegin){
            $('#latestbegin').val(response.settings.latestBegin);
        }
        else
        {
            $('#latestbegin').val(defaultLatestBegin);
        }

        if (typeof response.settings !== "undefined" && response.settings.weekdays){
            updateWeekdaysCheckboxes(response.settings.weekdays);            
        }
        else
        {
            updateWeekdaysCheckboxes(defaultWeekdays);
        }
    });

    $('#save').click(function(){

        $("#messagebar").hide();
        $(".message").remove();

        if ($('#settingsForm').valid()){

            var minHours = $('#minhours').val();
            var maxHours = $('#maxhours').val();
            var earliestBegin = $('#earliestbegin').val();
            var latestBegin = $('#latestbegin').val();
            var weekdays = [];

            $('input:checkbox:checked').each(function(){
                weekdays.push($(this).val());
            });
            
            chrome.storage.sync.set({'settings': {
                                                    'minHours': minHours,
                                                    'maxHours': maxHours, 
                                                    'earliestBegin': earliestBegin,
                                                    'latestBegin': latestBegin,
                                                    'weekdays': weekdays
                                                }}, function(){
                console.log('Settings have been saved.');
            });
            $('#messagebar').attr('hasErrors', 'false');
            $('#messagebar').append('<div class="message"><i class="ms-Icon ms-Icon--Completed successicon"></i><div class="messagetext">Settings have been saved successfully.</div></div>');

        }
        else
        {
            $('#messagebar').attr('hasErrors', 'true');
        }

        $('#messagebar').show();
    });

    $('#reset').click(function(){
        $("#messagebar").hide();
        $(".error").remove();

        $('#minhours').val(defaultMinHours);
        $('#maxhours').val(defaultMaxHours);
        $('#earliestbegin').val(defaultEarliestBegin);
        $('#latestbegin').val(defaultLatestBegin);
        updateWeekdaysCheckboxes(defaultWeekdays);
    })
});

function updateWeekdaysCheckboxes(weekdays){

    if (weekdays.includes('monday')){
        $('#monday').prop('checked', true);
    } else {
        $('#monday').prop('checked', false);
    }

    if (weekdays.includes('tuesday')){
        $('#tuesday').prop('checked', true);
    } else {
        $('#tuesday').prop('checked', false);
    }

    if (weekdays.includes('wednesday')){
        $('#wednesday').prop('checked', true);
    } else {
        $('#wednesday').prop('checked', false);
    }

    if (weekdays.includes('thursday')){
        $('#thursday').prop('checked', true);
    } else {
        $('#thursday').prop('checked', false);
    }

    if (weekdays.includes('friday')){
        $('#friday').prop('checked', true);
    } else {
        $('#friday').prop('checked', false);
    }
}
