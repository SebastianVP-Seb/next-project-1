/*
Para enviar JSX entre componentes:

<Compc prop1={()=><div>Texto enviado en JSX</div>}

//Donde se recibe:

<div>{ < props.prop1 /> }</div> --> Se encierra dentro de una etiqueta

useEffect se manda a llamar cada que el state o los props cambian

 npm install --save bulma  --> importar en _app.js

{/* Si no se tuviera la f handleSumar: y la mutación del state se hiciera directamente en el onClick, se tendría que usar 
      una f de flecha:
      <button onClick={()=>setContador(contador +1)} > + 1 </button> 

    //   <button onClick={handleSumar} > + 1 </button>

// Ejemplo de class components 
// class CompC extends React.Component {
//   render() {
//     return (
//       <div>
//         <h4>Hola desde un class component</h4>
//       </div>
//     )
//   }
// }

De BULMA:

  <script>
    document.addEventListener('DOMContentLoaded', () => {

      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

          });
        });
      }

    });
  </script>

Path absoluto: ya no se necesitan anhidar las carpetas en las importaciones, sólo el folder principal
Ej: 
import ResourceList from '../components/ResourceList';
Ahora sólo se escribe:
import ResourceList from 'components/ResourceList';
--> Se crea en la carpeta raíz el archivo: jsconfing.json.
--> Para que los cambios surtan efecto: se debe reiniciar la terminal

Para crear el Layout, en él se pone todo lo que queramos que la app tenga por default, y se le pasan los props.children, luego
se importa en el index y será el contenedor de toda la app. Como se quiere el Navbar en toda la app, éste comp se pone en el 
Layout y ya no es necesario importarlo en el index. Se importa en todas las páginas que se quiera.

--> Folder api para la obtención de datos
Para imprimir los datos de data.js, se deben transformar a un string: 
      {JSON.stringify(RESOURCES)}

--> Función slice: crea un nuevo arreglo con los elementos indicados, se definen en el index
slice(0,1) -> se quiere sólo los primeros dos elementos del arreglo
slice(1, 3) -> se quiere sólo del segundo elemento al cuarto
slice(2) -> se quiere sólo los elementos a partir del tercero

-->api functions: dentro de la carpeta pages, está el folder api con el archivo hello, aquí se pueden hacer las peticiones api.
Se puede comprobar en la URL: http://localhost:3000/api/hello

Dentro de index se pueden obtener los datos iniciales de la app, haciendo un fetch.
Se dice que se ejecuta del lado del servidor y del lado del cliente, porque hay código que sólo se ejecuta en una de éstas áreas
(console.log), dentro de la f Home es del lado del cliente, fuera es del lado del servidor (dentro del mismo archivo index)

Hacer otra "aplicación", la cual se encargará de gurdar lo que se escriba en el archivo json, ya que dentro de esta app no 
será posible, crear folder content-manager-app-api
Iniciarlo con npm init, crear archivo index.js
probar con un console.log, y luego en la tarminal ejecutar sólo ese archivo con: node index.js.

//Dentro del archivo new.js
Se pone en el botón submit: type='button', para evitar comportamiento por default del submit.

Para tener sólo una f que se encarge de traer el cambio en los inputs (y no tener que escribir una f por c/u): se le pone el 
name a los inputs, éste debe ser igual a la propiedad del arreglo de datos definido (del formulario)
Y se manda a llamar con e.target.name
Se evita esto:
                  const handlePriorityChange=(e)=>{
                      setForm({
                          ...form,
                          priority: e.target.value
                      });
                  };

                  const handleTimeChange=(e)=>{
                      setForm({
                          ...form,
                          timeToFinish:e.target.value
                      });
                  };

npm install --save axios   --> manera más fácil de hacer peticiones post, get

resource.id=Date.now().toString(); --> t en milisegundos, puede funcionar como id

Para navegar a otra pág con los detalles de una tarea creada, se crea otro get en el node server. Éste recibirá el id:

                    app.get('/api/resources/:id',(req, res)=>{
  El :id permitirá que la petición sea dinámica

  Para navegar a una pág con los detalles de un id específico dento del folder pages se crea un archivo:
  Dentro del folder "resources"

  [nombre].js -> permitirá navegar de froma más fácil hacia el objetivo deseado. Se pone entre [] porque ese parámetro
  será extraído de la URL.
  Para probar: en el navegador se pone: http://localhost:3000/resources/2433 (cualquier id)

====getInitialProps receives a single argument called context, it's an object with the following properties:====

      pathname - Current route. That is the path of the page in /pages
      query - Query string section of URL parsed as an object
      asPath - String of the actual path (including the query) shown in the browser
      req - HTTP request object (server only)
      res - HTTP response object (server only)
      err - Error object if any error is encountered during the rendering

//se manda a llamar c/vez que se visita la pág, la f se ejecuta en el sevidor. Los datos siempre serán "frescos"
export const getServerSideProps=async ()=>{
  const respuesta=await fetch('http://localhost:3001/api/resources');
  const resultado=await respuesta.json();

  return {
    props: {
      RESOURCES: resultado
    }
  }
};

//Se manda a llamar sólo en el proceso de construcción, por lo que sólo se ejecuta una vez. Se puede añadir una funcionalidad
//para que la pág cargue los datos más actualizados, pero no es tan rápida como getServerSideProps
getStaticProps funciona diferente con las páginas dinámicas ([id].js) -> antes de llamar esta f, se deben conocer todos los ids
generados -> crear la f getStaticPaths

export async function getStaticPaths () {
  const respuesta=await fetch('http://localhost:3001/api/resources');
  const resultado=await respuesta.json();

  const paths=data.map(resource=>{
    return {
      params: {id: resource.id}
    }
  });

  return {
    paths,
    //significa que si no hay una pág con ese id, regrese la pág 404. Cuando se define en true, la app intentará conseguir ese
    dato a través de un nuevo fetch
    fallback: false
  }
}
Al momento de ejecutar npm run build, se crearán tantas págs html como se tengan ids.
; con serverSideProps sólo se crea una página html


// export const getStaticProps=async ()=>{
//   const respuesta=await fetch('http://localhost:3000/api/resources');
//   const resultado=await respuesta.json();

//   return {
//     props: {
//       RESOURCES: resultado
//     }
//   }
// };

//getInitialProps se ejecuta de ambos lados, del lado del cliente y del lado del servidor:
userProfile.getInitialProps=async (contexto)=>{
    const respuesta=await fetch(`https://reqres.in/api/users/${contexto.query.id}`);
    const resultado=await respuesta.json();
    // console.log(resultado);//devuelve los datos en una prop llamada data

    return {perfil: resultado.data} --> se especifica explícitamente los datos que regresa
    // console.log(contexto.query.id);//aparece en la consola de la terminal
    // return {}
};

/////////////////Para hacer la pág de edición: /resources/id/edit
En el nombre de una ruta o path no se toma en cuenta el nombre "index":
Crear folder [id] -> dentro index.js ->copiar y pegar todo el código que se tenía en el [id].js
De esta forma se podrá crear el path arriba indicado








*/


