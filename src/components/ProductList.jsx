import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

const API_URL = 'https://fakestoreapi.com/products';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(API_URL, { signal: controller.signal })
      .then((response) => setProducts(response.data))
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // A Fake Store API não persiste dados: o POST retorna um id simulado,
  // então o produto é adicionado ao estado local para aparecer na lista.
  const handleAddProduct = async (newProduct) => {
    setSaving(true);
    try {
      const { data } = await axios.post(API_URL, newProduct);
      const created = {
        ...newProduct,
        id: data.id ?? Date.now(),
        rating: { rate: 0, count: 0 },
      };
      setProducts((prev) => [created, ...prev]);
      setDialogVisible(false);
      toast.current?.show({
        severity: 'success',
        summary: 'Produto adicionado',
        detail: newProduct.title,
        life: 3000,
      });
      return true;
    } catch (err) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível adicionar o produto.',
        life: 4000,
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleAddToCart = (product) => {
    toast.current?.show({
      severity: 'info',
      summary: 'Adicionado ao carrinho',
      detail: product.title,
      life: 2500,
    });
  };

  return (
    <div className="page-container p-4 md:p-6">
      <Toast ref={toast} />

      <div className="flex flex-column sm:flex-row align-items-start sm:align-items-center justify-content-between gap-3 mb-5">
        <div>
          <h1 className="m-0 text-3xl font-bold">
            <i className="pi pi-shop mr-2 text-primary" />
            Loja Virtual
          </h1>
          <p className="mt-1 mb-0 text-600">
            {products.length} {products.length === 1 ? 'produto' : 'produtos'} disponíveis
          </p>
        </div>
        <Button
          label="Novo produto"
          icon="pi pi-plus"
          onClick={() => setDialogVisible(true)}
        />
      </div>

      {loading && (
        <div className="flex justify-content-center p-6">
          <ProgressSpinner />
        </div>
      )}

      {error && <Message severity="error" text={error} className="w-full" />}

      {!loading && !error && (
        <div className="grid">
          {products.map((product) => (
            <div key={product.id} className="col-12 sm:col-6 lg:col-4 xl:col-3">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      )}

      <Dialog
        header="Adicionar novo produto"
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        style={{ width: '90vw', maxWidth: '600px' }}
        modal
        draggable={false}
      >
        <ProductForm onSubmit={handleAddProduct} loading={saving} />
      </Dialog>
    </div>
  );
}

export default ProductList;
