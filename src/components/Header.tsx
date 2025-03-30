import { AudioLines, LucideMenu, ImageIcon, LetterText, VideoIcon } from 'lucide-react';
import { ActiveTab } from '../pages/Homepage';
import { useState } from 'react';

interface HeaderProps {
	activeTab: ActiveTab;
	setActiveTab: (tab: ActiveTab) => void;
}

interface TabItem {
	id: ActiveTab;
	label: string;
	icon: React.ReactNode;
}

const tabItems: TabItem[] = [
	{
		id: 'text',
		label: 'Text generation',
		icon: <LetterText color="#525252" size={'20px'} strokeWidth={1} />,
	},
	{
		id: 'image',
		label: 'Text to image',
		icon: <ImageIcon color="#525252" size={'20px'} strokeWidth={1} />,
	},
	{
		id: 'audio',
		label: 'Text to audio',
		icon: <AudioLines color="#525252" size={'20px'} strokeWidth={1} />,
	},
	{
		id: 'video',
		label: 'Text to video',
		icon: <VideoIcon color="#525252" size={'20px'} strokeWidth={1} />,
	},
];

function Header({ activeTab, setActiveTab }: HeaderProps) {
	const [isNavOpen, setIsNavOpen] = useState(false);

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

	const handleTabClick = (tab: ActiveTab) => {
		setActiveTab(tab);
		setIsNavOpen(false)
	};

	return (
		<div className="flex items-center gap-2 h-18 py-4 px-2 sm:px-5 border-b border-neutral-300">
			<button className="p-2 cursor-pointer sm:hidden" onClick={() => setIsNavOpen(true)}>
				<LucideMenu color="#444" size={'24px'} strokeWidth={1} />
			</button>

			<div>
				<p className="text-sm font-semibold">{title}</p>
				<p className="text-xs opacity-80">{desc}</p>
			</div>

			{isNavOpen && (
				<div className="absolute h-screen top-0 left-0 w-full overflow-y-auto sm:hidden">
					<div className="relative w-full h-full">
						<div
							className="absolute top-0 left-0 h-full w-full bg-black opacity-50"
							onClick={() => setIsNavOpen(false)}
						/>

						<div className="absolute top-0 left-0 w-5/6 max-w-sm h-full bg-gray-100">
							{/* button */}
							<div className="flex items-center gap-2 h-18 py-4 px-2">
								<button
									className="p-2 cursor-pointer"
									onClick={() => setIsNavOpen(false)}
								>
									<LucideMenu color="#444" size={'24px'} strokeWidth={1} />
								</button>
							</div>

							{/* nav items */}
							<div className="flex flex-col gap-2 text-sm px-2 mt-4">
								{tabItems.map((item) => (
									<div
										key={item.id}
										onClick={() => handleTabClick(item.id)}
										className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer ${
											activeTab === item.id ? 'bg-white font-medium shadow-sm' : ''
										}`}
									>
										{item.icon}
										<p
											className={
												activeTab === item.id
													? 'text-[#444]'
													: 'text-neutral-600'
											}
										>
											{item.label}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Header;
