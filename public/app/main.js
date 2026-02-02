// main.js - carga listas desde el backend y permite agregar/eliminar productos al carrito
(function () {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // login.js guarda esto si existe
  if (!token) {
    window.location.href = '/pages/login.html';
    return;
  }

  const API_BASE = '/api';
  const endpoints = {
    products: `${API_BASE}/catalogo`,
    orders: `${API_BASE}/pedido`,
    users: `${API_BASE}/cuentaUsuario`,
    carrito: `${API_BASE}/carrito` // POST /, PUT /:userID/add, GET /:userID, PUT /:userID/update
  };

  const headers = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const q = (sel) => document.querySelector(sel);

  q('#logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/pages/login.html';
  });

  q('#emptyCartBtn').addEventListener('click', async () => {
    if (!userId) return showCartMsg('No se conoce el usuario para el carrito.', true);
    // Reemplazamos productos por array vacío usando update endpoint
    try {
      const res = await fetch(`${endpoints.carrito}/${userId}/update`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ productos: [] })
      });
      if (!res.ok) {
        const err = await res.json();
        return showCartMsg(err.message || 'No se pudo vaciar el carrito', true);
      }
      await loadCart();
      showCartMsg('Carrito vaciado');
    } catch (err) {
      console.error(err);
      showCartMsg('Error de red al vaciar carrito', true);
    }
  });

  function showCartMsg(msg, isError = false) {
    const el = q('#cartMsg');
    el.textContent = msg;
    el.style.color = isError ? '#c53030' : 'inherit';
    setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 3500);
  }

  // Productos
  async function loadProducts() {
    const list = q('#productsList');
    list.innerHTML = 'Cargando productos...';

    try {
      const res = await fetch(endpoints.products, { headers: headers() });
      if (!res.ok) {
        list.innerHTML = `<div class="muted">No fue posible cargar productos (status ${res.status})</div>`;
        return;
      }
      const data = await res.json();
      list.innerHTML = '';
      const tpl = document.getElementById('productCard');

      data.forEach(p => {
        const node = tpl.content.cloneNode(true);
        const img = node.querySelector('.product-img');
        const title = node.querySelector('.product-title');
        const desc = node.querySelector('.product-desc');
        const price = node.querySelector('.price');
        const addBtn = node.querySelector('.add-btn');

        img.src = p.imagen || 'https://via.placeholder.com/400x300?text=Producto';
        img.alt = p.nombre || 'Producto';
        title.textContent = p.nombre || `#${p._id || ''}`;
        desc.textContent = (p.descripcion && p.descripcion.substring(0,120)) || (p.categoria || '');
        price.textContent = p.precio ? `$${p.precio}` : '';
        addBtn.dataset.id = p._id || '';
        addBtn.dataset.price = p.precio || 0;

        // evento para añadir producto
        addBtn.addEventListener('click', () => {
          if (!userId) return showCartMsg('No hay usuario asociado. Inicia sesión correctamente.', true);
          addToCart(p._id, 1, Number(p.precio || 0));
        });

        list.appendChild(node);
      });
    } catch (err) {
      console.error(err);
      list.innerHTML = `<div class="muted">Error de red al cargar productos</div>`;
    }
  }

  // Pedidos
  async function loadOrders() {
    const list = q('#ordersList');
    list.innerHTML = 'Cargando pedidos...';

    try {
      const res = await fetch(endpoints.orders, { headers: headers() });
      if (!res.ok) {
        list.innerHTML = `<div class="muted">No fue posible cargar pedidos (status ${res.status})</div>`;
        return;
      }
      const data = await res.json();
      list.innerHTML = '';
      if (!Array.isArray(data) || data.length === 0) {
        list.innerHTML = `<div class="muted">No hay pedidos</div>`;
        return;
      }
      data.forEach(o => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `<strong>Pedido #${o._id || ''}</strong>
                        <div class="muted">Usuario: ${o.usuario || '-'}</div>
                        <div class="muted">Total: ${o.total || 0}</div>`;
        list.appendChild(el);
      });
    } catch (err) {
      console.error(err);
      list.innerHTML = `<div class="muted">Error de red al cargar pedidos</div>`;
    }
  }

  // Usuarios
  async function loadUsers() {
    const list = q('#usersList');
    list.innerHTML = 'Cargando usuarios...';

    try {
      const res = await fetch(`${endpoints.users}`, { headers: headers() });
      if (!res.ok) {
        list.innerHTML = `<div class="muted">No fue posible cargar usuarios (status ${res.status})</div>`;
        return;
      }
      const data = await res.json();
      list.innerHTML = '';
      const arr = Array.isArray(data) ? data : (data.items || []);
      if (arr.length === 0) {
        list.innerHTML = `<div class="muted">No hay usuarios para mostrar</div>`;
        return;
      }
      arr.forEach(u => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `<strong>${u.nombre || u.name || 'Usuario'}</strong>
                        <div class="muted">${u.correo || u.email || ''}</div>
                        <div class="muted">Rol: ${u.rol || '-'}</div>`;
        list.appendChild(el);
      });
    } catch (err) {
      console.error(err);
      list.innerHTML = `<div class="muted">Error de red al cargar usuarios</div>`;
    }
  }

  // CARRO: obtener estado y pintar
  async function loadCart() {
    const list = q('#cartList');
    const totalEl = q('#cartTotal');
    list.innerHTML = 'Cargando carrito...';
    totalEl.textContent = '$0';

    if (!userId) {
      list.innerHTML = `<div class="muted">No hay usuario asociado al carrito.</div>`;
      return;
    }

    try {
      const res = await fetch(`${endpoints.carrito}/${userId}`, { headers: headers() });
      if (res.status === 404) {
        // crear carrito si no existe
        await createCartForUser(userId);
        list.innerHTML = `<div class="muted">Carrito vacío</div>`;
        totalEl.textContent = '$0';
        return;
      }
      if (!res.ok) {
        list.innerHTML = `<div class="muted">No fue posible cargar carrito (status ${res.status})</div>`;
        return;
      }
      const cart = await res.json();
      const products = cart.productos || [];
      if (!Array.isArray(products) || products.length === 0) {
        list.innerHTML = `<div class="muted">Carrito vacío</div>`;
        totalEl.textContent = '$0';
        return;
      }
      list.innerHTML = '';
      const tpl = document.getElementById('cartItemTpl');

      products.forEach(item => {
        const node = tpl.content.cloneNode(true);
        node.querySelector('.ci-name').textContent = item.idProducto?.nombre || item.idProducto || `#${item.idProducto}`;
        node.querySelector('.ci-qty').textContent = `Cantidad: ${item.cantidad}`;
        node.querySelector('.ci-subtotal').textContent = `$${item.subtotal?.toFixed ? item.subtotal.toFixed(2) : item.subtotal || 0}`;
        const removeBtn = node.querySelector('.remove-btn');

        // eliminar por idProducto (string)
        const idProd = (item.idProducto && (item.idProducto._id || item.idProducto)) || item.idProducto;
        removeBtn.addEventListener('click', () => {
          removeFromCart(idProd);
        });

        list.appendChild(node);
      });

      totalEl.textContent = `$${cart.total?.toFixed ? cart.total.toFixed(2) : (cart.total || 0)}`;
    } catch (err) {
      console.error(err);
      list.innerHTML = `<div class="muted">Error de red al cargar carrito</div>`;
    }
  }

  async function createCartForUser(uid) {
    try {
      const res = await fetch(endpoints.carrito, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ usuario: uid })
      });
      if (!res.ok) {
        console.warn('No se pudo crear carrito:', await res.text());
      }
    } catch (err) {
      console.error('Error creando carrito:', err);
    }
  }

  // Añadir producto al carrito (usa endpoint PUT /:userID/add)
  async function addToCart(idProducto, cantidad = 1, costoUnitario = 0) {
    try {
      const res = await fetch(`${endpoints.carrito}/${userId}/add`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ idProducto, cantidad, costoUnitario })
      });
      const data = await res.json();
      if (!res.ok) {
        return showCartMsg(data.message || 'No se pudo añadir producto', true);
      }
      await loadCart();
      showCartMsg('Producto añadido');
    } catch (err) {
      console.error(err);
      showCartMsg('Error de red al añadir producto', true);
    }
  }

  // Eliminar producto del carrito: obtenemos carrito, filtramos y usamos update
  async function removeFromCart(idProductoToRemove) {
    try {
      const res = await fetch(`${endpoints.carrito}/${userId}`, { headers: headers() });
      if (!res.ok) return showCartMsg('No se pudo obtener carrito', true);
      const cart = await res.json();
      const products = Array.isArray(cart.productos) ? cart.productos : [];
      const filtered = products.filter(p => {
        const pid = (p.idProducto && (p.idProducto._id || p.idProducto)) || p.idProducto;
        return pid.toString() !== idProductoToRemove.toString();
      });

      // Recalcular subtotales/total en caso de que la API espere esos valores
      const normalized = filtered.map(p => ({
        idProducto: (p.idProducto && (p.idProducto._id || p.idProducto)) || p.idProducto,
        cantidad: p.cantidad,
        costoUnitario: p.costoUnitario,
        subtotal: (p.cantidad * p.costoUnitario)
      }));

      const updateRes = await fetch(`${endpoints.carrito}/${userId}/update`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ productos: normalized })
      });
      const updData = await updateRes.json();
      if (!updateRes.ok) {
        return showCartMsg(updData.message || 'No se pudo actualizar carrito', true);
      }
      await loadCart();
      showCartMsg('Producto eliminado del carrito');
    } catch (err) {
      console.error(err);
      showCartMsg('Error de red al eliminar producto', true);
    }
  }

  // Inicializar carga
  loadProducts();
  loadOrders();
  loadUsers();
  loadCart();
})();
