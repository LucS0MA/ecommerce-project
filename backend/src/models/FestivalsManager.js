const AbstractManager = require("./AbstractManager");

class FestivalsManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "festivals" as configuration
    super({ table: "festivals" });
  }

  // The C of CRUD - Create operation

  async create(festivals) {
    // Execute the SQL INSERT query to add a new festivals to the "festivals" table
    const [result] = await this.database.query(
      `insert into ${this.table} (nom,lieu,date) values (?,?,?)`,
      [festivals.nom, festivals.lieu, festivals.date]
    );

    // Return the ID of the newly inserted festivals
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific festivals by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the festivals
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all festivals from the "festivals" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of festivals
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing festivals

  // async update(festivals) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an festivals by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = FestivalsManager;
