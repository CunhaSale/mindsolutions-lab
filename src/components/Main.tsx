import { useState } from "react";
import { motion } from "framer-motion";
import DevRoom from "@/components/DevRoom";
import ProgressBar from "@/components/ProgressBar";
import SuccessModal from "@/components/SuccessModal";
import StatsBar from "@/components/StatsBar";

const Main = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAccelerated, setIsAccelerated] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setIsAccelerated(true);
  };

  const handleProgressComplete = () => {
    setIsDeploying(false);
    setIsAccelerated(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background scanline relative">
      <ProgressBar isActive={isDeploying} onComplete={handleProgressComplete} />

      {/* Header */}
      <header className="border-b border-border px-4 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-primary" />
            <span className="text-pixel text-sm text-foreground tracking-widest">
              BIT-AGENT
            </span>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest">
            v2.4.1 // SYSTEMS NOMINAL
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            {/* MindSolutions<br /> */}
            <span className="text-primary">Lab</span><br />Solutions
          </h1>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
            Sistemas legados encontram inteligência futura.{" "}
            <span className="text-primary">Sem fricção.</span> Apenas código.
          </p>

          {/* CTA */}
          <motion.button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="border-2 border-primary text-primary font-mono text-sm px-8 py-3 tracking-[0.15em] hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            // style={{ boxShadow: "4px 4px 0px 0px hsl(142 70% 50% / 0.3)" }}
            style={{ boxShadow: "4px 4px 0px 0px hsl(239 84% 67% / 0.3)" }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.05 }}
          >
            [ INITIALIZE_AGENT ]
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="mb-8">
          <StatsBar />
        </div>

        {/* Dev Room */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary" />
            <span className="text-pixel text-xs text-muted-foreground tracking-widest">
              THE DEV ROOM
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <DevRoom isAccelerated={isAccelerated} />
        </motion.div>

        {/* Footer info */}
        <div className="mt-12 border-t border-border pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "DEPLOY", desc: "Agentes autônomos operam 24/7 sem intervenção humana." },
              { title: "MONITOR", desc: "Dashboards em tempo real com métricas de performance." },
              { title: "SCALE", desc: "De 1 a 1000 agentes com escalabilidade horizontal." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="border-2 border-border p-4 hover:border-primary/30"
                style={{ transition: "border-color 0.1s step-end" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
              >
                <h3 className="text-sm text-primary mb-2">{item.title}</h3>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 font-mono text-[10px] text-muted-foreground text-center tracking-widest">
          <span className="text-primary">●</span> Organic data: 12.4ms latency / 99.9% uptime / 4 agents active
        </div>
      </main>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
};

export default Main;
