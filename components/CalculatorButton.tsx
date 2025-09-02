import React from 'react';
import { ButtonType } from '../types';

interface CalculatorButtonProps {
  label: string;
  type: ButtonType;
  onClick: () => void;
  isZero?: boolean;
  isActive?: boolean;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, type, onClick, isZero = false, isActive = false }) => {
  const getButtonClasses = () => {
    let classes = 'rounded-full h-20 w-20 flex items-center justify-center text-3xl font-light focus:outline-none transition-all duration-200 ';

    if (isActive) {
      classes += 'bg-white text-orange-500 ';
    } else {
        switch (type) {
            case 'digit':
                classes += 'bg-[#333333] text-white hover:bg-[#555555]';
                break;
            case 'operator':
                classes += 'bg-orange-500 text-white hover:bg-orange-600';
                break;
            case 'function':
                classes += 'bg-[#AFAFAF] text-black hover:bg-[#CCCCCC]';
                break;
        }
    }
    
    if (isZero) {
      classes = classes.replace('w-20', 'w-full col-span-2 text-left pl-8');
    }

    return classes;
  };

  return (
    <button
      className={getButtonClasses()}
      onClick={onClick}
      aria-label={`calculator button ${label}`}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
