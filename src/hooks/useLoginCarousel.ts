import { useState, useEffect } from 'react';

export function useLoginCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [signUpMode, setSignUpMode] = useState(false);

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>(".input-field");

    function onFocus(this: HTMLInputElement) {
      this.classList.add("active");
    }
    function onBlur(this: HTMLInputElement) {
      if (this.value === "") {
        this.classList.remove("active");
      }
    }

    inputs.forEach(input => {
      input.addEventListener("focus", onFocus);
      input.addEventListener("blur", onBlur);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener("focus", onFocus);
        input.removeEventListener("blur", onBlur);
      });
    };
  }, [signUpMode]);

  function toggleSignUp() {
    setSignUpMode(prev => !prev);
  }

  function moveSlider(index: number) {
    if (index >= 1 && index <= 4) {
      setActiveIndex(index);
    }
  }

  return {
    activeIndex,
    signUpMode,
    toggleSignUp,
    moveSlider
  };
}
