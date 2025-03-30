import { FormEvent } from 'react';
import { MessageSquarePlusIcon, LucideStars } from 'lucide-react';

type TabKey = 'text' | 'image' | 'audio' | 'video';

interface InputFormProps {
	activeTab: TabKey;
	prompt: string;
	setPrompt: (prompt: string) => void;
	onGenerate: (e: FormEvent) => void;
	loading: boolean;
	isNewChat: boolean;
}

function InputForm({
	activeTab,
	prompt,
	setPrompt,
	onGenerate,
	loading,
	isNewChat,
}: InputFormProps) {
	const placeholders: { [key in TabKey]: string } = {
		text: 'What\'s on your mind?',
		audio: 'Type something and I\'ll say it...',
		video: 'Describe the video you want to create...',
		image: 'Imagine something and describe it...',
	};

	return (
		<div className="bg-gray-100 rounded-2xl p-1">
			{isNewChat && (
				<div className="flex gap-2 items-center justify-start p-4">
					<MessageSquarePlusIcon size={'20px'} strokeWidth={1} color="#444" />
					<p className="text-sm text-neutral-600">Start new chat</p>
				</div>
			)}

			<form
				onSubmit={onGenerate}
				className="w-full bg-white rounded-2xl"
			>
				<textarea
					rows={3}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder={placeholders[activeTab]}
					className="w-full flex-1 text-base sm:text-sm p-4 outline-none resize-none rounded-lg placeholder:text-sm focus:outline-none"
				></textarea>
				<div className="flex items-center justify-end pb-4">
					<button
						type="submit"
						onClick={onGenerate}
						disabled={loading}
						className={`flex gap-2 text-sm mr-4 pt-1.5 pb-2 pl-4 pr-6 rounded-lg cursor-pointer hover:bg-neutral-800 ${
							loading ? 'bg-neutral-400' : 'bg-neutral-700 '
						} text-white`}
					>
						<LucideStars size={'20px'} strokeWidth={1} color="#fff" />
						Generate
					</button>
				</div>
			</form>
		</div>
	);
}

export default InputForm;
