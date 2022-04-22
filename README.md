# StudWizard
Full-Stack MERNG web app to post and get meditations from students. Technologies used: React.js, Node.js, Express.js, MongoDB, GraphQL, React Semantic UI, Redux, Facebook/Google OAuth2.0 API

## Dependencies
- Node.js (LTS recommended) 

## How to use 
### `git clone https://github.com/georgecpp/studwizard.git`
- Go to the backend directory, run:
### `npm install`
- then
### `npm run serve`

- Go the frontend directory, run:
### `npm install`
- then
### `npm run start`
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

🇷🇴

- In acest proiect am urmarit crearea unei platforme de oferire/achizitionare meditatii, practic in a construi o retea sociala intre studenti, acestia fiind interconectati in aplicatie. Ca precizare initiala inainte de a descrie technology-stack-ul si flow-ul aplicatiei, vreau sa punctez ca aplicatia este orientata spre functionalitate mai mult decat spre design, fiind conceputa de catre un backend developer :).

- In continuare, voi prezenta flow-ul aplicatiei:
- Se disting 3 tipuri de utilizatori: Guest, User si Meditator. Utilizatorul Guest va putea vizualiza postarile de meditatii din retea, dar nu va putea aprecia postari sau lasa comentarii pe postare, nici accesa profilul altor utilizatori. Pentru a beneficia de aceste feature-uri, se poate inregistra in aplicatie prin menu-item-ul 'Register' care va afisa o pagina ce contine 2 carduri: User si Meditator. Cardurile vor descrie fiecare rol in parte iar la accesare vor incarca pagini de inregistrare specifice fiecarui rol, intrucat rolul de Meditator presupune furnizarea unor informatii suplimentare la inregistrare (ultima institutie in care a activat, locul preferat de desfasurare meditatii, experienta, nr. telefon etc.)
