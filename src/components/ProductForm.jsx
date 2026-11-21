import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  'jewelery',
  'electronics',
];

const EMPTY_FORM = {
  title: '',
  price: null,
  description: '',
  category: null,
  image: '',
};

function ProductForm({ onSubmit, loading }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Informe o título.';
    if (form.price === null || form.price <= 0) newErrors.price = 'Informe um preço maior que zero.';
    if (!form.category) newErrors.category = 'Selecione uma categoria.';
    if (!form.description.trim()) newErrors.description = 'Informe a descrição.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const ok = await onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image.trim() || 'https://placehold.co/300x300?text=Sem+imagem',
    });

    if (ok) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  };

  const fieldError = (name) =>
    errors[name] ? <small className="p-error block mt-1">{errors[name]}</small> : null;

  return (
    <form onSubmit={handleSubmit} className="p-fluid formgrid grid">
      <div className="field col-12">
        <label htmlFor="title" className="font-medium">Título</label>
        <InputText
          id="title"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          className={errors.title ? 'p-invalid' : ''}
        />
        {fieldError('title')}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="price" className="font-medium">Preço (USD)</label>
        <InputNumber
          inputId="price"
          value={form.price}
          onValueChange={(e) => update('price', e.value)}
          mode="currency"
          currency="USD"
          locale="en-US"
          className={errors.price ? 'p-invalid' : ''}
        />
        {fieldError('price')}
      </div>

      <div className="field col-12 md:col-6">
        <label htmlFor="category" className="font-medium">Categoria</label>
        <Dropdown
          inputId="category"
          value={form.category}
          options={CATEGORIES}
          onChange={(e) => update('category', e.value)}
          placeholder="Selecione"
          className={errors.category ? 'p-invalid' : ''}
        />
        {fieldError('category')}
      </div>

      <div className="field col-12">
        <label htmlFor="image" className="font-medium">URL da imagem (opcional)</label>
        <InputText
          id="image"
          value={form.image}
          onChange={(e) => update('image', e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="field col-12">
        <label htmlFor="description" className="font-medium">Descrição</label>
        <InputTextarea
          id="description"
          rows={4}
          autoResize
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className={errors.description ? 'p-invalid' : ''}
        />
        {fieldError('description')}
      </div>

      <div className="col-12">
        <Button
          type="submit"
          label="Adicionar produto"
          icon="pi pi-plus"
          loading={loading}
        />
      </div>
    </form>
  );
}

export default ProductForm;
