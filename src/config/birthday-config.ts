// Configuração personalizada do site de aniversário
// Edite este arquivo para personalizar o nome e as mensagens

export const birthdayConfig = {
  // Nome do aniversariante
  name: "Maju", // <- ALTERE AQUI para o nome real
  
  // Mensagens personalizadas
  messages: {
    hero: {
      greeting: "Feliz Aniversário,",
      subtitle: "Que este dia seja tão especial quanto você é!",
    },
    
    wishes: [
      {
        title: "Te amo",
        text: "Que o amor te acompanhe em cada passo e que você sempre se sinta querida e especial!",
      },
      {
        title: "Você arrasa",
        text: "Que todos os seus sonhos se realizem e que você alcance tudo o que deseja na vida!",
      },
      {
        title: "Gratidão por existir",
        text: "Que cada dia seja repleto de alegria, risadas e momentos inesquecíveis!",
      },
    ],

    portal: {
      title: "Feliz Aniversário!",
      paragraphs: [
        " Feliz vida!!!",
      ],
  

  // Fotos da galeria - adicione suas fotos na pasta public/photos/
  photos: [
    {
      filename: "foto1.jpg", // <- Nome do arquivo em public/photos/
      caption: "Titulo",
      date: "2025",
    },
    {
      filename: "foto2.jpg",
      caption: "Titulo",
      date: "2025",
    },
    {
      filename: "foto3.jpg",
      caption: "Titul",
      date: "2025",
    },
    {
      filename: "foto4.jpg",
      caption: "Celebrando a vida",
      date: "2025",
    },
    {
      filename: "foto5.jpg",
      caption: "Titulo",
      date: "2025",
    },
    {
      filename: "foto6.jpg",
      caption: "Titul",
      date: "2025",
    },
  ],
};
