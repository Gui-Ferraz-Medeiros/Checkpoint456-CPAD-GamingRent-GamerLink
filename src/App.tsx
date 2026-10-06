import { useMemo, useState, type ReactNode } from "react";
import EventPlatform from "./EventPlatform";

type Screen = "login" | "home" | "communities" | "events" | "profile";
type Tab = "home" | "communities" | "events";

type Game = {
  id: number;
  title: string;
  genre: string;
  platform: string;
  score: number;
  followers: string;
  image: string;
  description: string;
  tag: string;
};

const games: Game[] = [
  { id: 1, title: "Tom Clancy's Rainbow Six Siege", genre: "Ação · Estratégia", platform: "PS5 · Xbox · PC", score: 94, followers: "18.4K", image: "https://thumb.wikimedia.org/wikipedia/en/thumb/4/47/Tom_Clancy%27s_Rainbow_Six_Siege_cover_art.jpg/250px-Tom_Clancy%27s_Rainbow_Six_Siege_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail", description: "Um shooter tático multiplayer em que equipes trabalham juntas para concluir missões e defender objetivos.", tag: "Mais recomendado" },
  { id: 2, title: "Overwatch", genre: "Ação · Multiplayer", platform: "PS5 · Xbox · PC", score: 89, followers: "12.1K", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Overwatch.svg/330px-Overwatch.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail", description: "Um jogo de equipe baseado em heróis com habilidades únicas, combate cooperativo e objetivos estratégicos.", tag: "Em alta" },
  { id: 3, title: "Minecraft", genre: "Aventura · Construção", platform: "PS · Xbox · Switch · PC", score: 87, followers: "9.7K", image: "https://upload.wikimedia.org/wikipedia/pt/9/9c/Minecraft_capa.png?utm_source=pt.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled", description: "Um mundo de construção e exploração onde jogadores criam, coletam recursos e enfrentam ameaças.", tag: "Para fãs de narrativa" },
  { id: 4, title: "Grand Theft Auto V", genre: "Ação · Aventura", platform: "PS5 · Xbox · PC", score: 91, followers: "21.2K", image: "https://thumb.wikimedia.org/wikipedia/en/thumb/a/a5/Grand_Theft_Auto_V.png/250px-Grand_Theft_Auto_V.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail", description: "Uma aventura de ação em uma cidade moderna, com personagens interligados e missões em mundo aberto.", tag: "Trending" },
];

const communities = [
  { name: "Nerds de PS5", members: "28.6K", color: "#00F0FF", icon: "PS", topic: "Jogos, dicas, eventos e conquistas" },
  { name: "Xbox Players Club", members: "19.2K", color: "#39FF14", icon: "XB", topic: "Conteúdo, encontros e desafios" },
  { name: "Switch Society", members: "14.8K", color: "#FF4D6D", icon: "SW", topic: "Jogos portáveis e comunidades locais" },
];

const events = [
  { title: "Night Play: Ranked", date: "18 OUT", time: "20:00", players: "1.2K", color: "#9B30FF", icon: "✦" },
  { title: "Co-op Challenge", date: "23 OUT", time: "19:30", players: "840", color: "#00F0FF", icon: "◆" },
  { title: "Indie Showcase", date: "29 OUT", time: "18:00", players: "2.4K", color: "#39FF14", icon: "◈" },
];

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, ReactNode> = {
    home: <><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    profile: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    arrow: <><path d="m9 18 6-6-6-6"/></>,
    sparkle: <><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></>,
    play: <><path d="m9 7 8 5-8 5z"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const Brand = ({ compact = false }: { compact?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ width: compact ? 36 : 42, height: compact ? 36 : 42, borderRadius: 13, background: "linear-gradient(135deg, #00F0FF, #9B30FF)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(0,240,255,.28)", color: "#fff", fontSize: compact ? 17 : 20, fontWeight: 900 }}>
      <span style={{ transform: "translateY(-1px)" }}>G</span>
    </div>
    {!compact && <div><div style={{ fontFamily: "Orbitron, sans-serif", fontSize: 16, fontWeight: 900, letterSpacing: "-.4px" }}>GAMER<span style={{ color: "#00F0FF" }}>LINK</span></div><div style={{ fontSize: 8, color: "#B8A9CC", letterSpacing: ".18em", marginTop: 2 }}>PLAY · CONNECT · BELONG</div></div>}
  </div>
);

function Login({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const enter = () => {
    if (!user || !pass) { setError("Preencha usuário e senha."); return; }
    if (user === "admin" && pass === "admin") onLogin();
    else setError("Usuário ou senha incorretos.");
  };
  return (
    <div style={{ minHeight: "100%", position: "relative", overflow: "hidden", background: "#1A0B2E", color: "#fff", fontFamily: "Outfit, sans-serif" }}>
      <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .5 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(26,11,46,.82), rgba(26,11,46,.95))" }} />
      <div style={{ position: "relative", minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "34px 26px 28px" }}>
        <Brand />
        <div style={{ maxWidth: 360, margin: "auto", width: "100%" }}>
          <div style={{ marginBottom: 28 }}><p style={{ color: "#00F0FF", textTransform: "uppercase", fontSize: 11, letterSpacing: ".18em", fontWeight: 700 }}>Bem-vindo ao seu universo</p><h1 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 30, lineHeight: 1.15, margin: "10px 0 12px" }}>Jogue. Conecte.<br /><span style={{ color: "#00F0FF" }}>Appareça.</span></h1><p style={{ color: "#B8A9CC", lineHeight: 1.6 }}>Uma comunidade para descobrir jogos, encontrar pessoas e viver eventos incríveis.</p></div>
          <div style={{ background: "rgba(45,27,78,.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,240,255,.18)", borderRadius: 24, padding: 22 }}>
            <h2 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 14, margin: "0 0 18px", textAlign: "center" }}>ENTRAR NA COMUNIDADE</h2>
            <label style={{ display: "block", color: "#B8A9CC", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", marginBottom: 7 }}>USUÁRIO</label>
            <input value={user} onChange={e => setUser(e.target.value)} placeholder="Digite seu usuário" style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid rgba(184,169,204,.2)", background: "#1C0E38", color: "#fff", outline: "none", marginBottom: 13 }} />
            <label style={{ display: "block", color: "#B8A9CC", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", marginBottom: 7 }}>SENHA</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && enter()} placeholder="Digite sua senha" style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid rgba(184,169,204,.2)", background: "#1C0E38", color: "#fff", outline: "none" }} />
            {error && <p style={{ color: "#FF7777", fontSize: 12, margin: "12px 0 0" }}>{error}</p>}
            <button onClick={enter} style={{ width: "100%", marginTop: 18, padding: "14px", border: 0, borderRadius: 13, background: "linear-gradient(135deg,#00F0FF,#0090B8)", color: "#1A0B2E", fontFamily: "Orbitron, sans-serif", fontWeight: 900, cursor: "pointer", boxShadow: "0 0 20px rgba(0,240,255,.28)" }}>ENTRAR</button>
            <p style={{ color: "#5E4B78", textAlign: "center", fontSize: 11, margin: "14px 0 0" }}>Acesso de demonstração: <strong style={{ color: "#00F0FF" }}>admin / admin</strong></p>
          </div>
        </div>
        <p style={{ color: "#5E4B78", textAlign: "center", fontSize: 11 }}>Criar conta gratuita · Não é necessário pagar para participar</p>
      </div>
    </div>
  );
}

function Home({ onOpen }: { onOpen: (tab: Tab) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => games.filter(g => `${g.title} ${g.genre} ${g.platform}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#1A0B2E", color: "#fff", fontFamily: "Outfit, sans-serif", overflow: "hidden" }}>
      <div style={{ padding: "16px 18px 10px", background: "linear-gradient(180deg,rgba(26,11,46,.98),rgba(26,11,46,.72))" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}><Brand compact /><div style={{ display: "flex", alignItems: "center", gap: 10 }}><button style={{ border: 0, background: "transparent", color: "#B8A9CC", display: "flex", padding: 4 }}><Icon name="bell" /></button><div style={{ width: 34, height: 34, borderRadius: 50, background: "linear-gradient(135deg,#9B30FF,#00F0FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, border: "2px solid #00F0FF" }}>CP</div></div></div>
        <p style={{ color: "#B8A9CC", fontSize: 11, margin: "0 0 3px" }}>Bem-vindo, Carlos</p><h1 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 22, margin: 0, fontWeight: 900 }}>O que você joga?</h1>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}><div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "#2D1B4E", border: "1px solid rgba(0,240,255,.18)", borderRadius: 13, padding: "10px 12px" }}><Icon name="search" size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar jogos ou gêneros" style={{ flex: 1, minWidth: 0, border: 0, background: "transparent", color: "#fff", outline: 0, fontSize: 12 }} /></div><button style={{ width: 42, height: 42, border: 0, borderRadius: 12, background: "#00F0FF", color: "#1A0B2E", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="sparkle" size={17} /></button></div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 18px 24px" }}>
        <div style={{ display: "flex", gap: 7, marginBottom: 14 }}><button onClick={() => onOpen("home")} style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(0,240,255,.3)", color: "#00F0FF", background: "rgba(0,240,255,.1)", fontSize: 11, fontWeight: 700 }}>Descobrir</button><button onClick={() => onOpen("communities")} style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(184,169,204,.2)", color: "#B8A9CC", background: "transparent", fontSize: 11, fontWeight: 700 }}>Comunidades</button><button onClick={() => onOpen("events")} style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(184,169,204,.2)", color: "#B8A9CC", background: "transparent", fontSize: 11, fontWeight: 700 }}>Eventos</button></div>
        <p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: ".08em", color: "#fff", margin: "0 0 10px" }}>🔥 RECOMENDAÇÕES PARA VOCÊ</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
          {filtered.map(game => <GameCard key={game.id} game={game} />)}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "40px 20px", color: "#B8A9CC" }}><div style={{ fontSize: 34 }}>🔍</div><p style={{ marginTop: 10 }}>Nenhum jogo encontrado.</p></div>}
        <div style={{ margin: "24px 0 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: ".08em", margin: 0 }}>COMUNIDADES EM ALTA</p><button onClick={() => onOpen("communities")} style={{ border: 0, background: "transparent", color: "#00F0FF", fontSize: 10 }}>Ver tudo →</button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>{communities.slice(0, 2).map(c => <CommunityRow key={c.name} community={c} />)}</div>
      </div>
      <BottomNav active="home" onOpen={onOpen} />
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  const fallbackImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1A0B2E"/><stop offset="1" stop-color="#9B30FF"/></linearGradient></defs><rect width="800" height="520" fill="url(#g)"/><circle cx="400" cy="220" r="110" fill="none" stroke="#00F0FF" stroke-width="5" opacity=".75"/><path d="M370 170h60v180h-60zM330 210h140v60H330z" fill="#00F0FF" opacity=".9"/></svg>`)}`;
  return <div style={{ background: "#2D1B4E", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(184,169,204,.14)", cursor: "pointer" }}><div style={{ height: 130, position: "relative" }}><img src={game.image} alt={game.title} onError={event => { event.currentTarget.src = fallbackImage; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} /><div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 55%,rgba(26,11,46,.9))" }} /><span style={{ position: "absolute", top: 8, left: 8, padding: "3px 7px", borderRadius: 6, background: "rgba(0,240,255,.18)", color: "#00F0FF", fontSize: 8, fontWeight: 700 }}>{game.tag}</span></div><div style={{ padding: 11 }}><p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10, fontWeight: 800, margin: "0 0 4px", lineHeight: 1.3 }}>{game.title}</p><p style={{ color: "#B8A9CC", fontSize: 9, margin: "0 0 10px" }}>{game.genre} · {game.platform}</p><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ color: "#00F0FF", fontSize: 10, fontWeight: 800 }}>★ {game.score}</span><span style={{ color: "#5E4B78", fontSize: 8 }}>{game.followers} seguidores</span></div></div></div>;
}

function CommunityRow({ community }: { community: typeof communities[number] }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#2D1B4E", borderRadius: 14, padding: 11, border: "1px solid rgba(184,169,204,.12)" }}><div style={{ width: 42, height: 42, borderRadius: 13, background: `${community.color}20`, color: community.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Orbitron, sans-serif", fontSize: 10, fontWeight: 900 }}>{community.icon}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 11, fontWeight: 700 }}>{community.name}</p><p style={{ margin: "3px 0 0", color: "#5E4B78", fontSize: 9 }}>{community.members} membros</p></div><Icon name="arrow" size={15} /></div>;
}

function BottomNav({ active, onOpen }: { active: string; onOpen: (tab: Tab) => void }) {
  const items = [{ id: "home", label: "Início", icon: "home", tab: "home" as Tab }, { id: "communities", label: "Comunidades", icon: "users", tab: "communities" as Tab }, { id: "events", label: "Eventos", icon: "calendar", tab: "events" as Tab }, { id: "profile", label: "Perfil", icon: "profile", tab: "profile" as Tab }];
  return <div style={{ height: 70, background: "rgba(26,11,46,.98)", borderTop: "1px solid rgba(0,240,255,.12)", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "5px 0 8px" }}>{items.map(item => <button key={item.id} onClick={() => onOpen(item.tab)} style={{ border: 0, background: "transparent", color: active === item.id ? "#00F0FF" : "#5E4B78", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 8, padding: 5 }}><Icon name={item.icon} size={19} /><span>{item.label}</span></button>)}</div>;
}

function Communities({ onOpen }: { onOpen: (tab: Tab) => void }) {
  const [joined, setJoined] = useState<string[]>(["Nerds de PS5"]);
  const toggle = (name: string) => setJoined(current => current.includes(name) ? current.filter(v => v !== name) : [...current, name]);
  return <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#1A0B2E", color: "#fff", fontFamily: "Outfit, sans-serif", overflow: "hidden" }}><div style={{ padding: "18px", borderBottom: "1px solid rgba(0,240,255,.1)" }}><Brand compact /><h1 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 22, margin: "18px 0 5px" }}>Comunidades</h1><p style={{ color: "#B8A9CC", fontSize: 12, margin: 0 }}>Encontre seu povo e compartilhe suas experiências.</p></div><div style={{ flex: 1, overflowY: "auto", padding: "18px" }}><div style={{ display: "flex", alignItems: "center", gap: 8, background: "#2D1B4E", borderRadius: 12, padding: "10px 12px", marginBottom: 16 }}><Icon name="search" size={17} /><input placeholder="Buscar comunidade" style={{ flex: 1, background: "transparent", border: 0, color: "#fff", outline: 0, fontSize: 12 }} /></div><p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11, fontWeight: 800, marginBottom: 12 }}>SUAS COMUNIDADES</p>{communities.map(c => <div key={c.name} style={{ display: "flex", gap: 11, alignItems: "center", padding: 14, marginBottom: 10, background: "#2D1B4E", borderRadius: 16, border: "1px solid rgba(184,169,204,.12)" }}><div style={{ width: 48, height: 48, borderRadius: 15, background: `${c.color}20`, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{c.icon}</div><div style={{ flex: 1 }}><p style={{ fontSize: 12, fontWeight: 700, margin: "0 0 4px" }}>{c.name}</p><p style={{ fontSize: 9, color: "#5E4B78", margin: 0 }}>{c.members} membros</p></div><button onClick={() => toggle(c.name)} style={{ padding: "7px 10px", borderRadius: 8, border: joined.includes(c.name) ? "1px solid #39FF14" : "1px solid #00F0FF", color: joined.includes(c.name) ? "#39FF14" : "#00F0FF", background: joined.includes(c.name) ? "rgba(57,255,20,.08)" : "rgba(0,240,255,.08)", fontSize: 9, fontWeight: 700 }}>{joined.includes(c.name) ? "Sair" : "Juntar"}</button></div>)}</div><BottomNav active="communities" onOpen={onOpen} /></div>;
}

function EventsScreen({ onOpen, membershipActive, confirmedEvents, onConfirmEvent, onActivateMembership }: { onOpen: (tab: Tab) => void; membershipActive: boolean; confirmedEvents: number[]; onConfirmEvent: (eventId: number) => void; onActivateMembership: () => void }) {
  return <EventPlatform onOpen={onOpen} membershipActive={membershipActive} confirmedEvents={confirmedEvents} onConfirmEvent={onConfirmEvent} onActivateMembership={onActivateMembership} />;
}

function Profile({ onLogout, membershipActive, confirmedEvents }: { onLogout: () => void; membershipActive: boolean; confirmedEvents: number[] }) {
  return <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#1A0B2E", color: "#fff", fontFamily: "Outfit, sans-serif", overflow: "hidden" }}><div style={{ padding: "20px", textAlign: "center" }}><div style={{ width: 82, height: 82, borderRadius: 50, margin: "0 auto 12px", background: "linear-gradient(135deg,#9B30FF,#00F0FF)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Orbitron, sans-serif", fontSize: 22, fontWeight: 900, boxShadow: "0 0 35px rgba(0,240,255,.25)" }}>CP</div><h1 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 18, margin: 0 }}>Carlos Pereira</h1><p style={{ color: "#5E4B78", fontSize: 10, margin: "5px 0 0" }}>Membro desde janeiro de 2025</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: "0 18px 18px" }}>{[["12","Comunidades"],[confirmedEvents.length,"Eventos"],["24","Conquistas"]].map(([value,label]) => <div key={label} style={{ background: "#2D1B4E", borderRadius: 13, padding: "14px 5px", textAlign: "center" }}><p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 15, color: "#00F0FF", fontWeight: 900, margin: 0 }}>{value}</p><p style={{ fontSize: 8, color: "#5E4B78", margin: "4px 0 0" }}>{label}</p></div>)}</div><div style={{ flex: 1, overflowY: "auto", padding: "0 18px" }}><p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10, color: "#B8A9CC", letterSpacing: ".08em" }}>GAMER PASS</p><div style={{ background: membershipActive ? "rgba(57,255,20,.08)" : "#2D1B4E", border: membershipActive ? "1px solid rgba(57,255,20,.3)" : "1px solid rgba(184,169,204,.12)", borderRadius: 14, padding: 14, marginBottom: 16 }}><p style={{ fontSize: 10, color: membershipActive ? "#39FF14" : "#B8A9CC", margin: "0 0 5px" }}>{membershipActive ? "ASSINATURA ATIVA" : "ASSINATURA PENDENTE"}</p><p style={{ fontSize: 11, fontWeight: 700, margin: "0 0 4px" }}>{membershipActive ? "Próximo vencimento: 18 NOV 2025" : "Ative-se para acessar eventos ilimitados"}</p><p style={{ fontSize: 9, color: "#5E4B78", margin: 0 }}>{membershipActive ? "Acesso ilimitado incluido" : "R$ 29,90 por mês"}</p></div><p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10, color: "#B8A9CC", letterSpacing: ".08em" }}>CONFIGURAÇÃO</p>{["Perfil e privacidade","Notificações","Amigos e comunidades","Ajuda e suporte"].map((item) => <button key={item} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", border: 0, borderBottom: "1px solid rgba(184,169,204,.1)", background: "transparent", color: "#fff", fontSize: 11 }}><span>{item}</span><Icon name="arrow" size={14} /></button>)}<button onClick={onLogout} style={{ width: "100%", marginTop: 18, padding: "13px", borderRadius: 12, border: "1px solid rgba(255,68,68,.25)", background: "rgba(255,68,68,.06)", color: "#FF8080", fontWeight: 700, fontSize: 10 }}>SAIR DA CONTA</button></div></div>;
}export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [membershipActive, setMembershipActive] = useState(false);
  const [confirmedEvents, setConfirmedEvents] = useState<number[]>([]);
  const navigate = (tab: Tab) => setScreen(tab);
  const confirmEvent = (eventId: number) => setConfirmedEvents(current => current.includes(eventId) ? current : [...current, eventId]);
  return <div style={{ width: "100%", height: "100%", background: "#0B0619", display: "flex", justifyContent: "center", alignItems: "stretch" }}><div style={{ width: "100%", maxWidth: 430, height: "100%", overflow: "hidden", background: "#1A0B2E", position: "relative" }}>{screen === "login" ? <Login onLogin={() => setScreen("home")} /> : screen === "home" ? <Home onOpen={navigate} /> : screen === "communities" ? <Communities onOpen={navigate} /> : screen === "events" ? <EventsScreen onOpen={navigate} membershipActive={membershipActive} confirmedEvents={confirmedEvents} onConfirmEvent={confirmEvent} onActivateMembership={() => setMembershipActive(true)} /> : <Profile onLogout={() => setScreen("login")} membershipActive={membershipActive} confirmedEvents={confirmedEvents} />}</div></div>;
}
