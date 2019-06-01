export const redirect = function(url) {
    window.location.href = '/' + (url || new URL(window.location.href).searchParams.get('redirect') || '');
}