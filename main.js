const turnosSemanales = [];

// Cargar datos desde un archivo JSON local
async function cargarDatosDesdeJSON() {
   try {
      const response = await fetch('data.json');
      const data = await response.json();
      
      // Agregar los turnos del archivo JSON a la lista
      data.forEach(turno => {
         turnosSemanales[turno.hora - 1] = turno;
      });

      console.log('Datos cargados desde JSON:', data);
   } catch (error) {
      console.error('Error al cargar datos desde JSON:', error);
   }
}

// Llamar a la función para cargar datos al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosDesdeJSON);

document.getElementById('turnoForm').addEventListener('submit', async function (event) {
   event.preventDefault();

   const nombre = document.getElementById('nombre').value;
   const apellido = document.getElementById('apellido').value;
   const dia = document.getElementById('dia').value;
   const hora = document.getElementById('hora').value;

   if (hora < 1 || hora > 5) {
      Swal.fire('Número de horario no válido. Debe ser un número entre 1 y 5.');
      return;
   }

   if (turnosSemanales[hora - 1]) {
      Swal.fire(`El turno para el día ${dia} ya está reservado.`);
   } else {
      const turno = {
         nombre: nombre,
         apellido: apellido,
         dia: dia,
         hora: hora
      };

      Swal.fire({
         icon: 'success',
         title: 'Turno solicitado',
         text: `Nombre: ${turno.nombre} Apellido: ${turno.apellido} Día: ${turno.dia} Hora: ${turno.hora}`,
      });

      const listaTurnos = document.getElementById('listaTurnos');
      const nuevoTurno = document.createElement('li');
      nuevoTurno.textContent = `Nombre: ${turno.nombre}, Apellido: ${turno.apellido}, Día: ${turno.dia}, Hora: ${turno.hora}`;
      listaTurnos.appendChild(nuevoTurno);

      turnosSemanales[hora - 1] = turno;
   }
});
