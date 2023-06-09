'use strict';
const databaseService = require('../database/databaseService.js');

const shop = (fastify, _, done) => {
  fastify.get('/shops', async function (req, reply) {
    const shops = databaseService.getShops();
    reply.type('text/html').send(JSON.stringify(shops));
  });

  fastify.get('/shops/analysis/full', async function (req, reply) {
    const data = await databaseService.getShopPricesByDate();
    reply.type('text/html').send(JSON.stringify(data));
  });

  fastify.get('/shops/analysis/avg', async function (req, reply) {
    const data = await databaseService.getShopAvgPricesByDate();
    reply.type('text/html').send(JSON.stringify(data));
  });

  done();
};

module.exports = shop;
