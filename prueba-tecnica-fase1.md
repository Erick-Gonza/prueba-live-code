# 🚀 Prueba Técnica: AI Text Analyzer — FASE 1

## 📋 Contexto

En Aggy construimos productos que integran IA generativa en el core de la experiencia. Esta prueba evalúa tu capacidad para desarrollar soluciones fullstack utilizando herramientas de IA como asistente.

**Tiempo estimado:** 1.5 - 2 horas

**Stack:**

- **Backend:** Node.js (Express o Fastify)
- **Frontend:** Svelte, React o Vue
- **LLM:** Google Gemini API (te proporcionaremos una API key)

---

## 🎯 El Reto

Construir una aplicación web que permita a un usuario:

1. Pegar un texto (artículo, tweet, párrafo, etc.)
2. Obtener un análisis generado por IA del contenido
3. Visualizar el análisis en una interfaz limpia

**✅ Puedes usar tu LLM de codificación favorito (Cursor, Copilot, Claude, etc.)**

---

## Requerimientos Funcionales

### Backend

- [ ] Endpoint `POST /api/analyze` que reciba un texto
- [ ] Enviar el texto a Gemini para generar un análisis estructurado
- [ ] Retornar el análisis al cliente en formato JSON

**Estructura de respuesta esperada de Gemini:**

```json
{
	"summary": "Resumen en 1-2 oraciones",
	"sentiment": "positive | negative | neutral",
	"language": "es | en | fr | ...",
	"keywords": ["palabra1", "palabra2", "palabra3"],
	"category": "tecnología | deportes | política | entretenimiento | ciencia | negocios | otro"
}
```

### Frontend

- [ ] Textarea para ingresar/pegar el texto
- [ ] Botón "Analizar"
- [ ] Visualización del análisis con:
  - Resumen en texto
  - Indicador visual del sentimiento (colores: verde/rojo/gris)
  - Badges o tags para las keywords
  - Etiqueta de categoría
- [ ] Estados de loading y error

---

## Ejemplo de Uso

**Usuario pega:**

> "Apple presentó hoy el iPhone 17 con una cámara revolucionaria de 200MP y un chip A19 que promete el doble de rendimiento. Los analistas esperan que las ventas superen los 100 millones de unidades en el primer trimestre."

**La app muestra:**

| Campo           | Valor                                                         |
| --------------- | ------------------------------------------------------------- |
| **Resumen**     | Apple lanza iPhone 17 con cámara de 200MP y chip A19 mejorado |
| **Sentimiento** | 🟢 Positivo                                                   |
| **Idioma**      | Español                                                       |
| **Keywords**    | `iPhone` `Apple` `cámara` `chip A19`                          |
| **Categoría**   | Tecnología                                                    |

---

## 🔧 Recursos

### Gemini API

Documentación: https://ai.google.dev/docs

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const prompt = `Analiza el siguiente texto y devuelve un JSON con: summary, sentiment, language, keywords, category.

Texto: "${userText}"

Responde SOLO con el JSON, sin markdown ni explicaciones.`;

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
const analysis = JSON.parse(text);
```

### API Key

Se te proporcionará una API key de Gemini. Configúrala como variable de entorno:

```bash
GEMINI_API_KEY=tu_api_key_aqui
```

---

## ✅ Criterios de Evaluación (Fase 1)

| Criterio                        | Peso |
| ------------------------------- | ---- |
| Funcionalidad completa          | 30%  |
| Calidad del código y estructura | 25%  |
| UI/UX de la interfaz            | 25%  |
| Manejo de errores               | 20%  |

---

## 📦 Entregables

1. **Repositorio de GitHub** con el código
2. **README.md** con:
   - Instrucciones de instalación
   - Cómo ejecutar el proyecto
   - Variables de entorno requeridas (sin exponer keys)

---

## 🎁 Bonus (opcional)

- Diseño responsive
- Animaciones/transiciones en la UI
- Múltiples análisis en secuencia

---

## ⏭️ Siguiente Paso

Una vez completada esta fase, recibirás las instrucciones de la **Fase 2**, que consiste en una modificación al código que deberás implementar **sin asistencia de IA**.

---

## 💬 Preguntas

Si tienes dudas sobre los requerimientos, no dudes en preguntar. Valoramos la comunicación clara.

---

**¡Buena suerte! 🚀**

## Requerimiento 1: Persistencia en memoria

Modifica tu backend para que cada análisis realizado se guarde en un array en memoria.

Cada elemento debe incluir un timestamp `analyzedAt` con la fecha/hora del análisis
