import React, { useState, useEffect } from 'react';
import { User, Code, Plus, X, Palmtree, ArrowRight } from 'lucide-react';
import { BuilderDetails } from '../types/builder';
import { generateBuilderClass } from '../utils/generateBuilderId';
import { Header } from './Header';
import { CornerOrnaments, PalmTreeBg } from './GoaDecorations';

interface DetailsStepProps {
  initialDetails: BuilderDetails;
  onGenerate: (details: BuilderDetails) => void;
}

const POPULAR_ROLES = [
  'Developer',
  'AI Engineer',
  'Protocol Researcher',
  'UI/UX Designer',
  'Founder / Hacker',
  'Full Stack Builder',
  'Systems Architect'
];

const PRESET_STACKS = [
  'Next.js', 'Python', 'AI', 'Rust', 'TypeScript', 'React',
  'Solidity', 'Go', 'PyTorch', 'Tailwind', 'PostgreSQL', 'Figma'
];

export const DetailsStep: React.FC<DetailsStepProps> = ({ initialDetails, onGenerate }) => {
  const [name, setName] = useState(initialDetails.name || 'Palak Shekhada');
  const [role, setRole] = useState(initialDetails.role || 'Developer');
  const [stack, setStack] = useState<string[]>(
    initialDetails.stack.length > 0 ? initialDetails.stack : ['Next.js', 'Python', 'AI']
  );
  const [customStackInput, setCustomStackInput] = useState('');
  const [isAddingStack, setIsAddingStack] = useState(false);
  const [builderClass, setBuilderClass] = useState('');

  useEffect(() => {
    const generated = generateBuilderClass(role, stack);
    setBuilderClass(generated);
  }, [role, stack]);

  const handleAddStack = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim();
    if (!trimmed) return;
    if (stack.length >= 3) return;
    if (stack.some(s => s.toLowerCase() === trimmed.toLowerCase())) return;

    setStack([...stack, trimmed]);
    setCustomStackInput('');
    setIsAddingStack(false);
  };

  const handleRemoveStack = (tagToRemove: string) => {
    setStack(stack.filter(s => s !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onGenerate({
      name: name.trim(),
      role,
      stack,
      builderClass
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/5.8] sm:aspect-[4/5.5] bg-goa-paper border-2 border-goa-green/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between">
      <CornerOrnaments color="#E65324" />

      {/* Header Bar with Progress Dots */}
      <Header step={2} showProgress={true} />

      {/* Background Palm Leaf Accents at bottom corners */}
      <div className="absolute -left-12 -bottom-8 w-40 h-52 text-goa-green opacity-25 pointer-events-none">
        <PalmTreeBg />
      </div>
      <div className="absolute -right-12 -bottom-8 w-40 h-52 text-goa-green opacity-25 pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
        <PalmTreeBg />
      </div>

      {/* Content Form */}
      <div className="relative z-10 flex-1 px-6 py-4 flex flex-col justify-between">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-goa-green mb-0.5">
            TELL US ABOUT YOU
          </h2>
          <p className="text-xs text-goa-ink/80 font-sans">
            This helps us create your builder identity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-3.5 my-2">
          {/* YOUR NAME Field */}
          <div>
            <label className="block font-display text-[11px] tracking-widest text-goa-green font-bold uppercase mb-1">
              YOUR NAME
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-goa-muted" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Palak Shekhada"
                required
                maxLength={30}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF6E9] border border-goa-green/30 rounded-xl text-sm font-sans font-medium text-goa-ink focus:outline-none focus:border-goa-orange transition-all"
              />
            </div>
          </div>

          {/* WHAT DO YOU BUILD? Field */}
          <div>
            <label className="block font-display text-[11px] tracking-widest text-goa-green font-bold uppercase mb-1">
              WHAT DO YOU BUILD?
            </label>
            <div className="relative">
              <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-goa-muted" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF6E9] border border-goa-green/30 rounded-xl text-sm font-sans font-medium text-goa-ink focus:outline-none focus:border-goa-orange transition-all appearance-none cursor-pointer"
              >
                {POPULAR_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* YOUR STACK Field (Max 3) */}
          <div>
            <label className="block font-display text-[11px] tracking-widest text-goa-green font-bold uppercase mb-1">
              YOUR STACK (Max 3)
            </label>
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#FAF6E9] border border-goa-green/30 rounded-xl min-h-[42px] items-center">
              {stack.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center space-x-1 bg-goa-paper text-goa-green border border-goa-green/30 px-2.5 py-0.5 rounded-md text-xs font-sans font-semibold"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStack(item)}
                    className="hover:text-goa-orange transition-colors ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {stack.length < 3 && !isAddingStack && (
                <button
                  type="button"
                  onClick={() => setIsAddingStack(true)}
                  className="inline-flex items-center space-x-1 text-[11px] font-display tracking-wider text-goa-green hover:text-goa-orange border border-goa-green/30 px-2 py-0.5 rounded-md font-bold transition-all bg-goa-paper"
                >
                  <Plus className="w-3 h-3" />
                  <span>ADD ANOTHER</span>
                </button>
              )}
            </div>

            {isAddingStack && stack.length < 3 && (
              <div className="mt-2 p-2 bg-[#FAF6E9] border border-goa-orange/40 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-1.5">
                  <input
                    type="text"
                    value={customStackInput}
                    onChange={(e) => setCustomStackInput(e.target.value)}
                    placeholder="Tool / Language..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddStack(customStackInput);
                      }
                    }}
                    autoFocus
                    className="flex-1 px-2.5 py-1 bg-white border border-goa-green/30 rounded-md text-xs focus:outline-none focus:border-goa-orange"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddStack(customStackInput)}
                    className="px-2.5 py-1 bg-goa-green text-goa-paper font-display text-xs font-bold rounded-md"
                  >
                    ADD
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingStack(false)}
                    className="p-1 text-goa-muted hover:text-goa-ink"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {PRESET_STACKS.filter(p => !stack.includes(p)).slice(0, 6).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAddStack(preset)}
                      className="text-[10px] bg-white text-goa-green border border-goa-green/20 px-1.5 py-0.5 rounded hover:bg-goa-orange hover:text-white transition-all font-sans"
                    >
                      +{preset}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* YOUR BUILDER CLASS Field */}
          <div>
            <label className="block font-display text-[11px] tracking-widest text-goa-green font-bold uppercase mb-1">
              YOUR BUILDER CLASS
            </label>
            <div className="p-2.5 rounded-xl bg-[#FAF6E9] border border-goa-green/30 flex items-center space-x-2.5 shadow-xs">
              <div className="w-7 h-7 rounded-full bg-goa-orange/15 text-goa-orange flex items-center justify-center shrink-0">
                <Palmtree className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-display text-base text-goa-orange font-extrabold tracking-wide truncate block">
                  ★ {builderClass || 'THE SIGNAL HUNTER'} ★
                </span>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-goa-orange hover:bg-goa-sun text-white font-display text-xl font-bold tracking-wider rounded-xl shadow-goa-btn hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-3"
          >
            <span>GENERATE MY ID</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
