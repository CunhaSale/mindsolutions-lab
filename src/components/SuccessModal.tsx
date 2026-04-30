import { motion, AnimatePresence } from "framer-motion";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="absolute inset-0 bg-background/90" onClick={onClose} />
          <motion.div
            className="relative bg-card border-2 border-primary p-8 max-w-md w-full mx-4"
            // style={{ boxShadow: "8px 8px 0px 0px hsl(142 70% 50% / 0.2)" }}
            style={{ boxShadow: "8px 8px 0px 0px hsl(239 84% 67% / 0.2)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl text-primary mb-2">DEPLOY_COMPLETE</h3>
              <div className="font-mono text-xs text-muted-foreground space-y-1 mb-6">
                <p>All 4 agents initialized successfully.</p>
                <p>Status: <span className="text-primary">OPERATIONAL</span></p>
                <p>Latency: <span className="text-primary">12.4ms</span></p>
                <p>Uptime: <span className="text-primary">99.9%</span></p>
              </div>
              <button
                onClick={onClose}
                className="border-2 border-primary text-primary font-mono text-sm px-6 py-2 tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors duration-100"
              >
                [ CONTINUE ]
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
