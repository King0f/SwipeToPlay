import React, { useState, useEffect } from 'react';
import { usuarioStore } from '../store/userStore/usuarioStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {ToastContainer, Zoom, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { apiStore } from '../store/apiStore/apiStore';

const Comprar = ({ product, precio }) => {
  const [userDetailsOpen, setUserDetailsOpen] = useState(true);
  const [creditCardOpen, setCreditCardOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const path = apiStore.getState().basename;
  const navigate = useNavigate();
  const tarjetaAñadida = () => {
    toast.success("Tarjeta de crédito añadida con éxito!",
    {position: 'top-left',theme:'light',transition:Zoom, autoClose:3000, })
  };
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });
  const handlePurchase = () => {
    if (!formData.cardName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
        toast.error("Por favor, complete todos los campos de la tarjeta de crédito antes de finalizar la compra.", {position: 'top-left',theme:'light',transition:Zoom, autoClose:3000, })
        return;
      }
    if(product == 'Suscripción Deluxe'){
        procesarCompra(2);
        navigate(path);
    }else{
        procesarCompra(1);
        navigate(path);
    }
  };

  const { usuario, tarjetas, obtenerUsuario, obtenerTarjetas, guardarTarjeta, procesarCompra } = usuarioStore((state) => ({
    usuario: state.usuario,
    tarjetas: state.tarjetas,
    obtenerUsuario: state.obtenerUsuario,
    obtenerTarjetas: state.obtenerTarjetas,
    guardarTarjeta: state.guardarTarjeta,
    procesarCompra: state.procesarCompra
  }));

  useEffect(() => {
    obtenerUsuario();
    obtenerTarjetas();
  }, [obtenerUsuario, obtenerTarjetas]);

  useEffect(() => {
    if (selectedCard) {
      const card = tarjetas.find(tarjeta => tarjeta.n_tarjeta === selectedCard);
      if (card) {
        setFormData({
          cardName: card.titular,
          cardNumber: card.n_tarjeta,
          cardExpiry: card.f_caducidad,
          cardCVC: card.CVV
        });
        setIsReadOnly(true);  // Establecer el formulario como de solo lectura
      } else {
        setIsReadOnly(false);
      }
    } else {
      setIsReadOnly(false);
      setFormData({
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: ''
      });
    }
  }, [selectedCard, tarjetas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCard = () => {
    const { cardName, cardNumber, cardExpiry, cardCVC } = formData;
    if (tarjetas.length >= 4) {
        toast.error("No se pueden tener más de 4 tarjetas de crédito guardadas. Borre alguna en su perfil si desea añadir una nueva.",
        {position: 'top-left',theme:'light',transition:Zoom, autoClose:3000, })
        return;
    }
    guardarTarjeta(cardName, cardNumber, cardExpiry, cardCVC);
    obtenerTarjetas();
    setSelectedCard(cardNumber);
    tarjetaAñadida();  // Asumiendo que esta función maneja algo después de añadir la tarjeta
};

  return (
    <>
      <Header />
      <ToastContainer pauseOnFocusLoss={false} limit={3} />
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full flex">
          <div className="w-1/2 p-4">
            <div className="border-b pb-2 mb-4">
              <button
                className="w-full text-left font-semibold text-lg"
                onClick={() => setUserDetailsOpen(!userDetailsOpen)}
              >
                Datos del Usuario 🡣
              </button>
            </div>
            {userDetailsOpen && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Nombre de Usuario"
                  value={usuario.username}
                  readOnly
                  className="w-full border p-2 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={usuario.email}
                  readOnly
                  className="w-full border p-2 rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={usuario.phone}
                  readOnly
                  className="w-full border p-2 rounded"
                />
              </div>
            )}

            <div className="border-b pb-2 mt-4">
              <button
                className="w-full text-left font-semibold text-lg"
                onClick={() => setCreditCardOpen(!creditCardOpen)}
              >
                Tarjeta de Crédito 🡣
              </button>
            </div>
            {creditCardOpen && (
              <div className="space-y-4">
                <select
                  className="w-full border p-2 rounded"
                  value={selectedCard}
                  onChange={(e) => setSelectedCard(e.target.value)}
                >
                  <option value="">Selecciona una tarjeta</option>
                  {tarjetas.map(tarjeta => (
                    <option key={tarjeta.id} value={tarjeta.n_tarjeta}>
                      {tarjeta.n_tarjeta}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Titular de la tarjeta"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Número de Tarjeta"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="Fecha de Expiración (MM/AA)"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="cardCVC"
                  placeholder="CVC"
                  value={formData.cardCVC}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                  className="w-full border p-2 rounded"
                />
                <button
                  onClick={handleAddCard}
                  className="w-full bg-blue-500 text-white p-2 rounded"
                  hidden={isReadOnly}
                >
                  Añadir Tarjeta
                </button>
              </div>
            )}
            <div className="flex justify-center my-8">
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={handlePurchase}
            >
                Finalizar Compra
            </button>
      </div>
          </div>
          <div className="w-1/2 p-4 border-l">
            <h2 className="text-2xl font-bold mb-4">Resumen de la Compra</h2>
            <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
              <h3 className="text-lg font-semibold">Producto:</h3>
              <p>{"x1 " + product}</p>
              <h3 className="text-lg font-semibold">Precio:</h3>
              <p>{precio}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Comprar;
