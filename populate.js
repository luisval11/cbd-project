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

    music: [{_id: ObjectId(), author: "Pixie Lott", title: "Cry me out", mark: "masterpiece"}, {
      _id: ObjectId(),
      author: "The Fray",
      title: "How to save a life",
      description: "Song from 2009",
      mark: "good"
    }],
    films: [{_id: ObjectId(), author: "Jean-Pierre Jeunet", title: "Le fabuleux destin d'Amélie Poulain"}, {
      _id: ObjectId(),
      author: "David Fincher",
      title: "Fight Club",
      mark: "great"
    }],
    videogames: [{_id: ObjectId(), author: "Square Enix", title: "Kingdom Hearts 3", mark: "horrible"}, {
      _id: ObjectId(),
      author: "Nintendo",
      title: "The Legend of Zelda: Breath of the Wild",
      description: "Last game of Zelda's series in Nintendo Switch",
      mark: "masterpiece"
    }]
  }, {
    _id: ObjectId(),
    firstName: "Admin1",
    lastName: "Admin1",
    username: "admin1",
    password: "25f43b1486ad95a1398e3eeb3d83bc4010015fcc9bedb35b432e00298d5021f7",
    dni: "52932758Y",

    music: [{_id: ObjectId(), author: "Owl City", title: "Fireflies"}, {
      _id: ObjectId(),
      author: "The Script ft. will.i.am",
      title: "Hall of Fame",
      description: "Song's from 2012",
      mark: "great"
    }],
    films: [{_id: ObjectId(), author: "Francis Ford Coppola", title: "El padrino"}, {
      _id: ObjectId(),
      author: "Steven Spielberg",
      title: "La lista de Schindler",
      description: "Film from 1993",
      mark: "pending"
    }],
    videogames: []
  }]);
  print("¡Base populada con éxito!");
} catch (err) {
  print("Hubo un problema al popular la base :( " + err);
}
