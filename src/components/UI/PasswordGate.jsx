import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { introData } from '../../data/intro';
import FlowerWordAnimation from '../Intro/FlowerWordAnimation';

export default function PasswordGate({ onUnlock, onPlayUnlock, onPlayClick }) {
  const gateConfig = introData.passwordGate || {
    password: "0405",
    logicHint: "DOB : DD/MM",
    title: "Only For You",
    message: "It was not an ordinary space to explore, it is full of that how I describe you.",
    subMessage: "A private space created for only one person. Please enter the password to enter.",
    buttonText: "UNLOCK & ENTER",
    errorMessage: "Incorrect password. (Hint: DOB in DD/MM format)",
    successMessage: "Key verified. Unfolding your story..."
  };

  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);

  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const sealRef = useRef(null);
  const welcomePromptRef = useRef(null);
  const inputRefs = useRef([]);

  // Auto-focus first input on mount & entrance animation
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    if (cardRef.current && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.15, ease: 'back.out(1.4)' }
      );

      if (sealRef.current) {
        gsap.fromTo(
          sealRef.current,
          { scale: 0, rotate: -25 },
          { scale: 1, rotate: 0, duration: 0.7, delay: 0.45, ease: 'back.out(1.8)' }
        );
      }
    }
  }, []);

  // Handle digit change
  const handleChange = (index, value) => {
    setError('');
    const cleaned = value.replace(/[^0-9]/g, '');

    if (!cleaned) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    // Single digit input
    const char = cleaned.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    // Auto-advance to next input
    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleValidate(digits.join(''));
    }
  };

  // Handle paste (e.g. "0405", "04/05", "04-05")
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const cleaned = pasteData.replace(/[^0-9]/g, '').slice(0, 4);

    if (cleaned.length > 0) {
      const newDigits = ['', '', '', ''];
      for (let i = 0; i < cleaned.length; i++) {
        newDigits[i] = cleaned[i];
      }
      setDigits(newDigits);

      // Focus last filled or next input
      const nextIndex = Math.min(3, cleaned.length);
      inputRefs.current[nextIndex]?.focus();

      if (cleaned.length === 4) {
        handleValidate(cleaned);
      }
    }
  };

  // Validation function
  const handleValidate = useCallback((enteredCode) => {
    const targetPassword = (gateConfig.password || '0405').trim();
    const normalizedInput = enteredCode.trim();

    if (normalizedInput.length < 4) {
      setError('Please enter all 4 digits (DOB : DD/MM)');
      triggerShake();
      return;
    }

    if (normalizedInput === targetPassword) {
      // SUCCESS!
      setIsSuccess(true);
      setError('');
      setIsSubmitting(true);

      if (onPlayUnlock) {
        onPlayUnlock();
      } else if (onPlayClick) {
        onPlayClick();
      }

      // Smoothly transition into the Flower Word Animation section
      if (cardRef.current && containerRef.current) {
        gsap.timeline()
          .to(cardRef.current, {
            scale: 0.96,
            y: -10,
            opacity: 0,
            duration: 0.45,
            ease: 'power2.in'
          })
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => {
              setShowWelcomePrompt(true);
              setIsSubmitting(false);
            }
          });
      } else {
        setShowWelcomePrompt(true);
        setIsSubmitting(false);
      }

    } else {
      // FAILED
      setError(gateConfig.errorMessage || "Incorrect password. (Logic: DOB : DD/MM)");
      triggerShake();
      // Reset inputs & focus on first box
      setDigits(['', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [gateConfig, onPlayUnlock, onPlayClick]);

  // Shake animation on error
  const triggerShake = () => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: -14 },
        {
          x: 14,
          duration: 0.08,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.set(cardRef.current, { x: 0 });
          }
        }
      );
    }
  };

  // Complete unlock and proceed to letter
  const handleProceed = () => {
    if (onPlayClick) onPlayClick();
    try {
      sessionStorage.setItem('proposal_flipbook_unlocked', 'true');
    } catch (e) {}
    onUnlock();
  };

  // Auto-validate once all 4 digits are filled
  useEffect(() => {
    const fullCode = digits.join('');
    if (fullCode.length === 4 && !isSuccess && !isSubmitting && !showWelcomePrompt) {
      handleValidate(fullCode);
    }
  }, [digits, isSuccess, isSubmitting, showWelcomePrompt, handleValidate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting && !showWelcomePrompt) {
      handleValidate(digits.join(''));
    }
  };

  if (showWelcomePrompt) {
    return (
      <FlowerWordAnimation
        onProceed={handleProceed}
        onPlayClick={onPlayClick}
        promptTitle="welcome to explore my random night toughts on you"
        promptByline="drafted by nights"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="password-gate-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Password Verification"
    >
      <div ref={cardRef} className="password-gate-card">
        {/* Subtle decorative inner border */}
        <div className="password-gate-inner-border" />

        {/* Vintage Wax Seal / Lock Emblem */}
        <div ref={sealRef} className={`password-gate-seal ${isSuccess ? 'unlocked' : ''}`}>
          <div className="seal-glow-ring" />
          {isSuccess ? (
            /* Unlocked Open Lock / Heart Icon */
            <svg
              className="seal-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            </svg>
          ) : (
            /* Antique Lock Icon */
            <svg
              className="seal-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
        </div>

        {/* Header Tag */}
        <div className="password-gate-tag">
          {gateConfig.title || "Only For You"}
        </div>

        {/* The Special Pop-up Message */}
        <p className="password-gate-message">
          &ldquo;{gateConfig.message}&rdquo;
        </p>

        {/* Subtext description */}
        <p className="password-gate-submessage">
          {gateConfig.subMessage}
        </p>

        {/* Logic Hint Badge */}
        <div className="password-gate-hint-badge">
          <span className="hint-label">KEY LOGIC</span>
          <span className="hint-value">{gateConfig.logicHint || "DOB : DD/MM"}</span>
        </div>

        {/* Password PIN Form */}
        <form onSubmit={handleSubmit} className="password-gate-form">
          <div className="password-pin-container" onPaste={handlePaste}>
            {/* Day Digits (DD) */}
            <div className="pin-group">
              <input
                ref={(el) => (inputRefs.current[0] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digits[0]}
                placeholder="D"
                disabled={isSubmitting}
                onChange={(e) => handleChange(0, e.target.value)}
                onKeyDown={(e) => handleKeyDown(0, e)}
                className={`pin-input ${error ? 'pin-error' : ''} ${isSuccess ? 'pin-success' : ''}`}
                aria-label="Day digit 1"
              />
              <input
                ref={(el) => (inputRefs.current[1] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digits[1]}
                placeholder="D"
                disabled={isSubmitting}
                onChange={(e) => handleChange(1, e.target.value)}
                onKeyDown={(e) => handleKeyDown(1, e)}
                className={`pin-input ${error ? 'pin-error' : ''} ${isSuccess ? 'pin-success' : ''}`}
                aria-label="Day digit 2"
              />
            </div>

            {/* Separator / */}
            <div className="pin-slash" aria-hidden="true">/</div>

            {/* Month Digits (MM) */}
            <div className="pin-group">
              <input
                ref={(el) => (inputRefs.current[2] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digits[2]}
                placeholder="M"
                disabled={isSubmitting}
                onChange={(e) => handleChange(2, e.target.value)}
                onKeyDown={(e) => handleKeyDown(2, e)}
                className={`pin-input ${error ? 'pin-error' : ''} ${isSuccess ? 'pin-success' : ''}`}
                aria-label="Month digit 1"
              />
              <input
                ref={(el) => (inputRefs.current[3] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digits[3]}
                placeholder="M"
                disabled={isSubmitting}
                onChange={(e) => handleChange(3, e.target.value)}
                onKeyDown={(e) => handleKeyDown(3, e)}
                className={`pin-input ${error ? 'pin-error' : ''} ${isSuccess ? 'pin-success' : ''}`}
                aria-label="Month digit 2"
              />
            </div>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="password-gate-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="password-gate-success">
              <span>{gateConfig.successMessage || "Key accepted. Unfolding your story..."}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            className={`password-gate-submit-btn ${isSuccess ? 'btn-success' : ''}`}
            disabled={isSubmitting}
            onClick={() => onPlayClick && onPlayClick()}
          >
            {isSuccess ? "UNSEALING..." : (gateConfig.buttonText || "UNLOCK & ENTER")}
          </button>
        </form>

        {/* Small subtle footer note */}
        <p className="password-gate-footer-note">
          DOB format: Day (DD) and Month (MM)
        </p>
      </div>
    </div>
  );
}
