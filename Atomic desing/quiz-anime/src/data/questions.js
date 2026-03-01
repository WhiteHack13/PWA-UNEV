const questions = [
  {
    "id": 1,
    "category": "Naruto",
    "question": "¿Quién es el Cuarto Hokage?",
    "options": [
      "Hashirama",
      "Minato Namikaze",
      "Tobirama",
      "Hiruzen"
    ],
    "correctIndex": 1
  },
  {
    "id": 2,
    "category": "Naruto",
    "question": "¿Qué bestia sellaron dentro de Naruto al nacer?",
    "options": [
      "Shukaku",
      "Kurama",
      "Gyūki",
      "Matatabi"
    ],
    "correctIndex": 1
  },
  {
    "id": 3,
    "category": "Naruto",
    "question": "¿Cómo se llama el examen para ascender a Chūnin?",
    "options": [
      "Examen ANBU",
      "Examen Jōnin",
      "Examen Chūnin",
      "Examen Kage"
    ],
    "correctIndex": 2
  },
  {
    "id": 4,
    "category": "Naruto",
    "question": "¿Quién es el líder original de Akatsuki en la era de Nagato?",
    "options": [
      "Yahiko",
      "Itachi",
      "Kisame",
      "Deidara"
    ],
    "correctIndex": 0
  },
  {
    "id": 5,
    "category": "Naruto",
    "question": "¿Qué clan es conocido por el Sharingan?",
    "options": [
      "Hyūga",
      "Uzumaki",
      "Uchiha",
      "Nara"
    ],
    "correctIndex": 2
  },
  {
    "id": 6,
    "category": "Naruto",
    "question": "¿Cuál es el elemento natural principal de Sasuke al inicio?",
    "options": [
      "Rayo",
      "Viento",
      "Agua",
      "Tierra"
    ],
    "correctIndex": 0
  },
  {
    "id": 7,
    "category": "Naruto",
    "question": "¿Quién entrena a Naruto durante gran parte de su niñez?",
    "options": [
      "Kakashi",
      "Jiraiya",
      "Orochimaru",
      "Asuma"
    ],
    "correctIndex": 1
  },
  {
    "id": 8,
    "category": "Naruto",
    "question": "¿Cómo se llama la técnica de sombras de Shikamaru?",
    "options": [
      "Rasengan",
      "Kage Bunshin",
      "Kage Mane",
      "Chidori"
    ],
    "correctIndex": 2
  },
  {
    "id": 9,
    "category": "Naruto",
    "question": "¿Qué rango tiene Kakashi al inicio de la serie?",
    "options": [
      "Genin",
      "Chūnin",
      "Jōnin",
      "Kage"
    ],
    "correctIndex": 2
  },
  {
    "id": 10,
    "category": "Naruto",
    "question": "¿Qué aldea es conocida como la 'Hoja'?",
    "options": [
      "Sunagakure",
      "Kirigakure",
      "Konohagakure",
      "Kumogakure"
    ],
    "correctIndex": 2
  },
  {
    "id": 11,
    "category": "One Piece",
    "question": "¿Cuál es el sueño de Luffy?",
    "options": [
      "Ser Marine",
      "Ser Rey de los Piratas",
      "Ser Shichibukai",
      "Encontrar a Joy Boy"
    ],
    "correctIndex": 1
  },
  {
    "id": 12,
    "category": "One Piece",
    "question": "¿Cómo se llama la espada más usada por Zoro (triple estilo)?",
    "options": [
      "Wado Ichimonji",
      "Kikoku",
      "Yoru",
      "Shusui"
    ],
    "correctIndex": 0
  },
  {
    "id": 13,
    "category": "One Piece",
    "question": "¿Qué fruta comió Luffy (nombre clásico)?",
    "options": [
      "Mera Mera no Mi",
      "Gomu Gomu no Mi",
      "Hie Hie no Mi",
      "Ope Ope no Mi"
    ],
    "correctIndex": 1
  },
  {
    "id": 14,
    "category": "One Piece",
    "question": "¿Quién es el cocinero de los Sombrero de Paja?",
    "options": [
      "Usopp",
      "Sanji",
      "Franky",
      "Brook"
    ],
    "correctIndex": 1
  },
  {
    "id": 15,
    "category": "One Piece",
    "question": "¿Qué mar separa la mayoría de aventuras iniciales?",
    "options": [
      "North Blue",
      "East Blue",
      "West Blue",
      "South Blue"
    ],
    "correctIndex": 1
  },
  {
    "id": 16,
    "category": "One Piece",
    "question": "¿Cómo se llama el barco icónico después del Going Merry?",
    "options": [
      "Red Force",
      "Thousand Sunny",
      "Oro Jackson",
      "Moby Dick"
    ],
    "correctIndex": 1
  },
  {
    "id": 17,
    "category": "One Piece",
    "question": "¿Qué organización persigue a los piratas globalmente?",
    "options": [
      "CP0",
      "La Marina",
      "Revolutionaries",
      "Baroque Works"
    ],
    "correctIndex": 1
  },
  {
    "id": 18,
    "category": "One Piece",
    "question": "¿Quién es el doctor de la tripulación?",
    "options": [
      "Chopper",
      "Nami",
      "Robin",
      "Jinbe"
    ],
    "correctIndex": 0
  },
  {
    "id": 19,
    "category": "One Piece",
    "question": "¿Qué es el 'Grand Line'?",
    "options": [
      "Un arma",
      "Un océano/route peligrosa",
      "Un reino",
      "Un tesoro"
    ],
    "correctIndex": 1
  },
  {
    "id": 20,
    "category": "One Piece",
    "question": "¿Quién es el músico de la tripulación?",
    "options": [
      "Brook",
      "Sanji",
      "Usopp",
      "Zoro"
    ],
    "correctIndex": 0
  },
  {
    "id": 21,
    "category": "Bleach",
    "question": "¿Cómo se llama el protagonista?",
    "options": [
      "Ichigo Kurosaki",
      "Naruto Uzumaki",
      "Gon Freecss",
      "Edward Elric"
    ],
    "correctIndex": 0
  },
  {
    "id": 22,
    "category": "Bleach",
    "question": "¿Qué es una 'Zanpakutō'?",
    "options": [
      "Un hechizo",
      "Una espada espiritual",
      "Una máscara",
      "Un sello"
    ],
    "correctIndex": 1
  },
  {
    "id": 23,
    "category": "Bleach",
    "question": "¿Cómo se llama la forma liberada inicial de la Zanpakutō?",
    "options": [
      "Bankai",
      "Shikai",
      "Resurrección",
      "Senbon"
    ],
    "correctIndex": 1
  },
  {
    "id": 24,
    "category": "Bleach",
    "question": "¿Qué organización pertenece Rukia?",
    "options": [
      "Gotei 13",
      "Akatsuki",
      "Marina",
      "Survey Corps"
    ],
    "correctIndex": 0
  },
  {
    "id": 25,
    "category": "Bleach",
    "question": "¿Qué es el 'Bankai'?",
    "options": [
      "Liberación avanzada",
      "Técnica médica",
      "Tipo de Hollow",
      "Un rango"
    ],
    "correctIndex": 0
  },
  {
    "id": 26,
    "category": "Bleach",
    "question": "¿Quién es el capitán de la 6ª división (muy conocido)?",
    "options": [
      "Byakuya",
      "Kenpachi",
      "Hitsugaya",
      "Ukitake"
    ],
    "correctIndex": 0
  },
  {
    "id": 27,
    "category": "Bleach",
    "question": "¿Qué son los Hollows?",
    "options": [
      "Espíritus corrompidos",
      "Piratas",
      "Ninjas",
      "Androides"
    ],
    "correctIndex": 0
  },
  {
    "id": 28,
    "category": "Bleach",
    "question": "¿Cómo se llama el mundo de las almas?",
    "options": [
      "Soul Society",
      "Grand Line",
      "Konoha",
      "Amestris"
    ],
    "correctIndex": 0
  },
  {
    "id": 29,
    "category": "Bleach",
    "question": "¿Qué es un Shinigami?",
    "options": [
      "Cazador",
      "Segador de almas",
      "Pirata",
      "Hechicero"
    ],
    "correctIndex": 1
  },
  {
    "id": 30,
    "category": "Bleach",
    "question": "¿Quién es el creador del Hōgyoku (más asociado)?",
    "options": [
      "Urahara",
      "Renji",
      "Chad",
      "Ishida"
    ],
    "correctIndex": 0
  },
  {
    "id": 31,
    "category": "Dragon Ball",
    "question": "¿Cómo se llama el protagonista?",
    "options": [
      "Goku",
      "Vegeta",
      "Gohan",
      "Trunks"
    ],
    "correctIndex": 0
  },
  {
    "id": 32,
    "category": "Dragon Ball",
    "question": "¿Cuántas Esferas del Dragón hay normalmente?",
    "options": [
      "5",
      "6",
      "7",
      "9"
    ],
    "correctIndex": 2
  },
  {
    "id": 33,
    "category": "Dragon Ball",
    "question": "¿Cómo se llama el dragón que concede deseos en la Tierra?",
    "options": [
      "Porunga",
      "Shenlong",
      "Ryuk",
      "Kurama"
    ],
    "correctIndex": 1
  },
  {
    "id": 34,
    "category": "Dragon Ball",
    "question": "¿Cuál es el príncipe de los Saiyajin?",
    "options": [
      "Goku",
      "Vegeta",
      "Broly",
      "Raditz"
    ],
    "correctIndex": 1
  },
  {
    "id": 35,
    "category": "Dragon Ball",
    "question": "¿Qué técnica icónica usa Goku (onda de energía)?",
    "options": [
      "Rasengan",
      "Kamehameha",
      "Getsuga",
      "Detroit Smash"
    ],
    "correctIndex": 1
  },
  {
    "id": 36,
    "category": "Dragon Ball",
    "question": "¿Cómo se llama el planeta natal de los Saiyajin?",
    "options": [
      "Namek",
      "Vegeta",
      "Krypton",
      "Earth"
    ],
    "correctIndex": 1
  },
  {
    "id": 37,
    "category": "Dragon Ball",
    "question": "¿Quién entrenó a Goku de niño en artes marciales?",
    "options": [
      "Roshi",
      "Piccolo",
      "Beerus",
      "Jiren"
    ],
    "correctIndex": 0
  },
  {
    "id": 38,
    "category": "Dragon Ball",
    "question": "¿Qué raza es Piccolo?",
    "options": [
      "Saiyajin",
      "Namekiano",
      "Humano",
      "Androide"
    ],
    "correctIndex": 1
  },
  {
    "id": 39,
    "category": "Dragon Ball",
    "question": "¿Qué es 'Super Saiyajin'?",
    "options": [
      "Un arma",
      "Transformación",
      "Un dojo",
      "Un torneo"
    ],
    "correctIndex": 1
  },
  {
    "id": 40,
    "category": "Dragon Ball",
    "question": "¿Quién es el rival-amigo más clásico de Goku?",
    "options": [
      "Krillin",
      "Vegeta",
      "Yamcha",
      "Tien"
    ],
    "correctIndex": 1
  },
  {
    "id": 41,
    "category": "Attack on Titan",
    "question": "¿Quién es el protagonista principal?",
    "options": [
      "Eren",
      "Armin",
      "Levi",
      "Erwin"
    ],
    "correctIndex": 0
  },
  {
    "id": 42,
    "category": "Attack on Titan",
    "question": "¿Qué organización protege dentro de los muros?",
    "options": [
      "Cazadores",
      "Cuerpo de Exploración",
      "Akatsuki",
      "CP9"
    ],
    "correctIndex": 1
  },
  {
    "id": 43,
    "category": "Attack on Titan",
    "question": "¿Cómo se llaman los muros principales (uno de ellos)?",
    "options": [
      "Maria",
      "Konoha",
      "Sunny",
      "Central"
    ],
    "correctIndex": 0
  },
  {
    "id": 44,
    "category": "Attack on Titan",
    "question": "¿Qué arma usan para moverse en 3D?",
    "options": [
      "ODM",
      "Rope",
      "Hover",
      "Jetpack"
    ],
    "correctIndex": 0
  },
  {
    "id": 45,
    "category": "Attack on Titan",
    "question": "¿Quién es conocida por su fuerza y lealtad a Eren?",
    "options": [
      "Mikasa",
      "Historia",
      "Sasha",
      "Annie"
    ],
    "correctIndex": 0
  },
  {
    "id": 46,
    "category": "Attack on Titan",
    "question": "¿Qué titán tiene el poder de endurecimiento? (asociado)",
    "options": [
      "Titán Acorazado",
      "Titán Bestia",
      "Titán Carro",
      "Titán Colosal"
    ],
    "correctIndex": 0
  },
  {
    "id": 47,
    "category": "Attack on Titan",
    "question": "¿Cuál es el objetivo principal del Cuerpo de Exploración?",
    "options": [
      "Explorar fuera de los muros",
      "Pescar",
      "Ser piratas",
      "Ganar torneos"
    ],
    "correctIndex": 0
  },
  {
    "id": 48,
    "category": "Attack on Titan",
    "question": "¿Quién es famoso por ser 'el más fuerte' en combate humano?",
    "options": [
      "Levi",
      "Jean",
      "Connie",
      "Marco"
    ],
    "correctIndex": 0
  },
  {
    "id": 49,
    "category": "Attack on Titan",
    "question": "¿Qué amenaza principal enfrenta la humanidad al inicio?",
    "options": [
      "Hollows",
      "Titanes",
      "Demonios",
      "Androides"
    ],
    "correctIndex": 1
  },
  {
    "id": 50,
    "category": "Attack on Titan",
    "question": "¿Qué habilidad permite controlar/ordenar titanes? (término común)",
    "options": [
      "Fundador",
      "Bankai",
      "Haki",
      "Nen"
    ],
    "correctIndex": 0
  },
  {
    "id": 51,
    "category": "Jujutsu Kaisen",
    "question": "¿Quién es el protagonista?",
    "options": [
      "Yuji Itadori",
      "Gojo",
      "Megumi",
      "Sukuna"
    ],
    "correctIndex": 0
  },
  {
    "id": 52,
    "category": "Jujutsu Kaisen",
    "question": "¿Qué es Sukuna para Yuji?",
    "options": [
      "Un maestro",
      "Una maldición dentro de él",
      "Un aliado",
      "Un arma"
    ],
    "correctIndex": 1
  },
  {
    "id": 53,
    "category": "Jujutsu Kaisen",
    "question": "¿Quién es el hechicero más famoso por sus ojos?",
    "options": [
      "Nanami",
      "Gojo",
      "Todo",
      "Geto"
    ],
    "correctIndex": 1
  },
  {
    "id": 54,
    "category": "Jujutsu Kaisen",
    "question": "¿Qué usan para combatir maldiciones?",
    "options": [
      "Energía maldita",
      "Haki",
      "Chakra",
      "Ki"
    ],
    "correctIndex": 0
  },
  {
    "id": 55,
    "category": "Jujutsu Kaisen",
    "question": "¿Cómo se llama el amigo de Yuji con sombras (shikigami)?",
    "options": [
      "Megumi",
      "Inumaki",
      "Panda",
      "Maki"
    ],
    "correctIndex": 0
  },
  {
    "id": 56,
    "category": "Jujutsu Kaisen",
    "question": "¿Qué técnica de Gojo es famosa por su 'vacío'?",
    "options": [
      "Infinito",
      "Chidori",
      "Kamehameha",
      "Alchemy"
    ],
    "correctIndex": 0
  },
  {
    "id": 57,
    "category": "Jujutsu Kaisen",
    "question": "¿Qué es una 'maldición' en la serie?",
    "options": [
      "Espíritu negativo",
      "Pirata",
      "Hollow",
      "Titán"
    ],
    "correctIndex": 0
  },
  {
    "id": 58,
    "category": "Jujutsu Kaisen",
    "question": "¿Dónde entrenan principalmente al inicio?",
    "options": [
      "Escuela Técnica de Jujutsu",
      "Konoha",
      "Soul Society",
      "UA"
    ],
    "correctIndex": 0
  },
  {
    "id": 59,
    "category": "Jujutsu Kaisen",
    "question": "¿Qué hace Inumaki al hablar?",
    "options": [
      "Canta",
      "Habla con palabras selladas",
      "Silba",
      "Grita"
    ],
    "correctIndex": 1
  },
  {
    "id": 60,
    "category": "Jujutsu Kaisen",
    "question": "¿Qué criatura es Panda?",
    "options": [
      "Un humano disfrazado",
      "Un cadáver maldito",
      "Un titán",
      "Un demonio"
    ],
    "correctIndex": 1
  },
  {
    "id": 61,
    "category": "Demon Slayer",
    "question": "¿Quién es el protagonista?",
    "options": [
      "Tanjiro",
      "Zenitsu",
      "Inosuke",
      "Giyu"
    ],
    "correctIndex": 0
  },
  {
    "id": 62,
    "category": "Demon Slayer",
    "question": "¿Qué busca Tanjiro principalmente?",
    "options": [
      "Ser Hokage",
      "Curar a Nezuko",
      "Encontrar One Piece",
      "Ser alquimista"
    ],
    "correctIndex": 1
  },
  {
    "id": 63,
    "category": "Demon Slayer",
    "question": "¿Qué arma principal usan los cazadores?",
    "options": [
      "Espadas Nichirin",
      "Kunai",
      "Arcos",
      "Lanzas"
    ],
    "correctIndex": 0
  },
  {
    "id": 64,
    "category": "Demon Slayer",
    "question": "¿Cómo se llama la hermana de Tanjiro?",
    "options": [
      "Nezuko",
      "Mikasa",
      "Rukia",
      "Nami"
    ],
    "correctIndex": 0
  },
  {
    "id": 65,
    "category": "Demon Slayer",
    "question": "¿Qué respiración usa Zenitsu?",
    "options": [
      "Agua",
      "Rayo",
      "Fuego",
      "Viento"
    ],
    "correctIndex": 1
  },
  {
    "id": 66,
    "category": "Demon Slayer",
    "question": "¿Quién lleva una máscara de jabalí?",
    "options": [
      "Inosuke",
      "Giyu",
      "Rengoku",
      "Tengen"
    ],
    "correctIndex": 0
  },
  {
    "id": 67,
    "category": "Demon Slayer",
    "question": "¿Qué son los Hashira?",
    "options": [
      "Capitanes élite",
      "Piratas",
      "Hollows",
      "Titantes"
    ],
    "correctIndex": 0
  },
  {
    "id": 68,
    "category": "Demon Slayer",
    "question": "¿Cuál es el enemigo principal (tipo) de la serie?",
    "options": [
      "Demonios",
      "Maldiciones",
      "Titanes",
      "Aliens"
    ],
    "correctIndex": 0
  },
  {
    "id": 69,
    "category": "Demon Slayer",
    "question": "¿Qué respiración usa Tanjiro al inicio (más reconocible)?",
    "options": [
      "Agua",
      "Rayo",
      "Niebla",
      "Amor"
    ],
    "correctIndex": 0
  },
  {
    "id": 70,
    "category": "Demon Slayer",
    "question": "¿Quién es un Hashira famoso por el fuego?",
    "options": [
      "Rengoku",
      "Shinobu",
      "Obanai",
      "Muichiro"
    ],
    "correctIndex": 0
  },
  {
    "id": 71,
    "category": "My Hero Academia",
    "question": "¿Quién es el protagonista?",
    "options": [
      "Midoriya",
      "Bakugo",
      "All Might",
      "Todoroki"
    ],
    "correctIndex": 0
  },
  {
    "id": 72,
    "category": "My Hero Academia",
    "question": "¿Cómo se llama el poder heredado de All Might?",
    "options": [
      "One For All",
      "All For One",
      "Bankai",
      "Nen"
    ],
    "correctIndex": 0
  },
  {
    "id": 73,
    "category": "My Hero Academia",
    "question": "¿Cómo se llama la academia?",
    "options": [
      "UA",
      "Konoha",
      "Soul Society",
      "Jujutsu Tech"
    ],
    "correctIndex": 0
  },
  {
    "id": 74,
    "category": "My Hero Academia",
    "question": "¿Qué significa 'Quirk'?",
    "options": [
      "Poder/habilidad",
      "Espada",
      "Demonio",
      "Titán"
    ],
    "correctIndex": 0
  },
  {
    "id": 75,
    "category": "My Hero Academia",
    "question": "¿Quién es el rival explosivo de Midoriya?",
    "options": [
      "Bakugo",
      "Iida",
      "Kirishima",
      "Tokoyami"
    ],
    "correctIndex": 0
  },
  {
    "id": 76,
    "category": "My Hero Academia",
    "question": "¿Quién tiene mitad fuego mitad hielo?",
    "options": [
      "Todoroki",
      "Endeavor",
      "Dabi",
      "Shoto?"
    ],
    "correctIndex": 0
  },
  {
    "id": 77,
    "category": "My Hero Academia",
    "question": "¿Quién es el símbolo de la paz?",
    "options": [
      "All Might",
      "Aizawa",
      "Present Mic",
      "Stain"
    ],
    "correctIndex": 0
  },
  {
    "id": 78,
    "category": "My Hero Academia",
    "question": "¿Quién es el villano principal (más asociado)?",
    "options": [
      "All For One",
      "Shigaraki",
      "Overhaul",
      "Gentle"
    ],
    "correctIndex": 1
  },
  {
    "id": 79,
    "category": "My Hero Academia",
    "question": "¿Qué héroe duerme mucho y usa somníferos? (apodo)",
    "options": [
      "Midnight",
      "Snipe",
      "Fat Gum",
      "Aizawa"
    ],
    "correctIndex": 3
  },
  {
    "id": 80,
    "category": "My Hero Academia",
    "question": "¿Qué tipo de examen hacen para entrar a UA?",
    "options": [
      "Robots",
      "Cocina",
      "Pesca",
      "Magia"
    ],
    "correctIndex": 0
  },
  {
    "id": 81,
    "category": "Fullmetal Alchemist",
    "question": "¿Quiénes son los hermanos protagonistas?",
    "options": [
      "Edward y Alphonse",
      "Goku y Vegeta",
      "Naruto y Sasuke",
      "Luffy y Zoro"
    ],
    "correctIndex": 0
  },
  {
    "id": 82,
    "category": "Fullmetal Alchemist",
    "question": "¿Qué buscan para recuperar sus cuerpos?",
    "options": [
      "Piedra Filosofal",
      "One Piece",
      "Dragon Balls",
      "Hōgyoku"
    ],
    "correctIndex": 0
  },
  {
    "id": 83,
    "category": "Fullmetal Alchemist",
    "question": "¿Qué regla central rompe la alquimia sin pago?",
    "options": [
      "Intercambio equivalente",
      "Haki",
      "Chakra",
      "Nen"
    ],
    "correctIndex": 0
  },
  {
    "id": 84,
    "category": "Fullmetal Alchemist",
    "question": "¿Qué es Alphonse la mayor parte de la serie?",
    "options": [
      "Armadura",
      "Titán",
      "Hollow",
      "Pirata"
    ],
    "correctIndex": 0
  },
  {
    "id": 85,
    "category": "Fullmetal Alchemist",
    "question": "¿Qué rango militar tiene Edward?",
    "options": [
      "Alquimista Estatal",
      "Capitán",
      "Hokage",
      "Shinigami"
    ],
    "correctIndex": 0
  },
  {
    "id": 86,
    "category": "Fullmetal Alchemist",
    "question": "¿Nombre del país principal?",
    "options": [
      "Amestris",
      "Wano",
      "Konoha",
      "Namek"
    ],
    "correctIndex": 0
  },
  {
    "id": 87,
    "category": "Fullmetal Alchemist",
    "question": "¿Qué es un Homúnculo?",
    "options": [
      "Ser artificial",
      "Espada",
      "Academia",
      "Barco"
    ],
    "correctIndex": 0
  },
  {
    "id": 88,
    "category": "Fullmetal Alchemist",
    "question": "¿Quién es el alquimista de fuego?",
    "options": [
      "Roy Mustang",
      "Riza",
      "Hughes",
      "Scar"
    ],
    "correctIndex": 0
  },
  {
    "id": 89,
    "category": "Fullmetal Alchemist",
    "question": "¿Qué es la 'Verdad' (Truth) en la serie?",
    "options": [
      "Entidad metafísica",
      "Un titán",
      "Un demonio específico",
      "Un barco"
    ],
    "correctIndex": 0
  },
  {
    "id": 90,
    "category": "Fullmetal Alchemist",
    "question": "¿Qué parte pierde Edward al inicio?",
    "options": [
      "Brazo y pierna",
      "Ojos",
      "Cabello",
      "Memoria"
    ],
    "correctIndex": 0
  },
  {
    "id": 91,
    "category": "Death Note",
    "question": "¿Cómo se llama el protagonista?",
    "options": [
      "Light Yagami",
      "L",
      "Ryuk",
      "Misa"
    ],
    "correctIndex": 0
  },
  {
    "id": 92,
    "category": "Death Note",
    "question": "¿Qué hace el Death Note?",
    "options": [
      "Controla el clima",
      "Mata al escribir un nombre",
      "Da poderes",
      "Invoca dragones"
    ],
    "correctIndex": 1
  },
  {
    "id": 93,
    "category": "Death Note",
    "question": "¿Quién es el Shinigami más asociado al cuaderno?",
    "options": [
      "Ryuk",
      "Rem",
      "Ichigo",
      "Gojo"
    ],
    "correctIndex": 0
  },
  {
    "id": 94,
    "category": "Death Note",
    "question": "¿Cómo se llama el detective rival?",
    "options": [
      "L",
      "N",
      "Mello",
      "Near"
    ],
    "correctIndex": 0
  },
  {
    "id": 95,
    "category": "Death Note",
    "question": "¿Qué debes saber para matar a alguien con el cuaderno?",
    "options": [
      "Nombre y rostro",
      "Edad y peso",
      "Dirección",
      "Sólo nombre"
    ],
    "correctIndex": 0
  },
  {
    "id": 96,
    "category": "Death Note",
    "question": "¿Quién es la idol que apoya a Kira?",
    "options": [
      "Misa",
      "Rukia",
      "Nezuko",
      "Nami"
    ],
    "correctIndex": 0
  },
  {
    "id": 97,
    "category": "Death Note",
    "question": "¿Qué es un Shinigami?",
    "options": [
      "Dios de la muerte",
      "Pirata",
      "Ninja",
      "Titán"
    ],
    "correctIndex": 0
  },
  {
    "id": 98,
    "category": "Death Note",
    "question": "¿Cuál es el apodo mediático de Light?",
    "options": [
      "Kira",
      "Ace",
      "Zero",
      "Shadow"
    ],
    "correctIndex": 0
  },
  {
    "id": 99,
    "category": "Death Note",
    "question": "¿Qué alimento ama L (meme clásico)?",
    "options": [
      "Dulces",
      "Pizza",
      "Ramen",
      "Carne"
    ],
    "correctIndex": 0
  },
  {
    "id": 100,
    "category": "Death Note",
    "question": "¿Qué riesgo existe si un humano usa el cuaderno?",
    "options": [
      "Consecuencias y reglas estrictas",
      "Nada",
      "Se vuelve Hokage",
      "Gana Haki"
    ],
    "correctIndex": 0
  }
];

export default questions;
