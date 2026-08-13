import React, { useEffect, useRef, useState } from 'react';
import { BuilderDetails } from '../types/builder';
import { generateBuilderClass } from '../utils/generateBuilderId';

interface DetailsStepProps {
  initialDetails: BuilderDetails;
  onGenerate: (details: BuilderDetails) => void;
}

const PRESET_STACKS = [
  'Next.js', 'React', 'Vue', 'Angular',
  'JavaScript', 'TypeScript', 'Python',
  'Java', 'C++', 'C#', 'Go', 'Rust',
  'PHP', 'Django', 'Node.js', 'Express',
  'AI', 'PyTorch', 'TensorFlow',
  'Tailwind', 'PostgreSQL', 'MongoDB',
  'MySQL', 'Solidity', 'Figma'
];

export const DetailsStep: React.FC<DetailsStepProps> = ({
  initialDetails,
  onGenerate
}) => {
  const [name, setName] = useState(initialDetails.name || '');
  const [stack, setStack] = useState<string[]>(initialDetails.stack || []);
  const [builderClass, setBuilderClass] = useState(
    initialDetails.stack?.length
      ? generateBuilderClass('Developer', initialDetails.stack)
      : ''
  );
  const [status, setStatus] = useState(initialDetails.status || 'Active');
  const [team, setTeam] = useState(initialDetails.team || '');
  const [isStackDropdownOpen, setIsStackDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBuilderClass(
      stack.length ? generateBuilderClass('Developer', stack) : ''
    );
  }, [stack]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = dropdownRef.current?.contains(target);
      const insideMobile = mobileDropdownRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsStackDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const toggleStack = (value: string) => {
    setStack(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : prev.length < 5
          ? [...prev, value]
          : prev
    );
  };

  const removeStack = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    setStack(prev => prev.filter(item => item !== value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onGenerate({
      ...initialDetails,
      name: name.trim(),
      role: 'Developer',
      stack,
      builderClass,
      team: team.trim(),
      status
    });
  };

  const textStyle: React.CSSProperties = {
    fontSize: 'clamp(13px, 1.4vw, 24px)',
    fontWeight: 600,
    lineHeight: 1,
    color: '#1b3a2a',
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-y-auto flex flex-col items-center justify-center bg-[#f7efd9] p-3 sm:p-6">
      {/* ── MOBILE FORM CONTAINER (< 768px) ── */}
      <div className="block md:hidden w-full max-w-md bg-[#efe5cb] border-2 border-[#1b3a2a]/30 rounded-3xl p-4 sm:p-6 shadow-2xl my-auto font-sans text-[#1b3a2a]">
        <div className="text-center mb-4">
          <span className="text-[11px] font-bold tracking-widest text-[#db6e5f] uppercase block mb-1">
            HH GOA 2026 • STEP 03
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#07502f]">
            TELL US ABOUT YOU
          </h2>
          <p className="text-xs text-[#1b3a2a]/80 mt-0.5 font-medium">
            This helps us create your personalized builder identity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* BUILDER NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#07502f]">
              BUILDER NAME *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              required
              maxLength={40}
              className="w-full bg-[#f7efd9] border border-[#1b3a2a]/30 rounded-xl px-3 py-2.5 font-semibold text-[#1b3a2a] outline-none focus:border-[#07502f] transition text-sm placeholder:text-[#6b7280]"
            />
          </div>

          {/* YOUR STACK */}
          <div className="flex flex-col gap-1 relative" ref={mobileDropdownRef}>
            <label className="text-xs font-bold uppercase tracking-wider text-[#07502f]">
              YOUR STACK (MAX 5)
            </label>
            <button
              type="button"
              onClick={() => setIsStackDropdownOpen(v => !v)}
              className="w-full bg-[#f7efd9] border border-[#1b3a2a]/30 rounded-xl px-3 py-2.5 font-semibold text-[#1b3a2a] text-left flex items-center justify-between text-sm cursor-pointer"
            >
              {stack.length === 0 ? (
                <span className="text-[#6b7280] font-normal">
                  Select your stack (max 5)
                </span>
              ) : (
                <span className="font-bold text-[#07502f] truncate">
                  {stack.join(', ')}
                </span>
              )}
              <span className="text-xs text-[#07502f] font-bold ml-2">
                {isStackDropdownOpen ? '▲' : '▼'}
              </span>
            </button>

            {/* Stack Chips Display */}
            {stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {stack.map(value => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1 rounded-full border border-[#1b3a2a]/30 bg-[#f7efd9] px-2.5 py-0.5 text-xs font-bold text-[#1b3a2a]"
                  >
                    {value}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={e => removeStack(e as unknown as React.MouseEvent, value)}
                      className="ml-1 font-extrabold text-red-700 cursor-pointer"
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            )}

            {/* Stack Dropdown Modal */}
            {isStackDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 max-h-[40vh] w-full overflow-y-auto rounded-xl border border-[#1b3a2a]/30 bg-[#f7efd9] p-3 shadow-2xl z-50">
                <div className="mb-2 text-xs font-bold text-[#07502f]">
                  Select up to 5 stacks:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESET_STACKS.map(value => {
                    const selected = stack.includes(value);
                    const disabled = !selected && stack.length >= 5;

                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={disabled}
                        onClick={() => toggleStack(value)}
                        className={`rounded-lg px-2 py-1.5 text-left text-xs font-bold transition ${selected
                            ? 'border border-[#db6e5f] bg-[#db6e5f]/20 text-[#db6e5f]'
                            : disabled
                              ? 'cursor-not-allowed opacity-40'
                              : 'text-[#1b3a2a] hover:bg-[#1b3a2a]/10'
                          }`}
                      >
                        {selected ? '✓ ' : ''}
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* BUILDER CLASS */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#07502f]">
              BUILDER CLASS
            </label>
            <div className={`w-full bg-[#f7efd9] border border-[#1b3a2a]/30 rounded-xl px-3 py-2.5 font-bold text-sm truncate ${builderClass ? 'text-[#db6e5f]' : 'text-[#6b7280]'}`}>
              {builderClass || 'Ex. THE SIGNAL HUNTER'}
            </div>
          </div>

          {/* TEAM NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#07502f]">
              TEAM NAME
            </label>
            <input
              type="text"
              value={team}
              onChange={e => setTeam(e.target.value)}
              placeholder="Enter your team name"
              maxLength={40}
              className="w-full bg-[#f7efd9] border border-[#1b3a2a]/30 rounded-xl px-3 py-2.5 font-semibold text-[#1b3a2a] outline-none focus:border-[#07502f] transition text-sm placeholder:text-[#6b7280]"
            />
          </div>

          {/* STATUS */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#07502f]">
              STATUS
            </label>
            <div className="flex items-center gap-6 bg-[#f7efd9] border border-[#1b3a2a]/30 rounded-xl px-4 py-2.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="status-mobile"
                  checked={status === 'Active'}
                  onChange={() => setStatus('Active')}
                  className="accent-[#07502f] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-extrabold text-[#1b3a2a]">
                  ACTIVE
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="status-mobile"
                  checked={status === 'On Hold'}
                  onChange={() => setStatus('On Hold')}
                  className="accent-[#07502f] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-extrabold text-[#1b3a2a]">
                  ON HOLD
                </span>
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#07502f] hover:bg-[#09643b] active:scale-[0.98] text-[#f8efd8] border border-[#d7aa32] font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer"
          >
            GENERATE ID CARD
          </button>
        </form>
      </div>

      {/* ── DESKTOP / LAPTOP CONTAINER (>= 768px) ── */}
      <div className="hidden md:block relative w-full max-w-[1150px] aspect-[1536/1024] mx-auto rounded-2xl shadow-2xl overflow-hidden my-auto flex-shrink-0">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/details-page-bg.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center'
          }}
        />

        <form
          onSubmit={handleSubmit}
          className="absolute inset-0 overflow-hidden"
        >
          {/* YOUR NAME */}
          <div
            className="absolute flex items-center"
            style={{
              top: '23.8%',
              left: '43%',
              width: '39%',
              height: '5.5%'
            }}
          >
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              required
              maxLength={40}
              className="h-full w-full bg-transparent px-1 font-semibold text-[#1b3a2a] outline-none placeholder:text-[#6b7280]"
              style={{
                fontSize: 'clamp(13px, 1.4vw, 24px)',
                fontWeight: 600,
                lineHeight: '100%',
                color: '#1b3a2a',
                paddingTop: 0,
                paddingBottom: 0
              }}
            />
          </div>

          {/* STACKS */}
          <div
            ref={dropdownRef}
            className="absolute"
            style={{
              top: '36.8%',
              left: '43%',
              width: '39%',
              height: '7%',
              zIndex: 20
            }}
          >
            <button
              type="button"
              onClick={() => setIsStackDropdownOpen(v => !v)}
              className="h-full w-full cursor-pointer bg-transparent text-left flex items-center"
            >
              {stack.length === 0 ? (
                <span
                  className="font-semibold text-[#6b7280]"
                  style={textStyle}
                >
                  Select your stack (max 5)
                </span>
              ) : (
                <div className="flex flex-wrap h-full w-full items-center gap-1 overflow-y-auto select-none py-0.5" style={{ scrollbarWidth: 'none' }}>
                  {stack.map(value => (
                    <span
                      key={value}
                      className="inline-flex items-center gap-1 rounded-full border border-[#1b3a2a]/30 bg-[#efe5cb] px-2 py-0.5 text-xs font-bold text-[#1b3a2a] shadow-sm"
                    >
                      {value}
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={e => removeStack(e as unknown as React.MouseEvent, value)}
                        className="ml-1 font-extrabold text-[#1b3a2a] hover:text-red-700 cursor-pointer"
                      >
                        ×
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </button>

            {isStackDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 max-h-[38vh] w-full overflow-y-auto rounded-md border border-[#1b3a2a]/30 bg-[#f7efd9] p-3 shadow-xl z-50">
                <div className="mb-2 text-sm font-bold text-[#1b3a2a]/80">
                  Select up to 5 stacks
                </div>

                <div className="grid grid-cols-2 gap-1">
                  {PRESET_STACKS.map(value => {
                    const selected = stack.includes(value);
                    const disabled = !selected && stack.length >= 5;

                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={disabled}
                        onClick={() => toggleStack(value)}
                        className={`rounded px-2 py-1.5 text-left text-xs md:text-sm font-bold transition ${selected
                            ? 'border border-[#db6e5f] bg-[#db6e5f]/10 text-[#db6e5f]'
                            : disabled
                              ? 'cursor-not-allowed opacity-35'
                              : 'text-[#1b3a2a] hover:bg-[#1b3a2a]/10'
                          }`}
                      >
                        {selected ? '✓ ' : ''}
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CLASS */}
          <div
            className="absolute flex items-center"
            style={{
              top: '50.8%',
              left: '43%',
              width: '39%',
              height: '5.5%'
            }}
          >
            <span
              className={`block w-full truncate px-1 font-bold ${builderClass
                  ? 'text-[#db6e5f]'
                  : 'text-[#6b7280]'
                }`}
              style={textStyle}
            >
              {builderClass || 'Ex. THE SIGNAL HUNTER'}
            </span>
          </div>

          {/* TEAM */}
          <div
            className="absolute flex items-center"
            style={{
              top: '64.2%',
              left: '43%',
              width: '39%',
              height: '5.5%'
            }}
          >
            <input
              type="text"
              value={team}
              onChange={e => setTeam(e.target.value)}
              placeholder="Enter your team name"
              maxLength={40}
              className="h-full w-full bg-transparent px-1 font-semibold text-[#1b3a2a] outline-none placeholder:text-[#6b7280]"
              style={{
                fontSize: 'clamp(13px, 1.4vw, 24px)',
                fontWeight: 600,
                lineHeight: '100%',
                color: '#1b3a2a',
                paddingTop: 0,
                paddingBottom: 0
              }}
            />
          </div>

          {/* STATUS */}
          <div
            className="absolute flex items-center"
            style={{
              top: '74.5%',
              left: '43%',
              width: '39%',
              height: '5.5%',
              gap: '2vw'
            }}
          >
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="status"
                checked={status === 'Active'}
                onChange={() => setStatus('Active')}
                className="accent-[#1b3a2a] w-4 h-4 cursor-pointer"
              />
              <span
                className="font-bold text-[#1b3a2a]"
                style={{ fontSize: 'clamp(13px, 1.3vw, 22px)' }}
              >
                ACTIVE
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="status"
                checked={status === 'On Hold'}
                onChange={() => setStatus('On Hold')}
                className="accent-[#1b3a2a] w-4 h-4 cursor-pointer"
              />
              <span
                className="font-bold text-[#1b3a2a]"
                style={{ fontSize: 'clamp(13px, 1.3vw, 22px)' }}
              >
                ON HOLD
              </span>
            </label>
          </div>

          {/* GENERATE ID BUTTON */}
          <button
            type="submit"
            className="absolute cursor-pointer rounded-lg border border-[#d7aa32] bg-[#07502f] font-bold tracking-wide text-[#f8efd8] shadow-md transition hover:bg-[#09643b] active:scale-[0.98]"
            style={{
              top: '85.5%',
              left: '30.5%',
              width: '39%',
              height: '6%',
              fontSize: 'clamp(13px, 1.2vw, 20px)'
            }}
          >
            GENERATE ID CARD
          </button>
        </form>
      </div>
    </div>
  );
};