```markdown
# GamerLink — Comunidades de Gamers

GamerLink é uma plataforma digital para descobrir jogos, encontrar comunidades, receber recomendações e participar de eventos. A aplicação foi desenvolvida para a disciplina **Cross-Platform Application Development** (FIAP - 2º Ano, Turma: 2CCPW).

## Integrantes do Grupo e Papéis

- **Guilherme Ferraz de Medeiros (RM: 564743)** — Arquiteto de Software & Desenvolvedor Frontend (Lead)
- **Roberto Marques Moreira (RM: 564935)** — UI/UX Designer, Prototipagem & Documentação

## Visão Geral

O GamerLink reúne jogos, comunidades e eventos em uma experiência mobile-first. A interface usa uma identidade visual moderna baseada em um fundo roxo profundo, azul neon, verde neon e tipografia digital.

## Funcionalidades implementadas

### Catálogo de jogos

- Apresentação de quatro jogos reais.
- Informações de gênero, plataforma, nota e número de seguidores.
- Pesquisa por nome, gênero ou plataforma.
- Imagens dos jogos com fallback visual quando a URL não puder ser carregada.

### Comunidades

- Listagem de comunidades por plataforma e tamanho da audiência.
- Pesquisa e visualização das comunidades.
- Ação de entrar ou sair de uma comunidade.
- Estado local de participação por comunidade.

### Eventos

- Listagem de eventos próximos.
- Visualização de detalhes do evento.
- Informações de data, horário, local, cidade, participante e ingresso.
- Representação visual da localização no mapa.
- Confirmação de presença.
- Fluxo de pagamento para ingresso individual.
- Fluxo de assinatura mensal Gamer Pass.
- Acesso ilimitado a eventos enquanto a assinatura estiver ativa.
- Exibição do estado da assinatura no perfil.
- Contagem de eventos confirmados no perfil.

### Perfil

- Informações do usuário e data de entrada.
- Estatísticas de comunidades, eventos e conquistas.
- Exibição do status da assinatura Gamer Pass.
- Acesso ao histórico de eventos confirmados.
- Logout da aplicação.

### Identidade visual

- Marca GamerLink com logo personalizado.
- Paleta de cores: roxo `#1A0B2E`, azul `#00F0FF`, verde `#39FF14` e branco.
- Fontes Orbitron e Outfit.
- Ícones, gradientes, botões e sombras personalizados.
- Favicon e marca pública personalizados.

## Requisitos

- Node.js 18 ou superior.
- npm.
- Git.

## Instalação

```bash
npm install
```

## Executar em modo de desenvolvimento

```bash
npm run dev
```

O Vite usa a porta `5173` por padrão. Para uma porta específica:

```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

A aplicação ficará disponível em `http://localhost:4173/`.

## Build de produção

```bash
npm run build
```

O resultado será gerado no diretório `dist/`.

## Visualização da build

```bash
npm run preview
```

Para preview em outra porta:

```bash
npm run preview -- --host 0.0.0.0 --port 4173
```

## Estrutura principal

```text
CP456-CPAD-guif/
├── public/
│   ├── brand-mark.svg
│   └── favicon.svg
├── src/
│   ├── App.tsx
│   ├── EventPlatform.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```
### Prints do Aplicativo
###  Tela de login
<img width="818" height="907" alt="Screenshot_213" src="https://github.com/user-attachments/assets/8b19c2e5-0679-4fa1-a483-f716a614bc12" />

### Tela de catálogo
<img width="818" height="907" alt="Screenshot_212" src="https://github.com/user-attachments/assets/e7dc3d04-616b-4c81-8993-6207e85be0cf" /> 
<img width="818" height="907" alt="Screenshot_214" src="https://github.com/user-attachments/assets/6ea2d523-0f69-422f-9c20-768cd738fe15" />

### Feedback visual de agendamento concluído
<img width="818" height="907" alt="Screenshot_215" src="https://github.com/user-attachments/assets/01fde654-4d4d-4467-a4d9-c51d9a55302a" /> 

### Tela de perfil
<img width="818" height="907" alt="Screenshot_217" src="https://github.com/user-attachments/assets/d834b8f6-d871-440d-a336-648230d14215" /> 

## Fluxo de execução

1. O usuário acessa a tela de login.
2. O usuário entra com `admin` e `admin` para visualizar a experiência demo.
3. O usuário pode pesquisar jogos e navegar entre comunidades, eventos e perfil.
4. Ao selecionar um evento, é possível visualizar a localização e confirmar a presença.
5. O usuário pode seguir para o pagamento ou ativar o Gamer Pass mensal.
6. A assinatura ativa fornece acesso ilimitado aos eventos.
7. O perfil mostra o status da assinatura e a quantidade de eventos confirmados.

## Observações

- A aplicação usa React, TypeScript e Vite.
- A interface é responsiva e otimizada para viewport móvel.
- O arquivo de configuração do Vite pode exibir avisos sobre `__dirname` e importação JSON; eles não impedem a compilação.
- O fluxo de pagamento e assinatura é uma experiência de demonstração baseada em estado local e não conecta a um gateway de pagamento real.
