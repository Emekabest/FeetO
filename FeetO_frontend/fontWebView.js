import React from "react";
import { WebView } from 'react-native-webview'


const FontWebView = ()=>{

    const htmlContent = `
     <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap">
        <style>
          body {
            font-family: 'Lato', sans-serif;
          }
          .montserrat {
            font-family: 'Montserrat', sans-serif;
          }
        </style>
      </head>
      <body>
        <p class="lato">This text uses Lato font</p>
        <p class="montserrat">This text uses Montserrat font</p>
      </body>
    </html>`


    return (
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={{ height: 0, width: 0 }}
        />
      );
}


export default FontWebView;