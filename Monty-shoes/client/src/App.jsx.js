import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [passcode, setPasscode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Sample initial products for Monty Shoes
  const [products, setProducts] = useState([
    { id: 1, name: 'Monty Runner X', brand: 'Monty', price: 120, category: 'Running', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', stock: 15 },
    { id: 2, name: 'Cyber Street High', brand: 'Monty', price: 150, category: 'Streetwear', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', stock: 8 }
  ]);

  const [form, setForm] = useState({ name: '', brand: 'Monty', price: '', category: '', image: '', stock: 10 });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = { ...form, id: Date.now(), price: Number(form.price), stock: Number(form.stock) };
    setProducts([newProduct, ...products]);
    setForm({ name: '', brand: 'Monty', price: '', category: '', image: '', stock: 10 });
    alert('Shoe added to Monty Shoes inventory successfully!');
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030712', color: '#f3f4f6', fontFamily: 'sans-serif' }}>
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid #1f2937', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#22d3ee', margin: 0, cursor: 'pointer' }} onClick={() => setView('home')}>
          MONTY//SHOES
        </h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}>Home</button>
          <button onClick={() => setView('shop')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}>Catalog</button>
          <button onClick={() => setView('admin')} style={{ background: '#9333ea', border: 'none', padding: '8px 16px', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Admin Inventory</button>
          <span style={{ background: '#111827', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', border: '1px solid #374151', color: '#22d3ee' }}>Cart: {cart.length}</span>
        </div>
      </nav>

      {/* Home View */}
      {view === 'home' && (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <span style={{ background: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: '1px solid rgba(34, 211, 238, 0.3)' }}>
            NEXT-GEN FOOTWEAR
          </span>
          <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '20px 0' }}>STEP INTO THE FUTURE WITH <span style={{ color: '#22d3ee' }}>MONTY SHOES</span></h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px' }}>
            Browse high-end comfort, futuristic designs, and premium street style drops managed seamlessly through live inventory controls.
          </p>
          <button onClick={() => setView('shop')} style={{ background: '#22d3ee', color: '#030712', border: 'none', padding: '15px 30px', fontWeight: 'bold', fontSize: '16px', borderRadius: '10px', cursor: 'pointer' }}>
            Shop Collection
          </button>
        </div>
      )}

      {/* Shop Catalog View */}
      {view === 'shop' && (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>MONTY SHOES CATALOG</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {products.map(product => (
              <div key={product.id} style={{ background: '#111827', borderRadius: '16px', overflow: 'hidden', border: '1px solid #1f2937' }}>
                <div style={{ height: '220px', background: '#000' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <span style={{ fontSize: '12px', color: '#22d3ee', textTransform: 'uppercase', fontWeight: 'bold' }}>{product.category}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '5px 0' }}>{product.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '900', color: '#22d3ee' }}>${product.price}</span>
                    <button onClick={() => setCart([...cart, product])} style={{ background: '#22d3ee', color: '#030712', border: 'none', padding: '8px 16px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Inventory View */}
      {view === 'admin' && (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
          {!isAdmin ? (
            <div style={{ background: '#111827', padding: '40px', borderRadius: '16px', border: '1px solid #1f2937', width: '350px', margin: '50px auto', textAlign: 'center' }}>
              <h3 style={{ color: '#22d3ee', marginBottom: '15px' }}>Admin Login</h3>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>Enter password: <b>admin123</b></p>
              <input type="password" placeholder="Password" value={passcode} onChange={e => setPasscode(e.target.value)} style={{ width: '100%', padding: '10px', background: '#030712', border: '1px solid #374151', color: '#fff', borderRadius: '6px', marginBottom: '15px', boxSizing: 'border-box' }} />
              <button onClick={() => { if(passcode === 'admin123') setIsAdmin(true); else alert('Wrong password! Use admin123'); }} style={{ width: '100%', padding: '10px', background: '#22d3ee', color: '#030712', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Login
              </button>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#c084fc', marginBottom: '20px' }}>MONTY SHOES - ADMIN INVENTORY CONTROL</h2>
              
              {/* Add Product Form */}
              <form onSubmit={handleAddProduct} style={{ background: '#111827', padding: '25px', borderRadius: '16px', border: '1px solid #1f2937', marginBottom: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <h3 style={{ gridColumn: '1 / -1', margin: '0 0 10px 0', fontSize: '18px' }}>Add New Shoe & Upload Photo via URL</h3>
                <input placeholder="Shoe Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required style={{ padding: '10px', background: '#030712', border: '1px solid #374151', color: '#fff', borderRadius: '6px' }} />
                <input placeholder="Category (e.g. Running)" value={form.category} onChange={e=>setForm({...form, category: e.target.value})} required style={{ padding: '10px', background: '#030712', border: '1px solid #374151', color: '#fff', borderRadius: '6px' }} />
                <input type="number" placeholder="Price ($)" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} required style={{ padding: '10px', background: '#030712', border: '1px solid #374151', color: '#fff', borderRadius: '6px' }} />
                <input type="number" placeholder="Stock Quantity" value={form.stock} onChange={e=>setForm({...form, stock: e.target.value})} required style={{ padding: '10px', background: '#030712', border: '1px solid #374151', color: '#fff', borderRadius: '6px' }} />
                <input placeholder="Image URL (Paste any photo link here)" value={form.image} onChange={e=>setForm({...form, image: e.target.value})} required style={{ gridColumn: '1 / -1', padding: '10px', background: '#030712', border: '1px solid #374151', color: '#fff', borderRadius: '6px' }} />
                <button type="submit" style={{ gridColumn: '1 / -1', padding: '12px', background: '#9333ea', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  Publish Product Live
                </button>
              </form>

              {/* Inventory List */}
              <h3 style={{ marginBottom: '15px' }}>Current Inventory ({products.length} Items)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {products.map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111827', padding: '15px', borderRadius: '8px', border: '1px solid #1f2937' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img src={p.image} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{p.name}</div>
                        <div style={{ fontSize: '13px', color: '#22d3ee' }}>${p.price} | Stock: {p.stock}</div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(p.id)} style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}