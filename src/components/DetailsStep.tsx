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
  const [status, setStatus] = useState('Active');
  const [team, setTeam] = useState('');
  const [isStackDropdownOpen, setIsStackDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBuilderClass(
      stack.length ? generateBuilderClass('Developer', stack) : ''
    );
  }, [stack]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
      builderClass
    });
  };

  const textStyle = {
    fontSize: 'clamp(22px, 1.7vw, 30px)',
    fontWeight: 600,
    lineHeight: 1.1,
    color: '#1b3a2a'
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
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
            left: '48%',
            width: '35%',
            height: '5.2%'
          }}
        >
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            required
            maxLength={40}
            className="h-full w-full bg-transparent px-1 font-semibold text-[#1b3a2a] outline-none placeholder:text-[#1b3a2a]/60"
            style={textStyle}
          />
        </div>

        {/* STACKS */}
        <div
          ref={dropdownRef}
          className="absolute"
          style={{
            top: '37.5%',
            left: '48%',
            width: '35%',
            height: '5.2%',
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
                className="font-semibold text-[#1b3a2a]/60"
                style={textStyle}
              >
                Select your stack (max 5)
              </span>
            ) : (
              <div className="flex h-full w-full items-center gap-1.5 overflow-x-auto whitespace-nowrap select-none" style={{ scrollbarWidth: 'none' }}>
                {stack.map(value => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1 rounded-full border border-[#1b3a2a]/30 bg-[#efe5cb] px-3 py-1 text-sm md:text-base font-bold text-[#1b3a2a] shadow-sm"
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
              <div className="mb-2.5 text-base md:text-lg font-bold text-[#1b3a2a]/80">
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
                      className={`rounded px-2 py-1.5 text-left text-sm md:text-base font-bold transition ${selected
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
            top: '51%',
            left: '48%',
            width: '35%',
            height: '5.2%'
          }}
        >
          <span
            className={`block w-full truncate px-1 font-bold ${builderClass
                ? 'text-[#db6e5f]'
                : 'text-[#1b3a2a]/60'
              }`}
            style={textStyle}
          >
            {builderClass || 'Select stacks to reveal your class'}
          </span>
        </div>

        {/* TEAM */}
        <div
          className="absolute flex items-center"
          style={{
            top: '64.5%',
            left: '48%',
            width: '35%',
            height: '5.2%'
          }}
        >
          <input
            type="text"
            value={team}
            onChange={e => setTeam(e.target.value)}
            placeholder="Enter your team name"
            maxLength={40}
            className="h-full w-full bg-transparent px-1 font-semibold text-[#1b3a2a] outline-none placeholder:text-[#1b3a2a]/60"
            style={textStyle}
          />
        </div>

        {/* STATUS */}
        <div
          className="absolute flex items-center"
          style={{
            top: '75%',
            left: '48%',
            width: '35%',
            height: '5.2%',
            gap: '3vw'
          }}
        >
          <label className="flex cursor-pointer items-center gap-2">
             <input
              type="radio"
              name="status"
              checked={status === 'Active'}
              onChange={() => setStatus('Active')}
              className="accent-[#1b3a2a] w-5 h-5"
            />
            <span
              className="font-bold text-[#1b3a2a]"
              style={{ fontSize: 'clamp(20px, 1.5vw, 26px)' }}
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
              className="accent-[#1b3a2a] w-5 h-5"
            />
            <span
              className="font-bold text-[#1b3a2a]"
              style={{ fontSize: 'clamp(20px, 1.5vw, 26px)' }}
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
            top: '86%',
            left: '30.5%',
            width: '39%',
            height: '5.8%',
            fontSize: 'clamp(16px, 1.3vw, 22px)'
          }}
        >
          GENERATE ID CARD
        </button>
      </form>
    </div>
  );
};