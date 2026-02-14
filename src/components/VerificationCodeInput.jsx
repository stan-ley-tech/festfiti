import React, { useRef, useState, useEffect } from 'react';

export const VerificationCodeInput = ({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
  error = false
}) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  // Reset code when error changes to true
  useEffect(() => {
    if (error) {
      setCode(Array(length).fill(''));
      inputRefs.current[0]?.focus();
    }
  }, [error, length]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    // Call onChange callback
    const codeString = newCode.join('');
    onChange?.(codeString);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits are entered (only if not disabled)
    if (codeString.length === length && !codeString.includes('') && !disabled) {
      // Small delay to ensure UI updates before submission
      setTimeout(() => {
        onComplete?.(codeString);
      }, 100);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
        onChange?.(newCode.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Only allow digits
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, length).split('');
    const newCode = [...code];

    digits.forEach((digit, i) => {
      if (i < length) {
        newCode[i] = digit;
      }
    });

    setCode(newCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }

    // Call callbacks
    const codeString = newCode.join('');
    onChange?.(codeString);
    if (codeString.length === length && !codeString.includes('')) {
      onComplete?.(codeString);
    }
  };

  const handleFocus = (index) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={code[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={`w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''} ${
            code[index] ? 'border-primary-500' : ''
          }`}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};
