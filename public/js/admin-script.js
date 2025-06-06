document.addEventListener('DOMContentLoaded', function() {
    // Function to format ISO date to DD/MM/YYYY
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    // Fetch personnel data from API
    fetch('/users/api/v1/personnel')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success' && data.data) {
                const personnelTableBody = document.getElementById('personnel-table-body');
                personnelTableBody.innerHTML = ''; // Clear any existing content

                data.data.forEach(person => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="${person.avatar}" alt="${person.fullName}" class="avatar"></td>
                        <td>${person.fullName}</td>
                        <td>${person.roleInLab.vi}</td>
                        <td class="action-buttons">
                            <a href="#" class="edit-btn">Sửa</a>
                            <a href="#" class="delete-btn">Xóa</a>
                        </td>
                    `;
                    personnelTableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching personnel data:', error);
            const personnelTableBody = document.getElementById('personnel-table-body');
            personnelTableBody.innerHTML = '<tr><td colspan="4">Không thể tải dữ liệu nhân sự.</td></tr>';
        });

    // Fetch interns data from API
    fetch('/users/api/v1/intern')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success' && data.data) {
                const internsTableBody = document.getElementById('interns-table-body');
                internsTableBody.innerHTML = ''; // Clear any existing content

                data.data.forEach(intern => {
                    const avatarUrl = intern.avatar || 'img/default-avatar.png'; // Use default avatar if null
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="${avatarUrl}" alt="${intern.fullName}" class="avatar"></td>
                        <td>${intern.fullName}</td>
                        <td>${intern.major || 'Không xác định'}</td>
                        <td class="action-buttons">
                            <a href="#" class="edit-btn">Sửa</a>
                            <a href="#" class="delete-btn">Xóa</a>
                        </td>
                    `;
                    internsTableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching interns data:', error);
            const internsTableBody = document.getElementById('interns-table-body');
            internsTableBody.innerHTML = '<tr><td colspan="4">Không thể tải dữ liệu thực tập sinh.</td></tr>';
        });

    // Fetch news data from API
    fetch('/news/api/v1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success' && data.data) {
                const newsTableBody = document.getElementById('news-table-body');
                newsTableBody.innerHTML = ''; // Clear any existing content

                data.data.forEach(news => {
                    const formattedDate = formatDate(news.createdAt);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${news._id}</td>
                        <td>${news.title}</td>
                        <td>${formattedDate}</td>
                        <td class="action-buttons">
                            <a href="#" class="edit-btn">Sửa</a>
                            <a href="#" class="delete-btn">Xóa</a>
                        </td>
                    `;
                    newsTableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
            const newsTableBody = document.getElementById('news-table-body');
            newsTableBody.innerHTML = '<tr><td colspan="4">Không thể tải dữ liệu tin tức.</td></tr>';
        });

    // Add button event listeners
    document.getElementById('add-personnel-btn').addEventListener('click', function() {
        window.location.href = '/admin/addPersonnel';
    });

    document.getElementById('add-intern-btn').addEventListener('click', function() {
        window.location.href = '/admin/addIntern';
    });

    document.getElementById('add-news-btn').addEventListener('click', function() {
        alert('Thêm tin tức được nhấn');
        // TODO: Implement API call to add news
    });

    // Handle form submissions (for addPersonnel.ejs and addIntern.ejs)
    const personnelForm = document.getElementById('add-personnel-form');
    const internForm = document.getElementById('add-intern-form');

    if (personnelForm) {
        personnelForm.addEventListener('submit', function(e) {
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
            // TODO: Implement API call to add personnel
        });
    }

    if (internForm) {
        internForm.addEventListener('submit', function(e) {
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
            // TODO: Implement API call to add intern
        });
    }

    // Tab switching logic
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links and contents
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked link and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});