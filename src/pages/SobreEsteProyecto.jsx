import "./SobreEsteProyecto.css";

function SobreEsteProyecto() {
  return (
    <section className="about-section">
      <h1>Sobre este proyecto</h1>

      <h2>Nombre y objetivo</h2>
      <p>
        <b>Tienda de películas</b> es una aplicación desarrollada como trabajo
        práctico para el curso de FrontEnd Avanzado de Hack Academy. Su
        principal objetivo es ofrecer una experiencia moderna y ágil para la{" "}
        <b>compra de películas</b> online, simulando el flujo completo de un
        e-commerce real.
      </p>

      <h2>Origen y contexto</h2>
      <p>
        El proyecto fue realizado en el marco del curso, como parte de un
        desafío integral para poner en práctica conocimientos avanzados de
        desarrollo web utilizando herramientas actuales y siguiendo buenas
        prácticas profesionales.
      </p>

      <h2>Tecnologías y herramientas utilizadas</h2>
      <ul>
        <li>
          <b>Frontend:</b>{" "}
          <span>
            React (componentes funcionales y hooks), Redux Toolkit para gestión
            del estado global, Redux-Persist para mantener el estado incluso
            tras recargar la página, Axios para las peticiones HTTP y CSS puro
            para los estilos.
          </span>
        </li>
        <li>
          <b>Estado global:</b>{" "}
          <span>
            El estado de la aplicación, como el carrito de compras y la
            autenticación, se maneja centralizadamente con <b>Redux Toolkit</b>.
            Esto permite una gestión eficiente y escalable de los datos entre
            los distintos componentes.
          </span>
        </li>
        <li>
          <b>API/backend:</b>{" "}
          <span>
            Las operaciones de login, registro de usuario, obtención de
            películas y órdenes de compra se realizan contra una API externa que
            fue provista por Hack Academy para uso de los estudiantes.
          </span>
        </li>
        <li>
          <b>Otras librerías:</b>{" "}
          <span>
            Se utilizan librerías como <b>React Toastify</b> para mostrar
            notificaciones al usuario, <b>React Icons</b> para los íconos y
            herramientas de desarrollo modernas proporcionadas por el ecosistema
            React.
          </span>
        </li>
        <li>
          <b>Autenticación:</b>{" "}
          <span>
            El sitio implementa un sistema de autenticación basado en tokens
            JWT, gestionando el acceso a funciones protegidas y personalizadas
            para cada usuario.
          </span>
        </li>
      </ul>

      <h2>Desafíos y aprendizajes</h2>
      <ul>
        <li>
          <b>Integración de múltiples tecnologías:</b>{" "}
          <span>
            Uno de los principales desafíos fue integrar Redux con React y
            asegurarse de que el estado global del carrito y del usuario se
            sincronice correctamente en todos los componentes.
          </span>
        </li>
        <li>
          <b>Gestión de errores y experiencia de usuario:</b>{" "}
          <span>
            Se implementaron notificaciones visuales y validaciones para mejorar
            la experiencia de usuario y anticipar errores comunes (como intentos
            de compra sin login o formularios incompletos).
          </span>
        </li>
        <li>
          <b>Práctica profesional:</b>{" "}
          <span>
            El desarrollo permitió profundizar conocimientos de buenas
            prácticas, modularización asi como el flujo completo de una SPA
            moderna.
          </span>
        </li>
      </ul>

      <h2>Responsable del desarrollo</h2>
      <p>
        El desarrollo y la integración estuvieron a cargo de{" "}
        <b>Aldo Gastón Hernández</b>. <br />
        <b>LinkedIn:</b>{" "}
        <a
          href="https://www.linkedin.com/in/aldo-hernandez-288134113/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.linkedin.com/in/aldo-hernandez-288134113/
        </a>
      </p>

      <h2>Agradecimientos</h2>
      <p>
        Gracias especiales a los profesores <b>Hernán Baravalle</b> y{" "}
        <b>Santiago Acosta Verrier</b> por su apoyo y acompañamiento constante
        durante el curso.
      </p>

      <h2>Mensaje final</h2>
      <p>
        Este proyecto representa muchas horas de dedicación, aprendizaje y
        pasión por la tecnología. Si llegaste hasta aquí, ¡espero que disfrutes
        explorando la aplicación tanto como yo disfruté desarrollarla! Si tenés
        comentarios, sugerencias o simplemente querés conectar, podés
        contactarme a través de LinkedIn.
      </p>
    </section>
  );
}

export default SobreEsteProyecto;
