import { FormEvent, useEffect, useRef } from 'react';
import InputForm from './InputForm';
import ChatBox from './ChatBox';
import { ActiveTab, ChatHistory } from '../pages/Homepage';

interface ChatAreaProps {
	activeTab: ActiveTab;
	prompt: string;
	setPrompt: (prompt: string) => void;
	onGenerate: (e: FormEvent) => void;
	chatHistory: ChatHistory;
}

function ChatArea({ activeTab, prompt, setPrompt, onGenerate, chatHistory }: ChatAreaProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chatHistory]);

	useEffect(() => {
		setPrompt('');
	}, [activeTab]);

	return (
		<div className="h-full flex flex-col items-center">
			<div className="w-full flex-1 m-auto py-4 overflow-y-auto">
				<div className="w-full max-w-4xl flex flex-col gap-2 p-2 sm:p-5 m-auto">
					{!!chatHistory[activeTab] &&
						chatHistory[activeTab].map((chat) => (
							<ChatBox
								role={chat.role}
								content={chat.content}
								type={chat.type}
								key={chat.content}
							/>
						))}
					<div ref={messagesEndRef} />
				</div>
			</div>

			<div className="w-full max-w-4xl p-2 pt-1 sm:p-4 sm:pt-2">
				<InputForm
					activeTab={activeTab}
					isNewChat={false}
					onGenerate={onGenerate}
					prompt={prompt}
					setPrompt={setPrompt}
					loading={false}
				/>
			</div>
		</div>
	);
}

export default ChatArea;
