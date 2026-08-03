# ELA Glass — site vitrine

Parois de douche, garde-corps en verre et miroiterie sur mesure — Témara, Rabat, Bouznika, Salé.
Site statique (HTML/CSS/JS purs), hébergé sur **GitHub Pages**. Aucune compilation, aucun npm.

## Pages
- `index.html` — accueil (services, tarifs, réalisations, processus, FAQ, zone, contact)
- `paroi-douche-temara.html` / `-rabat.html` / `-sale.html` / `-bouznika.html` — pages villes (SEO local)
- `sitemap.xml` · `robots.txt` · `CNAME` (ela-glass.ma)

## Mise en ligne (GitHub Pages)
1. Créer un repo, y pousser **tout ce dossier** (sans les fichiers `build*.py`).
2. Repo → Settings → Pages → Source = branche `main`, dossier `/root`.
3. Custom domain : `ela-glass.ma` (le fichier `CNAME` est déjà là).
4. Cocher **Enforce HTTPS** une fois le certificat émis.

## DNS chez le registrar (.ma)
- 4 enregistrements **A** sur `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- 1 **CNAME** `www` → `<user>.github.io`

## Contact
- WhatsApp / tél : **+33 6 25 28 70 70** (`wa.me/33625287070`) — CTA principal, pas de formulaire.

## À faire avant / après mise en ligne
| Priorité | Quoi |
|---|---|
| Haute | **Photo réelle de garde-corps** → remplacer `assets/images/paroi-fixe-transparente-beige.jpg` dans le bloc garde-corps (visuel provisoire) |
| Haute | **Google Business Profile** (canal n°1 en local) |
| Moyenne | Liens **Instagram / Facebook** (actuellement `href="#"`) |
| Basse | Ajuster les prix d'appel si besoin (douche 1 200 DH/m², garde-corps 1 500 DH/ml, miroir 600 DH/m²) |

## Prix d'appel (indicatifs)
Douche 1 200 DH/m² · Garde-corps 1 500 DH/ml · Miroir 600 DH/m². Estimation exacte après mesure gratuite.
