(() => {
  "use strict";

  const Q = QUIZ.questions;
  const N = Q.length;
  const app = document.getElementById("app");
  const portsEl = document.getElementById("ports");
  const tallyEl = document.getElementById("tally");

  let results = freshResults();
  let current = 0;
  let view = "start"; // "start" | "quiz" | "results"

  /* ---------- helpers ---------- */
  const PROPS = new Set(["checked", "disabled", "selected", "value", "open"]);

  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null) continue;
      if (PROPS.has(k)) el[k] = v;
      else if (v === false) continue;
      else if (k === "class") el.className = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }

  const tag = (text, kind) => h("span", { class: "tag " + kind }, text);

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function emptyResponse(q) {
    switch (q.type) {
      case "single": return null;
      case "multi": return [];
      case "yesno": return q.rows.map(() => null);
      case "match": return q.pairs.map(() => null);
      case "dropdown": return q.items.map(() => "");
    }
  }

  function freshResults() {
    return Q.map(q => ({ submitted: false, correct: null, response: emptyResponse(q), order: null }));
  }

  function isComplete(q, r) {
    switch (q.type) {
      case "single": return r !== null;
      case "multi": return r.length === q.pick;
      case "yesno": return r.every(v => v !== null);
      case "match": return r.every(v => v !== null);
      case "dropdown": return r.every(v => v !== "");
    }
  }

  function grade(q, r) {
    switch (q.type) {
      case "single": return r === q.answer;
      case "multi": return r.length === q.answer.length && q.answer.every(a => r.includes(a));
      case "yesno": return q.rows.every((row, i) => r[i] === row.answer);
      case "match": return q.pairs.every((p, i) => q.terms[r[i]] === p.answer);
      case "dropdown": return q.items.every((it, i) => r[i] === it.answer);
    }
  }

  function correctLines(q) {
    switch (q.type) {
      case "single": return [q.options[q.answer]];
      case "multi": return q.answer.map(i => q.options[i]);
      case "yesno": return q.rows.map(r => `${r.text}: ${r.answer ? "Yes" : "No"}`);
      case "match": return q.pairs.map(p => `${p.answer}: ${p.definition}`);
      case "dropdown": return q.items.map(it => `${it.label} ${it.answer}`);
    }
  }

  /* ---------- answer areas ---------- */
  function choiceBody(q, res, locked, onChange) {
    const multi = q.type === "multi";
    const rightSet = multi ? q.answer : [q.answer];
    const name = "q" + current;
    const wrap = h("div", { class: "choices", role: multi ? "group" : "radiogroup", "aria-labelledby": "qtitle" });
    const count = multi && !locked ? h("p", { class: "hint" }) : null;
    const updateCount = () => {
      if (count) count.textContent = `Select ${q.pick}. ${res.response.length} selected.`;
    };

    q.options.forEach((opt, i) => {
      const chosen = multi ? res.response.includes(i) : res.response === i;
      const right = rightSet.includes(i);
      const input = h("input", { type: multi ? "checkbox" : "radio", name, checked: chosen, disabled: locked });
      if (!locked) {
        input.addEventListener("change", () => {
          if (multi) {
            res.response = input.checked ? [...res.response, i] : res.response.filter(x => x !== i);
          } else {
            res.response = i;
          }
          updateCount();
          onChange();
        });
      }
      let cls = "choice";
      let status = null;
      if (locked) {
        cls += " locked";
        if (right) {
          cls += " good";
          status = tag(chosen ? "Correct. You chose this." : "Correct answer. You did not choose this.", "good");
        } else if (chosen) {
          cls += " bad";
          status = tag("Incorrect. You chose this.", "bad");
        } else {
          status = tag("Incorrect option.", "muted");
        }
      }
      wrap.append(h("label", { class: cls }, input, h("span", { class: "opt" }, opt, status)));
    });
    updateCount();
    return h("div", null, wrap, count);
  }

  function yesnoBody(q, res, locked, onChange) {
    const table = h("table", { class: "yn" });
    table.append(
      h("thead", null, h("tr", null,
        h("th", { scope: "col" }, "Statement"),
        h("th", { scope: "col" }, "Yes"),
        h("th", { scope: "col" }, "No")))
    );
    const tbody = h("tbody");
    q.rows.forEach((row, i) => {
      const val = res.response[i];
      const ok = val === row.answer;
      const word = b => (b ? "Yes" : "No");
      const cells = [true, false].map(v => {
        const input = h("input", {
          type: "radio", name: `q${current}r${i}`, checked: val === v, disabled: locked,
          "aria-label": `${row.text}: ${word(v)}`
        });
        if (!locked) input.addEventListener("change", () => { res.response[i] = v; onChange(); });
        let cls = "";
        if (locked) {
          if (v === row.answer) cls = "good-cell";
          else if (val === v) cls = "bad-cell";
        }
        return h("td", { class: cls }, input);
      });
      const status = locked
        ? tag(ok
            ? `Correct. The answer is ${word(row.answer)}.`
            : `Incorrect. You answered ${word(val)}. The correct answer is ${word(row.answer)}.`,
            ok ? "good" : "bad")
        : null;
      tbody.append(h("tr", null, h("th", { scope: "row" }, row.text, status), ...cells));
    });
    table.append(tbody);
    return table;
  }

  function dropdownBody(q, res, locked, onChange) {
    const wrap = h("div", { class: "dd" });
    q.items.forEach((it, i) => {
      const id = `dd${current}_${i}`;
      const sel = h("select", { id, disabled: locked },
        h("option", { value: "" }, "Choose one…"),
        ...it.options.map(o => h("option", { value: o }, o)));
      sel.value = res.response[i];
      let status = null;
      if (locked) {
        const ok = res.response[i] === it.answer;
        sel.classList.add(ok ? "good" : "bad");
        status = ok
          ? tag(`Correct. You chose ${it.answer}.`, "good")
          : tag(`Incorrect. You chose ${res.response[i] || "nothing"}. The correct answer is ${it.answer}.`, "bad");
      } else {
        sel.addEventListener("change", () => { res.response[i] = sel.value; onChange(); });
      }
      wrap.append(h("div", { class: "dd-row" }, h("label", { for: id }, it.label), sel, status));
    });
    return wrap;
  }

  function matchBody(q, res, locked, onChange) {
    if (!res.order) res.order = shuffle(q.terms.map((_, i) => i));
    let selected = null;
    const wrap = h("div", { class: "match" });

    function place(term, slot) {
      const prev = res.response.indexOf(term);
      if (prev > -1) res.response[prev] = null;
      res.response[slot] = term; // any displaced term returns to the bank
      selected = null;
      draw("slot-" + slot);
      onChange();
    }
    function unplace(slot) {
      res.response[slot] = null;
      selected = null;
      draw("slot-" + slot);
      onChange();
    }

    function draw(focusKey) {
      wrap.replaceChildren();

      if (!locked) {
        wrap.append(h("p", { class: "hint", style: "margin:0 0 10px" },
          "Drag a term onto its definition, or select a term and then select a definition."));
        const bank = h("div", { class: "bank", "aria-label": "Terms" });
        const placed = new Set(res.response.filter(v => v != null));
        res.order.filter(t => !placed.has(t)).forEach(t => {
          bank.append(h("button", {
            type: "button",
            class: "chip" + (selected === t ? " selected" : ""),
            draggable: "true",
            "data-key": "chip-" + t,
            "aria-pressed": String(selected === t),
            onclick: () => { selected = selected === t ? null : t; draw("chip-" + t); },
            ondragstart: e => { e.dataTransfer.setData("text/plain", String(t)); e.dataTransfer.effectAllowed = "move"; }
          }, q.terms[t]));
        });
        if (!bank.children.length) bank.append(h("span", { class: "bank-empty" }, "All terms are placed."));
        bank.addEventListener("dragover", e => e.preventDefault());
        bank.addEventListener("drop", e => {
          e.preventDefault();
          const t = Number(e.dataTransfer.getData("text/plain"));
          const s = res.response.indexOf(t);
          if (s > -1) unplace(s);
        });
        wrap.append(bank);
      }

      q.pairs.forEach((p, i) => {
        const t = res.response[i];
        let cls = "slot" + (t == null ? " empty" : "");
        let status = null;
        if (locked) {
          const ok = t != null && q.terms[t] === p.answer;
          cls += ok ? " good" : " bad";
          status = ok
            ? tag("Correct.", "good")
            : tag(`Incorrect. You chose ${t != null ? q.terms[t] : "nothing"}. The correct answer is ${p.answer}.`, "bad");
        }
        const slot = h("button", {
          type: "button", class: cls, disabled: locked, "data-key": "slot-" + i,
          "aria-label": `Definition ${i + 1} answer: ${t != null ? q.terms[t] : "empty"}`,
          onclick: () => {
            if (selected != null) place(selected, i);
            else if (t != null) unplace(i);
          }
        }, t != null ? q.terms[t] : locked ? "No answer" : "Drop term here");
        if (!locked) {
          slot.addEventListener("dragover", e => { e.preventDefault(); slot.classList.add("dragover"); });
          slot.addEventListener("dragleave", () => slot.classList.remove("dragover"));
          slot.addEventListener("drop", e => {
            e.preventDefault();
            slot.classList.remove("dragover");
            const term = Number(e.dataTransfer.getData("text/plain"));
            if (!Number.isNaN(term)) place(term, i);
          });
        }
        wrap.append(h("div", { class: "pair" }, slot, h("div", { class: "def" }, p.definition, status)));
      });

      if (focusKey) {
        const el = wrap.querySelector(`[data-key="${focusKey}"]`);
        if (el) el.focus();
      }
    }

    draw();
    return wrap;
  }

  const BODY = {
    single: choiceBody,
    multi: choiceBody,
    yesno: yesnoBody,
    match: matchBody,
    dropdown: dropdownBody
  };

  /* ---------- screens ---------- */
  function startCard() {
    return h("section", { class: "card start", "aria-labelledby": "stitle" },
      h("h2", { class: "prompt", id: "stitle", tabindex: "-1" }, `${N} questions on Cisco CCST networking`),
      h("p", null, "Answer each question, then select Check answer. You will see whether you were right, the correct answer, and an explanation of every choice."),
      h("p", null, "Read the explanation even when you get it right. When you finish, you can print study notes for all questions."),
      h("div", { class: "btn-row" },
        h("button", { type: "button", class: "btn primary", onclick: startQuiz }, "Start quiz")));
  }

  function questionCard() {
    const q = Q[current];
    const res = results[current];
    const locked = res.submitted;

    const card = h("section", { class: "card", "aria-labelledby": "qtitle" });
    card.append(h("p", { class: "qcount" }, `Question ${current + 1} of ${N}`));
    card.append(h("h2", { class: "prompt", id: "qtitle", tabindex: "-1" }, q.prompt));
    if (q.code) card.append(h("pre", { class: "output" }, h("code", null, q.code)));

    const check = h("button", { type: "button", class: "btn primary", onclick: submit }, "Check answer");
    check.disabled = !isComplete(q, res.response);
    const onChange = () => { check.disabled = !isComplete(q, res.response); };

    card.append(BODY[q.type](q, res, locked, onChange));

    if (locked) {
      card.append(
        h("div", { class: "feedback " + (res.correct ? "good" : "bad"), id: "feedback", tabindex: "-1", role: "status" },
          res.correct
            ? "Correct. Every part of your answer was right."
            : "Not quite. The correct answers are marked above. Read the explanation below and take notes."),
        h("div", { class: "explain" },
          h("h3", null, "Explanation"),
          ...q.explanation.map(t => h("p", null, t)))
      );
    }

    const last = current === N - 1;
    const prev = h("button", { type: "button", class: "btn secondary", disabled: current === 0, onclick: () => go(current - 1) }, "Previous");
    const main = locked
      ? h("button", { type: "button", class: "btn primary", onclick: () => (last ? showResults() : go(current + 1)) },
          last ? "See results" : "Next question")
      : check;
    card.append(h("div", { class: "nav" }, prev, main));
    return card;
  }

  function resultsCards() {
    const score = results.filter(r => r.correct).length;
    const pct = Math.round((score / N) * 100);
    const missed = results.map((r, i) => (r.correct ? null : i)).filter(i => i !== null);

    const card = h("section", { class: "card no-print", "aria-labelledby": "rtitle" },
      h("h2", { class: "qcount", id: "rtitle", tabindex: "-1" }, "Quiz 3 results"),
      h("p", { class: "score" }, `${score} of ${N} correct`),
      h("p", { class: "muted", style: "margin:0" }, `${pct}%`));

    if (missed.length) {
      card.append(
        h("p", { style: "margin:20px 0 0" }, "Questions to review:"),
        h("div", { class: "missed" },
          missed.map(i => h("button", { type: "button", class: "chip", onclick: () => go(i) }, `Question ${i + 1}`))));
    } else {
      card.append(h("p", { style: "margin:20px 0 0" }, "You answered every question correctly."));
    }

    card.append(h("div", { class: "btn-row" },
      h("button", { type: "button", class: "btn secondary", onclick: () => go(0) }, "Review from question 1"),
      h("button", { type: "button", class: "btn secondary", onclick: printNotes }, "Print study notes"),
      h("button", { type: "button", class: "btn primary", onclick: startQuiz }, "Retake quiz")));

    const notes = h("details", { class: "notes", id: "notes" },
      h("summary", null, "Study notes for all questions"));
    const body = h("div", { class: "notes-body" });
    Q.forEach((q, i) => {
      const r = results[i];
      body.append(h("article", { class: "note" },
        h("h3", null, `Question ${i + 1}`, r.correct ? "" : h("span", { class: "flag" }, " (missed)")),
        h("p", { class: "q" }, q.prompt),
        q.code ? h("pre", { class: "output" }, h("code", null, q.code)) : null,
        h("p", { class: "label" }, "Correct answer"),
        h("ul", null, correctLines(q).map(l => h("li", null, l))),
        h("p", { class: "label" }, "Why"),
        q.explanation.map(t => h("p", { class: "why" }, t))));
    });
    notes.append(body);
    return [card, notes];
  }

  /* ---------- navigation ---------- */
  function renderPorts() {
    portsEl.replaceChildren();
    const next = results.findIndex(r => !r.submitted);
    results.forEach((r, i) => {
      const isCurrent = view === "quiz" && i === current;
      let cls = "port";
      let state = "not answered";
      if (r.submitted) {
        cls += r.correct ? " good" : " bad";
        state = r.correct ? "correct" : "missed";
      }
      if (isCurrent) cls += " current";
      const enabled = view !== "start" && (r.submitted || i === next);
      portsEl.append(h("button", {
        type: "button", class: cls, disabled: !enabled,
        "aria-label": `Question ${i + 1}, ${state}${isCurrent ? ", current" : ""}`,
        "aria-current": isCurrent ? "step" : null,
        onclick: () => go(i)
      }, String(i + 1)));
    });
    const answered = results.filter(r => r.submitted).length;
    const right = results.filter(r => r.correct).length;
    tallyEl.textContent = `${answered} of ${N} answered, ${right} correct`;
  }

  function render(focusSel) {
    renderPorts();
    app.replaceChildren();
    if (view === "start") app.append(startCard());
    else if (view === "results") app.append(...resultsCards());
    else app.append(questionCard());
    if (focusSel) {
      const el = app.querySelector(focusSel);
      if (el) el.focus();
    }
  }

  function startQuiz() {
    results = freshResults();
    current = 0;
    view = "quiz";
    render("#qtitle");
    window.scrollTo({ top: 0 });
  }

  function go(i) {
    current = i;
    view = "quiz";
    render("#qtitle");
  }

  function submit() {
    const r = results[current];
    if (!isComplete(Q[current], r.response)) return;
    r.submitted = true;
    r.correct = grade(Q[current], r.response);
    render("#feedback");
  }

  function showResults() {
    view = "results";
    render("#rtitle");
    window.scrollTo({ top: 0 });
  }

  function printNotes() {
    const notes = document.getElementById("notes");
    if (notes) notes.open = true;
    window.print();
  }

  render();
})();
