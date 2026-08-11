var e = globalThis.__ntgds__ || {},
  t = (e.enhancements = new Map());
if (
  ((globalThis.__ntgds__ = e),
  typeof window < `u` &&
    ((window.__ntgds__ = e), window.parent && window.parent !== window))
)
  try {
    window.parent.__ntgds__ = e;
  } catch {}
e.run = async function (e = {}) {
  if (typeof e == `string`) {
    let n = t.get(e);
    typeof n == `function` && (await Promise.resolve().then(() => n()));
    return;
  }
  let { exclude: n, include: r } = e,
    i = [...t.entries()]
      .filter(([e, t]) => {
        let i = typeof t == `function`;
        return (
          i && Array.isArray(n) && !r && (i = !n.includes(e)),
          i && Array.isArray(r) && !n && (i = r.includes(e)),
          i
        );
      })
      .map(([, e]) => Promise.resolve().then(() => e()));
  await Promise.allSettled(i);
};
var n = `<span class="clearable-input">
    <a class="clearable-input__button" role="button" aria-label="clear">
        <span class="sr-only">clear</span>
        <i class="fa-thin fa-xmark" aria-hidden></i>
    </a>
<span>`;
t.set(`clearableInputs`, () => {
  let e = document.querySelectorAll(
      `input[data-clear][placeholder]:not([disabled], [readonly])`,
    ),
    t = document.createElement(`div`);
  t.innerHTML = n;
  let o = t.querySelector(`.clearable-input`);
  (e.forEach((e) => {
    if (!e.closest(`.clearable-input`)) {
      let t = o.cloneNode(!0);
      (s(e),
        e.insertAdjacentElement(`beforebegin`, t),
        t.insertAdjacentElement(`afterbegin`, e),
        [`month`, `week`].includes(e.getAttribute(`type`)) &&
          e.type === `text` &&
          e.setAttribute(`data-type-fallback`, ``));
    }
  }),
    document.removeEventListener(`click`, r),
    document.removeEventListener(`keyup`, i),
    document.removeEventListener(`input`, a),
    document.addEventListener(`click`, r),
    document.addEventListener(`keyup`, i),
    document.addEventListener(`input`, a));
});
function r(e) {
  let t = e.target.closest(
      `input[data-clear]:not([disabled], [readonly]) ~ .clearable-input__button`,
    ),
    n = e.target
      .closest(`.clearable-input`)
      ?.querySelector(`input[data-clear]`);
  !t || !n || (o(n, `and focus`), s(n));
}
function i(e) {
  if (e.key !== `Escape` || !e.target.closest(`.clearable-input`)) return;
  let t = e.target.closest(`input[data-clear]:not([disabled], [readonly])`);
  t && o(t);
}
function a(e) {
  console.log(e);
  let t = e.target.closest(`input[data-clear]:not([disabled], [readonly])`);
  t && s(t);
}
function o(e, t) {
  ((e.value = ``), t && e.focus());
}
function s(e) {
  e.toggleAttribute(`data-has-value`, !!e.value);
}
((function () {
  function e(e) {
    e && window.location.replace(e);
  }
  function t() {
    var e = document.querySelector(`.quick-exit__action[data-quick-exit-url]`);
    return e ? e.getAttribute(`data-quick-exit-url`) : null;
  }
  (window.addEventListener(`popstate`, function () {
    e(t());
  }),
    document.addEventListener(`click`, function (t) {
      var n = t.target.closest(`.quick-exit__action`);
      n && e(n.getAttribute(`data-quick-exit-url`));
    }));
  function n() {
    try {
      window.history.pushState(null, ``, window.location.href);
    } catch {}
  }
  document.readyState === `loading`
    ? document.addEventListener(`DOMContentLoaded`, n)
    : n();
  var r = null,
    i = null,
    a = null,
    o = !1;
  function s() {
    if (r === null) {
      var e = document.body
        ? parseFloat(window.getComputedStyle(document.body).paddingTop)
        : 0;
      r = isNaN(e) ? 0 : e;
    }
    return r;
  }
  function c(e) {
    document.body && (document.body.style.paddingTop = s() + e + `px`);
  }
  function l(e) {
    if (e !== i) {
      if (
        (a && a.disconnect(),
        (i = e),
        c(e.getBoundingClientRect().height),
        typeof ResizeObserver > `u`)
      ) {
        o ||
          ((o = !0),
          window.addEventListener(`resize`, function () {
            i && c(i.getBoundingClientRect().height);
          }));
        return;
      }
      ((a = new ResizeObserver(function (e) {
        e.forEach(function (e) {
          c(e.target.getBoundingClientRect().height);
        });
      })),
        a.observe(e));
    }
  }
  function u() {
    var e = document.querySelector(`.quick-exit`);
    e && l(e);
  }
  (u(),
    typeof MutationObserver < `u` &&
      document.documentElement &&
      new MutationObserver(u).observe(document.documentElement, {
        childList: !0,
        subtree: !0,
      }));
})(),
  (function () {
    function e(e, t) {
      (e.setAttribute(`aria-expanded`, `false`), (t.hidden = !0));
    }
    function t(e, t) {
      (e.setAttribute(`aria-expanded`, `true`), (t.hidden = !1));
    }
    function n(e) {
      var t = e.querySelector(`[data-accordion-toggle-all]`);
      if (t) {
        var n = e.querySelectorAll(`.accordion-item__trigger`);
        t.textContent =
          n.length > 0 &&
          Array.prototype.every.call(n, function (e) {
            return e.getAttribute(`aria-expanded`) === `true`;
          })
            ? `Close all`
            : `Open all`;
      }
    }
    function r(r, i) {
      var a = document.getElementById(i.getAttribute(`aria-controls`));
      a &&
        (i.getAttribute(`aria-expanded`) === `true` ? e(i, a) : t(i, a), n(r));
    }
    function i(r) {
      var i = r.querySelectorAll(`.accordion-item__trigger`),
        a =
          i.length > 0 &&
          Array.prototype.every.call(i, function (e) {
            return e.getAttribute(`aria-expanded`) === `true`;
          });
      (i.forEach(function (n) {
        var r = document.getElementById(n.getAttribute(`aria-controls`));
        r && (a ? e(n, r) : t(n, r));
      }),
        n(r));
    }
    document.addEventListener(`click`, function (e) {
      var t = e.target.closest(`.accordion-item__trigger`);
      if (t) {
        var n = t.closest(`.accordion`);
        n && r(n, t);
        return;
      }
      var a = e.target.closest(`[data-accordion-toggle-all]`);
      if (a) {
        var o = a.closest(`.accordion`);
        o && i(o);
      }
    });
  })(),
  (function () {
    let e = [1, 1.5, 2],
      t = null;
    function n(t, n) {
      let r = Math.max(0, Math.min(e.length - 1, n));
      ((t.dataset.zoomIndex = String(r)),
        t.style.setProperty(`--gallery-zoom`, String(e[r])));
      let i = t.querySelector(`[data-zoom-out]`),
        a = t.querySelector(`[data-zoom-in]`);
      (i && (i.disabled = r === 0), a && (a.disabled = r === e.length - 1));
    }
    function r(e, t) {
      let r = e.querySelectorAll(`.image-gallery-lightbox__slide`),
        i = e.querySelectorAll(`.image-gallery-lightbox__thumbnail-button`),
        a = e.querySelector(`[data-lightbox-current]`);
      (r.forEach((e, n) => {
        e.hidden = n !== t;
      }),
        i.forEach((e, n) => {
          e.classList.toggle(
            `image-gallery-lightbox__thumbnail-button--selected`,
            n === t,
          );
        }),
        a && (a.textContent = String(t + 1)),
        (e.dataset.currentIndex = String(t)),
        n(e, 0));
    }
    function i(e, t) {
      let n = e.querySelectorAll(`.image-gallery-lightbox__slide`).length;
      n !== 0 && r(e, (Number(e.dataset.currentIndex || 0) + t + n) % n);
    }
    function a(e, n, i) {
      ((t = i || null),
        (e.hidden = !1),
        r(e, n),
        (document.body.style.overflow = `hidden`));
      let a = e.querySelector(`.image-gallery-lightbox__close`);
      a && a.focus();
    }
    function o(e) {
      ((e.hidden = !0),
        (document.body.style.overflow = ``),
        t && t.focus(),
        (t = null));
    }
    function s(e) {
      e.setAttribute(`data-gallery-loaded`, ``);
    }
    (document.addEventListener(`click`, function (e) {
      let t = e.target.closest(`.image-gallery__item`);
      if (t) {
        let e = t.closest(`.image-gallery-root`),
          n = e ? e.querySelector(`[data-image-gallery-lightbox]`) : null;
        if (!n) return;
        a(n, Number(t.getAttribute(`data-gallery-index`) || 0), t);
        return;
      }
      let s = e.target.closest(`.image-gallery-lightbox`);
      if (!s) return;
      if (
        e.target === s ||
        e.target.closest(`.image-gallery-lightbox__close`)
      ) {
        o(s);
        return;
      }
      if (e.target.closest(`.image-gallery-lightbox__nav-prev`)) {
        i(s, -1);
        return;
      }
      if (e.target.closest(`.image-gallery-lightbox__nav-next`)) {
        i(s, 1);
        return;
      }
      if (e.target.closest(`.image-gallery-lightbox__zoom-in`)) {
        n(s, Number(s.dataset.zoomIndex || 0) + 1);
        return;
      }
      if (e.target.closest(`.image-gallery-lightbox__zoom-out`)) {
        n(s, Number(s.dataset.zoomIndex || 0) - 1);
        return;
      }
      let c = e.target.closest(`.image-gallery-lightbox__thumbnail-button`);
      c && r(s, Number(c.getAttribute(`data-thumbnail-index`) || 0));
    }),
      document.addEventListener(`keydown`, function (e) {
        let t = document.querySelector(
          `[data-image-gallery-lightbox]:not([hidden])`,
        );
        t &&
          (e.key === `Escape`
            ? o(t)
            : e.key === `ArrowLeft`
              ? i(t, -1)
              : e.key === `ArrowRight` && i(t, 1));
      }),
      document.addEventListener(
        `load`,
        function (e) {
          e.target &&
            e.target.matches &&
            e.target.matches(`.image-gallery__thumb`) &&
            s(e.target);
        },
        !0,
      ),
      document.addEventListener(
        `error`,
        function (e) {
          e.target &&
            e.target.matches &&
            e.target.matches(`.image-gallery__thumb`) &&
            s(e.target);
        },
        !0,
      ),
      document.querySelectorAll(`.image-gallery__thumb`).forEach(function (e) {
        e.complete && e.naturalWidth > 0 && s(e);
      }));
  })());
