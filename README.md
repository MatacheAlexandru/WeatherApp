1. Inițializare Proiect
   1.1 Creează un nou proiect Node.js:

sh
Copy code
npm init -y
Aceasta va crea un fișier package.json cu setările implicite.

2. Instalarea Dependințelor
   2.1 Instalează Bootstrap, Popper.js și jQuery:

sh
Copy code
npm install bootstrap@5 @popperjs/core jquery
Aceste pachete sunt necesare pentru a folosi Bootstrap în proiectul tău.

2.2 Instalează nodemon pentru auto-restart la modificări:

sh
Copy code
npm install -g nodemon
nodemon monitorizează modificările în fișierele sursă și repornește automat serverul. Acest lucru este foarte util în timpul dezvoltării pentru a nu reporni manual serverul de fiecare dată când faci o schimbare.

2.3 Instalează morgan pentru logarea detaliilor request-urilor HTTP:

sh
Copy code
npm install morgan
morgan este un middleware pentru Express care loghează detaliile request-urilor HTTP. Este util pentru a vedea rapid cererile care vin pe server și pentru a diagnostica problemele.

2.4 Instalează dotenv pentru gestionarea variabilelor de mediu:

sh
Copy code
npm install dotenv
dotenv este folosit pentru a încărca variabile de mediu dintr-un fișier .env, ceea ce ajută la gestionarea diferitelor setări și configurații în mediile de dezvoltare și producție.

3. Configurarea Structurii Proiectului
   Creează următoarea structură de directoare și fișiere:

java
Copy code
my-project/
│
├── index.html
├── package.json
├── server.js
├── node_modules/
└── public/
├── css/
│ └── styles.css
├── js/
│ └── script.js
└── images/ 4. Configurarea Serverului Express
4.1 Creează fișierul server.js pentru a configura serverul:

javascript
Copy code
const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pentru logarea request-urilor
app.use(morgan('dev'));

// Servește fișiere statice din directorul "public"
app.use(express.static(path.join(\_\_dirname, 'public')));

// Servește fișiere din "node_modules"
app.use('/node_modules', express.static(path.join(\_\_dirname, 'node_modules')));

// Servește fișierul principal HTML
app.get('/', (req, res) => {
res.sendFile(path.join(\_\_dirname, 'index.html'));
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
}); 5. Configurarea Fișierelor HTML, CSS și JS
5.1 Configurarea fișierului index.html:

html
Copy code

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Bootstrap Project</title>
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="container">
        <h1 class="mt-5">Hello, Bootstrap!</h1>
        <p>This is a simple example of using Bootstrap in a project.</p>
    </div>

    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
    <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="/js/script.js"></script>

</body>
</html>
5.2 Configurarea fișierului CSS styles.css:

css
Copy code
/_ Example custom styles _/
body {
padding-top: 20px;
background-color: #f8f9fa;
}
5.3 Configurarea fișierului JavaScript script.js:

javascript
Copy code
// Example JavaScript code
$(document).ready(function() {
console.log("Hello, Bootstrap with jQuery and Popper.js!");
}); 6. Pornirea Serverului
6.1 Adaugă un script de pornire în package.json:

json
Copy code
"scripts": {
"start": "node server.js",
"dev": "nodemon server.js"
}
6.2 Rulează serverul în modul dezvoltare:

sh
Copy code
npm run dev 7. Debugging suplimentar pentru nodemon
Dacă întâmpini probleme legate de politica de execuție a scripturilor pe Windows, urmează acești pași:

7.1 Deschide PowerShell ca Administrator:

Caută "PowerShell" în meniul Start, fă clic dreapta pe "Windows PowerShell" și selectează "Run as administrator".
7.2 Verifică politica de execuție curentă:

powershell
Copy code
Get-ExecutionPolicy
7.3 Schimbă politica de execuție:

powershell
Copy code
Set-ExecutionPolicy RemoteSigned
Confirmă schimbarea cu Y (Yes) și Enter.
7.4 Închide și redeschide terminalul PowerShell.

7.5 Rulează din nou nodemon:

sh
Copy code
nodemon server.js
Acest lucru ar trebui să permită nodemon să ruleze fără erori legate de politica de execuție a scripturilor.

8. Debugging suplimentar pentru server
   Dacă încă mai întâmpini probleme, rulează serverul direct cu node pentru a verifica alte erori:

sh
Copy code
node server.js
Concluzie
Urmând acești pași detaliați, ar trebui să poți configura și rula un proiect Node.js cu Express și Bootstrap, având și un mediu de dezvoltare eficient și ușor de debug-at.

trebuie sa refactorizam codul
sa schimbam iconitele de vreme
sa schimbam fundalul dupa vreme
sa adaugam o harta cu nori din acea zona
