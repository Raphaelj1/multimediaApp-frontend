import { useState } from 'react';
import {
	AudioLines,
	ChevronsLeft,
	ChevronsRight,
	HomeIcon,
	ImageIcon,
	LetterText,
	VideoIcon,
} from 'lucide-react';
import logo from '../assets/logo.svg';
import { ActiveTab } from '../pages/Homepage';

interface SidebarProps {
	activeTab: ActiveTab;
	setActiveTab: (tab: ActiveTab) => void;
	onNavToHome: () => void;
}

interface TabItem {
	id: ActiveTab;
	label: string;
	icon: React.ReactNode;
}

const tabItems: TabItem[] = [
	{
		id: 'text',
		label: 'Write with AI',
		icon: <LetterText color="#525252" size={'20px'} strokeWidth={1} />,
	},
	{
		id: 'image',
		label: 'Image From Text',
		icon: <ImageIcon color="#525252" size={'20px'} strokeWidth={1} />,
	},
	{
		id: 'audio',
		label: 'Generate Audio',
		icon: <AudioLines color="#525252" size={'20px'} strokeWidth={1} />,
	},
	{
		id: 'video',
		label: 'Video from Text',
		icon: <VideoIcon color="#525252" size={'20px'} strokeWidth={1} />,
	},
];

function Sidebar({ activeTab, setActiveTab, onNavToHome }: SidebarProps) {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	const handleTabClick = (tab: ActiveTab) => {
		setActiveTab(tab);
	};

	const baseTabClasses =
		'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-200';
	const activeTabClasses = 'bg-white font-medium shadow-sm';
	const collapsedTabClasses = 'px-2 pr-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-200';

	return (
		<div className={`${isExpanded ? 'w-80' : 'w-17'} px-4 h-screen`}>
			<div className="flex items-center justify-between h-18 py-4 mb-8 border-b border-neutral-300">
				{isExpanded ? (
					<>
						<img src={logo} alt="Logo" className="w-6" />
						<button
							onClick={handleExpanded}
							className="flex items-center bg-white p-1 pr-1.5 rounded-full shadow-sm outline-none cursor-pointer"
						>
							<ChevronsLeft color="#444" size={'20px'} />
						</button>
					</>
				) : (
					<button
						onClick={handleExpanded}
						className="bg-white p-1 pl-1.5 rounded-full shadow-sm outline-none cursor-pointer"
					>
						<ChevronsRight color="#444" size={'20px'} />
					</button>
				)}
			</div>

			<div className="py-2 h-10">
				{isExpanded && <p className="text-xs text-neutral-400">CREATE</p>}
			</div>

			<div className="flex flex-col gap-2 text-sm">
				{tabItems.map((item) => (
					<div
						key={item.id}
						onClick={() => handleTabClick(item.id)}
						className={`${isExpanded ? baseTabClasses : collapsedTabClasses} ${
							activeTab === item.id ? activeTabClasses : ''
						}`}
					>
						{item.icon}
						{isExpanded && (
							<p
								className={
									activeTab === item.id ? 'text-[#444]' : 'text-neutral-600'
								}
							>
								{item.label}
							</p>
						)}
					</div>
				))}
			</div>

			<div className="absolute bottom-4 px-2">
				<button
					onClick={onNavToHome}
					className=" p-1 outline-none cursor-pointer"
				>
					<HomeIcon color="#525252" size={'20px'} strokeWidth={1} />
				</button>
			</div>
		</div>
	);
}

export default Sidebar;
