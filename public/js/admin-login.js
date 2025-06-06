document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('admin-login-form');
    const messageEl = document.getElementById('login-message');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const identifier = formData.get('identifier');
        const password = formData.get('password');

        try {
            const res = await fetch('/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ identifier, password })
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = '/admin';
            } else {
                messageEl.textContent = data.message || 'Đăng nhập thất bại';
            }
        } catch (error) {
            console.error('Login error:', error);
            messageEl.textContent = 'Lỗi kết nối đến máy chủ';
        }
    });
});
