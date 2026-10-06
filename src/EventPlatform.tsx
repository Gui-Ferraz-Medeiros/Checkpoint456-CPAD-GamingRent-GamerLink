import { useState } from "react";

type EventPlatformProps = {
  onOpen: (tab: "home" | "communities" | "events" | "profile") => void;
  membershipActive: boolean;
  confirmedEvents: number[];
  onConfirmEvent: (eventId: number) => void;
  onActivateMembership: () => void;
};

type EventItem = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  players: string;
  price: string;
  color: string;
  description: string;
};

const events: EventItem[] = [
  {
    id: 1,
    title: "Night Play: Ranked",
    date: "18 OUT",
    time: "20:00",
    location: "Arena Gamer",
    city: "São Paulo, SP",
    players: "1.2K",
    price: "R$ 12",
    color: "#9B30FF",
    description: "Sessão de ranked, acompanhamento de transmissão e prêmio de participação.",
  },
  {
    id: 2,
    title: "Co-op Challenge",
    date: "23 OUT",
    time: "19:30",
    location: "Lounge do Jogo",
    city: "Rio de Janeiro, RJ",
    players: "840",
    price: "R$ 0",
    color: "#00F0FF",
    description: "Desafio cooperativo em equipe, com conteúdo especial e rewards.",
  },
  {
    id: 3,
    title: "Indie Showcase",
    date: "29 OUT",
    time: "18:00",
    location: "Teatro Game Lab",
    city: "Brasília, DF",
    players: "2.4K",
    price: "R$ 18",
    color: "#39FF14",
    description: "Apresentação de jogos independentes, entrevistas e sessão de jogabilidade.",
  },
];

const Brand = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, #00F0FF, #9B30FF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900 }}>G</div>
    <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 14, fontWeight: 900 }}>GAMER<span style={{ color: "#00F0FF" }}>LINK</span></div>
  </div>
);

const EventCard = ({ event, onDetails }: { event: EventItem; onDetails: (event: EventItem) => void }) => (
  <button onClick={() => onDetails(event)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: 13, marginBottom: 10, background: "#2D1B4E", borderRadius: 15, border: "1px solid rgba(184,169,204,.12)", color: "#fff", textAlign: "left", cursor: "pointer" }}>
    <div style={{ width: 54, height: 54, borderRadius: 12, background: `${event.color}22`, color: event.color, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 10 }}>{event.date}<span style={{ fontSize: 7, color: "#B8A9CC" }}>{event.time}</span></div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 12, fontWeight: 700, margin: "0 0 4px" }}>{event.title}</p>
      <p style={{ fontSize: 9, color: "#B8A9CC", margin: "0 0 4px" }}>{event.location}</p>
      <p style={{ fontSize: 9, color: "#00F0FF", margin: 0 }}>{event.players} participantes</p>
    </div>
    <span style={{ color: "#00F0FF", fontSize: 10, fontWeight: 800 }}>{event.price}</span>
  </button>
);

export default function EventPlatform({ onOpen, membershipActive, confirmedEvents, onConfirmEvent, onActivateMembership }: EventPlatformProps) {
  const [view, setView] = useState<"list" | "details" | "payment" | "subscription">("list");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const openDetails = (event: EventItem) => {
    setSelectedEvent(event);
    setView("details");
  };

  const confirmPresence = () => {
    if (selectedEvent) onConfirmEvent(selectedEvent.id);
  };

  const goToPayment = () => {
    setPaymentComplete(false);
    setView("payment");
  };

  const activateMembership = () => {
    onActivateMembership();
    setPaymentComplete(true);
    setView("list");
  };

  const back = () => {
    if (view === "details") setView("list");
    else if (view === "payment") setView("details");
    else if (view === "subscription") setView("list");
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#1A0B2E", color: "#fff", fontFamily: "Outfit, sans-serif", overflow: "hidden" }}>
      <div style={{ padding: "18px", borderBottom: "1px solid rgba(0,240,255,.1)" }}>
        <Brand />
        <h1 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 22, margin: "18px 0 5px" }}>Eventos</h1>
        <p style={{ color: "#B8A9CC", fontSize: 12, margin: 0 }}>Encontremembros, participem e celebrem.</p>
      </div>

      {view === "list" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "18px" }}>
          <div style={{ background: "linear-gradient(135deg,#9B30FF,#5D21B8)", borderRadius: 18, padding: 18, marginBottom: 16, boxShadow: "0 12px 35px rgba(155,48,255,.2)" }}>
            <p style={{ fontSize: 10, color: "#E9D5FF", textTransform: "uppercase", letterSpacing: ".12em" }}>Evento da semana</p>
            <h2 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, margin: "8px 0 7px" }}>Pulse Night</h2>
            <p style={{ color: "#E9D5FF", fontSize: 11, lineHeight: 1.5 }}>Jogue com a comunidade, ganhe conquistas e conheça novos amigos.</p>
            <button onClick={() => openDetails(events[0])} style={{ marginTop: 13, padding: "8px 12px", borderRadius: 9, border: 0, background: "#fff", color: "#5D21B8", fontWeight: 800, fontSize: 10 }}>Confirmar presença</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 0 10px" }}>
            <p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11, fontWeight: 800, margin: 0 }}>EVENTOS EM BREVE</p>
            <span style={{ color: "#00F0FF", fontSize: 9 }}>{membershipActive ? "Acesso ilimitado ativo" : "assinatura pendente"}</span>
          </div>
          {events.map(event => <EventCard key={event.id} event={event} onDetails={openDetails} />)}
          <div style={{ background: "#2D1B4E", borderRadius: 16, padding: 15, marginTop: 8, border: "1px solid rgba(0,240,255,.2)" }}>
            <p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10, color: "#00F0FF", margin: "0 0 7px" }}>GAMER PASS</p>
            <p style={{ fontSize: 11, lineHeight: 1.5, color: "#B8A9CC", margin: "0 0 12px" }}>Acesso ilimitado a eventos enquanto a assinatura mensal estiver ativa.</p>
            <button onClick={() => setView("subscription")} style={{ width: "100%", padding: "11px", borderRadius: 10, border: 0, background: "#00F0FF", color: "#1A0B2E", fontWeight: 900, fontSize: 10 }}>ATIVAR ASSINATURA MENSAL</button>
          </div>
        </div>
      )}

      {view === "details" && selectedEvent && (
        <div style={{ flex: 1, overflowY: "auto", padding: "18px" }}>
          <button onClick={back} style={{ border: 0, background: "transparent", color: "#00F0FF", fontSize: 10, marginBottom: 14 }}>← Voltar</button>
          <div style={{ height: 130, borderRadius: 18, background: `linear-gradient(135deg, ${selectedEvent.color}55, #1A0B2E)`, padding: 18, display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: 14 }}>
            <p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10, color: "#00F0FF", margin: 0 }}>{selectedEvent.date} · {selectedEvent.time}</p>
            <h2 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, margin: "7px 0 0" }}>{selectedEvent.title}</h2>
          </div>
          <div style={{ background: "#2D1B4E", borderRadius: 16, padding: 15, marginBottom: 12 }}>
            <p style={{ color: "#B8A9CC", fontSize: 10, margin: "0 0 8px" }}>LOCALIZAÇÃO</p>
            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>{selectedEvent.location}</p>
            <p style={{ fontSize: 11, color: "#B8A9CC", margin: 0 }}>{selectedEvent.city}</p>
            <div style={{ height: 95, marginTop: 12, borderRadius: 12, background: "linear-gradient(135deg, #1A0B2E, #2D1B4E)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00F0FF", fontSize: 10, border: "1px dashed rgba(0,240,255,.35)" }}>MAPA DA LOCALIZAÇÃO</div>
          </div>
          <div style={{ background: "#2D1B4E", borderRadius: 16, padding: 15, marginBottom: 12 }}>
            <p style={{ color: "#B8A9CC", fontSize: 10, margin: "0 0 8px" }}>SOBRE O EVENTO</p>
            <p style={{ fontSize: 11, lineHeight: 1.5, color: "#E8E4EF", margin: 0 }}>{selectedEvent.description}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px 2px", marginBottom: 14 }}>
            <div><p style={{ fontSize: 9, color: "#B8A9CC", margin: 0 }}>INGRESSO</p><p style={{ fontWeight: 900, fontSize: 16, margin: "3px 0 0" }}>{selectedEvent.price}</p></div>
            <div><p style={{ fontSize: 9, color: "#B8A9CC", margin: 0 }}>PARTICIPANTES</p><p style={{ fontWeight: 900, fontSize: 16, margin: "3px 0 0" }}>{selectedEvent.players}</p></div>
          </div>
          <button onClick={confirmPresence} style={{ width: "100%", padding: "13px", borderRadius: 12, border: 0, background: "#00F0FF", color: "#1A0B2E", fontWeight: 900, fontSize: 11 }}>{confirmedEvents.includes(selectedEvent.id) ? "PRESENÇA CONFIRMADA ✓" : "CONFIRMAR PRESENÇA"}</button>
          <button onClick={goToPayment} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "1px solid #9B30FF", background: "transparent", color: "#B8A9CC", fontWeight: 700, fontSize: 10, marginTop: 9 }}>IR PARA PAGAMENTO</button>
        </div>
      )}

      {view === "payment" && selectedEvent && (
        <div style={{ flex: 1, overflowY: "auto", padding: "18px" }}>
          <button onClick={back} style={{ border: 0, background: "transparent", color: "#00F0FF", fontSize: 10, marginBottom: 14 }}>← Voltar</button>
          <h2 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, margin: "0 0 5px" }}>Pagamento</h2>
          <p style={{ color: "#B8A9CC", fontSize: 11, margin: "0 0 18px" }}>Complete o ingresso de {selectedEvent.title}.</p>
          <div style={{ background: "#2D1B4E", borderRadius: 16, padding: 16, marginBottom: 12 }}>
            <p style={{ fontSize: 10, color: "#B8A9CC", margin: "0 0 5px" }}>TOTAL</p>
            <p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 26, fontWeight: 900, margin: "0 0 16px" }}>{selectedEvent.price}</p>
            <p style={{ fontSize: 10, color: "#B8A9CC", margin: "0 0 7px" }}>Dados de pagamento</p>
            <div style={{ background: "#1A0B2E", borderRadius: 10, padding: 12, marginBottom: 8, color: "#B8A9CC", fontSize: 10 }}>•••• 4242 · •••• 4242 · •••• 4242 · 4242</div>
            <div style={{ background: "#1A0B2E", borderRadius: 10, padding: 12, color: "#B8A9CC", fontSize: 10 }}>VALIDADE 12/29 · CVV 123</div>
          </div>
          <button onClick={() => { confirmPresence(); setPaymentComplete(true); setView("list"); }} style={{ width: "100%", padding: "13px", borderRadius: 12, border: 0, background: "#00F0FF", color: "#1A0B2E", fontWeight: 900, fontSize: 11 }}>CONFIRMAR E PAGAR</button>
          {paymentComplete && <p style={{ color: "#39FF14", textAlign: "center", fontSize: 10, marginTop: 12 }}>Pagamento confirmado. Sua presença foi registrada.</p>}
        </div>
      )}

      {view === "subscription" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "18px" }}>
          <button onClick={back} style={{ border: 0, background: "transparent", color: "#00F0FF", fontSize: 10, marginBottom: 14 }}>← Voltar</button>
          <div style={{ background: "linear-gradient(135deg,#9B30FF,#5D21B8)", borderRadius: 18, padding: 18, marginBottom: 16 }}>
            <p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10, color: "#E9D5FF", margin: "0 0 7px" }}>GAMER PASS</p>
            <h2 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 20, margin: "0 0 8px" }}>Assinatura mensal</h2>
            <p style={{ color: "#E9D5FF", fontSize: 11, lineHeight: 1.5, margin: 0 }}>Acesso ilimitado a todos os eventos da plataforma durante o período contratado.</p>
          </div>
          <div style={{ background: "#2D1B4E", borderRadius: 16, padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><div><p style={{ fontSize: 10, color: "#B8A9CC", margin: 0 }}>PLANO MENSAL</p><p style={{ fontSize: 13, fontWeight: 700, margin: "4px 0 0" }}>30 dias de acesso</p></div><p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 20, fontWeight: 900, color: "#00F0FF" }}>R$ 29,90</p></div>
            <ul style={{ paddingLeft: 18, color: "#B8A9CC", fontSize: 10, lineHeight: 1.8, margin: 0 }}><li>Eventos ilimitados</li><li>Confirmación de presença</li><li>Ingressos com desconto</li><li>Suporte prioritário</li></ul>
          </div>
          <button onClick={activateMembership} style={{ width: "100%", padding: "13px", borderRadius: 12, border: 0, background: "#00F0FF", color: "#1A0B2E", fontWeight: 900, fontSize: 11 }}>ATIVAR E COMPRAR</button>
        </div>
      )}

      <div style={{ height: 62, background: "rgba(26,11,46,.98)", borderTop: "1px solid rgba(0,240,255,.12)", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "5px 0 8px" }}>
        {[
          { id: "home", label: "Início", icon: "⌂" },
          { id: "communities", label: "Comunidades", icon: "◉" },
          { id: "events", label: "Eventos", icon: "▦" },
          { id: "profile", label: "Perfil", icon: "◌" },
        ].map(item => <button key={item.id} onClick={() => onOpen(item.id as EventPlatformProps["onOpen"] extends (tab: infer T) => void ? T : never)} style={{ border: 0, background: "transparent", color: item.id === "events" ? "#00F0FF" : "#5E4B78", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 8, padding: 5 }}><span style={{ fontSize: 17 }}>{item.icon}</span><span>{item.label}</span></button>)}
      </div>
    </div>
  );
}
