chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlMatches: '(msvacation/wtt|timereporter.z6.web.core.windows.net)' },
					})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});

chrome.pageAction.onClicked.addListener(function (tabs) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		
		chrome.storage.sync.get('settings', function(response){
			var minHours;
			var maxHours;
			var earliestBegin;
			var latestBegin;

			if (response.settings)
			{
				minHours = response.settings.minHours;
				maxHours = response.settings.maxHours;
				earliestBegin = response.settings.earliestBegin;
				latestBegin = response.settings.latestBegin;
			}
			else
			{
				minHours = defaultMinHours;
				maxHours = defaultMaxHours;
				earliestBegin = defaultEarliestBegin;
				latestBegin = defaultLatestBegin;
			}

			var duration = Math.random() * (maxHours * 60 - minHours * 60) + minHours * 60;
			var data = generateTimes(duration, earliestBegin, latestBegin);
					
			chrome.tabs.sendMessage(
				tabs[0].id,
				{
					command: 'populateWorkingTime',
					data: data
				},
				function (response) {
					console.log(response);
				}
			)
		});
	});
});

function generateTimes(duration, earliestBegin, latestBegin) {
	
	var earliestStartMoment = moment(earliestBegin, 'HH:mm');
	var latestStartMoment = moment(latestBegin, 'HH:mm');

	var times = [];
	for (var i = 0; i < 31; i++) {
		var startMoment = moment(
							randomDateInRange(new Date(2020, 
														1, 
														1, 
														earliestStartMoment.get('hour'), 
														earliestStartMoment.get('minute')), 
												new Date(2020, 
														1, 
														1, 
														latestStartMoment.get('hour'), 
														latestStartMoment.get('minute'))
							)
						);
		var endMoment = startMoment.clone().add(duration, 'minutes');

		times.push(
			{
				startTime: startMoment.format('HH:mm'),
				endTime: (startMoment.isSame(endMoment, 'day')) ? endMoment.format('HH:mm') : '23:59',
				duration: duration
			}
		)
	}
	return times;
}

function randomDateInRange(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}