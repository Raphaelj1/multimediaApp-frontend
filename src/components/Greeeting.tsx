function getWelcomeMessage(): string {
	const hour = new Date().getHours();

	if (hour >= 5 && hour < 12) {
		return 'Good Morning! ☀️'
	} else if (hour >= 12 && hour < 17) {
		return 'Hot Afternoon, Innit! 😎'
	} else if (hour >= 17 && hour <= 22) {
		return 'Hey there! 👋'
	} else {
		return 'Hi Friend! 👋'
	}
}

function Greeting() {
	let greeting = getWelcomeMessage();

	return (
		<div className="text-center text-sm max-w-72 sm:max-w-84 mx-auto">
			<h1 className="text-2xl sm:text-3xl font-medium mb-2">{greeting}</h1>
			<p className="text-xs sm:text-sm text-neutral-600">Pick a prompt below or share your own idea to start chatting with MultimediaAI</p>
		</div>
	);
}

export default Greeting;
