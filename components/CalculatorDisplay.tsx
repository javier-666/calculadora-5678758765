import React from 'react';

interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
    const formatNumber = (numStr: string): string => {
        if (numStr === 'Error' || numStr === 'NaN') {
            return 'Error';
        }

        const parts = numStr.split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];
        
        // Use regex to add commas to the integer part.
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        if (decimalPart !== undefined) {
            return `${formattedInteger}.${decimalPart}`;
        }
        
        if(numStr.slice(-1) === '.') {
            return `${formattedInteger}.`;
        }

        return formattedInteger;
    };
    
    const formattedValue = formatNumber(value);

    const getFontSize = () => {
        const length = formattedValue.length;
        if (length > 15) return 'text-4xl';
        if (length > 12) return 'text-5xl';
        if (length > 9) return 'text-6xl';
        if (length > 6) return 'text-7xl';
        return 'text-8xl';
    };

    return (
        <div className="bg-black text-white p-4 rounded-lg text-right overflow-hidden flex justify-end items-end" style={{ minHeight: '120px' }}>
            <h1 className={`font-light ${getFontSize()} break-all whitespace-normal`}>
                {formattedValue}
            </h1>
        </div>
    );
};

export default CalculatorDisplay;
