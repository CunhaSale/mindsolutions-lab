import { motion } from "framer-motion";

interface ProgressBarProps {
  isActive: boolean;
  onComplete: () => void;
}

const ProgressBar = ({ isActive, onComplete }: ProgressBarProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-secondary">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "linear" }}
        onAnimationComplete={onComplete}
        style={{
          backgroundImage:
            // "repeating-linear-gradient(90deg, hsl(142 70% 50%) 0px, hsl(142 70% 50%) 8px, hsl(142 70% 40%) 8px, hsl(142 70% 40%) 16px)",
            "repeating-linear-gradient(90deg, hsl(239 84% 67%) 0px, hsl(239 84% 67%) 8px, hsl(239 84% 57%) 8px, hsl(239 84% 57%) 16px)",
        }}
      />
      <div className="absolute right-4 top-3 text-[10px] font-mono text-primary tracking-widest">
        INITIALIZING AGENTS...
      </div>
    </div>
  );
};

export default ProgressBar;
