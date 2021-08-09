# Django_OAuth

This is a template of a django + react w/typescript app styled w tailwindcss with minimal functionality like login logout, different enviroments: dev and prod
and a basic layout integrating everything.

Django files and venv are located in backend folder, and react files are in frontend folder

## Instalation:

For Django:

```bash

Django_OAuth$ cd backend
backend$ python -m venv venv
backend$ source venv/bin/activate
(venv)backend$ pip3 install -r requirements/base.txt

```

-   It is configured to run on postgres db, so create one and add it to env file:

```bash
(venv)backend$ touch .env.local
```

```env
# .env.local
DEBUG=True

SECRET_KEY=Your secret key

POSTGRES_NAME='Your Db name'
POSTGRES_USER='Your db user name'
POSTGRES_PASSWORD='Your db password'
POSTGRES_HOST='localhost'

```

For React:

```bash

Django_OAuth$ cd frontend
frontend$ npm install
frontend$

```

---

# Django:

Django expects the react build folder to be inside backend folder. after running run build move the build folder to ./backend

Versions:

-   pip 21.1.3
-   Python 3.9.6
-   Django 3.2.6

Steps used to create django backend:

```bash
backend$ python3 -m venv venv
backend$ source venv/bin/activate
(venv)backend$ pip install django djangorestframework django-cors-headers django-environ
(venv)backend$ django-admin startproject admin .
(venv)backend$ mkdir apps
(venv)backend$ mkdir apps/users
(venv)backend$ django-admin startapp users apps/users
(venv)backend$ mkdir apps/accounts
(venv)backend$ django-admin startapp accounts apps/accounts
(venv)backend$ pip install psycopg2 psycopg2-binary
```

# React:

Steps used to create front end with cra:

-   Create react app with typescript inside folder

```bash
frontend$ npx create-react-app . --template typescript
```

-   Install tailwindcss [Docs](https://tailwindcss.com/docs/guides/create-react-app)

```bash
frontend$ npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

-   Install craco [Docs](https://github.com/gsoft-inc/craco)

```bash
frontend$ npm install @craco/craco
```

-   Replace react-scripts start/build/test with: craco start/build/test in package.json
    [Docs](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation)

From :

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
},
```

To:

```json
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
},
```

-   Create a craco.config.js at the root of our project and add the tailwindcss and autoprefixer as PostCSS plugins:

```javascript
// craco.config.js
module.exports = {
	style: {
		postcss: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
};
```

-   Generate tailwind.config.js file:

```bash
frontend$ npx tailwindcss-cli@latest init
```

-   Modify the config file:

```javascripy
// tailwind.config.js
...
purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
...
```

include tailwind in index.css:

```css
// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
...
```

Aditional Instals:

```bash
frontend$ npm install react-router-dom --save-dev @types/react-router-dom
frontend$ npm install axios
```
