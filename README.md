# Rungie Challenge

En este challenge se lleva a cabo el desafío propuesto por [Rungie.io](https://rungie.io/#projects) en la [siguiente consigna](https://docs.google.com/document/d/1fUR87Yw_Y22NT_rAiLLqFqJ3SFgpBydj3CDyuW1Q0FM/edit).
Respecto al approach el desafío se plantea utilizando React JS a lo que decidí sumarle algunas librerías dadas algunas cuestiones:

- Styled components: Para reducir la cantidad de archivos del proyecto dado que al ser de un calibre pequeño, quizás extender demasiado la arquitectura carece de sentido.
- node-sass: Para configuración inicial de algunas etiquetas y reset de estilos.
- Axios: Para operaciones http de forma mas sencilla.
- EsLint: Para estandarizar el código y sintaxis dado que para equipos el tener una "style-guide" de código resulta mas homogéneo y prolijo.
- Vite: En lugar de NPM opté por Vite ya que resulta mucho mas ligero y no instala tantos módulos de node desde un principio.

## Iniciar proyecto

1.  Para iniciar el proyecto primero debemos descargar el proyecto desde el [siguiente enlace](https://github.com/IsidoroAros/rungie-challenge) o mismo clonarlo con el comando`git clone https://github.com/IsidoroAros/rungie-challenge.git` desde el directorio deseado para su clonación.
2.  Debemos instalar las dependencias con el comando `npm install`
3.  Posteriormente debemos ejecutar el comando: `npm run dev` para levantar el proyecto e ingresar en `http://localhost:3000/`.

## Configuración de endpoint

Para configurar el endpoint solo debe de ingresarse al archivo **.env** y cambiar el string que yace dentro de la constante **VITE_BASE_URL**. Disclaimer: El archivo .env debería formar parte del .gitignore, pero dadas las circunstancias del calibre del proyecto opté por dejarlo ahi para que el proyecto funcione sin mucha configuración.

![image](https://user-images.githubusercontent.com/60631478/177321207-1a2713f6-10f0-42d9-bc77-c3a0c656826c.png)

