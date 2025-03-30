import { ActiveTab } from '../pages/Homepage';

interface ChatBoxProps {
	role: string;
	content: string;
	type: ActiveTab;
}

function ChatBox({ role, content, type }: ChatBoxProps) {
	// let style = role == "user" ? ""

	return (
		<div className={`w-full flex ${role === 'user' ? 'justify-end' : 'justify-start'} text-sm`}>
			{role !== 'user' && <div className="text-gray-400 text-sm font-bold p-3">🤖</div>}

			<div
				className={`max-w-4/5 sm:max-w-3/5 rounded-xl  ${
					role === 'user' ? 'rounded-tr-none bg-gray-100' : 'bg-transparent'
				} p-3`}
			>
				{type === 'text' && <div>{content}</div>}
				{type === 'image' && (
					<img src={content} alt="Generated" className="w-3/4 h-full rounded-lg" />
				)}
				{type === 'audio' && <audio controls src={content} itemType="audio/mp3"/>}
				{type === 'video' && <video controls src={content} className="w-full" />}
				{!type && <p>{content}</p>} {/* For system messages like errors */}
			</div>
		</div>
	);
}

export default ChatBox;
