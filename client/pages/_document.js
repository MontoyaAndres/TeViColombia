import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <html lang="es" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Tejidos virtuales para el emprendimiento, las prácticas profesionales y la empleabilidad."
          />
          <link rel="manifest" href="/static/manifest.json" />
          <meta
            name="keywords"
            content="Emprendimiento,Empleo,Prácticas,Profesionales,Profesional,Prácticas profesionales,UNIMINUTO,Estudio,Aprendizaje,Crecimiento,Colombia"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />

          {/* Android */}
          <meta name="theme-color" content="#505050" />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* iOS */}
          <meta name="apple-mobile-web-app-title" content="Te Vi Colombia" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />

          {/* Windows */}
          <meta name="msapplication-navbutton-color" content="#505050" />
          <meta name="msapplication-TileColor" content="#505050" />
          <meta
            name="msapplication-TileImage"
            content="/static/img/lightOn.png"
          />
          <meta name="msapplication-config" content="none" />

          {/* Pinned Sites */}
          <meta name="application-name" content="Te Vi Colombia" />
          <meta
            name="msapplication-tooltip"
            content="Tejidos virtuales para el emprendimiento, las prácticas profesionales y la empleabilidad."
          />
          <meta name="msapplication-starturl" content="/" />

          {/* Tap highlighting  */}
          <meta name="msapplication-tap-highlight" content="no" />

          {/* UC Mobile Browser */}
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          {/* imagemode - show image even in text only mode */}
          <meta name="imagemode" content="force" />

          <meta
            property="og:title"
            content="Tejidos virtuales para el emprendimiento, las prácticas profesionales y la empleabilidad."
          />
          <meta property="og:locale" content="es_CO" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/static/img/lightOn.png" />
          <meta property="og:site_name" content="Te Vi Colombia" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css"
            integrity="sha256-8B1OaG0zT7uYA572S2xOxWACq9NXYPQ+U5kHPV1bJN4="
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
            integrity="sha256-HtCCUh9Hkh//8U1OwcbD8epVEUdBvuI8wj1KtqMhNkI="
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/static/css/carousel.min.css" />
          <link rel="stylesheet" href="/static/css/stars.css" />
          <link rel="stylesheet" href="/static/css/styles.css" />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC37_NG0uKs-_tGyHsHiwfhBlHh5-XjAQ0&libraries=geometry,drawing,places" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
