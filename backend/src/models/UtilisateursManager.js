const AbstractManager = require("./AbstractManager");

class UtilisateursManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "utilisateurs" as configuration
    super({ table: "utilisateurs" });
  }

  // The C of CRUD - Create operation

  async create(utilisateurs) {
    // Execute the SQL INSERT query to add a new utilisateurs to the "utilisateurs" table
    const [result] = await this.database.query(
      `insert into ${this.table} (nom,prénom,date_de_naissance,telephone,email,password,adresse1,adresse2,CP,ville,pays,seelie) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        utilisateurs.nom,
        utilisateurs.prénom,
        utilisateurs.date_de_naissance,
        utilisateurs.telephone,
        utilisateurs.email,
        utilisateurs.password,
        utilisateurs.adresse1,
        utilisateurs.adresse2,
        utilisateurs.CP,
        utilisateurs.ville,
        utilisateurs.pays,
        utilisateurs.seelie,
      ]
    );

    // Return the ID of the newly inserted utilisateurs
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific utilisateurs by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the utilisateurs
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all utilisateurs from the "utilisateurs" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of utilisateurs
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing utilisateurs

  // async update(utilisateurs) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an utilisateurs by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UtilisateursManager;
