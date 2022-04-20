import * as UI from './interfaz.js';

export class API {
     constructor(artista, cancion) {
          this.artista = artista;
          this.cancion = cancion;

          this.consultarAPI();
     }

     consultarAPI() {
          fetch(`https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`)
               .then(UI.spinner.classList.remove('d-none'))   
               .then( respuesta => respuesta.json())
               .then(resultado => {
                    if(resultado.lyrics) {
                         // La canción Existe
                         UI.spinner.classList.add('d-none')
                         const { lyrics } = resultado;
                         UI.divResultado.textContent = lyrics;
                         UI.headingResultado.textContent = 'Letra';
                    } else {
                         // La canción no existe
                         UI.divMensajes.innerHTML = 'La canción No existe, prueba con otra búsqueda';
                         UI.divMensajes.classList.add('alert-danger');
                         setTimeout(() => {
                              UI.divMensajes.innerHTML = '';
                              UI.divMensajes.classList.remove('alert-danger');
                              UI.spinner.classList.add('d-none')
                         }, 3000);
                    }
               })
               .catch(error => console.log(error))

     }
}