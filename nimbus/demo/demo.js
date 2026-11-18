// Nimbus live demo toolbar. Static pages with sample data: switches look, layout and pages only.
(function () {
    var BUY = 'https://builtbybit.com/resources/websites/pterodactyl-v2/themes/';
    var KEY = 'nimbus-demo';
    var h = document.documentElement;
    var load = function () { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } };
    var save = function (s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* private window */ } };
    var state = load();
    var q = new URLSearchParams(location.search);
    ['scheme', 'preset', 'bg', 'radius'].forEach(function (k) { if (q.get(k)) state[k] = q.get(k); });
    if (state.collapsed === undefined && window.matchMedia('(max-width: 760px)').matches) state.collapsed = true;

    var path = location.pathname;
    var m = path.match(/\/(sidebar|rail|topbar|login)\/([a-z-]+)\.html$/);
    var area = m ? m[1] : 'sidebar';
    var file = m ? m[2] : 'dashboard';
    var go = function (dir, name) { location.href = '../' + dir + '/' + name + '.html'; };

    var opt = function (list, cur) {
        return list.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === cur ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('');
    };
    var cur = function (k, d) { return state[k] || d; };
    var layout = area === 'login' ? cur('layout', 'sidebar') : area;

    var bar = document.createElement('div');
    bar.className = 'nd-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Demo settings');
    bar.innerHTML =
        '<button type="button" class="nd-toggle" aria-expanded="true">Nimbus demo</button>' +
        '<div class="nd-body">' +
        '<label>Colours<select data-k="preset">' + opt([['nebula', 'Nebula'], ['ocean', 'Ocean'], ['emerald', 'Emerald'], ['ember', 'Ember'], ['crimson', 'Crimson'], ['gold', 'Gold'], ['mono', 'Mono']], cur('preset', 'nebula')) + '</select></label>' +
        '<label>Mode<select data-k="scheme">' + opt([['dark', 'Dark'], ['light', 'Light']], cur('scheme', 'dark')) + '</select></label>' +
        '<label>Menu<select data-k="layout">' + opt([['sidebar', 'Sidebar'], ['rail', 'Icon rail'], ['topbar', 'Top bar']], layout) + '</select></label>' +
        '<label>Servers<select data-k="list">' + opt([['grid', 'Cards'], ['rows', 'Rows']], file === 'dashboard-rows' ? 'rows' : 'grid') + '</select></label>' +
        '<label>Background<select data-k="bg">' + opt([['glow', 'Glow'], ['grid', 'Grid'], ['dots', 'Dots'], ['none', 'Plain']], cur('bg', 'glow')) + '</select></label>' +
        '<label>Corners<select data-k="radius">' + opt([['sharp', 'Sharp'], ['rounded', 'Rounded'], ['round', 'Extra round']], cur('radius', 'rounded')) + '</select></label>' +
        '<label>Sign-in<select data-k="login">' + opt([['', 'Pick a template…'], ['split', 'Split'], ['centered', 'Centered'], ['image', 'Full picture'], ['minimal', 'Minimal']], area === 'login' ? file : '') + '</select></label>' +
        '<a class="nd-buy" href="' + BUY + '" target="_blank" rel="noopener">Get Nimbus</a>' +
        '</div>';
    document.body.appendChild(bar);

    var apply = function () {
        h.classList.remove('dark', 'light');
        h.classList.add(cur('scheme', 'dark'));
        h.style.colorScheme = cur('scheme', 'dark');
        h.setAttribute('data-nimbus-preset', cur('preset', 'nebula'));
        h.setAttribute('data-nimbus-bg', cur('bg', 'glow'));
        h.setAttribute('data-nimbus-radius', cur('radius', 'rounded'));
    };

    bar.addEventListener('change', function (e) {
        var k = e.target.getAttribute('data-k'), v = e.target.value;
        if (k === 'layout') {
            state.layout = v; save(state);
            return go(v, area === 'login' || file === 'dashboard-rows' ? 'dashboard' : file);
        }
        if (k === 'list') return go(layout, v === 'rows' ? 'dashboard-rows' : 'dashboard');
        if (k === 'login') return v ? go('login', v) : null;
        state[k] = v; save(state); apply();
    });

    var toggle = bar.querySelector('.nd-toggle');
    if (state.collapsed) bar.classList.add('nd-collapsed');
    toggle.setAttribute('aria-expanded', state.collapsed ? 'false' : 'true');
    toggle.addEventListener('click', function () {
        state.collapsed = !bar.classList.toggle('nd-collapsed') ? false : true;
        toggle.setAttribute('aria-expanded', state.collapsed ? 'false' : 'true');
        save(state);
    });

    // A few things React does in the real panel.
    var toast;
    var say = function (text) {
        if (!toast) { toast = document.createElement('div'); toast.className = 'nd-toast'; toast.setAttribute('role', 'status'); document.body.appendChild(toast); }
        toast.textContent = text; toast.classList.add('nd-show');
        clearTimeout(say.t); say.t = setTimeout(function () { toast.classList.remove('nd-show'); }, 2200);
    };
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a,button');
        if (!a || bar.contains(a)) return;
        if (a.matches('[aria-label="Hide announcement"]')) {
            var box = a.closest('[role="status"],[role="alert"]'); if (box) box.remove(); return;
        }
        if (a.matches('[aria-controls="nimbus-sidebar"]')) {
            var side = document.getElementById('nimbus-sidebar');
            if (side) { side.classList.toggle('hidden'); side.classList.toggle('flex'); }
            return;
        }
        if (a.matches('[aria-label^="Use the"]')) {
            state.scheme = cur('scheme', 'dark') === 'dark' ? 'light' : 'dark'; save(state); apply();
            bar.querySelector('[data-k="scheme"]').value = state.scheme; return;
        }
        if (a.tagName === 'A' && a.getAttribute('data-demo-off')) { e.preventDefault(); say('Not part of this demo — the full panel has it.'); return; }
        if (a.tagName === 'A' && /^https?:/.test(a.getAttribute('href') || '') && !a.classList.contains('nd-buy')) { e.preventDefault(); say('Opens your own link in the real panel.'); return; }
        if (a.tagName === 'BUTTON' && !a.closest('form')) { say('Sample data — buttons are live in your real panel.'); }
    }, true);
    document.addEventListener('submit', function (e) { e.preventDefault(); say('Sample data — nothing is sent in the demo.'); }, true);
})();
