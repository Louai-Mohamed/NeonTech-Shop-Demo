document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // Week 5: JavaScript Basics (Interactive Button)
    // ==========================================
    const demoBtn = document.getElementById('demo-btn');
    const interactiveText = document.getElementById('interactive-text');
    
    if (demoBtn && interactiveText) {
        let toggle = false;
        demoBtn.addEventListener('click', () => {
            toggle = !toggle;
            if (toggle) {
                interactiveText.innerText = "System activated. Neural link established successfully.";
                interactiveText.style.color = "var(--success-color)";
                demoBtn.innerText = "Deactivate System";
                demoBtn.classList.remove('btn-primary');
                demoBtn.classList.add('btn-outline');
            } else {
                interactiveText.innerText = "Click the button below to see a JavaScript interaction in action.";
                interactiveText.style.color = "var(--text-secondary)";
                demoBtn.innerText = "Initialize Sequence";
                demoBtn.classList.add('btn-primary');
                demoBtn.classList.remove('btn-outline');
            }
        });
    }

    // ==========================================
    // Week 6: Form Validation
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission for demo
            
            let isValid = true;
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const nameGroup = document.getElementById('name-group');
            const emailGroup = document.getElementById('email-group');
            const messageGroup = document.getElementById('message-group');
            
            // Check Name
            if (nameInput.value.trim() === '') {
                nameGroup.classList.add('error');
                nameGroup.classList.remove('success');
                isValid = false;
            } else {
                nameGroup.classList.remove('error');
                nameGroup.classList.add('success');
            }
            
            // Check Email
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (emailInput.value.trim() === '' || !emailInput.value.match(emailPattern)) {
                emailGroup.classList.add('error');
                emailGroup.classList.remove('success');
                isValid = false;
            } else {
                emailGroup.classList.remove('error');
                emailGroup.classList.add('success');
            }
            
            // Check Message
            if (messageInput.value.trim() === '') {
                messageGroup.classList.add('error');
                messageGroup.classList.remove('success');
                isValid = false;
            } else {
                messageGroup.classList.remove('error');
                messageGroup.classList.add('success');
            }
            
            if (isValid) {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                nameGroup.classList.remove('success');
                emailGroup.classList.remove('success');
                messageGroup.classList.remove('success');
            }
        });
        
        // Remove error states on input
        ['name', 'email', 'message'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => {
                    const group = document.getElementById(`${id}-group`);
                    group.classList.remove('error');
                });
            }
        });
    }

    // ==========================================
    // Week 7: JSON and AJAX
    // ==========================================
    const jsonProductsContainer = document.getElementById('json-products');

    // ==========================================
    // Week 8: Simple Database and API
    // ==========================================
    const apiProductsContainer = document.getElementById('api-products');
    const apiForm = document.getElementById('api-form');
    // Default json-server port is 3000
    const API_URL = 'http://localhost:3000/products';

    const renderWeek7Card = (product) => {
        return `
            <div class="product-card fade-in">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-desc">${product.description}</div>
                <button class="btn btn-outline" style="width:100%">Add to Cart</button>
            </div>
        `;
    };

    const renderWeek8Card = (product) => {
        return `
            <div class="product-card fade-in" style="border-color: var(--secondary-color);">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-desc">${product.description}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">ID: ${product.id}</div>
            </div>
        `;
    };

    const prependCard = (container, cardHtml) => {
        if (!container) return;

        const text = (container.textContent || '').trim();
        const hasPlaceholder = text.includes('No products in database.') ||
            text.includes('Setup Required:') ||
            text.includes('Error loading API:');

        if (hasPlaceholder || container.children.length === 0) {
            container.innerHTML = cardHtml;
            return;
        }

        container.insertAdjacentHTML('afterbegin', cardHtml);
    };

    // Function to load Week 7 product list from API
    const loadWeek7Products = () => {
        if (!jsonProductsContainer) return;

        return fetch(API_URL, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('API not running');
                return response.json();
            })
            .then(data => {
                let html = '';
                data.forEach(product => {
                    html += renderWeek7Card(product);
                });
                jsonProductsContainer.innerHTML = html;
            })
            .catch(error => {
                jsonProductsContainer.innerHTML = `<p class="error-message" style="display:block"><strong>Setup Required:</strong> Start json-server to view products<br><code>npx json-server --watch db.json --port 3000</code><br><br>Error: ${error.message}</p>`;
            });
    };

    // Initial load for Week 7 section
    loadWeek7Products();
    
    // Function to load API products
    const loadApiProducts = () => {
        if (!apiProductsContainer) return;
        
        return fetch(API_URL, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('API not running (run json-server --watch db.json)');
                return response.json();
            })
            .then(data => {
                let html = '';
                if (data.length === 0) {
                    html = '<p>No products in database.</p>';
                } else {
                    data.forEach(product => {
                        html += renderWeek8Card(product);
                    });
                }
                apiProductsContainer.innerHTML = html;
            })
            .catch(error => {
                apiProductsContainer.innerHTML = `<p class="error-message" style="display:block">Error loading API: Please ensure json-server is running on port 3000.<br>Command: <code>npx json-server --watch db.json</code></p>`;
            });
    };

    // Initial load
    loadApiProducts();

    // Handle Form Submission for POST request
    if (apiForm) {
        apiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('api-name').value;
            const price = document.getElementById('api-price').value;
            const description = document.getElementById('api-desc').value;
            
            const newProduct = {
                id: Date.now().toString(),
                name: name,
                price: parseFloat(price),
                description: description
            };
            
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            .then(response => response.json())
            .then((createdProduct) => {
                // Clear form
                apiForm.reset();

                // Instant UI update in both sections from POST response
                prependCard(apiProductsContainer, renderWeek8Card(createdProduct));
                prependCard(jsonProductsContainer, renderWeek7Card(createdProduct));
            })
            .catch(error => {
                alert('Error saving product. Make sure json-server is running.');
                console.error('Error:', error);
            });
        });
    }

    // ==========================================
    // NEW: Authentication Functions (Register & Sign In)
    // ==========================================
    const API_USERS_URL = 'http://localhost:3000/users';

    // REGISTER FORM HANDLING
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('reg-name');
            const emailInput = document.getElementById('reg-email');
            const passwordInput = document.getElementById('reg-password');
            const confirmInput = document.getElementById('reg-confirm');
            
            const nameGroup = document.getElementById('reg-name-group');
            const emailGroup = document.getElementById('reg-email-group');
            const passwordGroup = document.getElementById('reg-password-group');
            const confirmGroup = document.getElementById('reg-confirm-group');
            
            // Reset previous errors
            [nameGroup, emailGroup, passwordGroup, confirmGroup].forEach(g => {
                g.classList.remove('error', 'success');
            });
            
            let isValid = true;
            
            // Validate Name (letters and spaces only)
            const namePattern = /^[A-Za-z\s]{2,}$/;
            if (!namePattern.test(nameInput.value.trim())) {
                nameGroup.classList.add('error');
                isValid = false;
            } else {
                nameGroup.classList.add('success');
            }
            
            // Validate Email
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailInput.value.match(emailPattern)) {
                emailGroup.classList.add('error');
                isValid = false;
            } else {
                emailGroup.classList.add('success');
            }
            
            // Validate Password (minimum 6 characters)
            if (passwordInput.value.length < 6) {
                passwordGroup.classList.add('error');
                isValid = false;
            } else {
                passwordGroup.classList.add('success');
            }
            
            // Validate Password Match
            if (passwordInput.value !== confirmInput.value) {
                confirmGroup.classList.add('error');
                isValid = false;
            } else {
                confirmGroup.classList.add('success');
            }
            
            if (!isValid) return;
            
            // Create new user object
            const newUser = {
                id: Date.now().toString(),
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value
            };
            
            // POST to API
            fetch(API_USERS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => {
                if (!response.ok) throw new Error('Registration failed');
                return response.json();
            })
            .then(user => {
                alert('Account created successfully! Redirecting to sign in...');
                // Save user to localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                // Redirect to home
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            })
            .catch(error => {
                alert('Error creating account. Make sure json-server is running.\nCommand: npx json-server --watch db.json');
                console.error('Error:', error);
            });
        });
    }
    
    // SIGN IN FORM HANDLING
    const signInForm = document.getElementById('signin-form');
    
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('signin-email');
            const passwordInput = document.getElementById('signin-password');
            
            const emailGroup = document.getElementById('signin-email-group');
            const passwordGroup = document.getElementById('signin-password-group');
            
            // Reset previous errors
            [emailGroup, passwordGroup].forEach(g => {
                g.classList.remove('error', 'success');
            });
            
            let isValid = true;
            
            // Validate Email
            if (emailInput.value.trim() === '') {
                emailGroup.classList.add('error');
                isValid = false;
            } else {
                emailGroup.classList.add('success');
            }
            
            // Validate Password
            if (passwordInput.value === '') {
                passwordGroup.classList.add('error');
                isValid = false;
            } else {
                passwordGroup.classList.add('success');
            }
            
            if (!isValid) return;
            
            // GET all users and check credentials
            fetch(API_USERS_URL)
            .then(response => {
                if (!response.ok) throw new Error('Could not fetch users');
                return response.json();
            })
            .then(users => {
                // Find user with matching email and password
                const user = users.find(u => 
                    u.email === emailInput.value.trim() && 
                    u.password === passwordInput.value
                );
                
                if (user) {
                    alert(`Welcome back, ${user.name}!`);
                    // Save user to localStorage
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // Redirect to home
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            })
            .catch(error => {
                alert('Error signing in. Make sure json-server is running.\nCommand: npx json-server --watch db.json');
                console.error('Error:', error);
            });
        });
    }
    
    // LOGOUT FUNCTION (Called from navbar or profile page)
    window.logout = function() {
        localStorage.removeItem('currentUser');
        alert('You have been logged out.');
        window.location.href = 'index.html';
    };
    
    // Check if user is logged in and update navbar
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        console.log('User logged in:', currentUser.name);
        // Hide register/sign in links
        const authLinks = document.getElementById('auth-links');
        const userSession = document.getElementById('user-session');
        if (authLinks) authLinks.style.display = 'none';
        if (userSession) {
            userSession.style.display = 'block';
            document.getElementById('user-name').textContent = `Welcome, ${currentUser.name}! `;
        }
    }
});
