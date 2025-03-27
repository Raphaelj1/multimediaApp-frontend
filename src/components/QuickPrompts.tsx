import { useState } from 'react';
import { RotateCwIcon } from 'lucide-react';
import { shuffleArray } from '../utils/shuffleArray';

interface QuickPromptsProps {
	setPrompt: (text: string) => void;
	activeTab: string;
}

function QuickPrompts({ setPrompt, activeTab }: QuickPromptsProps) {
	const initialPrompts: { [key: string]: string[] } = {
		text: ['Write a short story', 'Describe a sunset', 'Tell me a joke'],
		audio: ['Rain sound', 'Thunderstorm'],
		video: ['Stormy night', 'Sunrise over mountains'],
		image: ['A cat', 'A forest'],
	};

	const [prompts, setPrompts] = useState(initialPrompts);

	const randomizePrompts = () => {
		setPrompts((prevPrompts) => {
			const newPrompts: { [key: string]: string[] } = {};
			for (const key in prevPrompts) {
				newPrompts[key] = shuffleArray(prevPrompts[key]);
			}
			console.log(newPrompts)
			return newPrompts;
		});
	};

	return (
		<div className="mt-4 text-xs">
			<div className='text-neutral-300 font-medium'>
				Quick Prompts
			</div>
			<div className="flex flex-wrap gap-2 mt-3">
				{prompts[activeTab].slice(0, 3).map((prompt, index) => (
					<button
						key={index}
						onClick={() => setPrompt(prompt)}
						className="flex items-center px-3 pt-0.5 pb-1 border rounded-full border-neutral-300 cursor-pointer"
					>
						{prompt}
					</button>
				))}
			</div>
			<button
				onClick={randomizePrompts}
				className="flex items-center gap-1 text-neutral-600 rounded-lg mt-2 cursor-pointer"
			>
				<RotateCwIcon size={'14px'} />
				Refresh Prompts
			</button>
		</div>
	);
}

export default QuickPrompts;
