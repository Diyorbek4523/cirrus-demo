// Nimbus live demo: apply the visitor's demo choices before the page paints.
(function () {
    var d = { scheme: 'dark', preset: 'nebula', bg: 'glow', radius: 'rounded', font: 'inter' };
    var s = {};
    try { s = JSON.parse(localStorage.getItem('nimbus-demo') || '{}') || {}; } catch (e) { s = {}; }
    var q = new URLSearchParams(location.search);
    ['scheme', 'preset', 'bg', 'radius', 'font'].forEach(function (k) { if (q.get(k)) s[k] = q.get(k); });
    var h = document.documentElement, v = function (k) { return s[k] || d[k]; };
    h.classList.remove('dark', 'light');
    h.classList.add(v('scheme') === 'light' ? 'light' : 'dark');
    h.style.colorScheme = v('scheme') === 'light' ? 'light' : 'dark';
    h.setAttribute('data-nimbus-preset', v('preset'));
    h.setAttribute('data-nimbus-bg', v('bg'));
    h.setAttribute('data-nimbus-radius', v('radius'));
    h.setAttribute('data-nimbus-font', v('font'));
    h.setAttribute('data-nimbus-density', 'comfortable');
    h.setAttribute('data-nimbus-glass', 'true');
    h.setAttribute('data-nimbus-footer', 'custom');
    var layout = (location.pathname.match(/\/(sidebar|rail|topbar)\//) || [])[1];
    if (layout) h.setAttribute('data-nimbus-layout', layout);
})();
