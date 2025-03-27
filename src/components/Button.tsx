interface ButtonProps {
	onClick: () => void;
	variant?: 'default' | 'rounded';
	size?: 'sm' | 'lg';
	children: React.ReactNode;
}

function Button({ onClick, variant = 'default', size = 'sm', children }: ButtonProps) {
	let style = variant === "rounded" ? 'rounded-full' : "rounded-sm";
	return (
		<button className={`bg-primary text-white p-1 pr-1.5 ${style}`}  onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
