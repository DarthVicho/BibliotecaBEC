document.addEventListener('DOMContentLoaded', () => {
    // Definición de datos iniciales
    let documents = [
        { id: '1', title: 'Cien años de soledad', author: 'Gabriel García Márquez', edition: '1ra', year: 1967, type: 'Libro', category: 'Ficción', available: 5 },
        { id: '2', title: 'El origen de las especies', author: 'Charles Darwin', edition: '1ra', year: 1859, type: 'Libro', category: 'Ciencia', available: 2 },
        { id: '3', title: 'Interstellar', author: 'Christopher Nolan', edition: 'Director`s Cut', year: 2014, type: 'DVD', category: 'Película', available: 3 },
        { id: '4', title: 'Thriller', author: 'Michael Jackson', edition: 'Edición especial', year: 1982, type: 'CD', category: 'Música', available: 4 },
        { id: '5', title: 'La sombra del viento', author: 'Carlos Ruiz Zafón', edition: '3ra', year: 2004, type: 'Libro', category: 'Ficción', available: 6 },
        { id: '6', title: 'Cosmos', author: 'Carl Sagan', edition: '2da', year: 1980, type: 'Libro', category: 'Ciencia', available: 1 },
        { id: '7', title: 'Bohemian Rhapsody', author: 'Queen', edition: 'Single', year: 1975, type: 'Vinilo', category: 'Música', available: 2 },
        { id: '8', title: 'La lista de Schindler', author: 'Steven Spielberg', edition: '-', year: 1993, type: 'Blu-ray', category: 'Película', available: 0 },
        { id: '9', title: 'Shrek', author: 'DreamWorks', edition: '20 años', year: 2001, type: 'Blu-ray', category: 'Película', available: 5 },
        { id: '10', title: 'Spider-Man', author: 'Stan Lee', edition: '-', year: 1962, type: 'Libro', category: 'Comic', available: 3 }
    ];
    let requestList = [];
    let userRequestsHistory = [];

    // Referencias a elementos del DOM
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentLinks = document.querySelectorAll('.content-link');
    const views = document.querySelectorAll('.content-view');

    // Funciones principales de la aplicación

    /**
     * @description Muestra la vista de la aplicación (SPA).
     * @param {string} viewId El ID de la vista a mostrar.
     */
    function showView(viewId) {
        views.forEach(view => {
            view.style.display = 'none';
        });
        
        const selectedView = document.getElementById(viewId + '-view');
        if (selectedView) {
            selectedView.style.display = 'block';
        }

        sidebarItems.forEach(item => {
            item.classList.remove('active');
        });
        const activeItem = document.querySelector(`.sidebar-item[data-target="${viewId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // === INICIO DE CORRECCIÓN CLAVE ===
        // Se cambió a 'else if' para asegurar que solo una función se ejecute por vista
        if (viewId === 'catalogo') {
            showTab('search');
        } else if (viewId === 'history') {
            loadHistory();
        } else if (viewId === 'reservar') {
            loadReservations();
        }
        // === FIN DE CORRECCIÓN CLAVE ===
    }

    /**
     * @description Muestra una pestaña dentro de la vista del catálogo.
     * @param {string} tabId El ID de la pestaña a mostrar.
     */
    function showTab(tabId) {
        const tabs = document.querySelectorAll('#catalogo-view .tab-content');
        tabs.forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');

        const tabButtons = document.querySelectorAll('#catalogo-view .tab-button');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[onclick="showTab('${tabId}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        if (tabId === 'results') {
            showResults();
        } else if (tabId === 'request') {
            renderRequestList();
        }
    }

    /**
     * @description Muestra los resultados de búsqueda.
     */
    function showResults() {
        const docType = document.getElementById('doc-type').value.toLowerCase();
        const category = document.getElementById('category').value.toLowerCase();
        const title = document.getElementById('title').value.toLowerCase();
        const author = document.getElementById('author').value.toLowerCase();
        
        const filteredDocuments = documents.filter(doc => {
            return (docType === '' || doc.type.toLowerCase().includes(docType)) &&
                (category === '' || doc.category.toLowerCase().includes(category)) &&
                (title === '' || doc.title.toLowerCase().includes(title)) &&
                (author === '' || doc.author.toLowerCase().includes(author));
        });

        const tableBody = document.getElementById('results-table-body');
        tableBody.innerHTML = '';

        if (filteredDocuments.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No se encontraron documentos.</td></tr>';
            return;
        }

        filteredDocuments.forEach(doc => {
            const isAvailable = doc.available > 0;
            const checkboxOrText = isAvailable ?
                `<input type="checkbox" name="select-doc" value="${doc.id}">` :
                `<span class="unavailable-item">No disponible</span>`;
            const rowClass = isAvailable ? '' : 'unavailable-row';

            const row = `
                <tr class="${rowClass}">
                    <td>${doc.title}</td>
                    <td>${doc.author}</td>
                    <td>${doc.edition || 'N/A'}</td>
                    <td>${doc.year}</td>
                    <td>${doc.type}</td>
                    <td>${doc.category}</td>
                    <td>${doc.available}</td>
                    <td>${checkboxOrText}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // Funciones de solicitud y gestión del historial
    function addSelectedToRequest() {
        const checkboxes = document.querySelectorAll('#results-table-body input[type="checkbox"]:checked');
        if (checkboxes.length === 0) {
            alert('Seleccione al menos un documento para agregar.'); 
            return;
        }
        checkboxes.forEach(checkbox => {
            const docId = checkbox.value;
            const doc = documents.find(d => d.id === docId);
            const requestDoc = requestList.find(r => r.id === docId);
            
            if (doc && !requestDoc) {
                requestList.push({ ...doc, quantity: 1 });
            } else if (requestDoc) {
                alert(`El documento "${doc.title}" ya está en su solicitud.`);
            }
        });
        renderRequestList();
        showTab('request');
    }

    function renderRequestList() {
        const tableBody = document.getElementById('request-table-body');
        tableBody.innerHTML = '';

        if (requestList.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Aún no ha agregado documentos a su solicitud.</td></tr>';
            return;
        }

        requestList.forEach((doc, index) => {
            const row = `
                <tr>
                    <td>${doc.title}</td>
                    <td>${doc.author}</td>
                    <td>${doc.edition || 'N/A'}</td>
                    <td>${doc.year}</td>
                    <td>${doc.type}</td>
                    <td>${doc.category}</td>
                    <td>${doc.quantity}</td>
                    <td><button class="btn btn-secondary" onclick="removeFromRequest(${index})">Eliminar</button></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    function removeFromRequest(index) {
        requestList.splice(index, 1);
        renderRequestList();
        alert('Documento eliminado de la solicitud.');
    }

    function resetRequestAndGoToSearch() {
        requestList = [];
        renderRequestList();
        showTab('search');
        alert('Solicitud borrada.');
    }

    function sendRequest() {
        if (requestList.length === 0) {
            alert('La solicitud está vacía.');
            return;
        }
        
        for (const item of requestList) {
            const doc = documents.find(d => d.id === item.id);
            if (doc.available < 1) {
                alert(`Error: No hay copias disponibles para ${doc.title}.`);
                return;
            }
        }

        const requestDate = new Date().toLocaleDateString();
        requestList.forEach(item => {
            const doc = documents.find(d => d.id === item.id);
            doc.available--;
            userRequestsHistory.push({ ...item, date: requestDate, status: 'Enviada' });
        });

        alert(`¡Su solicitud ha sido enviada con éxito!`);
        requestList = [];
        showTab('search');
    }

    function loadHistory() {
        const tableBody = document.getElementById('history-table-body');
        tableBody.innerHTML = '';
        if (userRequestsHistory.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No tiene solicitudes en su historial.</td></tr>';
            return;
        }
        userRequestsHistory.forEach(req => {
            const row = `
                <tr>
                    <td>${req.title}</td>
                    <td>${req.author}</td>
                    <td>${req.date}</td>
                    <td>${req.status}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    function showSuggestions(field, value) {
        const dropdown = document.getElementById(`${field}-suggestions`);
        const uniqueSuggestions = new Set();
        documents.forEach(doc => {
            if (doc[field] && doc[field].toLowerCase().includes(value.toLowerCase())) {
                uniqueSuggestions.add(doc[field]);
            }
        });
        dropdown.innerHTML = '';
        if (value.length > 0 && uniqueSuggestions.size > 0) {
            uniqueSuggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.textContent = suggestion;
                item.onclick = () => {
                    document.getElementById(field).value = suggestion;
                    dropdown.classList.remove('active');
                };
                dropdown.appendChild(item);
            });
            dropdown.classList.add('active');
        } else {
            dropdown.classList.remove('active');
        }
    }

    function resetFilters() {
        document.getElementById('doc-type').value = '';
        document.getElementById('category').value = '';
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        alert('Filtros reiniciados.');
        showResults();
    }
    
    function cerrarSesion() {
        window.location.href = 'index.html';
        localStorage.clear();
        sessionStorage.clear();
    }

    //Funciones de reserva de documentos
    function loadReservations() {
        const docSelect = document.getElementById('document-to-reserve');
        docSelect.innerHTML = '<option value="">Seleccione un documento</option>';
        const unavailableDocs = documents.filter(doc => doc.available === 0);

        if (unavailableDocs.length === 0) {
            docSelect.innerHTML += '<option value="" disabled>No hay documentos para reservar</option>';
        } else {
            unavailableDocs.forEach(doc => {
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = `${doc.title} - ${doc.author}`;
                docSelect.appendChild(option);
            });
        }
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('reservation-date').setAttribute('min', today);
    }

    function reserveDocument() {
        const docSelect = document.getElementById('document-to-reserve');
        const selectedDocId = docSelect.value;
        const reservationDate = document.getElementById('reservation-date').value;

        if (!selectedDocId || !reservationDate) {
            alert('Por favor, seleccione un documento y una fecha.');
            return;
        }

        const selectedDoc = documents.find(doc => doc.id === selectedDocId);
        if (!selectedDoc) {
            alert('Error: Documento no encontrado.');
            return;
        }

        const dateObj = new Date(reservationDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        //Agregar la reserva al historial
        const reservationDetails = {
            ...selectedDoc,
            date: reservationDate,
            status: 'Reservado'
        };

        userRequestsHistory.push(reservationDetails);
        alert(`¡El documento "${selectedDoc.title}" ha sido reservado para el ${reservationDate}!`);
        showView('history');
    }

    //Asignar funciones a los HTML para llamarlas
    window.showTab = showTab;
    window.showView = showView;
    window.showSuggestions = showSuggestions;
    window.resetFilters = resetFilters;
    window.showResults = showResults;
    window.addSelectedToRequest = addSelectedToRequest;
    window.removeFromRequest = removeFromRequest;
    window.resetRequestAndGoToSearch = resetRequestAndGoToSearch;
    window.sendRequest = sendRequest;
    window.loadHistory = loadHistory;
    window.reserveDocument = reserveDocument;

    //barra lateral y los enlaces
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = item.getAttribute('data-target');
            showView(targetView);
        });
    });

    contentLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = link.getAttribute('data-target');
            showView(targetView);
        });
    });

    //Funcion para cerrar sesion
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    }

    //Inicio de aplicacion
    showView('welcome');
});