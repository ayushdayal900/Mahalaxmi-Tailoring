const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/stats').get(protect, admin, getDashboardStats);
router.route('/orders').get(protect, admin, getAllOrders);
router.route('/orders/:id/status').patch(protect, admin, updateOrderStatus);

module.exports = router;
