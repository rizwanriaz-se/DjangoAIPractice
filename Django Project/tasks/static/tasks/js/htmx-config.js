// HTMX configuration
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
}

function getCsrfToken() {
    return window.csrfToken || getCookie('csrftoken');
}

document.body.addEventListener('htmx:configRequest', (event) => {
    event.detail.headers['X-CSRFToken'] = getCsrfToken();
});

document.body.addEventListener('htmx:afterSwap', () => {
    window.dispatchEvent(new CustomEvent('task-updated'));
});