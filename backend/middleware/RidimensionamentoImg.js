// Importa le dipendenze necessarie
const express = require('express');
const app = express();

// Configura il middleware per aumentare il limite di dimensione massima
app.use(express.json({ limit: '10mb' })); // Imposta il limite a 10 MB

// Altre configurazioni e gestione delle route del server
// ...

// Avvia il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
