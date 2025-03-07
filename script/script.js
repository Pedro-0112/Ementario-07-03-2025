//Loding...

document.addEventListener("DOMContentLoaded", function() {
  // Simula um tempo de carregamento de 3 segundos
  setTimeout(function() {
    document.getElementById("loading-overlay").style.display = "none";
  }, 3000);
});

//Diciplina

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todas as âncoras com links internos
    const anchors = document.querySelectorAll('.link-ancora-diciplina a');
  
    // Adiciona um evento de clique a cada âncora
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
   
  
        // Pega o destino da âncora (o valor após o #)
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          // Realiza a rolagem suave para o elemento alvo
          smoothScrollTo(targetElement);
        }
      });
    });
  
    // Função que anima a rolagem suave
    function smoothScrollTo(element) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const middlePosition = targetPosition - (window.innerHeight / 3.5);  // Coloca o elemento no meio da tela
        const startPosition = window.pageYOffset;
        const distance = middlePosition - startPosition;
        const duration = 200; // Duração da animação em milissegundos
        let startTime = null;
  
      // Função de animação
      function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
  
        window.scrollTo(0, scrollY);
  
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
  
      // Função de easing (efeito de aceleração/desaceleração suave)
      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
  
      requestAnimationFrame(animation);
    }
  });
  

//Periodo

const headerHeight = document.querySelector('header').offsetHeight;
const sections = document.querySelectorAll('section');

// Função para fazer o scroll suave usando requestAnimationFrame
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Função de easing (aceleração/desaceleração suave)
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Manipulador de clique nos links de navegação
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      sections.forEach(section => {
        section.style.display = 'none';
        section.style.opacity = '0';
        section.style.transform = 'translateY(0px)'; // Efeito de deslocamento
        section.style.transition = 'opacity 1.5s ease, transform 1s ease';
      });

      // Exibe o elemento alvo com animação
      targetElement.style.display = 'block';

      requestAnimationFrame(() => {
        setTimeout(() => {
          const isMobile = window.innerWidth <= 860; // Verificação de mobile
          const extraOffset = isMobile ? 230 : 100; // Offset dinâmico
          const rect = targetElement.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY - headerHeight - extraOffset;

          console.log("OffsetTop: ", offsetTop); // Verifique se o valor está correto

          // Animação suave de scroll personalizada
          smoothScrollTo(offsetTop, 200); // Duração em milissegundos (200ms)

          // Animação de exibição suave
          targetElement.style.opacity = '1';
          targetElement.style.transform = 'translateY(0)';
        }, 50);
      });
    }
  });
});

// Adicionando a classe ativa aos links de navegação
document.querySelectorAll('.link-ancora').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.link-ancora').forEach(l => l.classList.remove('ativo'));
    this.classList.add('ativo');
  });
});

// Adicionando a classe ativa aos links sem scroll
document.querySelectorAll('.no-scroll').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.no-scroll').forEach(l => l.classList.remove('ativo'));
    this.classList.add('ativo');
  });
});

    

// Botão
// Mostra ou esconde o botão "Voltar ao Topo" ao rolar a página
window.onscroll = function () {
  const backToTopButton = document.getElementById("back-to-top");
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      backToTopButton.style.display = "block"; // Mostra o botão
      setTimeout(() => {
          backToTopButton.classList.add("show"); // Adiciona a classe para a animação
      }, 10); // Pequeno delay para garantir que o display: block seja aplicado antes da animação
  } else {
      backToTopButton.classList.remove("show"); // Remove a classe para esconder com animação
      setTimeout(() => {
          backToTopButton.style.display = "none"; // Esconde o botão após a animação
      }, 200); // Tempo correspondente à duração da transição
  }
};

// Leva o usuário de volta ao topo ao clicar no botão
document.getElementById("back-to-top").onclick = function () {
  // Animação de scroll suave
  const scrollToTop = () => {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentPosition > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, currentPosition - currentPosition / 5); // Ajuste a velocidade aqui
      }
  };
  scrollToTop();
};

// Adiciona suporte para touch events em dispositivos móveis
document.getElementById("back-to-top").addEventListener('touchstart', function (e) {
  e.preventDefault(); // Previne o comportamento padrão do touch
  const scrollToTop = () => {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentPosition > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, currentPosition - currentPosition / 5); // Ajuste a velocidade aqui
      }
  };
  scrollToTop();
});

  