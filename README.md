
### **Sobre el Proyecto**

# DREAMSCAPE
Dreamscape es una plataforma interactiva dedicada a novelas e historias de cualquier género donde los autores o traductores puedan compartir sus obras al mundo.
A diferencias de otras paginas, nuestro enfoque es brindar una experiencia única para los lectores, combinando accesibilidad, diseño envolvente y una comunidad pensada para quienes aman sumergirse en nuevas historias.

# Misión
Brindar acceso a los autores y traductores una plataforma accesible y moderna donde puedan publicar y difundir sus obras a una audiencia global.

# Visión
Convertirnos en una comunidad literaria digital accesible y envolvente, donde cada historia  tenga una espacio y cada lector una experiencia envolvente.


# Problematica 
Actualmente existen diversas plataformas de publicación de novelas, pero muchas de ellas presentan problemas de legibilidad, navegación poco intuitiva y falta de accesibilidad, lo que dificulta la experiencia tanto para lectores como para creadores de contenido.


### **Guías de Estilo**
Dentro del archivo de css pueden encontrar **varibles.css** donde encontraran todas las paletas de colores, declariones de tipografia, escala de dimenciones para las etiquetas utilizadas en el proyecto.

```
project-root/
├── publict_html/
│   ├── css/
│   │   ├── main.css
│   │   └── variables.css
│   └── index.html
```

## clases de css complementarias 
1. Se ha añadido una clase container que permite redimensionar y escalar de manera sencilla el reponsive
```css
.container {
    width: 100%;
    min-width: 200px;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 6vw, 8rem);
}
```

2. En cada sección se agrega la clar landing-h para que ocupe toda la pantalla simulando asi una landing page
```css
.landing-h{
    padding-top: 100px;
    height: 100vh;
}
```


# Todos
- ✅ Eleguir paleta de colores
- ✅ Definir la lista de navegación
- ✅ Añadir una sección formulario sugerencias
- ✅ Añadir imagenes
- ⌛️ Añadir formulario de reclamaciones (⚡reporte de bug)
- Añadir una sección de tablas

# 👺Ideas de prototipado:

- ✅ Base de estructura de landing page
- ⌛️ Crear un animación en el background <-- keyframes -->
- ⌛️ Agregar parallax al hero section
- ⌛️ Añadir un modal para movil donde pueda navegar entre paginas dentro del contenido de la novela
- ⌛️ En el detalle de la novela poder agregar un video de referencia del trailer de la novela animada.
- ⌛️ Mostrar la lista de personajes de la novela.
- ⌛️ Mostrar un carrusel (opcional)
- ⌛️ ⚡reporte de bug - para que los lectores o autores puedan reportar alguna anomalia


- ⌛️ Posiblidad de subir audios tipo (podcats)
- ⌛️ Lectura automatica de la novela 
- ⌛️ Añadir una seccion de comentarios 

# Creditos de imagen
https://pixabay.com/es/users/andsproject-26081561/