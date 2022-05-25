import axios from "axios";

export const getData = async () => {
  try {
    let { data } = await axios.get("https://mindicador.cl/api");
    let template = `    
    El valor del dolar el dia de hoy es: ${data.dolar.valor}<br>
    El valor del euro el dia de hoy es: ${data.euro.valor}<br>
    El valor del uf el dia de hoy es: ${data.uf.valor}<br>
    El valor del utm el dia de hoy es: ${data.utm.valor}<br>
    `;
    return template;
  } catch (err) {
    console.log(`Error: ${err} en getData()`);
  }
};
