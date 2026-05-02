import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sprites = ["/dev-sprite-1.png", "/dev-sprite-2.png", "/dev-sprite-3.png", "/dev-sprite-4.png"];

const agentNames = [
  "AGENT_01 // Prospecção de Leads",
  "AGENT_02 // Financeiro & Backoffice",
  "AGENT_03 // Pessoas & Experiência",
  "AGENT_04 // Publicador de Conteúdo"
];
const agentRoles = ["Lead Prospector", "Finance & Back-Office", "People & Experience", "Content Publisher"];
const agentStatuses = ["COMPILING", "DEPLOYING", "SCANNING", "LEARNING"];

const agentDescriptions = [
  "Identifica, qualifica e nutre leads em tempo real — pesquisando perfis, cruzando dados de mercado e entregando contatos prontos para abordagem comercial sem intervenção humana.",
  "Automatiza conciliações, emissão de notas, controle de pagamentos e relatórios financeiros — eliminando retrabalho operacional e reduzindo erros em processos de rotina.",
  "Gerencia onboarding, pesquisas de clima, comunicados internos e acompanhamento de performance — mantendo o colaborador conectado sem sobrecarregar o time de RH.",
  "Gera, revisa e publica conteúdo automaticamente no blog ou portal — seguindo tom de voz, calendário editorial e SEO — sem a fila de aprovação travar a produção."
];

const logMessages = [
  ["GET /api/v1/deploy... 200 OK", "npm run build ████████ 100%", "Compiling modules... done", "Memory: 42MB / 512MB"],
  ["render(<App />) ✓", "CSS bundle: 12.4KB gzip", "Hydration complete in 3ms", "DOM nodes: 847"],
  ["docker push registry/app:latest", "k8s rollout status ✓", "Pods: 3/3 running", "Latency p99: 12.4ms"],
  ["Training epoch 47/100...", "Loss: 0.0023 ↓", "Accuracy: 99.7% ↑", "Tokens processed: 1.2M"],
];

interface DevCardProps {
  index: number;
  isAccelerated: boolean;
}

const DevCard = ({ index, isAccelerated }: DevCardProps) => {
  const [showLog, setShowLog] = useState(false);
  const [currentLog, setCurrentLog] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % logMessages[index].length);
      setStatusIdx((prev) => (prev + 1) % agentStatuses.length);
    }, isAccelerated ? 400 : 2000);
    return () => clearInterval(interval);
  }, [index, isAccelerated]);

  return (
    <motion.div
      className="relative border-r border-b border-border bg-card p-4 sm:p-6 flex flex-col items-center gap-3 cursor-pointer group"
      onHoverStart={() => setShowLog(true)}
      onHoverEnd={() => setShowLog(false)}
      whileHover={{ backgroundColor: "hsl(220, 12%, 10%)" }}
      transition={{ duration: 0.1 }}
    >
      {/* Status indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5">
        <motion.div
          className="w-2 h-2 bg-primary"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: isAccelerated ? 0.3 : 1, ease: "linear" }}
        />
        <span className="text-[10px] font-mono text-primary tracking-widest">
          {agentStatuses[(statusIdx + index) % agentStatuses.length]}
        </span>
      </div>

      {/* Active indicator */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5">
        <motion.div
          className="w-2 h-2 bg-green-500 rounded-full"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: isAccelerated ? 0.3 : 1, ease: "linear" }}
        />
        <span className="text-[10px] font-mono text-green-500 tracking-widest">
          ACTIVE
        </span>
      </div>

      {/* Sprite with pixelated rendering */}
      <motion.div
        className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden"
        animate={{ y: [0, -2, 0, 2, 0] }}
        transition={{
          repeat: Infinity,
          duration: isAccelerated ? 0.4 : 1.2,
          ease: "linear",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        <img
          src={sprites[index]}
          alt={agentNames[index]}
          className="w-full h-full object-contain"
          style={{ imageRendering: "pixelated" }}
        />
        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline pointer-events-none opacity-40" />
      </motion.div>

      {/* Agent info */}
      <div className="text-center">
        <p className="text-xs font-mono text-primary tracking-[0.2em]">
          {agentNames[index]}
        </p>
        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
        <p className="text-[10px] font-mono text-muted-foreground mt-0.5 leading-relaxed">
          {agentDescriptions[index]}
        </p>
          {agentRoles[index]}
        </p>
      </div>

      {/* Log balloon on hover */}
      <AnimatePresence>
        {showLog && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.1 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-secondary border-2 border-primary px-3 py-2 z-10 min-w-[200px]"
            // style={{ boxShadow: "4px 4px 0px 0px hsl(142 70% 50% / 0.3)" }}
            style={{ boxShadow: "4px 4px 0px 0px hsl(239 84% 67% / 0.3)" }}
          >
            <div className="text-[10px] font-mono text-primary leading-relaxed">
              <span className="text-muted-foreground">$</span>{" "}
              {logMessages[index][currentLog]}
              <span className="blink-cursor ml-0.5">█</span>
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface DevRoomProps {
  isAccelerated: boolean;
}

const DevRoom = ({ isAccelerated }: DevRoomProps) => {
  return (
    <div className="border-t border-l border-border pixel-border">
      <div className="grid grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <DevCard key={i} index={i} isAccelerated={isAccelerated} />
        ))}
      </div>
    </div>
  );
};

export default DevRoom;
