import { FormEvent, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import Welcome from '../components/Welcome';
import fetchOutput from '../services/api-client';

export type ActiveTab = 'text' | 'audio' | 'image' | 'video';

interface Chat {
	role: string;
	content: string;
	type: ActiveTab;
}

export interface ChatHistory {
	text: Chat[];
	image: Chat[];
	audio: Chat[];
	video: Chat[];
}

function Homepage() {
	const [prompt, setPrompt] = useState('');
	const [activeTab, setActiveTab] = useState<ActiveTab>('text');
	const [inUse, setInUse] = useState(false);
	const [chatHistory, setChatHistory] = useState<ChatHistory>(() => {
		// try {
		// 	const savedHistory = localStorage.getItem('chatHistory');
		// 	return savedHistory
		// 		? (JSON.parse(savedHistory) as ChatHistory)
		// 		: { text: [], image: [], audio: [], video: [] };
		// } catch {
		return { text: [], image: [], audio: [], video: [] };
		// }
	});

	// useEffect(() => {
	// 	localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
	// }, [chatHistory]);

	const onGenerate = (e: FormEvent) => {
		e.preventDefault();

		if (!prompt.trim()) return;

		setInUse(true);

		// Add user's message to chat history immediately
		setChatHistory((prevChatHistory) => ({
			...prevChatHistory,
			[activeTab]: [
				...prevChatHistory[activeTab],
				{ role: 'user', content: prompt, type: 'text' },
			],
		}));

		setPrompt('');

		// Fetch system response and append it
		fetchOutput(prompt, activeTab)
			.then(({ type, content }) => {
				console.log('This is from fetchoutput main', content);
				setChatHistory((prevChatHistory) => ({
					...prevChatHistory,
					[activeTab]: [
						...prevChatHistory[type as ActiveTab],
						{ role: 'system', content: content || 'Oops! No content returned', type },
					],
				}));
			})
			.catch((err) => {
				console.log('This is from fetchoutput catch', err);
				setChatHistory((prevChatHistory) => ({
					...prevChatHistory,
					[activeTab]: [
						...prevChatHistory[activeTab],
						{
							role: 'system',
							content:
								'I am having trouble connecting to the server. Please check your internet connection and try again.',
							type: 'text',
						},
					],
				}));
			})
			.finally(() => {
				setPrompt('');
			});
	};

	const onNavToHome = () => {
		setInUse(false);
	};

	return (
		<div className="flex w-full h-screen overflow-hidden">
			<div className="hidden w-fit sm:block">
				<Sidebar
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onNavToHome={onNavToHome}
				/>
			</div>

			<div className="flex-1 overflow-y-auto">
				<div className="flex flex-col h-full bg-white rounded-2xl">
					<div className="sticky top-0 sm:static">
						<Header activeTab={activeTab} setActiveTab={setActiveTab} />
					</div>

					<div className="flex-1 overflow-y-auto">
						{inUse ? (
							<ChatArea
								activeTab={activeTab}
								chatHistory={chatHistory}
								prompt={prompt}
								setPrompt={setPrompt}
								onGenerate={onGenerate}
							/>
						) : (
							<Welcome
								activeTab={activeTab}
								onGenerate={onGenerate}
								prompt={prompt}
								setPrompt={setPrompt}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
