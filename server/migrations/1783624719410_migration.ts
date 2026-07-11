import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
    pgm.createTable('users', {
        id: 'id',
        name: { type: 'varchar(100)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            // default: pgm.func('current_timestamp'),
        },
    });
};

export const down = (pgm: MigrationBuilder) => { };
