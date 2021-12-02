import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';

const Contact = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Coś o projekcie" />
          <CardContent>
            AutoMotoLuxury to nieistniejący komis sprzedający wyjątkowe samochody używane. Auta te przeznaczone 
            są dla entuzjastów, dla których ważniejszy od wyposażenia jest silnik i doskonały stan techniczny.
          </CardContent>
        </Card>
        <Card sx={{mt: 4 }}>
          <CardHeader title="Zastosowane technologie" />
          <CardContent>
            Frontend aplikacji zbudowany jest przy użycu Reacta. Stanem zarządza Redux, a routingiem React-Router.
            Biblioteką komponentów jest MUI, a elementy stylowane przeze mnie korzystają z SASS oraz notacji BEM.
          </CardContent>
          <CardContent>
            Backend działa na Node.js oraz Express, a komunikacja z nim przebiega z wykorzystaniem GraphQL. Baza danych to MongoDB. Dodawane zdjęcia przechowywane są w serwisie Cloudinary.
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Coś o mnie" />
          <CardMedia
            component="img"
            height="240"
            image="/no-image.jpg"
            alt="Piotr Słowik"
          />
          <CardContent>
            Jestem frontendowcem, choć tym projektem uczyłem się backendu z użyciem Node. Na ten moment mam 2 lata doświadczenia komercyjnego w dwóch firmach oraz zrobione parę własnych projektów.
          </CardContent>
          <CardContent>
            Moim głównym frameworkiem jest Vue, jednak potrafię także pisać w React. Poza językami wykorzystywanymi w web developmencie znam także podstawy C#, Javy i Pythona. Nienajgorzej posługuję się także SQLem.
          </CardContent>
          <CardContent>
            Jeśli jesteś zainteresowana(y) poznaniem mojego CV, znajdź mnie na
            <Link href="https://www.linkedin.com/in/piotr-s%C5%82owik-408192188/"> LinkedIn</Link>.
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Contact;
