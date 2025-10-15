module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'admin',
  password: '123456',
  database: 'devburger-db',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
