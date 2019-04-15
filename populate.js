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
    role: "ADMIN",
    email: "admin@email.com",
    username: "admin",
    birthdate: new Date(ISODate("1963-03-05")),
    country: "Spain",
    city: "Seville",
    password: "6b7ad64360d682981e27fd6a9843fe8971efcdf5961f23a09a50bb6c3f0522e9",
    dni: "52932758Y",
  }]);
  print("¡Base populada con éxito!");
} catch (err) {
  print("Hubo un problema al popular la base :( " + err);
}
