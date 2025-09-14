const poslovnoPravilo = require("./pp.json");

// polovina od ukupnog broja clanova + 1 clan da bi preslo 50%
const kvorum = ((poslovnoPravilo.ukupanBrojClanova * 50) / 100) + 1; 


module.exports = kvorum;