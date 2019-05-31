export const redirect = function() {
    window.location.href = '/' + (new URL(window.location.href).searchParams.get('redirect') || '');
}