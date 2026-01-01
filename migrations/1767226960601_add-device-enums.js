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
  // 0) Normalize existing data (must happen before enum cast)
  pgm.sql(`
    UPDATE devices SET type = 'EXO' WHERE type = 'EXOFRAME';
    UPDATE devices SET status = 'ONLINE'  WHERE status = 'ACTIVE';
    UPDATE devices SET status = 'OFFLINE' WHERE status = 'INACTIVE';
    UPDATE devices SET status = 'OFFLINE' WHERE status = 'MAINTENANCE';
  `);

  // 1) Enums
  pgm.createType("device_type", ["DRONE", "EXO", "SENSOR", "TURRET", "RELAY"]);
  pgm.createType("device_status", ["ONLINE", "OFFLINE", "ERROR"]);

  // 2) Convert columns
  pgm.alterColumn("devices", "type", {
    type: "device_type",
    using: "type::device_type",
  });

  pgm.alterColumn("devices", "status", {
    type: "device_status",
    using: "status::device_status",
    default: "OFFLINE",
  });

  // 3) Indexes
  pgm.createIndex("devices", "type");
  pgm.createIndex("devices", "status");
  pgm.createIndex("devices", "last_seen_at");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropIndex("devices", "last_seen_at");
  pgm.dropIndex("devices", "status");
  pgm.dropIndex("devices", "type");

  pgm.alterColumn("devices", "type", { type: "text" });
  pgm.alterColumn("devices", "status", { type: "text" });

  pgm.dropType("device_status");
  pgm.dropType("device_type");
};
