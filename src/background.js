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
		var data = generateTimes();
				
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

function generateTimes() {
	var times = [];
	for (var i = 0; i < 31; i++) {
		var startMoment = moment(randomDateInRange(new Date(2020, 1, 1, 8, 0), new Date(2020, 1, 1, 9, 30)));
		var duration = Math.random() * (570 - 510) + 510;
		var endMoment = startMoment.clone().add(duration, 'minutes');

		times.push(
			{
				startTime: startMoment.format('HH:mm'),
				endTime: endMoment.format('HH:mm'),
				duration: duration
			}
		)
	}
	return times;
}

function randomDateInRange(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}