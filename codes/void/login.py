
@app.route('/')
def home():
        try:
            # Check if the database file exists
            if not os.path.exists('mydatabase.db'):
                # Create a connection to the SQLite database
                conn = sqlite3.connect('mydatabase.db')

                # Create a new table called 'users'
                conn.execute('''CREATE TABLE users
                            (id INTEGER PRIMARY KEY,
                            email TEXT UNIQUE NOT NULL,
                            password TEXT NOT NULL);''')

                # Close the database connection
                conn.close()
                raise ResourceNotFoundError("Resource page not found")
                

            else:
                return render_template('main.html')
        except:
                raise ResourceNotFoundError("Resource page not found")


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get user input from the registration form
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        # Check if the passwords match
        if password != confirm_password:
            error = 'Passwords do not match. Please try again.'
            return render_template('register.html', error=error)

        # Check if the email is already in the database
        conn = sqlite3.connect('mydatabase.db')
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE email = ?", (email,))
        existing_user = cur.fetchone()
        if existing_user:
            error = 'Email already exists. Please use a different email address.'
            conn.close()
            return render_template('register.html', error=error)

        # Insert the new user into the database
        cur.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
        conn.commit()
        conn.close()

        # Redirect to the login page
        return redirect('/login')

    else:
        return render_template('register.html')



@app.route('/login', methods=['POST'])
def login_post():
    email = request.form['email']
    password = request.form['password']

    # Check if email/username and password are valid
    conn = sqlite3.connect('mydatabase.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
    user = cur.fetchone()
    conn.close()

    if user:
        # If valid, redirect to a dashboard page
        return redirect('/home')
    else:
        # If not valid, show an error message
        error = 'Invalid credentials. Please try again.'
        return render_template('login.html', error=error)

