document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi
    const container = document.querySelector('.progetti-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progettoWidth = document.querySelector('.progetto')?.offsetWidth + 30 || 310;
    const navElement = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    // Gestione pulsanti di scorrimento progetti
    if (prevBtn && nextBtn && container) {
        prevBtn.addEventListener('click', function() {
            container.scrollBy({ left: -progettoWidth, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', function() {
            container.scrollBy({ left: progettoWidth, behavior: 'smooth' });
        });
    }
    
    // Creazione elementi per menu burger
    function setupBurgerMenu() {
        // Verifichiamo che il burger menu non esista già
        if (document.querySelector('.burger-menu')) return;
        
        // Creiamo il burger button
        const burgerButton = document.createElement('div');
        burgerButton.className = 'burger-menu';
        burgerButton.innerHTML = `
            <div class="burger-line"></div>
            <div class="burger-line"></div>
            <div class="burger-line"></div>
        `;
        
        // Inseriamo il burger button prima della lista di navigazione
        navElement.insertBefore(burgerButton, navUl);
        
        // Aggiungiamo classe per nascondere il menu in modalità mobile
        navUl.classList.add('nav-list');
        
        // Aggiungiamo event listener per il click sul burger menu
        burgerButton.addEventListener('click', function() {
            navUl.classList.toggle('show');
            burgerButton.classList.toggle('active');
        });
        
        // Chiudi il menu quando si clicca su un link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 480) { // Solo per telefoni
                    navUl.classList.remove('show');
                    burgerButton.classList.remove('active');
                }
            });
        });
    }
    
    // Funzione per verificare la larghezza e applicare il menu burger
    function checkWidth() {
        if (window.innerWidth <= 480) { // Solo per dimensioni telefono
            // Se il burger menu non è già stato creato
            setupBurgerMenu();
            
            // Assicurati che il menu non sia visibile di default in modalità mobile
            navUl.classList.remove('show');
            
            // Applica ridimensionamento per telefono
            resizeMobileElements();
        } else {
            // Se torniamo in modalità tablet/desktop
            if (window.innerWidth > 480) {
                // Rimuoviamo eventuali stili specifici per mobile
                resetMobileStyles();
            }
            
            // Solo se siamo su desktop rimuoviamo completamente il burger menu
            if (window.innerWidth > 768) {
                navUl.classList.remove('nav-list');
                navUl.classList.remove('show');
                
                // Rimuoviamo il burger button se esiste
                const burgerButton = document.querySelector('.burger-menu');
                if (burgerButton) {
                    burgerButton.remove();
                }
            }
        }
    }
    
    // Funzione di ridimensionamento specifico per telefono
    function resizeMobileElements() {
        // Ridimensiona progetti solo per telefono
        const progetti = document.querySelectorAll('.progetto');
        progetti.forEach(progetto => {
            progetto.style.minWidth = '220px';
        });
        
        // Ridimensiona altri elementi per telefono
        document.querySelectorAll('.skill-name').forEach(el => {
            el.style.fontSize = '16px';
        });
        
        document.querySelectorAll('.progetto img').forEach(img => {
            img.style.height = '160px';
        });
        
        document.querySelectorAll('.prev-btn, .next-btn').forEach(btn => {
            btn.style.padding = '8px 15px';
            btn.style.fontSize = '14px';
        });
    }
    
    // Funzione per ripristinare gli stili originali
    function resetMobileStyles() {
        // Ripristina le dimensioni originali dei progetti
        const progetti = document.querySelectorAll('.progetto');
        progetti.forEach(progetto => {
            progetto.style.minWidth = ''; // Rimuove lo stile inline
        });
        
        // Ripristina altri elementi
        document.querySelectorAll('.skill-name').forEach(el => {
            el.style.fontSize = '';
        });
        
        document.querySelectorAll('.progetto img').forEach(img => {
            img.style.height = '';
        });
        
        document.querySelectorAll('.prev-btn, .next-btn').forEach(btn => {
            btn.style.padding = '';
            btn.style.fontSize = '';
        });
    }
    
    // Esegui al caricamento
    checkWidth();
    
    // Ascolta per il ridimensionamento della finestra
    window.addEventListener('resize', function() {
        checkWidth();
    });
    
    // Gestione del form di contatto
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Qui puoi inserire la logica per l'invio del form
            alert('Grazie per il tuo messaggio! Ti risponderò al più presto.');
            form.reset();
        });
    }
});