
	function startListening() {
		var recognition = new (webkitSpeechRecognition || SpeechRecognition)();
		recognition.lang = 'en-US';
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;
		recognition.start();

		[
		 'onaudiostart',
		 'onaudioend',
		 'onend',
		 'onerror',
		 'onnomatch',
		 'onresult',
		 'onsoundstart',
		 'onsoundend',
		 'onspeechend',
		 'onstart'
		].forEach(function(eventName) {
			recognition[eventName] = function(e) {
				console.log(eventName, e);
			};
		});

		document.querySelector('#start-button').innerHTML = 'Listening...';

		recognition.onend = function() {
			document.querySelector('#start-button').innerHTML = 'Start Listening';
		};
		recognition.onresult = function() {
			document.querySelector('#demo-echo').textContent = event.results[0][0].transcript;
		};
	};

	(function() {
		document.querySelector('#start-button').addEventListener('click', startListening);
	})();

	