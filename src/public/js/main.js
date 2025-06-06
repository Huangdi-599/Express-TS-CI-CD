document.addEventListener('DOMContentLoaded', async () => {
    const userForm = document.getElementById('userForm');
    const usersList = document.getElementById('usersList');
    const statusElement = document.getElementById('status');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const userId = document.getElementById('userId');

    // Fetch and display users
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            usersList.innerHTML = users.map(user => `
                <div class="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                        <div class="font-semibold">${user.name}</div>
                        <div class="text-gray-600">${user.email}</div>
                    </div>
                    <div class="space-x-2">
                        <button class="edit-btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" data-id="${user._id}" data-name="${user.name}" data-email="${user.email}">
                            Edit
                        </button>
                        <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" data-id="${user._id}">
                            Delete
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Reset form to add mode
    const resetForm = () => {
        userForm.reset();
        userId.value = '';
        formTitle.textContent = 'Add New User';
        submitBtn.textContent = 'Add User';
        cancelBtn.classList.add('hidden');
    };

    // Handle form submission
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(userForm);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email')
        };

        try {
            const id = formData.get('userId');
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/api/users/${id}` : '/api/users';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                resetForm();
                fetchUsers();
            } else {
                console.error('Error saving user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle edit and delete buttons
    usersList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const btn = e.target;
            userId.value = btn.dataset.id;
            userForm.name.value = btn.dataset.name;
            userForm.email.value = btn.dataset.email;
            formTitle.textContent = 'Edit User';
            submitBtn.textContent = 'Update User';
            cancelBtn.classList.remove('hidden');
        } else if (e.target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this user?')) {
                const id = e.target.dataset.id;
                try {
                    const response = await fetch(`/api/users/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        fetchUsers();
                    } else {
                        console.error('Error deleting user');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    });

    // Handle cancel button
    cancelBtn.addEventListener('click', resetForm);

    // Check server status
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        if (statusElement) {
            statusElement.textContent = `Server Status: ${data.message}`;
            statusElement.classList.add('fade-in');
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
    }

    // Initial fetch
    fetchUsers();
});
