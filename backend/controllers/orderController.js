import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Salon from '../models/salonModel.js'
import mongoose from 'mongoose'
import Specialist from '../models/specialistModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		date,
		time,
		salon,
		specialist,
	} = req.body

	// Check if there are order items
	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
		return
	} else {
		if (!mongoose.Types.ObjectId.isValid(salon) || !mongoose.Types.ObjectId.isValid(specialist)) {
			res.status(400);
			throw new Error('Invalid salon or specialist ID');
			return;
		}
		
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			date,
			time,
			salon,
			specialist,
		})

		// Save new order to the database
		const createdOrder = await order.save()
		res.status(201).json(createdOrder)
	}
})

const getSalonsWithSpecialists = asyncHandler(async (req, res) => {
    const salons = await Salon.find().populate('specialists');
    if (salons) {
        res.json(salons);
    } else {
        res.status(404);
        throw new Error('Salons not found');
    }
});
// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })
	res.json(orders)
})
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name')
	res.json(orders)
})
// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	getSalonsWithSpecialists,
}