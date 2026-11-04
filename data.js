const tools = [
  // ==================== USERNAME ====================
  { name: "WhatsMyName", cat: "username", desc: "Vérifie la présence d'un pseudo sur plus de 600+ sites et réseaux sociaux en temps réel.", url: "https://whatsmyname.app/" },
  { name: "Namechk", cat: "username", desc: "Analyse la disponibilité d'un pseudo et d'un nom de domaine sur des dizaines de plateformes.", url: "https://namechk.com/" },
  { name: "Sherlock", cat: "username", desc: "Outil CLI de référence pour traquer un nom d'utilisateur à travers des centaines de réseaux.", url: "https://github.com/sherlock-project/sherlock" },
  { name: "Maigret", cat: "username", desc: "Alternative surpuissante à Sherlock scrutant plus de 3000+ sites web avec extraction de métadonnées.", url: "https://github.com/soxoj/maigret" },
  { name: "Instant Username", cat: "username", desc: "Recherche instantanée et simultanée de pseudonymes sur plus de 100 plateformes sociales.", url: "https://instantusername.com/" },
  { name: "UserSearch.org", cat: "username", desc: "Moteur d'investigation inversée pour retrouver des comptes secrets liés à un pseudo.", url: "https://usersearch.org/" },
  { name: "Knowem", cat: "username", desc: "Vérifie la présence d'une marque ou d'un pseudo sur plus de 500 réseaux et bases de marques.", url: "https://knowem.com/" },
  { name: "Namecheckr", cat: "username", desc: "Analyse rapide de disponibilité de noms d'utilisateur pour préserver l'identité numérique.", url: "https://www.namecheckr.com/" },
  { name: "Blackbird", cat: "username", desc: "Outil de recherche ultra-rapide écrit en C++ pour débusquer les comptes d'une cible.", url: "https://github.com/p1ngul1n0/blackbird" },
  { name: "Social-Scan", cat: "username", desc: "Vérificateur de pseudonymes et emails haute performance sans faux positifs.", url: "https://github.com/qeeqbox/social-scan" },

  // ==================== EMAIL ====================
  { name: "Hunter.io", cat: "email", desc: "Moteur de recherche et de vérification d'adresses email professionnelles par entreprise.", url: "https://hunter.io/" },
  { name: "Have I Been Pwned", cat: "email", desc: "Vérifie si un email ou un mot de passe a été compromis dans une fuite de données.", url: "https://haveibeenpwned.com/" },
  { name: "EmailRep", cat: "email", desc: "Évalue la réputation, le niveau de risque et l'activité réseau d'une adresse email.", url: "https://emailrep.io/" },
  { name: "Holehe", cat: "email", desc: "Détermine si un email est associé à des comptes enregistrés sur plus de 120 sites.", url: "https://github.com/megadose/holehe" },
  { name: "Epieos", cat: "email", desc: "Extrait les données cachées des comptes Google (Google Maps, avis, albums, ID).", url: "https://epieos.com/" },
  { name: "GHunt", cat: "email", desc: "Framework d'investigation avancé sur l'empreinte numérique des comptes Google.", url: "https://github.com/mxrch/GHunt" },
  { name: "Phonebook.cz", cat: "email", desc: "Moteur d'extraction massive d'emails, domaines et URLs issus de bases d'OSINT.", url: "https://phonebook.cz/" },
  { name: "Voila Norbert", cat: "email", desc: "Retrouve l'adresse email professionnelle de n'importe quel décideur ou employé.", url: "https://www.voilanorbert.com/" },
  { name: "Anymail Finder", cat: "email", desc: "Trouve et vérifie directement les adresses emails d'entreprises par nom/domaine.", url: "https://anymailfinder.com/" },
  { name: "Toolki Email", cat: "email", desc: "Testeur SMTP rapide pour valider l'existence réelle d'une boîte de réception.", url: "https://toolki.com/email-verifier" },

  // ==================== PHONE ====================
  { name: "Truecaller", cat: "phone", desc: "Annuaire mondial inversé pour identifier les propriétaires de numéros de téléphone.", url: "https://www.truecaller.com/" },
  { name: "PhoneInfoga", cat: "phone", desc: "Framework avancé d'analyse et d'empreinte de numéros de téléphone (opérateur, pays, dorks).", url: "https://github.com/sundowndev/phoneinfoga" },
  { name: "NumLookup", cat: "phone", desc: "Recherche inversée gratuite d'informations sur l'appelant et l'opérateur.", url: "https://www.numlookup.com/" },
  { name: "Free Carrier Lookup", cat: "phone", desc: "Identifie l'opérateur réseau, le type de ligne (VoIP/Mobile) et la localisation.", url: "https://freecarrierlookup.com/" },
  { name: "Twilio Lookup", cat: "phone", desc: "API professionnelle d'inspection des formats et types de numéros mondiaux.", url: "https://www.twilio.com/lookup" },
  { name: "SMS-Activate", cat: "phone", desc: "Service de numéros virtuels temporaires pour tests et vérifications d'inscriptions.", url: "https://sms-activate.org/" },
  { name: "Sync.ME", cat: "phone", desc: "Annuaire d'identification d'appelants et de détection de spam avec photos de profil.", url: "https://sync.me/" },

  // ==================== DOMAIN / IP ====================
  { name: "Shodan", cat: "domain", desc: "Le moteur de recherche ultime pour découvrir les serveurs, webcams et IoT connectés.", url: "https://shodan.io/" },
  { name: "Censys", cat: "domain", desc: "Scanner d'infrastructure web et de certificats SSL pour cartographier le réseau.", url: "https://censys.io/" },
  { name: "VirusTotal", cat: "domain", desc: "Analyse multi-antivirus de domaines, adresses IP, fichiers et requêtes malveillantes.", url: "https://virustotal.com/" },
  { name: "SecurityTrails", cat: "domain", desc: "Historique complet des enregistrements DNS, WHOIS et découverte de sous-domaines.", url: "https://securitytrails.com/" },
  { name: "ViewDNS.info", cat: "domain", desc: "Boîte à outils réseau : Reverse IP, WHOIS, DNS report, Port Scanner et Traceroute.", url: "https://viewdns.info/" },
  { name: "DNSDumpster", cat: "domain", desc: "Outil de reconnaissance visuelle et de cartographie des enregistrements DNS.", url: "https://dnsdumpster.com/" },
  { name: "crt.sh", cat: "domain", desc: "Recherche dans les journaux de transparence des certificats SSL/TLS pour trouver des sous-domaines.", url: "https://crt.sh/" },
  { name: "URLScan.io", cat: "domain", desc: "Analyseur de sites web visualisant le comportement, les requêtes et les captures d'écran.", url: "https://urlscan.io/" },
  { name: "BuiltWith", cat: "domain", desc: "Détecte l'ensemble des technologies, CMS, frameworks et services utilisés par un site.", url: "https://builtwith.com/" },
  { name: "Wappalyzer", cat: "domain", desc: "Extension et service d'identification de la stack technique d'une cible web.", url: "https://wappalyzer.com/" },
  { name: "Wayback Machine", cat: "domain", desc: "Archives temporelles permettant d'observer les anciennes versions de n'importe quel site.", url: "https://web.archive.org/" },
  { name: "MXToolbox", cat: "domain", desc: "Diagnostics de serveurs de messagerie, vérification de listes noires (Blacklists) et DNS.", url: "https://mxtoolbox.com/" },
  { name: "Sublist3r", cat: "domain", desc: "Outil Python automatisé pour énumérer les sous-domaines via les moteurs de recherche.", url: "https://github.com/aboul3la/Sublist3r" },
  { name: "Fofa.info", cat: "domain", desc: "Moteur de recherche mondial de cyber-ressources et d'infrastructures informatiques.", url: "https://en.fofa.info/" },
  { name: "GreyNoise", cat: "domain", desc: "Identifie les scanners de sécurité bienveillants et filtre le bruit de fond internet.", url: "https://www.greynoise.io/" },
  { name: "Ipinfo.io", cat: "domain", desc: "Fournit la géolocalisation d'IP, l'ASN, le FAI et les plages d'adresses réseau.", url: "https://ipinfo.io/" },

  // ==================== SOCIAL ====================
  { name: "Social Searcher", cat: "social", desc: "Moteur de recherche de mentions sociales et de tendances en temps réel.", url: "https://www.social-searcher.com/" },
  { name: "Osintgram", cat: "social", desc: "Outil CLI pour exécuter des analyses OSINT poussées sur n'importe quel compte Instagram.", url: "https://github.com/Datalux/Osintgram" },
  { name: "Instagram Explorer", cat: "social", desc: "Exploration anonyme de profils, de publications et de hashtags Instagram.", url: "https://www.instaexplorer.com/" },
  { name: "Twint", cat: "social", desc: "Scraper Twitter/X avancé sans restriction d'API pour extraire des tweets historiques.", url: "https://github.com/twintproject/twint" },
  { name: "Social Blade", cat: "social", desc: "Statistiques et graphiques d'évolution pour YouTube, Twitch, TikTok et Instagram.", url: "https://socialblade.com/" },
  { name: "Comment Picker", cat: "social", desc: "Outils de tirage au sort et d'extraction de commentaires sur les réseaux sociaux.", url: "https://commentpicker.com/" },

  // ==================== IMAGE ====================
  { name: "Google Images", cat: "image", desc: "Recherche d'images inversée standard avec reconnaissance d'objets.", url: "https://images.google.com/" },
  { name: "Yandex Images", cat: "image", desc: "Moteur de recherche inversée ultra-performant pour la reconnaissance faciale.", url: "https://yandex.com/images/" },
  { name: "TinEye", cat: "image", desc: "Trouve la provenance initiale d'une image et ses versions modifiées/redimensionnées.", url: "https://tineye.com/" },
  { name: "PimEyes", cat: "image", desc: "Moteur de recherche de visage par IA trouvant toutes les apparitions d'une personne en ligne.", url: "https://pimeyes.com/" },
  { name: "Forensically", cat: "image", desc: "Suite complète d'analyse forensique (ELA, analyse de clarté, extraction de métadonnées).", url: "https://29a.ch/photo-forensics/" },
  { name: "FotoForensics", cat: "image", desc: "Analyse Error Level Analysis (ELA) pour détecter les altérations et retouches photo.", url: "http://fotoforensics.com/" },
  { name: "InVID Project", cat: "image", desc: "Boîte à outils de vérification des faits (fact-checking) pour images et vidéos d'actualité.", url: "https://www.invid-project.eu/" },
  { name: "Exif tool Jeffrey", cat: "meta", desc: "Visionneuse de données EXIF en ligne permettant d'extraire les coordonnées GPS d'une photo.", url: "http://exif.regex.info/exif.cgi" },
  { name: "SauceNAO", cat: "image", desc: "Moteur de recherche inversée d'images spécialisé dans les illustrations et dessins.", url: "https://saucenao.com/" },

  // ==================== GEO ====================
  { name: "Google Maps", cat: "geo", desc: "Cartographie satellite mondiale et exploration au niveau de la rue via Street View.", url: "https://maps.google.com/" },
  { name: "OpenStreetMap", cat: "geo", desc: "Carte du monde libre et éditable contenant des détails géographiques précis.", url: "https://www.openstreetmap.org/" },
  { name: "SunCalc", cat: "geo", desc: "Calcule l'orientation de la lumière et la longueur des ombres selon la date et l'heure.", url: "https://www.suncalc.org/" },
  { name: "GeoGuessr", cat: "geo", desc: "Jeu interactif d'entraînement à l'identification d'indices de géolocalisation visuels.", url: "https://www.geoguessr.com/" },
  { name: "Mapillary", cat: "geo", desc: "Plateforme participative d'imagerie au niveau des rues alimentée par la communauté.", url: "https://www.mapillary.com/" },
  { name: "Wikimapia", cat: "geo", desc: "Carte en ligne annotée décrivant les bâtiments, installations et lieux d'intérêt.", url: "http://wikimapia.org/" },
  { name: "Google Earth Pro", cat: "geo", desc: "Imagerie satellite haute définition avec historique temporel d'évolution des paysages.", url: "https://earth.google.com/" },
  { name: "Overpass Turbo", cat: "geo", desc: "Outil de requêtes complexes permettant d'extraire des objets spécifiques sur OpenStreetMap.", url: "https://overpass-turbo.eu/" },
  { name: "Zoom.Earth", cat: "geo", desc: "Imagerie satellite en temps réel, cartes météo interactives et suivi de tempêtes.", url: "https://zoom.earth/" },

  // ==================== PEOPLE ====================
  { name: "Pipl", cat: "people", desc: "Le moteur de recherche d'identité le plus complet pour retrouver des individus.", url: "https://pipl.com/" },
  { name: "Spokeo", cat: "people", desc: "Agrégateur de registres publics, dossiers civils et numéros de téléphone (USA).", url: "https://www.spokeo.com/" },
  { name: "WhitePages", cat: "people", desc: "Annuaire public américain pour rechercher des coordonnées, adresses et antécédents.", url: "https://www.whitepages.com/" },
  { name: "BeenVerified", cat: "people", desc: "Services d'enquêtes d'antécédents et de vérification d'identité personnelle.", url: "https://www.beenverified.com/" },
  { name: "FamilyTreeNow", cat: "people", desc: "Base de données de généalogie gratuite révélant l'historique d'adresses et de proches.", url: "https://www.familytreenow.com/" },
  { name: "FastPeopleSearch", cat: "people", desc: "Moteur de recherche d'individus totalement gratuit pour le territoire américain.", url: "https://www.fastpeoplesearch.com/" },
  { name: "WebMii", cat: "people", desc: "Calcule le score de visibilité web d'une personne et agrège ses apparitions publiques.", url: "https://webmii.com/" },

  // ==================== COMPANY ====================
  { name: "OpenCorporates", cat: "company", desc: "Base de données ouverte regroupant plus de 200 millions d'entreprises mondiales.", url: "https://opencorporates.com/" },
  { name: "Crunchbase", cat: "company", desc: "Plateforme de renseignements sur le financement, les fondateurs et l'actualité des entreprises.", url: "https://www.crunchbase.com/" },
  { name: "LinkedIn", cat: "company", desc: "Réseau social professionnel idéal pour reconstituer l'organigramme d'une société.", url: "https://www.linkedin.com/" },
  { name: "Societe.com", cat: "company", desc: "Répertoire légal des données financières et des dirigeants d'entreprises françaises.", url: "https://www.societe.com/" },
  { name: "Pappers.fr", cat: "company", desc: "Accès gratuit aux actes, bilans et bénéficiaires effectifs des sociétés en France.", url: "https://www.pappers.fr/" },
  { name: "Aleph OCCRP", cat: "company", desc: "Outil d'investigation journalistique explorant registres publics et fuites financières.", url: "https://aleph.occrp.org/" },
  { name: "Infogreffe", cat: "company", desc: "Portail officiel des greffes des tribunaux de commerce français.", url: "https://www.infogreffe.fr/" },
  { name: "Bodacc.fr", cat: "company", desc: "Bulletin officiel des annonces civiles et commerciales (procédures collectives, ventes).", url: "https://www.bodacc.fr/" },

  // ==================== DARKWEB ====================
  { name: "Ahmia", cat: "darkweb", desc: "Moteur de recherche clearnet sécurisé indexant les services cachés Tor (.onion).", url: "https://ahmia.fi/" },
  { name: "OnionLand", cat: "darkweb", desc: "Moteur d'exploration du web profond accessible depuis n'importe quel navigateur standard.", url: "https://onionlandsearchengine.com/" },
  { name: "Torch Engine", cat: "darkweb", desc: "L'un des plus anciens et plus vastes moteurs de recherche du réseau Tor.", url: "http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqxy5p74zldyd.onion/" },
  { name: "Haystak", cat: "darkweb", desc: "Moteur de recherche onion revendiquant plus de 1,5 milliard de pages indexées.", url: "http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion/" },

  // ==================== DOCUMENTS ====================
  { name: "Google Dorks", cat: "doc", desc: "Guide et générateur d'operateurs avancés Google (filetype:pdf, ext:doc).", url: "https://www.google.com/advanced_search" },
  { name: "DocumentCloud", cat: "doc", desc: "Plateforme collaborative de stockage et d'analyse de documents d'investigation.", url: "https://www.documentcloud.org/" },
  { name: "FilePursuit", cat: "doc", desc: "Moteur de recherche de fichiers indexant des millions de serveurs web ouverts.", url: "https://filepursuit.com/" },
  { name: "Scribd", cat: "doc", desc: "Vaste bibliothèque numérique hébergeant des millions de livres, manuels et présentations.", url: "https://www.scribd.com/" },
  { name: "Internet Archive", cat: "doc", desc: "Bibliothèque numérique gratuite proposant des millions de livres et textes numérisés.", url: "https://archive.org/details/texts" },

  // ==================== TOOLS / FRAMEWORKS ====================
  { name: "OSINT Framework", cat: "tools", desc: "Arborescence interactive répertoriant les meilleurs outils par catégorie.", url: "https://osintframework.com/" },
  { name: "Kali Linux", cat: "tools", desc: "Système d'exploitation dédié au test d'intrusion et aux investigations cybersécurité.", url: "https://www.kali.org/" },
  { name: "Recon-ng", cat: "tools", desc: "Framework de reconnaissance modulaire basé sur Python avec système de plugins.", url: "https://github.com/lanmaster53/recon-ng" },
  { name: "theHarvester", cat: "tools", desc: "Outil de collecte d'emails, noms, sous-domaines et adresses IP à partir de sources ouvertes.", url: "https://github.com/laramies/theHarvester" },
  { name: "Maltego", cat: "tools", desc: "Logiciel de cartographie des liaisons graphiques et d'analyse de réseaux d'informations.", url: "https://www.maltego.com/" },
  { name: "SpiderFoot", cat: "tools", desc: "Automate d'OSINT exécutant plus de 200 modules de renseignement sur une cible.", url: "https://www.spiderfoot.net/" },
  { name: "OWASP Amass", cat: "tools", desc: "Framework de cartographie d'infrastructures et de découverte d'actifs réseau.", url: "https://github.com/owasp-amass/amass" },

  // ==================== LEAKS ====================
  { name: "LeakCheck", cat: "leaks", desc: "Recherche d'identifiants fuités dans des milliers de bases de données compromises.", url: "https://leakcheck.io/" },
  { name: "Intelligence X", cat: "leaks", desc: "Moteur de recherche d'archives et de leaks conservant les données supprimées.", url: "https://intelx.io/" },
  { name: "DeHashed", cat: "leaks", desc: "Base de données d'identifiants compromises conçue pour la veille en cybersécurité.", url: "https://dehashed.com/" },
  { name: "Snusbase", cat: "leaks", desc: "Indexation de brèches de sécurité permettant de rechercher par IP, nom ou hash.", url: "https://snusbase.com/" }
];