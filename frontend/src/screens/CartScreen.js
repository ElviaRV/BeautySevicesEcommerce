// frontend/src/screens/CartScreen.js
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart, saveAppointmentDetails, getSalons } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id
	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [specialist, setSpecialist] = useState('')
	const [salon, setSalon] = useState('')

	const dispatch = useDispatch()

	const salonList = useSelector((state) => state.salonList)
	const { loading, error, salons } = salonList
	// const salons = [_id:]
	console.log(salonList)
	console.log(salons)
	console.log(error)
	console.log(loading)
	useEffect(() => {
		dispatch(getSalons())
	}, [dispatch])


	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		dispatch(saveAppointmentDetails({ date, time, salon, specialist }))
		history.push('/login?redirect=payment')
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>{item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(addToCart(item.product, Number(e.target.value)))
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<Form.Group controlId='date'>
											<Form.Label>Date</Form.Label>
											<Form.Control
												type='date'
												value={date}
												onChange={(e) => setDate(e.target.value)}
											></Form.Control>
										</Form.Group>
									</Col>
									<Col md={6}>
										<Form.Group controlId='time'>
											<Form.Label>Time</Form.Label>
											<Form.Control
												type='time'
												value={time}
												onChange={(e) => setTime(e.target.value)}
											></Form.Control>
										</Form.Group>
									</Col>
									<Col md={12}>
										<Form.Group controlId='salon'>
											<Form.Label>Salon</Form.Label>
											<Form.Control
												as='select'
												placeholder='Enter salon'
												value={salon}
												onChange={(e) => setSalon(e.target.value)}
											>
												<option>Select Salon</option>
                                            	{salons.map((salon) => (
                                                <option key={salon._id} value={salon._id}>
                                                    {salon.name}
                                                </option>
                                            ))}
											</Form.Control>
										</Form.Group>
									</Col>
									<Col md={12}>
										<Form.Group controlId='specialist'>
											<Form.Label>Specialist</Form.Label>
											<Form.Control
												as='select'
												placeholder='Enter specialist'
												value={specialist}
												onChange={(e) => setSpecialist(e.target.value)}
												disabled={!salon}
											>
												<option>Select Specialist</option>
                                            	{
													salons.find((s) => s._id === salon)?.specialists.map((specialist) => (
														<option key={specialist._id} value={specialist._id}>
															{specialist.name}
														</option>
													))
												}
											</Form.Control>
										</Form.Group>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) appointments
							</h2>
							{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen