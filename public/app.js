async function cargarPeliculas() {

    const respuesta = await fetch('/peliculas');
    const peliculas = await respuesta.json();

    let html = '';

    peliculas.forEach(p => {

        html += `
        <div class="card">

            <img src="${p.imagen}" alt="${p.titulo}">

            <h3>${p.titulo}</h3>

            <p><strong>Director:</strong> ${p.director}</p>

            <p><strong>Año:</strong> ${p.anio}</p>

            <p><strong>Género:</strong> ${p.genero}</p>

            <div class="acciones">

                <button class="btn-editar"
                    onclick="editar(
                        ${p.id},
                        '${p.titulo}',
                        '${p.director}',
                        ${p.anio},
                        '${p.genero}',
                        '${p.imagen}'
                    )">
                    Editar
                </button>

                <button class="btn-eliminar"
                    onclick="eliminar(${p.id})">
                    Eliminar
                </button>

            </div>

        </div>
        `;
    });

    document.getElementById('tablaPeliculas').innerHTML = html;
}

async function guardar() {

    await fetch('/peliculas', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            titulo: document.getElementById('titulo').value,
            director: document.getElementById('director').value,
            anio: document.getElementById('anio').value,
            genero: document.getElementById('genero').value,
            imagen: document.getElementById('imagen').value
        })
    });

    limpiar();
    cargarPeliculas();
}

function editar(id, titulo, director, anio, genero, imagen) {

    document.getElementById('id').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('director').value = director;
    document.getElementById('anio').value = anio;
    document.getElementById('genero').value = genero;
    document.getElementById('imagen').value = imagen;
}

async function actualizar() {

    const id = document.getElementById('id').value;

    await fetch(`/peliculas/${id}`, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            titulo: document.getElementById('titulo').value,
            director: document.getElementById('director').value,
            anio: document.getElementById('anio').value,
            genero: document.getElementById('genero').value,
            imagen: document.getElementById('imagen').value
        })
    });

    limpiar();
    cargarPeliculas();
}

async function eliminar(id) {

    if (!confirm('¿Eliminar película?')) return;

    await fetch(`/peliculas/${id}`, {
        method: 'DELETE'
    });

    cargarPeliculas();
}

function limpiar() {

    document.getElementById('id').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('director').value = '';
    document.getElementById('anio').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('imagen').value = '';
}

cargarPeliculas();