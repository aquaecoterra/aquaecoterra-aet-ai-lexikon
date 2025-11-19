import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Book, Zap, X, ArrowUpDown, Hash } from 'lucide-react';

// ============================================================================
// ZDE JSOU TVOJE DATA (OPRAVENÁ, BEZ CHYB V ZÁVORKÁCH)
// ============================================================================
const MASTER_DATA = {
  "metadata": {
    "version": "1.0.0-master",
    "sourceVersions": {
      "cs": "1.0.0",
      "en": "1.0.0-EN"
    },
    "lastUpdated": "2024-12-26",
    "languages": [
      "cs",
      "en"
    ],
    "totalTerms": 70
  },
  "categories": [
    {
      "id": "AI_ROLES",
      "label": { "cs": "Role AI", "en": "AI Roles" }
    },
    {
      "id": "HUMAN_ROLES",
      "label": { "cs": "Role člověka", "en": "Human Roles" }
    },
    {
      "id": "TOOLS",
      "label": { "cs": "Nástroje", "en": "Tools" }
    },
    {
      "id": "TECHNOLOGY",
      "label": { "cs": "Technologie", "en": "Technology" }
    },
    {
      "id": "PROCESSES",
      "label": { "cs": "Procesy", "en": "Processes" }
    },
    {
      "id": "PHILOSOPHY",
      "label": { "cs": "Filozofie", "en": "Philosophy" }
    }
  ],
  "terms": [
    {
      "id": "AGENT",
      "term": { "cs": "Agent", "en": "Agent" },
      "category": "AI_ROLES",
      "level": "ADVANCED",
      "shortDefinition": {
        "cs": "Autonomní AI systém schopný samostatně plnit úkoly.",
        "en": "Autonomous AI system capable of independently completing tasks."
      },
      "longDefinition": {
        "cs": "Agent je pokročilá forma AI, která překračuje jednoduché odpovídání na prompty. Disponuje schopností plánování, používání nástrojů (API, databáze) a autonomního rozhodování.",
        "en": "An agent is an advanced form of AI that goes beyond simple prompt-response interactions. It possesses planning capabilities, tool usage, and autonomous decision-making."
      },
      "vibeContext": {
        "cs": "V COMPASS kurzu učíme práci s agenty jako s týmovými kolegy.",
        "en": "In the COMPASS course, we teach working with agents as team colleagues."
      },
      "tags": ["agent", "autonomous", "AI", "tools"]
    },
    {
      "id": "API_KEY",
      "term": { "cs": "API Klíč", "en": "API Key" },
      "category": "TECHNOLOGY",
      "level": "BEGINNER",
      "shortDefinition": {
        "cs": "Unikátní kód, který slouží jako heslo pro komunikaci s AI modely.",
        "en": "Unique code serving as a password for communicating with AI models."
      },
      "tags": ["security", "access", "token"]
    },
    {
      "id": "PROMPT",
      "term": { "cs": "Prompt", "en": "Prompt" },
      "category": "PROCESSES",
      "level": "BEGINNER",
      "shortDefinition": {
        "cs": "Vstupní zadání pro AI.",
        "en": "Input instruction for the AI."
      },
      "tags": ["input", "instruction", "basic"]
    },
    {
      "id": "WORKSPACE",
      "term": { "cs": "Workspace", "en": "Workspace" },
      "category": "TOOLS",
      "level": "BEGINNER",
      "shortDefinition": {
        "cs": "Sdílený digitální prostor pro projekty a agenty.",
        "en": "Shared digital space for projects and agents."
      },
      "tags": ["workspace", "environment"]
    },
    {
      "id": "ZERO_SHOT",
      "term": { "cs": "Zero-shot", "en": "Zero-shot" },
      "category": "PROCESSES",
      "level": "INTERMEDIATE",
      "shortDefinition": {
        "cs": "Technika promptování bez uvedených příkladů.",
        "en": "Prompting technique without provided examples."
      },
      "tags": ["prompting", "technique"]
    },
    {
      "id": "FEW_SHOT",
      "term": { "cs": "Few-shot", "en": "Few-shot" },
      "category": "PROCESSES",
      "level": "INTERMEDIATE",
      "shortDefinition": {
        "cs": "Technika promptování s uvedením několika příkladů.",
        "en": "Prompting technique providing a few examples."
      },
      "tags": ["prompting", "technique", "examples"]
    },
    {
      "id": "CHAIN_OF_THOUGHT",
      "term": { "cs": "Chain of Thought", "en": "Chain of Thought" },
      "category": "PROCESSES",
      "level": "ADVANCED",
      "shortDefinition": {
        "cs": "Metoda, kdy AI 'přemýšlí nahlas' krok za krokem.",
        "en": "Method where AI 'thinks aloud' step-by-step."
      },
      "tags": ["reasoning", "logic", "advanced"]
    },
    {
      "id": "TOKEN",
      "term": { "cs": "Token", "en": "Token" },
      "category": "TECHNOLOGY",
      "level": "BEGINNER",
      "shortDefinition": {
        "cs": "Základní jednotka textu, kterou AI zpracovává (cca 4 znaky).",
        "en": "Basic unit of text processed by AI (approx 4 chars)."
      },
      "tags": ["metric", "cost", "unit"]
    },
    {
      "id": "CONTEXT_WINDOW",
      "term": { "cs": "Kontextové okno", "en": "Context Window" },
      "category": "TECHNOLOGY",
      "level": "INTERMEDIATE",
      "shortDefinition": {
        "cs": "Limit paměti modelu pro jednu konverzaci.",
        "en": "Model memory limit for a single conversation."
      },
      "tags": ["memory", "limit"]
    },
    {
      "id": "HALLUCINATION",
      "term": { "cs": "Halucinace", "en": "Hallucination" },
      "category": "TECHNOLOGY",
      "level": "BEGINNER",
      "shortDefinition": {
        "cs": "Jev, kdy AI generuje přesvědčivě znějící, ale nepravdivé informace.",
        "en": "Phenomenon where AI generates convincing but false information."
      },
      "tags": ["error", "risk", "fact-check"]
    },
    {
      "id": "RAG",
      "term": { "cs": "RAG", "en": "RAG" },
      "category": "TECHNOLOGY",
      "level": "ADVANCED",
      "shortDefinition": {
        "cs": "Retrieval-Augmented Generation - doplňování znalostí AI z externích dat.",
        "en": "Retrieval-Augmented Generation - supplementing AI knowledge from external data."
      },
      "tags": ["data", "context", "search"]
    },
    {
      "id": "LLM",
      "term": { "cs": "LLM", "en": "LLM" },
      "category": "TECHNOLOGY",
      "level": "BEGINNER",
      "shortDefinition": {
        "cs": "Large Language Model - velký jazykový model.",
        "en": "Large Language Model."
      },
      "tags": ["model", "ai", "basic"]
    }
    // Zde můžeš později přidat další termíny ze svého JSONu
    // Stačí kopírovat strukturu { ... },
  ]
};
// ============================================================================
// KONEC DAT
// ============================================================================


const LexiconApp = () => {
  const [lang, setLang] = useState('cs'); 
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [sortMode, setSortMode] = useState('AZ');

  const getLocalized = (obj, field) => {
    if (!obj) return "";
    if (field) return obj[field] && obj[field][lang] ? obj[field][lang] : (obj[field]?.cs || "");
    return obj[lang] ? obj[lang] : (obj.cs || "");
  };

  const filteredTerms = useMemo(() => {
    let result = MASTER_DATA.terms || []; 

    if (activeCategory !== 'ALL') {
      result = result.filter(t => t.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => {
        const termName = getLocalized(t.term).toLowerCase();
        const termDef = getLocalized(t.shortDefinition).toLowerCase();
        const tags = t.tags ? t.tags.join(' ').toLowerCase() : '';
        return termName.includes(q) || termDef.includes(q) || tags.includes(q);
      });
    }

    return result.sort((a, b) => {
      if (sortMode === 'ID') return a.id.localeCompare(b.id);
      const nameA = getLocalized(a.term);
      const nameB = getLocalized(b.term);
      return nameA.localeCompare(nameB, lang === 'cs' ? 'cs' : 'en');
    });
  }, [activeCategory, searchQuery, lang, sortMode]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-4 md:p-8 selection:bg-[#a3e635] selection:text-[#020617]">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-[#a3e635]" />
            <span className="text-[#a3e635] font-mono text-sm tracking-widest uppercase">AET AI Academy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Vibe Code <span className="text-[#22d3ee]">Lexikon</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setSortMode(sortMode === 'AZ' ? 'ID' : 'AZ')} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 hover:border-[#22d3ee] transition-colors">
            {sortMode === 'AZ' ? <ArrowUpDown size={16} /> : <Hash size={16} />}
            <span className="text-sm font-mono">{sortMode === 'AZ' ? 'A-Z' : 'ID'}</span>
          </button>
          <div className="flex p-1 bg-slate-900 rounded-full border border-slate-700">
            <button onClick={() => setLang('cs')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'cs' ? 'bg-[#a3e635] text-[#020617]' : 'text-slate-400 hover:text-white'}`}>CZ</button>
            <button onClick={() => setLang('en')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-[#22d3ee] text-[#020617]' : 'text-slate-400 hover:text-white'}`}>EN</button>
          </div>
        </div>
      </header>

      {/* CONTROLS */}
      <div className="max-w-7xl mx-auto mb-10 space-y-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500 group-focus-within:text-[#a3e635] transition-colors" />
          </div>
          <input
            type="text"
            placeholder={lang === 'cs' ? "Hledat pojem..." : "Search term..."}
            className="block w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-[#a3e635] outline-none transition-all backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveCategory('ALL')} className={`px-4 py-2 rounded-lg text-sm font-medium border ${activeCategory === 'ALL' ? 'bg-slate-800 border-slate-600 text-white' : 'bg-transparent border-slate-800 text-slate-400'}`}>
            {lang === 'cs' ? 'Vše' : 'All'}
          </button>
          {MASTER_DATA.categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-medium border ${activeCategory === cat.id ? 'bg-[#22d3ee]/10 border-[#22d3ee] text-[#22d3ee]' : 'bg-transparent border-slate-800 text-slate-400'}`}>
              {getLocalized(cat.label)}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.map((item) => (
          <div key={item.id} onClick={() => setSelectedTerm(item)} className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-[#a3e635]/50 hover:bg-slate-800/60 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-[#22d3ee] border border-[#22d3ee]/30 px-2 py-0.5 rounded">{item.id}</span>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${item.level === 'BEGINNER' ? 'bg-green-500/10 text-green-400' : item.level === 'INTERMEDIATE' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>{item.level}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a3e635] transition-colors">{getLocalized(item.term)}</h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{getLocalized(item.shortDefinition)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags && item.tags.slice(0, 3).map(tag => (<span key={tag} className="text-xs text-slate-500">#{tag}</span>))}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTerm(null)}>
          <div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedTerm(null)} className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full hover:text-white text-slate-400"><X size={20} /></button>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-white">{getLocalized(selectedTerm.term)}</h2>
              <span className="text-sm font-mono text-[#22d3ee] border border-[#22d3ee]/30 px-2 py-1 rounded">{selectedTerm.id}</span>
            </div>
            <p className="text-lg text-slate-200 leading-relaxed mb-6">{getLocalized(selectedTerm.longDefinition) || getLocalized(selectedTerm.shortDefinition)}</p>
            {selectedTerm.vibeContext && (
              <div className="bg-[#a3e635]/5 border border-[#a3e635]/20 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-2"><Zap size={16} className="text-[#a3e635]" /><h4 className="text-xs uppercase tracking-widest text-[#a3e635] font-bold">AET Vibe Context</h4></div>
                <p className="text-slate-300 italic">"{getLocalized(selectedTerm.vibeContext)}"</p>
              </div>
            )}
            {selectedTerm.example && (
               <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2">Example</h4>
                  <p className="text-slate-300 font-mono text-sm">{getLocalized(selectedTerm.example)}</p>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root') || document.body;
const root = createRoot(rootElement);
root.render(<LexiconApp />);