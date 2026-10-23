/* @ds-bundle: {"format":4,"namespace":"Keel","components":[{"name":"Button"},{"name":"DeltaBadge"},{"name":"StatusPill"},{"name":"KpiCard"},{"name":"PacingBar"},{"name":"AlertItem"},{"name":"ChangeReview"},{"name":"ScopeBar"},{"name":"NavItem"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState, useRef = React.useRef, useEffect = React.useEffect;

  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }

  var nf = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 });
  function money(v, cur) { return nf.format(Math.round(v)) + (cur ? " " + cur : ""); }

  /* Button: variants, sizes, and press-and-hold confirmation for money or bulk changes. */
  function Button(props) {
    var variant = props.variant || "secondary", size = props.size || "md";
    var hold = props.confirm === "hold";
    var holdMs = props.holdMs || 900;
    var st = useState(0), progress = st[0], setProgress = st[1];
    var timer = useRef(null), start = useRef(0);
    function stop() { if (timer.current) { cancelAnimationFrame(timer.current); timer.current = null; } setProgress(0); }
    function tick() {
      var p = Math.min(1, (performance.now() - start.current) / holdMs);
      setProgress(p);
      if (p >= 1) { timer.current = null; setProgress(0); if (props.onClick) props.onClick(); return; }
      timer.current = requestAnimationFrame(tick);
    }
    function down(e) { if (!hold || props.disabled) return; e.preventDefault(); start.current = performance.now(); timer.current = requestAnimationFrame(tick); }
    function key(e) { if (hold && (e.key === "Enter" || e.key === " ")) { if (e.type === "keydown" && !timer.current && !e.repeat) down(e); if (e.type === "keyup") stop(); } }
    useEffect(function () { return stop; }, []);
    var label = hold && progress > 0 ? "Hold to confirm…" : props.children;
    return h("button", {
      type: props.type || "button", disabled: props.disabled, title: props.title,
      className: cx("keel-btn", "keel-btn-" + variant, size !== "md" && "keel-btn-" + size, props.className),
      onClick: hold ? undefined : props.onClick,
      onPointerDown: down, onPointerUp: hold ? stop : undefined, onPointerLeave: hold ? stop : undefined,
      onKeyDown: key, onKeyUp: key,
      "aria-description": hold ? "Press and hold to confirm" : undefined
    },
      hold ? h("span", { className: "keel-btn-fill", style: { width: (progress * 100) + "%" }, "aria-hidden": true }) : null,
      h("span", { className: "keel-btn-label" }, label));
  }

  /* DeltaBadge: arrow shows direction, colour shows good or bad for this metric. */
  function DeltaBadge(props) {
    var v = Number(props.value) || 0;
    var polarity = props.polarity || "higher-better";
    var dir = v > 0 ? "up" : v < 0 ? "down" : "flat";
    var tone = "neutral";
    if (dir !== "flat" && polarity !== "neutral") {
      var good = (polarity === "higher-better") === (dir === "up");
      tone = good ? "good" : "bad";
    }
    var arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "●";
    var text = (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(props.digits == null ? 1 : props.digits) + (props.unit == null ? "%" : props.unit);
    var spoken = (dir === "flat" ? "No change" : (dir === "up" ? "Up " : "Down ") + text.replace(/^[+−]/, "")) +
      (tone === "neutral" ? "" : tone === "good" ? ", better" : ", worse");
    return h("span", { className: cx("keel-delta", "keel-delta-" + tone), "aria-label": spoken, title: props.title },
      h("span", { "aria-hidden": true, style: { fontSize: "9px" } }, arrow), h("span", { "aria-hidden": true }, text));
  }

  /* StatusPill: entity and change states. */
  var STATUS_LABEL = { enabled: "Enabled", paused: "Paused", removed: "Removed", pending: "Pending approval", applied: "Applied",
    failed: "Failed", reverted: "Reverted", external: "External change", auto: "Auto-apply", preview: "Preview only" };
  function StatusPill(props) {
    var s = props.status || "enabled";
    return h("span", { className: cx("keel-pill", "keel-pill-" + s) }, props.children || STATUS_LABEL[s] || s);
  }

  function Sparkline(props) {
    var d = props.data || [];
    if (d.length < 2) return null;
    var min = Math.min.apply(null, d), max = Math.max.apply(null, d), span = max - min || 1;
    var pts = d.map(function (v, i) { return (i / (d.length - 1) * 100).toFixed(2) + "," + (30 - (v - min) / span * 28).toFixed(2); });
    return h("svg", { className: "keel-spark", viewBox: "0 0 100 32", preserveAspectRatio: "none", "aria-hidden": true },
      h("path", { d: "M" + pts.join(" L"), vectorEffect: "non-scaling-stroke" }));
  }

  /* KpiCard: one metric with its delta, comparison and an optional sparkline. */
  function KpiCard(props) {
    return h("div", { className: cx("keel-card", "keel-kpi", props.className) },
      h("div", { className: "keel-kpi-label" }, h("span", null, props.label), props.maturing ? h("span", { className: "keel-kpi-maturing", title: "Conversions for the last 7 days are still being counted" }, "Maturing") : null),
      h("div", { className: "keel-kpi-value" }, props.value),
      h("div", { className: "keel-kpi-foot" },
        props.delta != null ? h(DeltaBadge, { value: props.delta, polarity: props.polarity }) : null,
        props.compare ? h("span", null, props.compare) : null),
      props.trend ? h(Sparkline, { data: props.trend }) : null);
  }

  /* PacingBar: spend to date, projection and the budget line. */
  function PacingBar(props) {
    var budget = props.budget || 1, spent = props.spent || 0, projected = props.projected || spent, cur = props.currency || "NOK";
    var scale = Math.max(budget, projected) * 1.08;
    var pct = function (v) { return Math.min(100, v / scale * 100) + "%"; };
    var over = projected > budget * (1 + (props.tolerance == null ? 0.1 : props.tolerance));
    var share = Math.round(projected / budget * 100);
    return h("div", { className: cx("keel-card", "keel-pacing", over && "keel-pacing-over", props.className) },
      h("div", { className: "keel-pacing-head" },
        h("span", { style: { fontWeight: 600 } }, props.label || "Monthly budget"),
        h("span", { className: "keel-num", style: { color: over ? "var(--warning)" : "var(--ink-muted)", fontSize: 13, fontWeight: 500 } },
          (over ? "Projected " + share + "% of budget" : "On pace · " + share + "% projected"))),
      h("div", { className: "keel-pacing-track", role: "img",
        "aria-label": "Spent " + money(spent, cur) + ", projected " + money(projected, cur) + " of a " + money(budget, cur) + " budget" },
        h("div", { className: "keel-pacing-projected", style: { left: pct(spent), width: "calc(" + pct(projected) + " - " + pct(spent) + ")" } }),
        h("div", { className: "keel-pacing-spent", style: { width: pct(spent) } }),
        h("div", { className: "keel-pacing-budget", style: { left: pct(budget) } })),
      h("div", { className: "keel-pacing-legend" },
        h("span", null, "Spent ", h("b", null, money(spent, cur))),
        h("span", null, "Projected ", h("b", null, money(projected, cur))),
        h("span", null, "Budget ", h("b", null, money(budget, cur))),
        props.idealDaily != null ? h("span", null, "Ideal daily ", h("b", null, money(props.idealDaily, cur))) : null));
  }

  /* AlertItem: one alert row with severity, cause and actions. */
  var SEV = { critical: "Critical", warning: "Warning", info: "Info" };
  function AlertItem(props) {
    var sev = props.severity || "info";
    return h("div", { className: cx("keel-alert", "keel-alert-" + sev), role: sev === "critical" ? "alert" : undefined },
      h("span", { className: "keel-alert-bar", "aria-hidden": true }),
      h("div", null,
        h("div", null, h("span", { className: "keel-alert-sev" }, SEV[sev]), h("span", { className: "keel-alert-title" }, props.title)),
        props.meta ? h("div", { className: "keel-alert-meta" }, props.meta) : null),
      h("div", { className: "keel-alert-actions" }, props.actions));
  }

  /* ChangeReview: the single component for every write to an ad account. */
  function ChangeReview(props) {
    var rows = props.changes || [];
    var st = useState(function () { return rows.map(function () { return true; }); }), on = st[0], setOn = st[1];
    var n = on.filter(Boolean).length;
    var tier = props.tier || "small";
    function toggle(i) { setOn(on.map(function (v, j) { return j === i ? !v : v; })); }
    function toggleAll() { var all = n !== rows.length; setOn(rows.map(function () { return all; })); }
    return h("section", { className: cx("keel-card", "keel-review", props.className), "aria-label": props.title || "Review changes" },
      h("div", { className: "keel-review-head" },
        h("div", null,
          h("div", { className: "keel-review-title" }, props.title || "Review changes"),
          props.summary ? h("div", { className: "keel-review-summary" }, props.summary) : null),
        props.source ? h(StatusPill, { status: props.sourceStatus || "pending" }, props.source) : null),
      h("table", { className: "keel-review-table" },
        h("thead", null, h("tr", null,
          h("th", { style: { width: 36 } }, h("input", { type: "checkbox", className: "keel-check", checked: n === rows.length, onChange: toggleAll, "aria-label": "Select all changes" })),
          h("th", null, "Entity"), h("th", null, "Change"), h("th", null, "Reason"))),
        h("tbody", null, rows.map(function (r, i) {
          return h("tr", { key: i, className: on[i] ? "" : "is-off" },
            h("td", null, h("input", { type: "checkbox", className: "keel-check", checked: on[i], onChange: function () { toggle(i); }, "aria-label": "Include " + r.entity })),
            h("td", null, h("div", { style: { fontWeight: 500 } }, r.entity), r.path ? h("div", { className: "keel-reason" }, r.path) : null),
            h("td", { className: "keel-num" }, h("span", { className: "keel-reason", style: { display: "block" } }, r.field),
              h("span", { className: "keel-change-from" }, r.from), h("span", { className: "keel-change-arrow", "aria-label": "to" }, "→"), h("span", { className: "keel-change-to" }, r.to)),
            h("td", { className: "keel-reason" }, r.reason));
        }))),
      h("div", { className: "keel-review-foot" },
        h("span", { className: "keel-review-note" }, n + " of " + rows.length + " selected · undo for 30 days in the change log"),
        h("div", { style: { display: "flex", gap: "var(--space-2)" } },
          h(Button, { variant: "ghost", onClick: props.onCancel }, "Cancel"),
          h(Button, { variant: "primary", disabled: n === 0, confirm: tier === "money" ? "hold" : undefined,
            onClick: function () { if (props.onApply) props.onApply(rows.filter(function (_, i) { return on[i]; })); } },
            "Apply " + n + (n === 1 ? " change" : " changes")))));
  }

  /* ScopeBar: account scope, date range, compare, freshness, alerts, assistant. */
  function ScopeBar(props) {
    var stale = props.stale;
    return h("div", { className: cx("keel-scope", props.className), role: "toolbar", "aria-label": "Scope" },
      h("button", { className: "keel-scope-btn", type: "button" }, props.accounts || "All accounts", h("span", null, "▾")),
      h("button", { className: "keel-scope-btn", type: "button" }, props.range || "Last 7 days", h("span", null, props.compare || "vs previous period")),
      h("div", { className: "keel-scope-spacer" }),
      h("span", { className: cx("keel-fresh", stale && "keel-fresh-stale") }, props.freshness || "Synced 06:04"),
      h("button", { className: "keel-btn keel-btn-ghost keel-btn-sm keel-bell", type: "button", "aria-label": (props.alerts || 0) + " open alerts" },
        "Alerts", props.alerts ? h("span", { className: "keel-bell-count", "aria-hidden": true }, props.alerts) : null),
      h("button", { className: "keel-btn keel-btn-secondary keel-btn-sm", type: "button" }, "Ask Keel"));
  }

  /* NavItem: sidebar entry with optional count badge. */
  var ICONS = {
    overview: "M3 12h4l3-8 4 16 3-8h4",
    explore: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
    insights: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    automate: "M12 3v3M12 18v3M4.6 6.6l2.1 2.1M17.3 15.3l2.1 2.1M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    budgets: "M3 7h18v12H3zM3 11h18M7 15h4",
    changes: "M4 7h11l-3-3M20 17H9l3 3",
    settings: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3"
  };
  function NavItem(props) {
    return h("a", { href: props.href || "#", className: cx("keel-nav-item", props.active && "is-active"), "aria-current": props.active ? "page" : undefined },
      h("svg", { className: "keel-nav-icon", viewBox: "0 0 24 24", "aria-hidden": true }, h("path", { d: ICONS[props.icon] || ICONS.overview })),
      h("span", null, props.children),
      props.count ? h("span", { className: "keel-nav-badge", "aria-label": props.count + " pending" }, props.count) : null);
  }

  window.Keel = Object.assign(window.Keel || {}, {
    Button: Button, DeltaBadge: DeltaBadge, StatusPill: StatusPill, KpiCard: KpiCard, PacingBar: PacingBar,
    AlertItem: AlertItem, ChangeReview: ChangeReview, ScopeBar: ScopeBar, NavItem: NavItem
  });
})();
