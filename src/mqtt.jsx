import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

function MyComponent() {
  const [valor, setValor] = useState("hoa");
  
  // Configuración del cliente MQTT
  var options = {
    host: '73c1dee65d1049b5a7873e97e5c0ebc0.s1.eu.hivemq.cloud:8884/mqtt',
    port: 8884,
    protocol: 'mqtts',
    username: 'pepinho',
    password: '12345678Aa'
  };
  
  // Suscripción al tema MQTT
  useEffect(() => {
    var client = mqtt.connect(options);
    console.log('Conectado al servidor MQTT');
    client.subscribe('valor-analogico');
    
    // Manejo de mensajes recibidos
    client.on('message', (topic, message) => {
      setValor(message.toString());
      console.log('Mensaje recibido:', topic, valor);
    });
    
    // Limpiar al desmontar el componente
    return () => {
      client.end(); // Cierra la conexión al desmontar el componente
    };
  }, []);
  
  return (
    <div>
      <p>Valor recibido del servidor MQTT: {valor}</p>
    </div>
  );
}

export default MyComponent;
