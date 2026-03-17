import { useEffect, useRef, useState } from "react";
import { Confetti } from "./components/Confetti";
import { Button, FeatureBadge } from "./components/ui";
import {
  ActionCenterIcon,
  AnalyticsIcon,
  AppsIcon,
  BellIcon,
  ChatIcon,
  ContentIcon,
  DeveloperIcon,
  FavoritesIcon,
  HomeIcon,
  ListingsIcon,
  PagesIcon,
  QuestionCircleIcon,
  ReviewsIcon,
  ScoutIcon,
  SearchIcon,
  YextSealIcon,
} from "./components/icons";

type Stage =
  | "review"
  | "review-processing"
  | "phone-ready"
  | "phone-success";
type ToastKind = "processing" | "success";

type ReviewTask = {
  count: number;
  impact: "High Impact" | "Medium Impact" | "Low Impact";
  title: string;
};

type PhoneRow = {
  confidence: number;
  entity: string;
  address: string;
  suggested: string;
};

const reviewTasks: ReviewTask[] = [
  { impact: "High Impact", title: "Approve drafted review responses", count: 324 },
  { impact: "Medium Impact", title: "Approve suggested phone numbers", count: 89 },
  { impact: "Low Impact", title: "Approve drafted business descriptions", count: 7 },
];

const phoneTasks: ReviewTask[] = [
  { impact: "Medium Impact", title: "Approve suggested phone numbers", count: 89 },
  { impact: "Low Impact", title: "Approve drafted business descriptions", count: 7 },
];

const phoneRows: PhoneRow[] = [
  { entity: "Giacomo's", address: "45 Rockefeller Plaza, New York, NY 10111", suggested: "(229) 555-0109", confidence: 89 },
  { entity: "Rosso Pomodoro", address: "230 Park Ave, New York, NY 10169", suggested: "(603) 555-0123", confidence: 87 },
  { entity: "Pepe Nero", address: "28 Liberty Street, New York, NY 10005", suggested: "(406) 555-0120", confidence: 84 },
  { entity: "Da Enzo", address: "825 8th Ave, New York, NY 10019", suggested: "(208) 555-0112", confidence: 79 },
  { entity: "Fiorella", address: "151 W 34th St, New York, NY 10001", suggested: "(919) 555-0113", confidence: 78 },
  { entity: "Il Buco", address: "123 Main Street, Suite 100, Santa Ana, IL 85486", suggested: "(307) 555-0129", confidence: 75 },
  { entity: "Lilia", address: "567 Union Ave, Brooklyn, NY 11222", suggested: "(620) 555-0192", confidence: 71 },
  { entity: "Le Bernardin", address: "123 Bleecker St, New York, NY 10012", suggested: "(919) 555-4240", confidence: 70 },
];

function FeedbackIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path d="M3.2 4.2h9.6v5.5H7.7L5 11.8v-2.1H3.2V4.2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
      <path d="M5.5 6.6h5M5.5 8.2H9.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 20 20" width="20">
      <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.35" />
      <path d="m12.8 7.2-1.9 4-4 1.9 1.9-4 4-1.9Z" fill="currentColor" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path d="M9.8 3.5 5.3 8l4.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path d="M6.2 3.5 10.7 8l-4.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path d="m4.4 6.5 3.6 3.6 3.6-3.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="24">
      <path d="M21.8 12.2c0-.67-.06-1.15-.19-1.65H12v3.13h5.64c-.11.78-.7 1.95-2.01 2.74l-.02.1 2.45 1.86.17.02c1.55-1.4 2.44-3.46 2.44-6.2Z" fill="#4285F4" />
      <path d="M12 22c2.76 0 5.07-.89 6.76-2.42l-3.22-2.47c-.86.59-2.01 1-3.54 1-2.7 0-4.99-1.75-5.81-4.17l-.1.01-2.54 1.93-.03.1C5.2 19.77 8.28 22 12 22Z" fill="#34A853" />
      <path d="M6.19 13.94A5.86 5.86 0 0 1 5.85 12c0-.67.12-1.32.33-1.94l-.01-.13L3.6 7.97l-.09.04A9.8 9.8 0 0 0 2.35 12c0 1.44.35 2.8.98 4l2.86-2.06Z" fill="#FBBC05" />
      <path d="M12 5.89c1.93 0 3.24.82 3.98 1.5l2.91-2.78C17.05 2.94 14.76 2 12 2 8.28 2 5.2 4.22 3.51 8l2.67 2.01c.84-2.42 3.12-4.12 5.82-4.12Z" fill="#EA4335" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
      <path d="m7 1 1.1 3.08L11.2 5.2 8.1 6.3 7 9.4 5.9 6.3 2.8 5.2l3.1-1.12L7 1Z" fill="currentColor" />
      <path d="m11.7 9.1.55 1.54 1.55.55-1.55.55-.55 1.54-.55-1.54-1.55-.55 1.55-.55.55-1.54ZM2.1 8.7l.4 1.08 1.08.39-1.08.39-.4 1.08-.39-1.08-1.08-.39 1.08-.4.39-1.07Z" fill="currentColor" />
    </svg>
  );
}

function StarRating() {
  return (
    <div className="review-meta__stars" aria-label="3 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg aria-hidden="true" fill={index < 3 ? "#F4B400" : "#DADCE0"} height="14" key={index} viewBox="0 0 20 20" width="14">
          <path d="m10 1.8 2.46 4.98 5.5.8-3.98 3.87.94 5.47L10 14.35l-4.92 2.57.94-5.46L2.04 7.6l5.5-.8L10 1.8Z" />
        </svg>
      ))}
    </div>
  );
}

function ProcessingSpinner() {
  return <span aria-hidden="true" className="processing-spinner" />;
}

function SuccessIcon() {
  return (
    <span aria-hidden="true" className="success-icon">
      <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
        <circle cx="8" cy="8" r="6.8" stroke="currentColor" strokeWidth="1.5" />
        <path d="m4.6 8 2.1 2.2 4.7-4.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
      <path d="m3.5 3.5 7 7m0-7-7 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.25" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
      <circle cx="6" cy="6" r="4.7" stroke="currentColor" strokeWidth="1" />
      <path d="M6 5.35v2.55M6 3.95h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
      <path d="m3 10.8 1.2-3.5 4.8-4.8 2.3 2.3-4.8 4.8L3 10.8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.1" />
      <path d="M8.2 3.3 10.5 5.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" />
    </svg>
  );
}

function LeftRail() {
  const icons = [
    <ActionCenterIcon key="action" />,
    <ScoutIcon key="scout" />,
    <HomeIcon key="home" />,
    <FavoritesIcon key="favorites" />,
    <ContentIcon key="content" />,
    <ListingsIcon key="listings" />,
    <PagesIcon key="pages" />,
    <ChatIcon key="chat" />,
    <ReviewsIcon key="reviews" />,
    <AnalyticsIcon key="analytics" />,
    <AppsIcon key="apps" />,
    <DeveloperIcon key="developer" />,
  ];

  return (
    <aside className="compact-rail">
      <div className="compact-rail__top">
        <button className="compact-rail__logo" type="button" aria-label="Company home">
          <YextSealIcon compact />
        </button>
        <button className="compact-rail__search" type="button" aria-label="Quick find">
          <SearchIcon />
        </button>
      </div>
      <div className="compact-rail__divider" />
      <nav className="compact-rail__nav" aria-label="Primary">
        {icons.map((icon, index) => (
          <button
            aria-current={index === 0 ? "page" : undefined}
            className={index === 0 ? "compact-rail__nav-button compact-rail__nav-button--active" : "compact-rail__nav-button"}
            key={index}
            type="button"
          >
            {icon}
          </button>
        ))}
      </nav>
      <div className="compact-rail__bottom">
        <button className="compact-rail__nav-button" type="button" aria-label="Notifications">
          <BellIcon />
        </button>
        <button className="compact-rail__nav-button" type="button" aria-label="Help">
          <QuestionCircleIcon />
        </button>
      </div>
    </aside>
  );
}

function Header({ needsInputCount }: { needsInputCount: number }) {
  return (
    <>
      <header className="action-header">
        <div className="action-header__title">
          <h1>Action Center</h1>
          <FeatureBadge>BETA</FeatureBadge>
        </div>
        <div className="action-header__actions">
          <a href="/" onClick={(event) => event.preventDefault()}>
            <FeedbackIcon />
            <span>Give Feedback</span>
          </a>
          <button className="icon-action" type="button" aria-label="Tour">
            <CompassIcon />
          </button>
        </div>
      </header>
      <div className="action-tabs">
        <button className="action-tabs__tab action-tabs__tab--active" type="button">
          <span>Needs Input</span>
          <strong>{needsInputCount}</strong>
        </button>
        <button className="action-tabs__tab" type="button">
          Completed
        </button>
        <button className="action-tabs__tab" type="button">
          Agents
        </button>
      </div>
    </>
  );
}

function GroupToggle() {
  return (
    <div className="pill-switch">
      <button className="pill-switch__button pill-switch__button--active" type="button">
        Grouped
      </button>
      <button className="pill-switch__button" type="button">
        Ungrouped
      </button>
    </div>
  );
}

function impactClassName(impact: ReviewTask["impact"]) {
  if (impact === "High Impact") return "impact-pill impact-pill--high";
  if (impact === "Medium Impact") return "impact-pill impact-pill--medium";
  return "impact-pill impact-pill--low";
}

function TaskList({
  activeIndex,
  tasks,
}: {
  activeIndex: number;
  tasks: ReviewTask[];
}) {
  return (
    <aside className="list-panel">
      <div className="list-panel__toolbar">
        <GroupToggle />
      </div>
      <div className="list-panel__items">
        {tasks.map((task, index) => (
          <button
            className={index === activeIndex ? "task-list-item task-list-item--active" : "task-list-item"}
            key={task.title}
            type="button"
          >
            <div className="task-list-item__meta">
              <span className={impactClassName(task.impact)}>{task.impact}</span>
              <span className="count-pill">
                <span>{task.count}</span>
              </span>
            </div>
            <span className="task-list-item__title">{task.title}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ReviewDetail({
  disabled,
  onApproveAll,
}: {
  disabled: boolean;
  onApproveAll: () => void;
}) {
  return (
    <section className="detail-panel">
      <div className="review-toolbar">
        <div className="review-toolbar__counter">
          <span>2 / 324</span>
          <span>Review Responses</span>
        </div>
        <div className="review-toolbar__nav">
          <button className="icon-action icon-action--tiny" type="button" aria-label="Previous">
            <ChevronLeftIcon />
          </button>
          <button className="icon-action icon-action--tiny" type="button" aria-label="Next">
            <ChevronRightIcon />
          </button>
        </div>
        <Button
          className="review-toolbar__approve-all"
          disabled={disabled}
          onClick={onApproveAll}
          variant="dark"
        >
          <span>Approve All (324)</span>
          <ChevronDownIcon />
        </Button>
      </div>

      <div className="review-card">
        <div className="review-card__header">
          <h2>Approve drafted review response for Molly Tea</h2>
          <div className="review-card__badges">
            <span className="impact-pill impact-pill--high">High Impact</span>
            <span className="agent-pill">
              <SparkleIcon />
              <span>Reputation Agent</span>
            </span>
          </div>
        </div>

        <div className="review-meta">
          <div className="review-meta__person">
            <GoogleIcon />
            <span>Jiamin Huang</span>
          </div>
          <div className="review-meta__line">
            <StarRating />
            <span className="review-meta__separator">·</span>
            <span>Jan 10, 2023 2:20 PM</span>
          </div>
          <div className="review-meta__line">
            <a href="/" onClick={(event) => event.preventDefault()}>
              Molly Tea
            </a>
            <span>63 Mott St, New York, NY 10013</span>
          </div>
        </div>

        <p className="review-copy">
          I&apos;ve always been a huge Molly Tea fan. The quality of the tea and the cheese foam is unmatched.
          However, I&apos;m dropping my rating to 3 stars because my absolute favorite drink has been off the menu for a
          while now. I keep coming back hoping to see it return, but no luck so far. The current seasonal options are
          good, but they don&apos;t quite hit the same. Please bring back the classic favorites! I&apos;ll happily go back to
          5 stars the moment it&apos;s back on the menu.
        </p>

        <div className="tag-field">
          <span className="tag-chip">Negative</span>
          <span className="tag-chip">Service Review</span>
        </div>

        <div className="suggested-response">
          <div className="suggested-response__header">
            <div className="suggested-response__title">
              <h3>Suggested Response</h3>
              <span className="ai-pill">
                <SparkleIcon />
                <span>AI-Generated</span>
              </span>
            </div>
            <Button size="sm" variant="secondary">
              Edit Response
            </Button>
          </div>
          <div className="suggested-response__body">
            We hear you! Thank you for being such a loyal fan. We know how disappointing it is when a favorite flavor
            goes on hiatus. We rotate our menu to ensure we are using the freshest seasonal ingredients, but we truly
            value your feedback. We&apos;ll be sure to share your request with our team. Nothing makes us happier than
            bringing back a fan favorite. Stay tuned to our social pages for any comeback announcements!
          </div>
        </div>
      </div>

      <footer className="detail-footer">
        <Button disabled={disabled} variant="secondary">
          Reject (1)
        </Button>
        <Button disabled={disabled} onClick={onApproveAll}>
          Approve (1)
        </Button>
      </footer>
    </section>
  );
}

function PhoneDetail({
  disabled,
  onApprove,
}: {
  disabled: boolean;
  onApprove: () => void;
}) {
  return (
    <section className="detail-panel detail-panel--table">
      <div className="table-card">
        <div className="table-card__header">
          <div>
            <h2>Approve suggested phone numbers</h2>
            <p>
              The Knowledge Graph Agent has suggested phone numbers for 89 entities via Entity enrichment. All approved
              phone numbers will be updated in Knowledge Graph and synced across your publisher network.
            </p>
          </div>
          <div className="review-card__badges">
            <span className="impact-pill impact-pill--medium">Medium Impact</span>
            <span className="agent-pill">
              <SparkleIcon />
              <span>Knowledge Graph Agent</span>
            </span>
          </div>
        </div>

        <div className="data-grid">
          <div className="data-grid__header">
            <span className="data-grid__check">
              <input defaultChecked type="checkbox" aria-label="Select all rows" />
            </span>
            <span>Entity</span>
            <span>Current Value</span>
            <span className="data-grid__suggested-label">
              Suggested Value
              <span className="data-grid__ai">
                <SparkleIcon />
              </span>
            </span>
            <span>Confidence</span>
          </div>
          {phoneRows.map((row) => (
            <div className="data-grid__row" key={row.entity}>
              <span className="data-grid__check">
                <input defaultChecked type="checkbox" aria-label={`Select ${row.entity}`} />
              </span>
              <span className="data-grid__entity">
                <a href="/" onClick={(event) => event.preventDefault()}>
                  {row.entity}
                </a>
                <small>{row.address}</small>
              </span>
              <span className="data-grid__muted data-grid__italic">No value</span>
              <span>{row.suggested}</span>
              <span className="data-grid__confidence">
                <i>{row.confidence}%</i>
                <button className="ghost-info" type="button" aria-label={`Confidence info for ${row.entity}`}>
                  <InfoIcon />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <footer className="detail-footer">
        <Button disabled={disabled} variant="secondary">
          Reject (89)
        </Button>
        <Button disabled={disabled} onClick={onApprove}>
          Approve (89)
        </Button>
      </footer>
    </section>
  );
}

function Toast({
  closing,
  kind,
  onClose,
}: {
  closing: boolean;
  kind: ToastKind;
  onClose: () => void;
}) {
  return (
    <div className={kind === "success" ? `toast toast--success${closing ? " toast--closing" : ""}` : `toast${closing ? " toast--closing" : ""}`}>
      <div className="toast__icon">
        {kind === "success" ? <SuccessIcon /> : <ProcessingSpinner />}
      </div>
      <div className="toast__content">
        <strong>{kind === "success" ? "Success!" : "Bulk approval in progress"}</strong>
        <p>
          {kind === "success"
            ? "324 items were approved. Nice work!"
            : "We’re processing your changes to 324 items. You’re all set!"}
        </p>
      </div>
      <button className="toast__close" type="button" aria-label="Dismiss toast" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState<Stage>("review");
  const [toast, setToast] = useState<ToastKind | null>(null);
  const [toastClosing, setToastClosing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiRun, setConfettiRun] = useState(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const queue = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(callback, delay);
    timeouts.current.push(timeoutId);
  };

  const clearQueued = () => {
    timeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeouts.current = [];
  };

  useEffect(() => {
    if (stage !== "phone-success") return;

    setConfettiRun((current) => current + 1);
    setShowConfetti(true);

    const timeoutId = window.setTimeout(() => {
      setShowConfetti(false);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [stage]);

  const handleApproveAll = () => {
    clearQueued();
    setStage("review-processing");
    setToast("processing");
    setToastClosing(false);

    queue(() => {
      setStage("phone-success");
      setToast("success");
      setToastClosing(false);
    }, 3000);

    queue(() => {
      setToastClosing(true);
    }, 4300);

    queue(() => {
      setToast(null);
      setToastClosing(false);
      setStage("phone-ready");
    }, 4600);
  };

  const handleApprovePhones = () => {};

  const needsInputCount = stage === "review" || stage === "review-processing" ? 3 : 2;
  const showReview = stage === "review" || stage === "review-processing";
  const showPhoneTable = stage === "phone-ready" || stage === "phone-success";
  const activeTasks = showReview ? reviewTasks : phoneTasks;

  return (
    <div className="action-center-app">
      {showConfetti ? <Confetti key={confettiRun} /> : null}

      <LeftRail />

      <main className="workspace">
        <Header needsInputCount={needsInputCount} />

        <div className="workspace__body">
          <TaskList activeIndex={0} tasks={activeTasks} />
          {showReview ? (
            <ReviewDetail disabled={stage === "review-processing"} onApproveAll={handleApproveAll} />
          ) : null}
          {showPhoneTable ? (
            <PhoneDetail
              disabled={false}
              onApprove={handleApprovePhones}
            />
          ) : null}
        </div>
      </main>

      {toast ? (
        <Toast
          closing={toastClosing}
          kind={toast}
          onClose={() => {
            clearQueued();
            setToastClosing(false);
            setToast(null);
            if (stage === "phone-success") {
              setStage("phone-ready");
            }
          }}
        />
      ) : null}
    </div>
  );
}
