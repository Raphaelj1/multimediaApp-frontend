import { ActiveTab } from "../pages/Homepage";

interface HeaderProps {
	activeTab: ActiveTab;
}

function Header({ activeTab }: HeaderProps) {
	const headers: { [key: string]: { title: string; desc: string } } = {
		text: {
			title: 'Text Generation',
			desc: 'Generate creative text from prompts',
		},
		image: {
			title: 'Text to Image',
			desc: 'Create images from text descriptions',
		},
		audio: {
			title: 'Text to Audio',
			desc: 'Generate short audio clips from text',
		},
		video: {
			title: 'Text to Video',
			desc: 'Create short video clips from text descriptions',
		},
	};

	const { title, desc } = headers[activeTab] || headers.text;

	return (
		<div className="h-18 py-4 px-5 border-b border-neutral-300">
			<p className="text-sm font-semibold">{title}</p>
			<p className="text-xs mt-1 opacity-80">{desc}</p>
		</div>
	);
}

export default Header;
