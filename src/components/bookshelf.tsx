"use client";

import Image from "next/image";
import Link from "next/link";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  animate,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { CATEGORIES, type Book, type Category } from "@/lib/books";
import {
  MOTION_PRESETS,
  REST,
  type MotionName,
  type MotionPreset,
} from "@/lib/shelf-motion";

/* -------------------------------------------------------------------------- */
/*  Motion and geometry                                                       */
/* -------------------------------------------------------------------------- */

type Tab = "All" | Category;
type Mode = "rest" | "open" | "dimmed";

const TABS: readonly Tab[] = ["All", ...CATEGORIES];

const SPRING: Transition = { type: "spring", stiffness: 210, damping: 27, mass: 0.9 };
const SNAPPY: Transition = { type: "spring", stiffness: 420, damping: 36 };

const FOCUS_RING =
  "outline-neutral-900 focus-visible:outline-2 dark:outline-neutral-100";

const GAP = 5;
const PERSPECTIVE = 1400;

/** Small stable hash, so that server and client derive the same look. */
function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

/** Dark text on light spines, light text on dark spines. */
function inkFor(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const luma = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luma > 0.58 ? "#1c1917" : "#faf8f4";
}

/** Horizontal reach of an edge that is turned away from the hinge. */
function reach(length: number, towardView: number, depth: number, z: number): number {
  return (length * towardView * PERSPECTIVE) / (PERSPECTIVE - z + length * depth);
}

function getLook(book: Book, scale: number, preset: MotionPreset) {
  const seed = hash(book.id);
  const t = Math.round((book.thickness ?? 40 + (seed % 26)) * scale);
  const h = Math.round((book.height ?? 318 + ((seed >>> 5) % 44)) * scale);
  const depth = Math.round(h * 0.69);

  const at = (pose: "hover" | "open") => {
    const { rotateY, z } = preset[pose];
    const sin = Math.sin((-rotateY * Math.PI) / 180);
    const cos = Math.cos((-rotateY * Math.PI) / 180);
    return { cover: reach(depth, sin, cos, z), spine: reach(t, cos, sin, z) };
  };
  const hover = at("hover");
  const open = at("open");
  const margin = 26 * scale;

  return {
    thickness: t,
    height: h,
    depth,
    ink: inkFor(book.spineColor),
    variant: (seed >>> 9) % 4,
    face: ["font-sans", "font-serif", "font-sans", "font-mono"][(seed >>> 13) % 4],
    /** Width that the book takes up in the row, per pose. */
    width: {
      rest: t,
      hover: Math.round(t + hover.cover * 0.95 + 6),
      open: Math.round(open.spine + open.cover + margin * 2),
    },
    /** The spine edge moves right when the book turns, so centre it in its slot. */
    openX: Math.round(margin + open.spine - t),
  };
}

type Look = ReturnType<typeof getLook>;

/* Compact sizes on small screens. The server renders the desktop size. */
const COMPACT_QUERY = "(max-width: 639px)";
const subscribeCompact = (notify: () => void) => {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const useShelfScale = () =>
  useSyncExternalStore(
    subscribeCompact,
    () => (window.matchMedia(COMPACT_QUERY).matches ? 0.8 : 1),
    () => 1,
  );

/* -------------------------------------------------------------------------- */
/*  Book faces                                                                */
/* -------------------------------------------------------------------------- */

const COVER_ART = [
  "repeating-radial-gradient(circle at 78% 84%, currentColor 0 1.5px, transparent 1.5px 15px)",
  "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 18px), repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 18px)",
  "repeating-linear-gradient(135deg, currentColor 0 7px, transparent 7px 21px)",
  "radial-gradient(circle, currentColor 2px, transparent 2.5px) 0 0 / 17px 17px",
];

function Spine({ book, look }: { book: Book; look: Look }) {
  const title = book.spineTitle ?? book.title;
  const surname = book.author.split(/,|&/)[0].trim().split(" ").pop();
  const room = look.height - 96;
  const fontSize = Math.max(9, Math.min(look.thickness * 0.34, 17, room / (title.length * 0.6)));

  return (
    <span
      className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-[3px] text-center [backface-visibility:hidden]"
      style={{ backgroundColor: book.spineColor, color: look.ink }}
    >
      {look.variant === 0 && <span className="absolute inset-x-0 top-5 h-[3px] bg-current opacity-60" />}
      {look.variant === 1 && <span className="absolute inset-x-0 top-0 h-7 bg-current opacity-15" />}
      {look.variant === 2 && (
        <span className="absolute inset-x-0 top-4 h-2 border-y border-current opacity-60" />
      )}
      <span
        className={`mt-10 min-h-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-semibold leading-none tracking-tight [writing-mode:vertical-rl] ${look.face}`}
        style={{ fontSize: Math.round(fontSize * 10) / 10 }}
      >
        {title}
      </span>
      <span className="mb-4 mt-2 whitespace-nowrap text-[9px] font-medium uppercase leading-none tracking-wider opacity-75 [writing-mode:vertical-rl]">
        {surname}
      </span>
      {/* Rounded-spine light */}
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.26),rgba(255,255,255,.14)_26%,rgba(255,255,255,.04)_60%,rgba(0,0,0,.24))]" />
    </span>
  );
}

function Cover({ book, look }: { book: Book; look: Look }) {
  return (
    <span
      className="absolute left-full top-0 block h-full origin-left overflow-hidden rounded-r-[4px] text-left [backface-visibility:hidden] [transform:rotateY(90deg)]"
      style={{ width: look.depth, backgroundColor: book.spineColor, color: look.ink }}
    >
      {book.coverImage ? (
        <Image src={book.coverImage} alt="" fill sizes="280px" className="object-cover" />
      ) : (
        <span className="flex h-full flex-col p-[9%] pl-[12%]">
          <span
            className={`text-balance font-semibold leading-[1.08] tracking-tight ${look.face}`}
            style={{ fontSize: Math.round(look.depth * (book.title.length > 30 ? 0.092 : 0.112)) }}
          >
            {book.title}
          </span>
          <span
            className="my-[9%] min-h-0 flex-1 opacity-40"
            style={{ background: COVER_ART[look.variant] }}
          />
          <span className="text-[11px] font-medium leading-snug opacity-80">{book.author}</span>
        </span>
      )}
      {/* Hinge groove and soft light */}
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.22),rgba(255,255,255,.16)_3%,rgba(0,0,0,.14)_6%,transparent_9%,rgba(255,255,255,.08)_60%,rgba(0,0,0,.08))]" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  One book in the row                                                       */
/* -------------------------------------------------------------------------- */

interface ShelfBookProps {
  book: Book;
  look: Look;
  preset: MotionPreset;
  mode: Mode;
  /** Layout is measured again only when this value changes. */
  layoutKey: string;
  onToggle: (id: string) => void;
}

const ShelfBook = memo(
  forwardRef<HTMLLIElement, ShelfBookProps>(function ShelfBook(
    { book, look, preset, mode, layoutKey, onToggle },
    ref,
  ) {
    // Local state: hovering renders this book only, never the whole row.
    const [hovered, setHovered] = useState(false);
    const pose = mode === "open" ? "open" : hovered ? "hover" : "rest";
    const faded = mode === "dimmed" && !hovered;

    const target = pose === "rest" ? REST : preset[pose];
    const final = {
      rotateX: 0,
      rotateZ: 0,
      ...target,
      x: pose === "open" ? look.openX : 0,
    };
    let bookAnimate: Record<string, number | (number | null)[]> = final;
    let bookTransition: Transition = preset.spring;
    if (pose === "open" && preset.path) {
      // Keyframes from the current value, through `mid`, to the open pose.
      const { mid, at, duration } = preset.path;
      const midPose: Record<string, number> = { ...final, x: 0, ...mid };
      bookAnimate = Object.fromEntries(
        Object.entries(final).map(([key, value]) => [key, [null, midPose[key], value]]),
      );
      bookTransition = { duration, times: [0, at, 1], ease: [0.32, 0.72, 0.24, 1] };
    }

    return (
      <motion.li
        ref={ref}
        layout="position"
        layoutId={book.id}
        layoutDependency={layoutKey}
        className="relative shrink-0"
        style={{ height: look.height }}
        initial={{ opacity: 0, y: 36, width: look.width.rest }}
        animate={{
          opacity: 1,
          y: 0,
          width: look.width[pose],
          zIndex: pose === "open" ? 30 : pose === "hover" ? 20 : 1,
        }}
        exit={{ opacity: 0, y: 36, transition: { duration: 0.22, ease: "easeIn" } }}
        transition={SPRING}
      >
        <button
          type="button"
          data-book={book.id}
          aria-label={`${book.title} by ${book.author}`}
          aria-pressed={mode === "open"}
          onClick={() => onToggle(book.id)}
          // The ::before bridges the gap between books, so hover never drops out.
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={(e) => e.currentTarget.matches(":focus-visible") && setHovered(true)}
          onBlur={() => setHovered(false)}
          className={`absolute inset-0 block cursor-pointer rounded-sm outline-offset-4 before:absolute before:-inset-x-[3px] before:inset-y-0 before:content-[''] ${FOCUS_RING}`}
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 block h-full"
            style={{
              width: look.thickness,
              perspective: PERSPECTIVE,
              // On the hinge, so the cover is exactly edge-on at rest.
              perspectiveOrigin: "100% 46%",
            }}
            initial={false}
            animate={{ opacity: faded ? 0.5 : 1, filter: faded ? "blur(1.4px)" : "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Contact shadow */}
            <motion.span
              className="absolute -bottom-3 left-0 block h-6 origin-left rounded-[50%] bg-[radial-gradient(closest-side,rgba(23,23,23,.5),transparent)] dark:bg-[radial-gradient(closest-side,rgba(0,0,0,.9),transparent)]"
              style={{ width: look.thickness + 14 }}
              initial={false}
              animate={{
                x: pose === "open" ? look.openX + look.thickness * 0.5 : -5,
                y: pose === "rest" ? 0 : 9,
                scaleX:
                  pose === "rest" ? 1 : (look.width[pose] * 0.84) / (look.thickness + 14),
                opacity: pose === "rest" ? 0.45 : 0.75,
              }}
              transition={SPRING}
            />
            <motion.span
              className="absolute inset-0 block [transform-style:preserve-3d]"
              // Right edge for the turn, bottom edge for a tip or a lean.
              style={{ transformOrigin: "100% 100%" }}
              initial={false}
              animate={bookAnimate}
              transition={bookTransition}
            >
              <Spine book={book} look={look} />
              <Cover book={book} look={look} />
            </motion.span>
          </motion.span>
        </button>
      </motion.li>
    );
  }),
);

/* -------------------------------------------------------------------------- */
/*  Tabs, scroll buttons and details                                          */
/* -------------------------------------------------------------------------- */

const CategoryTabs = memo(function CategoryTabs({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter books by category"
      className="-mx-6 flex gap-1 overflow-x-auto px-6 py-1 [scrollbar-width:none] sm:-ml-3 sm:mr-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          aria-pressed={tab === active}
          onClick={() => onChange(tab)}
          className={`relative shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-sm -outline-offset-2 transition-colors ${FOCUS_RING} ${
            tab === active
              ? "text-white dark:text-neutral-900"
              : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          }`}
        >
          {tab === active && (
            <motion.span
              layoutId="active-tab"
              layoutDependency={active}
              className="absolute inset-0 bg-neutral-900 dark:bg-neutral-100"
              style={{ borderRadius: 9999 }}
              transition={SNAPPY}
            />
          )}
          <span className="relative">{tab}</span>
        </button>
      ))}
    </div>
  );
});

function ScrollButton({
  direction,
  visible,
  onClick,
}: {
  direction: "left" | "right";
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={`Scroll shelf ${direction}`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={onClick}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      whileTap={{ scale: 0.92 }}
      transition={SNAPPY}
      className={`absolute top-1/2 z-40 hidden size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-neutral-900 shadow-[0_2px_14px_rgba(23,23,23,.18)] outline-offset-2 sm:grid dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[0_2px_14px_rgba(0,0,0,.6)] ${FOCUS_RING} ${
        direction === "left" ? "left-4" : "right-4"
      } ${visible ? "" : "pointer-events-none"}`}
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5">
        <path
          d={direction === "left" ? "M12 4.5 6.5 10l5.5 5.5" : "M8 4.5 13.5 10 8 15.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

function BookDetails({
  book,
  count,
  onClose,
}: {
  book: Book | null;
  count: number;
  onClose: () => void;
}) {
  return (
    <div aria-live="polite" className="mx-auto min-h-56 max-w-2xl px-6 pb-12 pt-6">
      <AnimatePresence mode="wait" initial={false}>
        {book ? (
          <motion.article
            key={book.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { ...SPRING, delay: 0.08 } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.14 } }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-balance font-medium">{book.title}</h2>
                <p className="text-neutral-500 dark:text-neutral-400">{book.author}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className={`shrink-0 cursor-pointer rounded-full border border-neutral-300 px-3 py-1.5 text-sm outline-offset-2 transition-colors hover:border-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-100 ${FOCUS_RING}`}
              >
                Put back
              </button>
            </div>
            <p className="mt-4 text-pretty leading-relaxed text-neutral-700 dark:text-neutral-300">
              {book.description}
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: book.spineColor }} />
              {book.category}
            </p>
          </motion.article>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.14 } }}
            className="text-neutral-500 dark:text-neutral-400"
          >
            {count === 0
              ? "No books in this category yet."
              : `${count} ${count === 1 ? "book" : "books"}. Select one to take it off the shelf.`}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shelf                                                                     */
/* -------------------------------------------------------------------------- */

interface BookshelfProps {
  books: Book[];
  /** The "Reading map" link is shown only when this is set. */
  readingMapHref?: string;
  motionName?: MotionName;
}

export default function Bookshelf({ books, readingMapHref, motionName = "turn" }: BookshelfProps) {
  const preset: MotionPreset = MOTION_PRESETS[motionName];
  const groupId = useId();
  const scale = useShelfScale();
  const reducedMotion = useReducedMotion();
  const [tab, setTab] = useState<Tab>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const scrollerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const scrollAnimation = useRef<{ stop: () => void } | null>(null);

  const looks = useMemo(
    () => new Map(books.map((book) => [book.id, getLook(book, scale, preset)])),
    [books, scale, preset],
  );
  const visible = useMemo(
    () => (tab === "All" ? books : books.filter((book) => book.category === tab)),
    [books, tab],
  );
  const selectedBook = useMemo(
    () => visible.find((book) => book.id === selectedId) ?? null,
    [visible, selectedId],
  );
  const openId = selectedBook?.id ?? null;

  const stopScroll = useCallback(() => scrollAnimation.current?.stop(), []);

  /** The target is clamped on each frame, so it can exceed a row that still grows. */
  const scrollTo = useCallback(
    (target: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      scrollAnimation.current?.stop();
      if (reducedMotion) {
        scroller.scrollLeft = target;
        return;
      }
      scrollAnimation.current = animate(scroller.scrollLeft, Math.max(0, target), {
        type: "spring",
        stiffness: 150,
        damping: 26,
        onUpdate: (value) => {
          scroller.scrollLeft = value;
        },
      });
    },
    [reducedMotion],
  );

  /** Brings a book into view at its final position, not its mid-animation one. */
  const reveal = useCallback(
    (id: string, pose: "hover" | "open") => {
      const scroller = scrollerRef.current;
      const row = rowRef.current;
      const width = looks.get(id)?.width[pose];
      if (!scroller || !row || width === undefined) return;

      let left = parseFloat(getComputedStyle(row).paddingLeft);
      for (const book of visible) {
        if (book.id === id) break;
        const rest = looks.get(book.id)?.width;
        if (rest) left += (pose === "hover" && book.id === openId ? rest.open : rest.rest) + GAP;
      }
      const inset = Math.min(72, Math.max(0, (scroller.clientWidth - width) / 2));
      const from = scroller.scrollLeft;
      if (left - inset < from) scrollTo(left - inset);
      else if (left + width + inset > from + scroller.clientWidth)
        scrollTo(left + width + inset - scroller.clientWidth);
    },
    [looks, visible, openId, scrollTo],
  );

  const toggle = useCallback(
    (id: string) => setSelectedId((current) => (current === id ? null : id)),
    [],
  );
  const close = useCallback(() => setSelectedId(null), []);

  const changeTab = useCallback(
    (next: Tab) => {
      setTab(next);
      setSelectedId(null);
      scrollTo(0);
    },
    [scrollTo],
  );

  useEffect(() => {
    if (!openId) return;
    reveal(openId, "open");
    const onKey = (event: globalThis.KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, reveal, close]);

  // Scroll buttons: state changes only when an edge is reached or left.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const row = rowRef.current;
    if (!scroller || !row) return;
    const update = () => {
      const left = scroller.scrollLeft > 4;
      // The row width, not scrollWidth: books that are still leaving must not count.
      const right = scroller.scrollLeft + scroller.clientWidth < row.offsetWidth - 4;
      setEdges((e) => (e.left === left && e.right === right ? e : { left, right }));
    };
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    observer.observe(row);
    scroller.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => stopScroll, [stopScroll]);

  const page = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const max = scroller.scrollWidth - scroller.clientWidth;
    scrollTo(Math.min(max, scroller.scrollLeft + direction * scroller.clientWidth * 0.7));
  };

  const onRowKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const current = (event.target as HTMLElement).closest<HTMLElement>("[data-book]")?.dataset.book;
    const index = visible.findIndex((book) => book.id === current);
    const next = visible[index + (event.key === "ArrowRight" ? 1 : -1)];
    if (index < 0 || !next) return;
    event.preventDefault();
    rowRef.current
      ?.querySelector<HTMLElement>(`[data-book="${CSS.escape(next.id)}"]`)
      ?.focus({ preventScroll: true });
    reveal(next.id, next.id === openId ? "open" : "hover");
  };

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id={groupId}>
        <section aria-label="Engineering shelf" className="w-full">
          <div className="animate-enter mx-auto max-w-2xl px-6 pt-12">
            <header className="flex items-baseline justify-between gap-6">
              <h1 className="font-medium">Engineering shelf</h1>
              {readingMapHref && (
                <Link
                  href={readingMapHref}
                  className="shrink-0 text-sm underline decoration-neutral-300 underline-offset-4 transition hover:decoration-current dark:decoration-neutral-700"
                >
                  Reading map
                </Link>
              )}
            </header>
            <div className="mt-6">
              <CategoryTabs active={tab} onChange={changeTab} />
            </div>
          </div>

          <div className="relative">
            <motion.div
              ref={scrollerRef}
              layoutScroll
              onWheel={stopScroll}
              onTouchStart={stopScroll}
              className="overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* The side padding lines the first book up with the 2xl text column. */}
              <ul
                ref={rowRef}
                onKeyDown={onRowKeyDown}
                onClick={(event) => event.target === event.currentTarget && close()}
                className="relative flex w-max min-w-full items-end px-[max(1.5rem,calc((100vw-42rem)/2+1.5rem))] pb-14 pt-24"
                style={{ gap: GAP, height: 372 * scale + 152 }}
              >
                {/* Shelf edge */}
                <li
                  aria-hidden
                  role="presentation"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 border-t border-neutral-200 bg-linear-to-b from-neutral-100 to-white dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950"
                />
                <AnimatePresence mode="popLayout" initial={false}>
                  {visible.map((book) => (
                    <ShelfBook
                      key={book.id}
                      book={book}
                      look={looks.get(book.id)!}
                      preset={preset}
                      mode={openId === null ? "rest" : openId === book.id ? "open" : "dimmed"}
                      layoutKey={tab}
                      onToggle={toggle}
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </motion.div>
            <ScrollButton direction="left" visible={edges.left} onClick={() => page(-1)} />
            <ScrollButton direction="right" visible={edges.right} onClick={() => page(1)} />
          </div>

          <BookDetails book={selectedBook} count={visible.length} onClose={close} />
        </section>
      </LayoutGroup>
    </MotionConfig>
  );
}
