import { FormEvent, useEffect } from 'react';
import Greeting from './Greeeting';
import InputForm from './InputForm';
import QuickPrompts from './QuickPrompts';
import { ActiveTab } from '../pages/Homepage';

interface WelcomeProps {
	activeTab: ActiveTab;
	prompt: string;
	setPrompt: (prompt: string) => void;
	onGenerate: (e: FormEvent) => void;
}

function Welcome({ activeTab, prompt, setPrompt, onGenerate }: WelcomeProps) {
	useEffect(() => {
		setPrompt('');
	}, [activeTab]);

	return (
		<div className="h-full flex flex-col justify-center max-w-4xl m-auto p-4 sm:pb-8">
			<Greeting />

			<div className="mt-8">
				<InputForm
					activeTab={activeTab}
					prompt={prompt}
					setPrompt={setPrompt}
					onGenerate={onGenerate}
					loading={false}
					isNewChat={true}
				/>
			</div>

			<div className="mt-4 mb-8">
				<QuickPrompts activeTab={activeTab} setPrompt={setPrompt} />
			</div>
		</div>
	);
}

export default Welcome;
