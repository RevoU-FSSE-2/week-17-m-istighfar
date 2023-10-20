interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    className: string;
    children: React.ReactNode;
    onClick?: () => void; // Add the onClick event handler here
}

const Button: React.FC<ButtonProps> = ({ type, className, children, onClick }) => (
    <button type={type} className={className} onClick={onClick}>
        {children}
    </button>
);

export default Button;
