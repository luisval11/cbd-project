try {
  // CONFIGURACION DEL POPULATE
  const nombreBase = "cbd";
  const puertoBase = "27017";
  let collections = ["users"];
  db = connect("localhost:" + puertoBase + "/" + nombreBase)
  // SCRIPT DE POPULACION
  print("Vaciando base...");
  db.dropDatabase();
  print("Creando las colecciones...");
  for (let i = 0; i < collections.length; i++) {
    db.createCollection(collections[i]);
  }
  print("Insertando datos...");
  db.users.insert([{
    _id: ObjectId(),
    firstName: "Admin",
    lastName: "Admin",
    username: "admin",
    password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    dni: "52932758Y",

    music: [{_id: ObjectId(), author: "pepe", title: "hola don pepito"}, {
      _id: ObjectId(),
      author: "paco",
      title: "el partio de mi casa",
      description: "cancionaca",
      mark: "masterpiece"
    }],
    films: [{_id: ObjectId(), author: "willy wonka", title: "charlie y la fabrica de chocolate"}, {
      _id: ObjectId(),
      author: "mogly",
      title: "el libro de la selva",
      description: "xddd",
      mark: "good"
    }],
    videogames: [{_id: ObjectId(), author: "sora", title: "kh1"}, {
      _id: ObjectId(),
      author: "riku",
      title: "kh2",
      description: "el ultimo juego enumerado de kh",
      mark: "good"
    }]
  }, {
    _id: ObjectId(),
    firstName: "Admin",
    lastName: "Admin",
    username: "admin1",
    password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    dni: "52932758Y",

    music: [{_id: ObjectId(), author: "jose", title: "hola don jose"}, {
      _id: ObjectId(),
      author: "paco",
      title: "5 lobitos tiene la loba",
      description: "cancionaca",
      mark: "masterpiece"
    }],
    films: [{_id: ObjectId(), author: "torrente", title: "niños grandes"}, {
      _id: ObjectId(),
      author: "mogly",
      title: "el libro de la selva",
      description: "xddd",
      mark: "good"
    }],
    videogames: []
  }]);
  print("¡Base populada con éxito!");
} catch (err) {
  print("Hubo un problema al popular la base :( " + err);
}
