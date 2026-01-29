# PokeTeam

A modern Pokémon team builder and battle simulator web application built with React, TypeScript, and Vite. Build your dream team, analyze battle effectiveness, and strategize your way to victory!

## 🎯 Features

### Team Building
- Create and manage a team of up to 6 Pokémon
- Add Pokémon from the complete PokéAPI database
- Visual card-based interface with animated sprites
- Remove and edit team members with intuitive controls

### Move Management
- Assign up to 4 moves to each Pokémon in your team
- Search through an extensive move database
- Display detailed move stats (power, accuracy, type, class)
- Smart filtering for Pokémon-compatible moves

### Battle Analysis
- Set up opponent Pokémon for battle simulation
- Calculate type effectiveness and damage multipliers
- Visual representation of strengths and weaknesses
- STAB (Same Type Attack Bonus) calculations

### Search & Discovery
- Modal-based search system for Pokémon and moves
- Debounced search with real-time results
- Visual type badges and categories
- Responsive grid layout that adapts to any screen size

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules with PostCSS (nested, mixins)
- **State Management**: React Context with useReducer pattern
- **API**: PokéAPI (https://pokeapi.co/api/v2/)
- **UI Libraries**: 
  - `react-responsive-masonry` for responsive grids
  - `@tippyjs/react` for tooltips
  - `react-icons` for iconography

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/poketeam.git
cd poketeam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run check        # Type checking
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Attacker/        # Opponent Pokémon setup
│   ├── MoveCard/        # Move display cards
│   ├── PokeCard/        # Pokémon cards (various variants)
│   ├── PokemonMoves/    # Move management interface
│   ├── PokeTeam/        # Main team builder
│   ├── SearchModal/     # Search functionality
│   └── TypeBadge/       # Type indicators
├── context/             # Global state management
├── hooks/               # Custom React hooks
├── services/            # API integration layer
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── data/                # Local data management
```

## 🎮 How to Use

1. **Build Your Team**: Click "Add Pokémon" to search and add team members (max 6)
2. **Assign Moves**: Click on a Pokémon to assign moves from their move pool
3. **Set Opponent**: Configure an attacker Pokémon to analyze matchups
4. **Analyze Battle**: View type effectiveness and damage multipliers
5. **Optimize Strategy**: Use the analysis to refine your team composition

## 🔧 Configuration

The app uses TypeScript path mapping for cleaner imports. Paths are configured in both `tsconfig.json` and `vite.config.ts`.

## 📱 Responsive Design

PokéTeam is fully responsive and works seamlessly on:
- Desktop browsers (1200px+)
- Tablets (768px-1199px)
- Mobile devices (320px-767px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow the existing code style and conventions
- Use TypeScript for all new code
- Ensure all components are properly typed
- Test your changes thoroughly
- Keep the component structure consistent

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing comprehensive Pokémon data
- [Pokémon sprites](https://github.com/PokeAPI/sprites) for the amazing sprite collection
- The React community for inspiration and best practices

---

**Built with ❤️ for Pokémon trainers everywhere**