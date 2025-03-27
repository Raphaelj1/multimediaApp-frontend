import { FormEvent, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import Welcome from '../components/Welcome';

export type ActiveTab = 'text' | 'audio' | 'image' | 'video';

interface Chat {
	role: string;
	content: string;
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
	const [chatHistory, setChatHistory] = useState<ChatHistory>({
		text: [],
		image: [],
		audio: [],
		video: [],
	});

	const onGenerate = (e: FormEvent) => {
		e.preventDefault();
		setInUse(true);

		e.preventDefault();
		if (!prompt.trim()) return;

		try {
			setChatHistory(() => ({
				...chatHistory,
				[activeTab]: [...chatHistory[activeTab], { role: 'user', content: prompt }],
			}));
		} catch (error) {
			setChatHistory(() => ({
				...chatHistory,
				[activeTab]: [
					...chatHistory[activeTab],
					{ role: 'system', content: 'Error generating content' },
				],
			}));
		} finally {
			setPrompt('');
		}
	};

	const onNavToHome = () => {
		setInUse(false);
	};

	return (
		<div className="flex w-full max-h-screen overflow-hidden">
			<div className="hidden sm:block">
				<Sidebar
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onNavToHome={onNavToHome}
				/>
			</div>

			<div className="flex-1">
				<div className="flex flex-col bg-white rounded-2xl h-full">
					<Header activeTab={activeTab} />

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
