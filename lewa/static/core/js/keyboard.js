/*
# SPDX-FileCopyrightText: 2025 Brady Fomegne and contributors
#
# SPDX-License-Identifier: MPL-2.0

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

(async function () {
  'use strict';

  const LAYOUT_URL = 'static/core/layout/qwerty-latin.json';
  const INPUT_ID = 'user-input';
  const PLACEHOLDER_SELECTOR = '.keyboard-placeholder';

  const input = document.getElementById(INPUT_ID);
  const placeholder = document.querySelector(PLACEHOLDER_SELECTOR);
  if (!input || !placeholder) {
    console.warn('Virtual keyboard: required DOM elements not found.');
    return;
  }

  // Fetch layout JSON (graceful fallback)
  async function loadJson(url) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('Fetch failed: ' + res.status);
      return await res.json();
    } catch (err) {
      console.warn('Virtual keyboard: could not load layout JSON, using embedded fallback.', err);
      return null;
    }
  }

  // Embedded fallback (minimal canonical structure)
  const fallback = {
    meta: { name: 'Fallback QWERTY' },
    policy: { shift: { mode: 'one-time', cancelOnSecondClick: true }, caps: { mode: 'toggle', affects: 'letters' } },
    layout: [
      [ { "id": "`", "forms": { "default": "`", "shift": "~", "caps": "`", "shiftCaps": "~" } },
        { "id": "1", "forms": { "default": "1", "shift": "!", "caps": "1", "shiftCaps": "!" } },
        { "id": "2", "forms": { "default": "2", "shift": "@", "caps": "2", "shiftCaps": "@" } } /* truncated for brevity */ ],
      [ { "id": "q", "forms": { "default": "q", "shift": "Q", "caps": "Q", "shiftCaps": "q" } } /* truncated */ ]
    ],
    combining: {}
  };

  const external = await loadJson(LAYOUT_URL);
  const cfg = external || fallback;

  // Build a quick lookup from id -> forms for fast access
  const keyForms = new Map();
  (cfg.layout || []).forEach(row => {
    row.forEach(item => {
      if (!item || !item.id || !item.forms) return;
      keyForms.set(String(item.id), item.forms);
    });
  });

  const policy = cfg.policy || { shift: { mode: 'one-time', cancelOnSecondClick: true }, caps: { mode: 'toggle', affects: 'letters' } };

  // Build keyboard DOM from cfg
  function buildKeyboardDom(cfg) {
    const kb = document.createElement('div');
    kb.className = 'virtual-keyboard';
    kb.setAttribute('role', 'application');
    kb.setAttribute('aria-label', cfg.meta?.name || 'On-screen keyboard');

    (cfg.layout || []).forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'vk-row';
      row.forEach(item => {
        // item must be an object with id and forms per the JSON spec
        if (!item || !item.id) return;
        const id = String(item.id);
        const forms = item.forms || {};
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'vk-key';
        btn.setAttribute('data-key', id);
        // initial visible label: prefer explicit default form if present
        btn.textContent = (forms.default !== undefined) ? String(forms.default) : id;
        btn.setAttribute('aria-label', btn.textContent);
        if (id === 'Space') btn.classList.add('space');
        if (['Backspace','Shift','Caps','Enter','Diacritics'].includes(id)) btn.classList.add('wide');
        rowEl.appendChild(btn);
      });
      kb.appendChild(rowEl);
    });

    // small note
    const note = document.createElement('div');
    note.className = 'vk-note';
    note.textContent = cfg.meta?.description || 'Virtual keyboard';
    kb.appendChild(note);

    return kb;
  }

  const keyboard = buildKeyboardDom(cfg);
  placeholder.innerHTML = '';
  placeholder.appendChild(keyboard);

  // State: virtual and physical modifiers
  let virtualShift = false;
  let virtualShiftOneTime = false; // if true, clear after next character
  let physicalShift = false; // true while user holds physical Shift
  let caps = false; // CapsLock state (virtual toggles or physical CapsLock)

  // Helper to compute effective key form name
  function formKeyName(effShift, capsState) {
    if (effShift && capsState) return 'shiftCaps';
    if (effShift) return 'shift';
    if (capsState) return 'caps';
    return 'default';
  }

  // Determine whether caps should affect keys per policy
  function capsAppliesToKey(keyId) {
    const affects = policy.caps?.affects || 'letters';
    if (affects === 'all') return true;
    if (affects === 'letters') return /^[a-zA-Z]$/.test(keyId);
    return false;
  }

  // Refresh visible labels on the keyboard according to forms and modifier state
  function refreshKeyLabels() {
    const effShift = physicalShift || virtualShift;
    keyboard.querySelectorAll('.vk-key').forEach(btn => {
      const id = btn.getAttribute('data-key');
      const forms = keyForms.get(id) || {};
      const capsApplies = caps && capsAppliesToKey(id);
      const formName = formKeyName(effShift, capsApplies);
      if (forms && forms.hasOwnProperty(formName)) {
        btn.textContent = String(forms[formName]);
      } else if (forms && forms.default !== undefined) {
        btn.textContent = String(forms.default);
      } else {
        // fallback: show id
        btn.textContent = id;
      }
      btn.setAttribute('aria-label', btn.textContent);
    });

    // visual state for Shift/Caps keys
    const shiftBtn = keyboard.querySelector('[data-key="Shift"]');
    if (shiftBtn) shiftBtn.classList.toggle('vk-active', physicalShift || virtualShift);
    const capsBtn = keyboard.querySelector('[data-key="Caps"]');
    if (capsBtn) capsBtn.classList.toggle('vk-active', caps);
  }

  // Insert text preserving caret/selection
  function insertAtSelection(el, text) {
    el.focus();
    if (typeof el.setRangeText === 'function') {
      const s = el.selectionStart;
      const e = el.selectionEnd;
      el.setRangeText(text, s, e, 'end');
      const caret = s + Array.from(text).length;
      el.setSelectionRange(caret, caret);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    const v = el.value;
    const s = el.selectionStart ?? v.length;
    const e = el.selectionEnd ?? v.length;
    el.value = v.slice(0, s) + text + v.slice(e);
    const pos = s + Array.from(text).length;
    el.setSelectionRange(pos, pos);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // Reset virtual one-time shift if appropriate
  function resetVirtualShiftIfOneTime() {
    if (virtualShiftOneTime && policy.shift?.mode === 'one-time') {
      virtualShift = false;
      virtualShiftOneTime = false;
      refreshKeyLabels();
    }
  }

  // Main key handler: canonical id passed in
  function handleKey(id) {
    // Special handling: Shift
    if (id === 'Shift') {
      // Toggle virtual shift. If currently active, clicking again cancels it (per your requirement).
      if (!virtualShift) {
        virtualShift = true;
        virtualShiftOneTime = (policy.shift?.mode === 'one-time');
      } else {
        // second click cancels
        virtualShift = false;
        virtualShiftOneTime = false;
      }
      refreshKeyLabels();
      return;
    }

    // Caps
    if (id === 'Caps') {
      if (policy.caps?.mode === 'toggle') {
        caps = !caps;
        refreshKeyLabels();
      }
      return;
    }

    // Backspace
    if (id === 'Backspace') {
      const s = input.selectionStart;
      const e = input.selectionEnd;
      if (s !== e) {
        input.setSelectionRange(s, e);
        insertAtSelection(input, '');
      } else if (s > 0) {
        const before = input.value.slice(0, s);
        const after = input.value.slice(e);
        const arr = Array.from(before);
        arr.pop();
        input.value = arr.join('') + after;
        const pos = arr.length;
        input.setSelectionRange(pos, pos);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
      return;
    }

    // Space / Enter
    if (id === 'Space') {
      insertAtSelection(input, ' ');
      resetVirtualShiftIfOneTime();
      return;
    }
    if (id === 'Enter') {
      insertAtSelection(input, '\n');
      resetVirtualShiftIfOneTime();
      return;
    }

    // Normal key insertion: resolve form for current effective modifiers
    const effShift = physicalShift || virtualShift;
    const capsApplies = caps && capsAppliesToKey(id);
    const formName = formKeyName(effShift, capsApplies);
    const forms = keyForms.get(id) || {};
    let out;
    if (forms && forms.hasOwnProperty(formName)) out = String(forms[formName]);
    else if (forms && forms.default !== undefined) out = String(forms.default);
    else out = id;

    // If there is a pending combining mark stored on keyboard._dead, compose
    if (keyboard._dead) {
      out = (out + keyboard._dead).normalize('NFC');
      keyboard._dead = null;
      keyboard.querySelectorAll('.vk-key').forEach(n => n.classList.remove('vk-active-dead'));
    }

    insertAtSelection(input, out);

    // Reset one-time virtual shift after a character as needed
    resetVirtualShiftIfOneTime();
  }

  // Wire UI events (click & touch)
  keyboard.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.vk-key');
    if (!btn) return;
    const id = btn.getAttribute('data-key');
    handleKey(id);
  });

  keyboard.addEventListener('touchstart', (ev) => {
    const btn = ev.target.closest('.vk-key');
    if (!btn) return;
    btn.classList.add('vk-active');
    ev.preventDefault();
  }, { passive: false });

  keyboard.addEventListener('touchend', (ev) => {
    const btn = ev.target.closest('.vk-key');
    if (btn) btn.classList.remove('vk-active');
  });

  // Physical keyboard parity: track physical Shift / CapsLock
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Shift') {
      physicalShift = true;
      refreshKeyLabels();
    }
    if (ev.key === 'CapsLock') {
      caps = !caps;
      refreshKeyLabels();
    }

    // typing a character on physical keyboard should clear any pending keyboard._dead
    if (!ev.ctrlKey && !ev.metaKey && !ev.altKey && ev.key.length === 1 && keyboard._dead) {
      keyboard._dead = null;
      keyboard.querySelectorAll('.vk-key').forEach(n => n.classList.remove('vk-active-dead'));
    }
  });

  input.addEventListener('keyup', (ev) => {
    if (ev.key === 'Shift') {
      physicalShift = false;
      refreshKeyLabels();
    }
  });

  // Make keys focusable
  keyboard.querySelectorAll('.vk-key').forEach(b => b.tabIndex = 0);

  // Initial label refresh
  refreshKeyLabels();

  // Expose a small API for debugging or tests
  window.explicitFormsKeyboard = {
    element: keyboard,
    getState: () => ({ virtualShift, virtualShiftOneTime, physicalShift, caps, policy }),
    setVirtualShift: (v, oneTime=false) => { virtualShift = !!v; virtualShiftOneTime = !!oneTime; refreshKeyLabels(); }
  };

})();
