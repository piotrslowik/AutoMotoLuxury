import React from 'react';

import Masonry from '@mui/lab/Masonry';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Contact = () => {
  return (
    <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={4}>
      <div>
        <Card>
          <CardHeader title="Coś o projekcie" />
          <CardContent>
            AutoMotoLuxury to nieistniejący komis sprzedający wyjątkowe samochody używane. Auta te przeznaczone 
            są dla entuzjastów, dla których ważniejszy od wyposażenia jest silnik i doskonały stan techniczny.
          </CardContent>
        </Card>
        <Card sx={{ mt: 4 }}>
          <CardHeader title="Zastosowane technologie" />
          <CardContent>
            Frontend aplikacji zbudowany jest przy użycu Reacta. Stanem zarządza Redux, a routingiem React-Router.
            Biblioteką komponentów jest MUI, a elementy stylowane przeze mnie korzystają z SASS oraz notacji BEM.
          </CardContent>
          <CardContent>
            Backend działa na Node.js oraz Express, a komunikacja z nim przebiega z wykorzystaniem GraphQL. Baza danych to MongoDB. Dodawane zdjęcia przechowywane są w serwisie Cloudinary.
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader title="Coś o mnie" />
        <CardMedia
          component="img"
          height="240"
          image="/me.jpeg"
          alt="Piotr Słowik"
        />
        <CardContent>
          Jestem frontendowcem, choć tym projektem uczyłem się backendu z użyciem Node. Na ten moment mam 2 lata doświadczenia komercyjnego w dwóch firmach oraz zrobione parę własnych projektów.
        </CardContent>
        <CardContent>
          Moim głównym frameworkiem jest Vue, jednak potrafię także pisać w React. Poza językami wykorzystywanymi w web developmencie znam także podstawy C#, Javy i Pythona. Nienajgorzej posługuję się także SQLem.
        </CardContent>
        <CardContent>
          Prywatnie kocham muzykę - zarówno słuchać, odkrywać jak i tworzyć. Interesuję się także nauką, technologią i motoryzacją. Ogólnie mam sporo pomniejszych hobby i staram się codziennie dowiadywać czegoś nowego.
        </CardContent>
        <CardContent>
          Jeśli jesteś zainteresowana(y) poznaniem mojego CV, znajdź mnie na
          <Link href="https://www.linkedin.com/in/piotr-s%C5%82owik-408192188/"> LinkedIn</Link>.
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Doświadczenie poza pracą" />
        <CardContent>
          <Typography variant="h6">
            Edukacja
          </Typography>
          <p>
            Uniwersytet Ekonomiczny w Katowicach, kierunek Informatyka, specjalizacja Gry i Aplikacje Mobilne.
          </p>
          <p>
            I stopień: praca licencjacka "Wzorzec projektowy MVC w natywnym JavaScript w oparciu o grę CarClicker"
          </p>
          <p>
            II stopień: praca magisterska "Optymalizacja procesu wielokrotnych podziałów z wykorzystaniem metod sztucznej inteligencji"
          </p>
        </CardContent>
        <CardContent>
          <Typography variant="h6">
            Działalność dodatkowa
          </Typography>
          <p>
            Członek Organizacji Studenckiej PANEUROPA
          </p>
          <p>
            Koordynator główny projektów:
          </p>
          <ul>
            <li>Przegląd Niezależnej Muzyki</li>
            <li>II Przegląd Niezależnej Muzyki</li>
            <li>Spotkanie z Tomaszem Milerem</li>
          </ul>
          <p>
            Dodatkowo byłem członkiem zespołów w wielu innych projektach Paneuropy.
          </p>
          <p>
            Działałem także w sztabie Juwenaliów Śląskich, Igrów oraz brałem udział w sześciu projektach krótkoterminowych w ramach programu Erasmus+.
          </p>
        </CardContent>
      </Card>
    </Masonry>
  );
}

export default Contact;
