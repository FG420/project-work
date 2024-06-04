# Autenticazione e Autorizzazione Utente

## Pagina di Login

- Implementare il form di login con campi email e password.

- Implementare il reset del form dopo 30 secondi se il pulsante di login non viene premuto.

- Aggiungere la validazione lato client per email e password.

## Verifica in Due Passaggi

- Aggiungere la funzionalità di invio di un codice di verifica all'email dell'utente.

- Implementare l'input e la validazione del codice di verifica.

## Pagina di Registrazione

- Creare un form di registrazione con campi email, password, conferma password e CAPTCHA.

- Implementare la validazione lato client per il formato dell'email, la forza della password e la corrispondenza delle password.

- Implementare i controlli lato server per garantire l'unicità dell'email e la crittografia della password.

- Implementare il processo di conferma dell'email per la registrazione.

## Gestione delle Password

- Implementare la funzionalità "Password dimenticata" per inviare link di reset via email.

- Implementare la funzionalità "Cambia Password" post-login.

## Gestione delle Sessioni

- Gestire le sessioni utente, la gestione dei token e il logout automatico dopo 15 minuti di inattività.

---

# Gestione degli Articoli e dei Fornitori

### Gestione degli Articoli

- Creare una pagina per visualizzare la lista degli articoli.

- Implementare le funzionalità per aggiungere, visualizzare, modificare ed eliminare articoli.

- Includere la validazione dei form e il feedback all'utente per tutte le azioni relative agli articoli.

### Gestione dei Fornitori

- Creare una pagina per visualizzare la lista dei fornitori.

- Implementare le funzionalità per aggiungere, visualizzare, modificare ed eliminare fornitori.

- Includere la validazione dei form e il feedback all'utente per tutte le azioni relative ai fornitori.

### Aggiornamento del Magazzino

- Implementare l'aggiornamento manuale del magazzino in base agli acquisti.

- Assicurarsi di tracciare correttamente gli acquisti per evitare inserimenti duplicati.

### Visualizzazione degli Ordini

- Creare una pagina per visualizzare gli ordini e i relativi articoli.

- Assicurarsi che questa pagina permetta solo la visualizzazione, senza modifiche o eliminazioni degli ordini.

# Analisi e Reportistica

### Analisi delle Vendite

- Implementare una pagina per visualizzare le analisi delle vendite.

- Fornire analisi grafiche e numeriche delle quantità totali e dei ricavi per settimana, per articolo, per marketplace e per categoria.

- Consentire la selezione di un intervallo di date per report personalizzati.

### Analisi degli Acquisti

- Implementare una pagina per visualizzare le analisi degli acquisti.

- Fornire analisi grafiche e numeriche delle quantità totali e dei valori monetari degli acquisti per settimana, per articolo, per fornitore e per categoria.

- Consentire la selezione di un intervallo di date per report personalizzati.

### Funzionalità di Esportazione

- Implementare la funzionalità di esportazione delle tabelle (es. articoli, ordini, fornitori) in formato Excel/CSV.

- Consentire agli utenti di selezionare quali tabelle esportare.

### Dashboard e Pagina di Benvenuto:

- Creare una pagina di benvenuto post-login con navigazione alle diverse sezioni (Gestione Articoli, Gestione Fornitori, Analisi, ecc.).

- Implementare una dashboard per fornire una panoramica rapida delle metriche chiave e delle azioni.
