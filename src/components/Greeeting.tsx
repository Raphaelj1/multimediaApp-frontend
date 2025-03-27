function Greeting() {
	let user = 'Raph';

	return (
		<div className="text-center text-sm max-w-72 sm:max-w-84 mx-auto">
			<h1 className="text-2xl sm:text-3xl font-medium mb-2">Good Morning, {user} 👋</h1>
			<p className="text-xs sm:text-sm text-neutral-600">Choose a prompt below or write your own to start chatting with MultimediaAI</p>
		</div>
	);
}

export default Greeting;
