const accessTokenRouter = require('./accessTokenRoute'),
	accountRouter = require('./accountRoute'),
	cartRouter = require('./cartRoute'),
	distributorRouter = require('./distributorRoute'),
	inventoryRouter = require('./inventoryRoute'),
	orderRouter = require('./orderRoute'),
	productRouter = require('./productRoute'),
	stockRouter = require('./stockRoute'),
	reportRouter = require('./reportRoute'),
	logRouter = require('./logRoute'),
	express = require('express'),
	router = express.Router();
router.use('/', accessTokenRouter);
router.use('/', accountRouter);
router.use('/', cartRouter);
router.use('/', distributorRouter);
router.use('/', inventoryRouter);
router.use('/', orderRouter);
router.use('/', productRouter);
router.use('/', accessTokenRouter);
router.use('/', stockRouter);
router.use('/', reportRouter);
router.use('/', logRouter);

module.exports = router;
