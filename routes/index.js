const accessTokenRouter = require('./accessTokenRoute'),
	loginTokenRouter = require('./loginTokenRoute'),
	accountRouter = require('./accountRoute'),
	cartRouter = require('./cartRoute'),
	distributorRouter = require('./distributorRoute'),
	inventoryRouter = require('./inventoryRoute'),
	orderRouter = require('./orderRoute'),
	productRouter = require('./productRoute'),
	stockRouter = require('./stockRoute'),
	reportRouter = require('./reportRoute'),
	logRouter = require('./logRoute'),
	notificationRouter = require('./notificationRoute'),
	messagingRouter = require('./messagingRoute'),
	productFavorite = require('./productfavortieRoute'),
	memberShipRoute = require('./membershipRoute'),
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
router.use('/', loginTokenRouter);
router.use('/', notificationRouter);
router.use('/', messagingRouter);
router.use('/', productFavorite);
router.use('/', memberShipRoute);

module.exports = router;
