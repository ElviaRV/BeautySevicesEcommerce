import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<Card className='card-service-container my-3 p-3 rounded shadow-sm border-0' style={{ transition: 'transform 0.3s' }}>
			<Link to={`/product/${product._id}`}>
				<Card.Img
					src={product.image}
					variant='top'
					className='img-fluid rounded'
					style={{ height: '250px', objectFit: 'cover' }}
				/>
			</Link>
			<Card.Body className='text-center'>
				<Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#333' }}>
					<Card.Title as='div' className='fw-bold' style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
						{product.name}
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>
				<Card.Text as='h3' className='text-primary'>
					${product.price}
				</Card.Text>
				<Link to={`/product/${product._id}`}>
					<Button variant='outline-primary' className='mt-3'>
						Ver Producto
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default Product;
