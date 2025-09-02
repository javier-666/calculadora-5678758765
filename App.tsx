import React, { useState } from 'react';
import CalculatorButton from './components/CalculatorButton';
import CalculatorDisplay from './components/CalculatorDisplay';
import { ButtonType } from './types';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const calculate = (op1: number, op2: number, opr: string): number => {
    switch (opr) {
      case '+':
        return op1 + op2;
      case '-':
        return op1 - op2;
      case '×':
        return op1 * op2;
      case '÷':
        if (op2 === 0) return NaN; // Handle division by zero
        return op1 / op2;
      default:
        return op2;
    }
  };

  const handleDigitClick = (digit: string) => {
    if (displayValue.length >= 20) return;
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      const resultString = isNaN(result) ? "Error" : String(result);
      setDisplayValue(resultString);
      setFirstOperand(isNaN(result) ? null : result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleEqualsClick = () => {
    if (operator && firstOperand !== null && !waitingForSecondOperand) {
        const inputValue = parseFloat(displayValue);
        const result = calculate(firstOperand, inputValue, operator);
        const resultString = isNaN(result) ? "Error" : String(result);
        setDisplayValue(resultString);
        setFirstOperand(isNaN(result) ? null : result);
        setWaitingForSecondOperand(true);
    }
  };
  
  const handleClearClick = () => {
    if (displayValue !== '0') {
      setDisplayValue('0');
      // If we were waiting for a second operand, don't clear everything, just the display.
      // This allows the user to correct a mistaken entry.
      if (waitingForSecondOperand) {
         return;
      }
    } else {
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    }
  };

  const handleAllClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  }

  const handleToggleSignClick = () => {
    if (displayValue === 'Error') return;
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };
  
  const handlePercentageClick = () => {
    if (displayValue === 'Error') return;
    const currentValue = parseFloat(displayValue);
    setDisplayValue(String(currentValue / 100));
  };


  const renderButtons = () => {
    const clearLabel = (displayValue !== '0' && !waitingForSecondOperand) ? 'C' : 'AC';
    const clearAction = clearLabel === 'AC' ? handleAllClearClick : handleClearClick;
    
    const buttons = [
      { label: clearLabel, type: 'function' as ButtonType, onClick: clearAction },
      { label: '+/-', type: 'function' as ButtonType, onClick: handleToggleSignClick },
      { label: '%', type: 'function' as ButtonType, onClick: handlePercentageClick },
      { label: '÷', type: 'operator' as ButtonType, onClick: () => handleOperatorClick('÷') },
      { label: '7', type: 'digit' as ButtonType, onClick: () => handleDigitClick('7') },
      { label: '8', type: 'digit' as ButtonType, onClick: () => handleDigitClick('8') },
      { label: '9', type: 'digit' as ButtonType, onClick: () => handleDigitClick('9') },
      { label: '×', type: 'operator' as ButtonType, onClick: () => handleOperatorClick('×') },
      { label: '4', type: 'digit' as ButtonType, onClick: () => handleDigitClick('4') },
      { label: '5', type: 'digit' as ButtonType, onClick: () => handleDigitClick('5') },
      { label: '6', type: 'digit' as ButtonType, onClick: () => handleDigitClick('6') },
      { label: '-', type: 'operator' as ButtonType, onClick: () => handleOperatorClick('-') },
      { label: '1', type: 'digit' as ButtonType, onClick: () => handleDigitClick('1') },
      { label: '2', type: 'digit' as ButtonType, onClick: () => handleDigitClick('2') },
      { label: '3', type: 'digit' as ButtonType, onClick: () => handleDigitClick('3') },
      { label: '+', type: 'operator' as ButtonType, onClick: () => handleOperatorClick('+') },
      { label: '0', type: 'digit' as ButtonType, onClick: () => handleDigitClick('0'), isZero: true },
      { label: '.', type: 'digit' as ButtonType, onClick: handleDecimalClick },
      { label: '=', type: 'operator' as ButtonType, onClick: handleEqualsClick },
    ];

    return buttons.map((button) => (
      <CalculatorButton
        key={button.label}
        label={button.label}
        type={button.type}
        onClick={button.onClick}
        isZero={button.isZero}
        isActive={operator === button.label && waitingForSecondOperand}
      />
    ));
  };

  return (
    <main className="bg-black min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-xs sm:max-w-sm" style={{width: '24rem'}}>
        <div className="bg-black rounded-lg p-4">
          <CalculatorDisplay value={displayValue} />
          <div className="grid grid-cols-4 gap-3 mt-4">
            {renderButtons()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
