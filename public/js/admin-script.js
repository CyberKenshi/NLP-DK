document.addEventListener('DOMContentLoaded', function () {
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    // === Personnel ===
    const personnelTableBody = document.getElementById('personnel-table-body');
    if (personnelTableBody) {
        fetch('/users/api/v1/personnel', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.data) {
                    personnelTableBody.innerHTML = '';
                    data.data.forEach(person => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td><img src="${person.avatar || '/img/default-avatar.png'}" alt="${person.fullName}" class="avatar"></td>
                            <td>${person.fullName}</td>
                            <td>${person.roleInLab?.vi || 'N/A'}</td>
                            <td class="action-buttons">
                                <a href="#" class="edit-btn" data-id="${person.id}">Sửa</a>
                                <a href="#" class="delete-btn" data-id="${person.id}">Xóa</a>
                            </td>
                        `;
                        personnelTableBody.appendChild(row);
                    });

                    personnelTableBody.querySelectorAll('.edit-btn').forEach(button => {
                        button.addEventListener('click', function (e) {
                            e.preventDefault();
                            const id = this.getAttribute('data-id');
                            if (id) window.location.href = `/admin/edit-personnel/${id}`;
                            else alert('Không tìm thấy ID nhân sự');
                        });
                    });

                    personnelTableBody.querySelectorAll('.delete-btn').forEach(button => {
                        button.addEventListener('click', function (e) {
                            e.preventDefault();
                            const id = this.getAttribute('data-id');
                            if (confirm('Bạn có chắc chắn muốn xoá nhân sự này?')) {
                                fetch(`/admin/user/delete/${id}`, {
                                    method: 'POST'
                                }).then(res => {
                                    if (res.ok) location.reload();
                                    else res.json().then(errorData => {
                                        alert(errorData.error || 'Đã xảy ra lỗi khi xoá.');
                                    }).catch(() => {
                                        alert('Không thể phân tích lỗi từ server.');
                                    });
                                }).catch(err => {
                                    alert('Không thể kết nối tới server: ' + err.message);
                                });
                            }
                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching personnel data:', error);
                personnelTableBody.innerHTML = '<tr><td colspan="4">Không thể tải dữ liệu nhân sự.</td></tr>';
            });
    }

    // === Interns ===
    const internsTableBody = document.getElementById('interns-table-body');
    if (internsTableBody) {
        fetch('/users/api/v1/intern', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.data) {
                    internsTableBody.innerHTML = '';
                    data.data.forEach(intern => {
                        const avatarUrl = intern.avatar || '/img/default-avatar.png';
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td><img src="${avatarUrl}" alt="${intern.fullName}" class="avatar"></td>
                            <td>${intern.fullName}</td>
                            <td>${intern.major || 'Không xác định'}</td>
                            <td class="action-buttons">
                                <a href="#" class="edit-btn" data-id="${intern.id}">Sửa</a>
                                <a href="#" class="delete-btn" data-id="${intern.id}">Xóa</a>
                            </td>
                        `;
                        internsTableBody.appendChild(row);
                    });

                    internsTableBody.querySelectorAll('.edit-btn').forEach(button => {
                        button.addEventListener('click', function (e) {
                            e.preventDefault();
                            const id = this.getAttribute('data-id');
                            if (id) window.location.href = `/admin/edit-intern/${id}`;
                            else alert('Không tìm thấy ID thực tập sinh');
                        });
                    });

                    internsTableBody.querySelectorAll('.delete-btn').forEach(button => {
                        button.addEventListener('click', function (e) {
                            e.preventDefault();
                            const id = this.getAttribute('data-id');
                            if (confirm('Bạn có chắc chắn muốn xoá thực tập sinh này?')) {
                                fetch(`/admin/user/delete/${id}`, {
                                    method: 'POST'
                                }).then(res => {
                                    if (res.ok) location.reload();
                                    else alert('Không thể xoá thực tập sinh.');
                                });
                            }
                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching interns data:', error);
                internsTableBody.innerHTML = '<tr><td colspan="4">Không thể tải dữ liệu thực tập sinh.</td></tr>';
            });
    }

    // === News ===
    const newsTableBody = document.getElementById('news-table-body');
    if (newsTableBody) {
        fetch('/news/api/v1/news', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.data) {
                    newsTableBody.innerHTML = '';
                    data.data.forEach(news => {
                        const formattedDate = formatDate(news.createdAt);
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${news._id}</td>
                            <td>${news.title}</td>
                            <td>${formattedDate}</td>
                            <td class="action-buttons">
                                <a href="#" class="edit-btn" data-id="${news._id}">Sửa</a>
                                <a href="#" class="delete-btn" data-id="${news._id}">Xóa</a>
                            </td>
                        `;
                        newsTableBody.appendChild(row);
                    });

                    newsTableBody.querySelectorAll('.edit-btn').forEach(button => {
                        button.addEventListener('click', function (e) {
                            e.preventDefault();
                            const id = this.getAttribute('data-id');
                            if (id) window.location.href = `/admin/edit-news/${id}`;
                            else alert('Không tìm thấy ID tin tức');
                        });
                    });

                    newsTableBody.querySelectorAll('.delete-btn').forEach(button => {
                        button.addEventListener('click', function (e) {
                            e.preventDefault();
                            const id = this.getAttribute('data-id');
                            if (confirm('Bạn có chắc chắn muốn xoá tin tức này?')) {
                                fetch(`/admin/news/delete/${id}`, {
                                    method: 'POST'
                                }).then(res => {
                                    if (res.ok) location.reload();
                                    else alert('Không thể xoá tin tức.');
                                });
                            }
                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching news data:', error);
                newsTableBody.innerHTML = '<tr><td colspan="4">Không thể tải dữ liệu tin tức.</td></tr>';
            });
    }

    // === Add button events ===
    const addPersonnelBtn = document.getElementById('add-personnel-btn');
    if (addPersonnelBtn) {
        addPersonnelBtn.addEventListener('click', function () {
            window.location.href = '/admin/addPersonnel';
        });
    }

    const addInternBtn = document.getElementById('add-intern-btn');
    if (addInternBtn) {
        addInternBtn.addEventListener('click', function () {
            window.location.href = '/admin/addIntern';
        });
    }

    const addNewsBtn = document.getElementById('add-news-btn');
    if (addNewsBtn) {
        addNewsBtn.addEventListener('click', function () {
            window.location.href = '/admin/news-form';
        });
    }

    // === Form handlers ===
    const personnelForm = document.getElementById('add-personnel-form');
    if (personnelForm) {
        personnelForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                roleInLab: { vi: formData.get('roleInLab') },
                avatar: formData.get('avatar') || null
            };
            alert('Dữ liệu nhân sự: ' + JSON.stringify(data));
            this.reset();
        });
    }

    const internForm = document.getElementById('add-intern-form');
    if (internForm) {
        internForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                major: formData.get('major'),
                studentCode: formData.get('studentCode'),
                school: formData.get('school'),
                avatar: formData.get('avatar') || null
            };
            alert('Dữ liệu thực tập sinh: ' + JSON.stringify(data));
            this.reset();
        });
    }

    // === Tabs ===
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabLinks.length && tabContents.length) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                const targetTab = document.getElementById(tabId);
                if (targetTab) targetTab.classList.add('active');
            });
        });
    }
});


const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            fetch('/admin/logout', {
                method: 'GET',
                credentials: 'include'
            })
                .then(res => {
                    if (res.redirected) {
                        window.location.href = res.url; // Redirect về login
                    } else {
                        alert('Đăng xuất thất bại.');
                    }
                })
                .catch(err => {
                    alert('Không thể kết nối tới server: ' + err.message);
                });
        }
    });
}