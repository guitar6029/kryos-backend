/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  // create a new schema
  pgm.createTable("measurements", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    device_id: {
      type: "uuid",
      notNull: true,
      references: "devices",
      referencesConstraintName: "measurements_device_id_fkey",
      onDelete: "CASCADE",
    },
    recorded_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
    metric: {
      type: "text",
      notNull: true,
    },
    value: {
      type: "double precision",
      notNull: true,
    },
    unit: {
      type: "text",
      notNull: false,
    },
  });

  pgm.createIndex(
    "measurements",
    ["device_id", { name: "recorded_at", sort: "DESC" }],
    { name: "measurements_device_id_recorded_at_idx" }
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  //drop the measurment table
  // one way pgm.sql(`DROP TABLE measurement;`)
  // other way
  pgm.dropTable("measurements");
};
