import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  general = [
    {
      quest: "Comment trouver un stage?",
      answ: "- En consultant les offres reçues par l'école\n- En se rendant au Service Relations Entreprises et Valorisation de la Recherche au plot 4.\n- En vous rapprochant des enseignants-chercheurs, des responsables de parcours 3A et de S8, des anciens élèves …\n- En envoyant des candidatures spontanées\n- En activant votre réseau de relations personnelles\n- En participant à des  forums entreprises (ex : forum FOCEEN …)\n- En profitant au mieux des nombreuses occasions d\'interaction avec des professionnels : conférences, tables rondes …\n- En échangeant avec les élèves des promotions précédentes et en consultant la base des stages des années antérieures (données TFE  données 2A, données 1A)"
    },
    {
      quest: "Puis-je partir en stage avant la date déterminée par l’ECM ?",
      answ: "Non. Les dates de départ en stage sont planifiées par l’école au regard des enseignements et des examens obligatoires. Aucune dérogation ne sera faite."
    },
    {
      quest: "Comment obtenir la validation pédagogique et demander votre convention de stage ?",
      answ: "Une fois votre stage trouvé, vous devez vous suivre la procédure décrite ici. Prévoyez trois semaines de délai entre le dépôt de vos informations sur le site et le départ en stage."
    },
    {
      quest: "Mon entreprise souhaite utiliser sa convention de stage, est-ce possible ?",
      answ: "Oui, mais il faut quand même suivre la procédure précédente et cocher que c’est votre entreprise qui éditera la convention. Elle devra alors l’envoyer  à mouna.mechta@centrale-marseille.fr pour les stages en entreprise ou sarah.mostefa@centrale-marseille.fr pour les stages en laboratoire, qui  se chargeront d’en vérifier la validité et de la faire signer par l\'école."
    },
    {
      quest: "Les stages sont-ils rémunérés ?",
      answ: "Une gratification doit être versée aux stagiaires lorsque la durée du stage est supérieure à 2 mois consécutifs au sein d’un même organisme en France : entreprise, d’une administration publique, d’une assemblée parlementaire, d’une assemblée consultative, d’une association ou au sein de tout autre organisme d’accueil. Depuis le 1er décembre 2014, chaque période de 7 heures de présence effective, consécutives ou non est considérée comme équivalente à un jour de stage. De même, chaque période de 22 jours de présence effective consécutifs ou non, équivaut à 1 mois de stage.\nLe montant de la gratification versé au stagiaire doit être précisé dans la convention de stage.\nCe montant peut être fixé soit par la convention de branche ou l’accord professionnel étendu ou à défaut par décret.\nPour les conventions de stages conclues à compter du 1er septembre 2015 : Le montant horaire de la gratification sera fixé à 15% du plafond horaire de la Sécurité sociale. La gratification est versée mensuellement au stagiaire."
    },
    {
      quest: "Puis-je bénéficier d'aides financières pour mon stage?",
      answ: "Des bourses (PRAME) sont allouées par la Région pour les stages à l\'étranger sous certaines conditions. Toutes les informations utiles quant aux conditions et au dépôt du dossier sont disponibles sur le moodle des Relations Internationales de l\'école.\nDes gratifications de stage sont accordées par le Service Entreprise et Valorisation de la recherche pour des stages dans les laboratoires partenaires de l\'école. Vous trouverez les informations et les conditions dans ce document."
    },
    {
      quest: "Comment trouver un tuteur de stage ?",
      answ: "Tous les enseignants de l’ECM peuvent potentiellement être tuteurs de stage. Pour le stage 1A, l’Ecole vous affectera un tuteur. Pour tous les autres stages,  il vous appartiendra  de vous rapprocher des enseignants de l’école afin de trouver un tuteur. Ce dernier étant amené à corriger le rapport et à assister à la soutenance, il est préférable qu’il travaille dans un domaine  proche du sujet du stage pour lequel il est sollicité."
    },
    {
      quest: "Comment mon stage est-il évalué par l'école ?",
      answ: "Pour tous les stages, vous devrez déposer votre rapport et la fiche d\'évaluation remplie par votre organisme d\'accueil à partir des informations de la rubrique:  Dépôt du rapport et de la fiche d\'évaluation. Pour les stages 2A, Césure et TFE, vous devrez également réaliser une soutenance en suivant les instructions de la rubrique : Réservation d\'un créneau de soutenance.\nL\'évaluation finale sera faite par votre tuteur école en fonction des notes de soutenance, de rapport et d’appréciation de l’entreprise."
    }
  ];

  stages1a = [
    {
      quest: "Quels sont les objectifs du stage 1A ?",
      answ: "Le stage de 1A est un stage de découverte de l\'entreprise. Il doit permettre à l’élève de prendre contact avec le monde de l’entreprise dans des tâches d’exécution, sans être investi d’une quelconque autorité. Il est l’occasion pour lui d’enrichir son expérience professionnelle, de développer sa réflexion, de prendre conscience des contraintes socio- économiques auxquelles l’entreprise est soumise."
    },
    {
      quest: "Quelle est la durée du stage 1A ?",
      answ: "Le stage de 1A est un stage obligatoire pour la validation de votre S6 (3 crédits ECTS), dont la durée est de 4 semaines minimum se déroulant entre juillet et août."
    },
    {
      quest: "Au sein de quels types de structures le stage 1A peut-il se dérouler ?",
      answ: "Le stage de 1A doit se dérouler obligatoirement au sein d’une entreprise, en France ou à l’étranger."
    }
  ];

  stages2a = [
    {
      quest: "Quels sont les objectifs du stage 2A ?",
      answ: "Le stage 2A est un stage d'assistant ingénieur. Vous devrez réaliser une mission représentative d’un métier d’ingénieur ou de chercheur en prenant une position active au sein d’une équipe. Vous serez amené à  être force d’analyse et de proposition."
    },
    {
      quest: "Au sein de quels types de structures le stage 2A peut-il se dérouler ?",
      answ: "Le stage de 2A peut se dérouler aussi bien au sein d’une entreprise qu’au sein d’un laboratoire, en France ou à l’étranger."
    },
    {
      quest: "Quelle est la durée du stage de 2A ?",
      answ: "Le stage de 2A est un stage obligatoire* pour la validation de votre S8, dont la durée est comprise entre 2 et 3 mois (8 semaines à minima) se déroulant sur la période de juin à août. *S8 académique international : cf rubrique « cas particuliers »"
    },
    {
      quest: "J’envisage de faire un double diplôme, puis-je partir sans avoir fait mon stage de 2A ?",
      answ: "Non, vous devez réaliser le stage 2A avant votre départ en double diplôme. Si ce n’est pas possible (date de rentrée dans votre université d’accueil en juillet), le stage 2A devra exceptionnellement être effectué et validé plus tard (au retour du DD, ou durant une période de vacances). Les stages fait dans le cadre de votre DD, mater thesis, etc, ne peuvent en aucun cas compter pour votre stage 2A."
    },
    {
      quest: "Est-il possible de faire un stage 2A plus long ?",
      answ: "Il est possible, dans certains cas, d’effectuer un stage de 2A long. Toutefois, conformément à la réglementation en vigueur, ce stage ne pourra exceder 6 mois. Cette possibilité concerne uniquement :- les étudiants étrangers en DD à l’ECM sous réserve de l’accord de leur université d’origine - les étudiants ECM en DD sortant si la date de rentrée dans l’université d’accueil est tardive - Les étudiants partant en césure de septembre à septembre si leur projet a été accepté. Ce stage devra impérativement commencer durant le S8 et au plus tard en juillet. Aucune dérogation possible. Du fait de la réglementation stricte sur les stages, à partir de 2016 tous les étudiants faisant un stage 2A long devront se réinscrire à l’école pour obtenir une convention pour un stage allant au délà du 30 septembre. L’obtention d’une prolongation de la convention après le 30 septembre sera conditionnée à cette réinscription.  "
    },
    {
      quest: "Quelles sont les attentes du rapport de stage 2A ?",
      answ: "Vous trouverez des conseils quant aux objectifs et à la rédaction du rapport dans ce document."
    },
    {
      quest: "Comment est évalué le stage de 2A ?",
      answ: "En plus du rapport et de l'évaluation de l'entreprise, vous devrez faire un soutenance devant un jury composé de votre tuteur école et d'un autre enseignant. Modalités de la soutenance : 20 minutes de présentation, suivies de questions / discussions avec le jury."
    },
    {
      quest: "Cas particulier du S8 académique (SMA)",
      answ: "Il donne l’occasion aux étudiants de réaliser un séjour international de nature académique. Celui-ci étant comptabilisé pour 30 crédits ECTS, le stage 2A facultatif ne sera plus possible à partir de septembre 2017 pour les étudiants optant pour cette possibilité. Toutefois, la condition des 28 semaines de stages obligatoires en fin de scolarité devra être remplie pour l’obtention du diplôme."
    },
    {
      quest: "Cas particulier du combiné S8 académique (SMA) + Stage",
      answ: "Suite à la décision du CE de juillet 2016, si l’élève le souhaite, il pourra faire un stage pendant  son S8 académique.  La décision devra impérativement être prise en amont lors de la rédaction du learning agrement : 24 crédits ECTS académiques devront être validés chez le partenaire étranger, puis 6 crédits ECTS seront validés par le stage 2A.  Si le stage a lieu en France, il ne pourra pas débuter avant le 15 juin 2017 pour assurer un minimum de semaines passées à l’étranger.  Les règles du SMA et des stages s’appliquent (nb de crédits scientifiques, conventions de stages, validation, etc…)"
    },
    {
      quest: "Cas particulier du S8 en Laboratoire / Entreprise à l'international (SSE)",
      answ: "Il donne l’occasion aux étudiants de réaliser un stage à l’international pour une durée de 5 mois minimum et 6 mois maximum, au sein d’un laboratoire ou d’une entreprise. Cette période correspond à un semestre de formation et est comptabilisée pour 30 crédits ECTS.   Il fait l'objet d'un dossier de candidature à remettre avant le 04 novembre 2019 , et de conditions particulières concernant le sujet de stage et l'évaluation, cf documents et présentation 2019. La liste des élèves partis en SSE dans les années antérieures est consultable ici. Une liste de contacts proposés par les enseignants de l'école est également consultable ici. Il est impossible de faire un SSE suivit d'un Double Diplôme quel qu'il soit. Il est impossible de faire une césure (février à février) puis un SSE lors du retour en S8. Il est par contre autorisé de faire un SSE puis une césure (septembre à septembre).    Lien Stages en laboratoire en Australie 2020"
    }
  ];

  stagestfe = [
    {
      quest: "Quels sont les objectifs du stage TFE ?",
      answ: "- Créer une passerelle vers le 1er emploi - Etre capable de mener une étude de haut niveau sur les plans scientifiques, techniques et méthodologiques - Prendre la responsabilité d’une mission d’ingénieur"
    },
    {
      quest: "Quelle est la durée du stage de TFE ?",
      answ: "Le stage de 3A est un stage obligatoire qui valide votre S10, dont la durée est comprise entre 4 et 6 mois (16 semaines à minima et 6 mois au maximum) se déroulant sur la période d’avril à septembre."
    },
    {
      quest: "Puis-je obtenir une dérogation concernant les 28 semaines de stage obligatoires ?",
      answ: "En aucun cas. Ce critère est imposé par la Commission des Titres d'Ingénieurs pour obtenir le diplôme de Centrale Marseille et ne peut être négocié. Seul le jury de diplôme d'octobre est habilité en cas de circonstances exceptionelles à accorder le diplôme lorsque le nombre de semaines est inférieur à 28. En particulier, il ne sert à rien de contacter le responsable des stages en amont pour tenter de négocier avec lui une dispense. "
    },
    {
      quest: "Puis-je être diplomé et continuer mon stage ?",
      answ: "En aucun cas. La loi l’interdit, la délivrance du diplôme met fin au statut d’étudiant, et vous ne pouvez donc plus être en stage. Votre stage devra être terminé, soutenu et validé au plus tard 15 jours avant le jury de diplôme si vous souhaitez que votre dossier soit examiné par le jury de diplôme de l’année. Si vous souhaitez continuer en stage (dans la limite des 6 mois maximum), vous devrez vous ré-inscrire à l’école et votre dossier sera examiné par le jury de diplôme de l’année suivante."
    },
    {
      quest: "Au sein de quels types de structure le stage TFE peut-il se dérouler ?",
      answ: "Le stage de 3A peut se dérouler aussi bien au sein d’une entreprise qu’au sein d’un laboratoire, en France ou à l’étranger."
    },
    {
      quest: "Comment est évalué le stage de TFE ?",
      answ: "L'évaluation finale est basée sur l'évaluation de votre rapport de stage, de votre soutenance et de l'appréciation de l'organisme d'accueil. A noter qu’il n'existe pas de document type concernant la présentation et le contenu du rapport de TFE. Chaque option ayant ses propres critères, il conviendra de vous rapprocher de votre responsable d’option afin d’obtenir des précisions à ce sujet. Les soutenances sont programmée par l'école la troisième semaine de septembre. La réservation de votre créneau se fait à partir de ce lien. La durée et les conditions de votre soutenance dépendront de votre option 3A."
    },
    {
      quest: "Est-il possible de soutenir avant la fin de mon stage ?",
      answ: "Les soutenances de stages 3A ont  lieu  la 3ème semaine du mois de septembre. Il n’est pas nécessaire d’avoir fini le stage avant la soutenance, la seule contrainte étant d’avoir fini le stage, et de l’avoir soutenu et validé 15 jours avant le du jury de diplôme ( se tenant la 3ème semaine d’octobre généralement)"
    }
  ];

  ddsortants = [
    {
      quest: "Etudiant(e) ECM, je suis actuellement en Double Diplôme dans un autre établissement (en France ou à l’étranger), qui s’occupe d’établir ma convention de stage ?",
      answ: "Pour les étudiants en DD dans un autre établissement (en France ou à l’étranger), l’ECM ne procédera à l’édition d’aucune convention. Vous êtes sous la responsabilité de votre établissement d’accueil. "
    },
    {
      quest: "Etudiant(e) ECM, je suis actuellement en Double Diplôme dans un autre établissement à l’étranger, dois-je faire un TFE ?",
      answ: "Non, vous dépendez pour vos 3ième et 4ième années de votre université d’accueil et donc de ses critères de validation de vos semestres. Il y a généralement un stage de type master thesis qui doit être réalisé. Celui-ci compte pour l’obtention des 28 semaines nécessaires  au diplôme de l’ECM. Si ce n’est pas le cas il convient d’en informer le plus rapidement possible le responsable des Relations Internationales et le responsable des stages."
    }
  ];

  cesures = [
    {
      quest: "Puis-je bénéficier de convention de stage pour ma césure entre le S7 et le S8 ?",
      answ: "Oui car vous avez plus de 200h sur chaque année universitaire. Si vous effectuez deux stages conventionnés par l'ecole, l'un des deux doit obligatoirement être un stage dans un organisme de recherche à l'étranger."
    },
    {
      quest: "Puis-je bénéficier de convention de stage pour ma césure entre le S8 et le S9 ?",
      answ: "L'ecole ne signe aucune convention de stage pour ce type de césure. Vous avez la possibilité de faire des CDD, ou de vous inscrire dans un établissement d'enseignement supérieur pour suivre une formation et pour la délivrance d’une convention de stage."
    },
    {
      quest: "J'ai fait un stage conventionné pendant ma césure, dois-je le valider ?",
      answ: "Si vous avez bénéficié d'une convention de stage, vous avez l'obligation de valider. La validation se fait suivant les mêmes modalités que pour les stages de 2A/TFE. Aucun crédit ECTS ne sera associé à ce stage, mais ces semaines de stage compteront pour atteindre les 28 semaines. Si votre stage a été effectué à l'étranger pendant plus de 17 semaines, vous pourrez également valider ainsi la période internationale obligatoire pour le diplôme. "
    },
    {
      quest: "J'ai fait un stage non conventionné par Centrale Marseille ou un CDD pendant ma césure, puis-je faire reconnaitre cette période?",
      answ: "Les semaines effectuées dans ce cadre pourront être comptabilisées sous réserve que  les compétences acquises au cours de cette période correspondent au référentiel compétences des stages 2A. Il conviendra de s'en assurer en fournissant en amont une copie du contrat au service des stages . Un rapport et une soutenance sont obligatoires suivant les mêmes modalités que le stage 2A. En aucun cas cette période ne se substituera à un stage obligatoire non effectué et ne délivrera aucun crédit ECTS."
    },
    {
      quest: "Un de mes stages de césure peut-il valider mon stage de 2A ?",
      answ: "Oui, sous réserve que ce stage intervienne après votre S8, que le départ en stage se fasse pendant le S8 et au plus tard en juillet  et que les compétences acquises au cours de cette période correspondent au référentiel compétences des stages 2A. Le stage devra être suivi par un tuteur école et l’étudiant devra le valider suivant les mêmes modalités que le stage 2A."
    },
    {
      quest: "Durant mon année de césure, j’ai effectué un semestre à l’étranger, puis-je demander la validation de cette période à postériori ?",
      answ: "Vous avez la possibilité de demander la validation à postériori de cette période passée à l’international. La demande devra être adressée au responsable du suivi des mobilités Mr Pascal Denis. Vous devrez rédiger un rapport selon les mêmes prérogatives qu'un rapport de stage de 2A, et fournir tous les justificatifs permettant d'attester de votre séjour à l'étranger et de la durée de ce dernier – 18 semaines consécutives minimum (copies de billet d'avion, de passeport, visa, contrat de travail / attestation officielle...). Cela permettra éventuellement de valider une période de mobilité,  mais ne vous délivrera ni semaines de stage, ni crédits ECTS."
    }
  ];

  constructor() { }

  ngOnInit() { }

}
