import { useState } from "react";
import RingMotif from "../components/RingMotif";
import { STEPS, getQ7Options, questionProgress, buildResults, buildRecap } from "./quizData";

export default function Quiz({ onExit, onOpenCheckout }) {
  const [stepId, setStepId] = useState("q1");
  const [tags, setTags] = useState({});
  const [history, setHistory] = useState([]);

  const step = STEPS[stepId];

  function goTo(nextId, tagKey, tagValue) {
    setHistory((h) => [...h, stepId]);
    if (tagKey) {
      setTags((t) => ({ ...t, [tagKey]: tagValue }));
    }
    setStepId(nextId);
    requestAnimationFrame(() => {
      document.getElementById("quiz-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function goBack() {
    setHistory((h) => {
      if (h.length === 0) return h;
      const copy = [...h];
      const prev = copy.pop();
      setStepId(prev);
      return copy;
    });
  }

  const progress = questionProgress(stepId);

  return (
    <div className="min-h-screen bg-cream px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onExit}
            className="text-sm text-ink/50 hover:text-ink/80 transition-colors"
          >
            &larr; Back to composure
          </button>
          {history.length > 0 && step.type !== "results" && (
            <button
              onClick={goBack}
              className="text-sm text-ink/50 hover:text-ink/80 transition-colors"
            >
              Previous
            </button>
          )}
        </div>

        {progress && (
          <div className="mb-8">
            <div className="mb-1.5 flex justify-between text-xs text-ink/50">
              <span>Question {progress.current} of {progress.total}</span>
              <span>{Math.round((progress.current / progress.total) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-sage">
              <div
                className="h-full rounded-full bg-amber transition-all duration-500"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div id="quiz-card">
          {step.type === "question" && (
            <QuestionCard step={step} stepId={stepId} tags={tags} onAnswer={goTo} />
          )}
          {step.type === "stat" && <StatCard step={step} onContinue={() => goTo(step.next)} />}
          {step.type === "results" && <ResultsCard tags={tags} onExit={onExit} onOpenCheckout={onOpenCheckout} />}
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ step, stepId, tags, onAnswer }) {
  const options = stepId === "q7" ? getQ7Options(tags) : step.options;
  return (
    <div className="animate-fadeIn">
      <p className="mb-2 text-sm font-medium text-amber">{step.eyebrow}</p>
      <h1 className="font-display text-2xl leading-snug text-forest sm:text-[1.75rem]">
        {step.question}
      </h1>
      <div className="mt-7 flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => onAnswer(opt.next, opt.tagKey, opt.tagValue)}
            className="min-h-[52px] rounded-2xl border border-forest/12 bg-white px-5 py-4 text-left text-[15px] font-medium text-ink transition-all hover:border-amber hover:bg-amber-light active:scale-[0.99]"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatCard({ step, onContinue }) {
  return (
    <div className="animate-fadeIn rounded-3xl bg-forest px-6 py-10 text-center text-cream sm:px-10 sm:py-14">
      <div className="mx-auto mb-5 h-14 w-14">
        <RingMotif className="h-full w-full" tone="light" />
      </div>
      <h2 className="font-display text-xl leading-snug sm:text-2xl">{step.heading}</h2>
      <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-sage/85">
        {step.body}
      </p>
      <button
        onClick={onContinue}
        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full bg-amber px-7 py-3.5 text-[15px] font-bold text-forest shadow-lg shadow-black/30 transition-transform active:scale-[0.98] hover:bg-amber-light"
      >
        {step.ctaLabel || "Continue"}
      </button>
    </div>
  );
}

function ResultsCard({ tags, onExit, onOpenCheckout }) {
  const { headline, subheadline, reassurance, goalLine } = buildResults(tags);
  const recap = buildRecap(tags);

  return (
    <div className="animate-fadeIn">
      {recap.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {recap.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-dark"
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      <p className="mb-2 text-sm font-medium text-amber">Your plan</p>
      <h1 className="font-display text-[1.75rem] leading-snug text-forest sm:text-3xl">
        {headline}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{subheadline}</p>

      {goalLine && (
        <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
          Since {goalLine} matters most to you right now, that's exactly where
          the guide starts.
        </p>
      )}

      <div className="mt-6 rounded-2xl bg-sage px-5 py-5">
        <p className="text-sm leading-relaxed text-dark">{reassurance}</p>
      </div>

      <button
        onClick={onOpenCheckout}
        className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-amber px-7 py-4 text-[15px] font-bold text-forest shadow-lg shadow-black/30 transition-transform active:scale-[0.98] hover:bg-amber-light sm:text-base"
      >
        Get my 90-day plan
      </button>
      <button
        onClick={onExit}
        className="mt-4 w-full text-center text-sm text-ink/50 hover:text-ink/80 transition-colors"
      >
        Back to composure
      </button>
    </div>
  );
}
