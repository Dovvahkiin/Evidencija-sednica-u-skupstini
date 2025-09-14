const poslovnoPravilo = require("./pp.json");

const kvorum = (poslovnoPravilo.ukupanBrojClanova * 50) / 100; 

module.exports = kvorum;