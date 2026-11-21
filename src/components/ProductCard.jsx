import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Rating } from 'primereact/rating';

const formatPrice = (value) =>
  Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function ProductCard({ product, onAddToCart }) {
  const { title, price, description, category, image, rating } = product;

  const header = (
    <div className="product-image-wrapper">
      <img src={image} alt={title} loading="lazy" />
    </div>
  );

  const footer = (
    <div className="flex align-items-center justify-content-between">
      <span className="text-2xl font-bold text-primary">{formatPrice(price)}</span>
      <Button
        label="Comprar"
        icon="pi pi-shopping-cart"
        size="small"
        onClick={() => onAddToCart && onAddToCart(product)}
      />
    </div>
  );

  return (
    <Card
      header={header}
      footer={footer}
      className="product-card h-full shadow-2 border-round"
    >
      <div className="mb-2">
        <Tag value={category} severity="info" rounded />
      </div>

      <h3 className="product-title text-base font-semibold mt-0 mb-2" title={title}>
        {title}
      </h3>

      <p className="product-description text-sm text-600 mt-0 mb-3 line-height-3">
        {description}
      </p>

      {rating && (
        <div className="flex align-items-center gap-2">
          <Rating value={Math.round(rating.rate)} readOnly cancel={false} />
          <span className="text-sm text-500">({rating.count})</span>
        </div>
      )}
    </Card>
  );
}

export default ProductCard;
