interface ChatBoxProps {
	role: string;
	content: string;
}

function ChatBox({ role, content }: ChatBoxProps) {
	// let style = role == "user" ? ""

	return (
		<div className={`w-full flex ${role === 'user' ? 'justify-end' : 'justify-start'} text-sm`}>

			{role !== 'user' && <div className="text-gray-400 text-sm font-bold p-4">🤖</div>}
			
			<div
				className={`max-w-4/5 sm:max-w-3/5 rounded-xl  ${
					role === 'user' ? 'rounded-tr-none bg-gray-100' : 'bg-transparent'
				} p-3`}
			>
				{content}
			</div>
		</div>
	);
}

export default ChatBox;
