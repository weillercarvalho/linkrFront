import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, usePresence } from 'framer-motion';
import { gsap } from 'gsap';

function Box() {
  const ref = useRef(null);
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      gsap.to(ref.current, {
        opacity: 0,
        onComplete: () => safeToRemove?.(),
      });
    }
  }, [isPresent, safeToRemove]);

  return (
    <Father className="box" ref={ref}>
      Logout
    </Father>
  );
}

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <Out>
      <div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? 'Hide' : 'Show'}
        </motion.button>
      </div>

      <AnimatePresence>{show ? <Box /> : null}</AnimatePresence>
    </Out>
  );
}
const Father = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: var(--accent);
  color: var(--background);
  font-size: 50px;
  line-height: 260px;
  font-weight: 700;
  border-radius: 30px;
`;
const Out = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  div {
    display: flex;
    flex-direction: column;
    padding: 0;
    padding-bottom: 50px;
    align-items: center;
  }
`;
