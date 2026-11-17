"use client";

import { useRef, useState, type KeyboardEvent } from "react";

interface Service {
  id: string;
  name: string;
  description: string;
}

interface Group {
  id: string;
  name: string;
  summary: string;
  services: Service[];
}

interface ServicesTabsProps {
  groups: Group[];
  label: string;
}

/**
 * Accessible tabs (WAI-ARIA Authoring Practices): roving tabindex, arrow/Home/
 * End navigation and an explicit relationship between each tab and panel.
 */
export function ServicesTabs({
  groups,
  label,
}: ServicesTabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;

    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % groups.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + groups.length) % groups.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = groups.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    focusTab(next);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-wrap gap-2 border-b border-blue/20 pb-3"
      >
        {groups.map((group, index) => {
          const selected = index === active;

          return (
            <button
              key={group.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`service-tab-${group.id}`}
              aria-selected={selected}
              aria-controls={`service-panel-${group.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={[
                "inline-flex min-h-12 items-center rounded-full px-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                selected
                  ? "bg-blue text-cream"
                  : "border border-blue/30 text-blue hover:bg-blue/5",
              ].join(" ")}
            >
              {group.name}
            </button>
          );
        })}
      </div>

      {groups.map((group, index) => {
        const selected = index === active;

        return (
          <div
            key={group.id}
            role="tabpanel"
            id={`service-panel-${group.id}`}
            aria-labelledby={`service-tab-${group.id}`}
            hidden={!selected}
            className="mt-8 rounded-[1.75rem] border border-blue/20 bg-cream p-6 focus-visible:outline-none sm:p-9"
          >
            <p className="pretty max-w-2xl text-base leading-relaxed text-blue">
              {group.summary}
            </p>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-[1.25rem] border border-blue/20 bg-blue/20 sm:grid-cols-2">
              {group.services.map((service) => (
                <li key={service.id} className="bg-cream p-6">
                  <h3 className="font-display text-3xl leading-none text-blue">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-blue">
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
