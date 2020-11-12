import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createUsuario1604970698780 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'usuario',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'sexo',
          type: 'enum',
          enum: ['M', 'F'],
        },
        {
          name: 'username',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'id_perfil',
          type: 'integer',
          unsigned: true,
        },
        {
          name: 'id_curso',
          type: 'integer',
          unsigned: true,
        },
      ]
    }));

    await queryRunner.createForeignKey("usuario", new TableForeignKey({
      columnNames: ['id_curso'],
      referencedTableName: 'curso',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }));

    await queryRunner.createForeignKey("usuario", new TableForeignKey({
      columnNames: ['id_perfil'],
      referencedTableName: 'perfil',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuario');
  }

}
