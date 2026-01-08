import React, { useState, useEffect } from 'react';
import { Calendar, Users, Trophy, PartyPopper, Briefcase, ClipboardCheck, X, ChevronRight, Clock, Check, ExternalLink, Share2, Save } from 'lucide-react';

const eventsData = [
  {
    id: 1,
    title: "Fut’Sables Cup",
    date: "3e week-end d'août",
    type: "tournament",
    // REMPLACE LE LIEN CI-DESSOUS PAR TON VRAI LIEN DRIVE/DROPBOX
    driveLink: "https://drive.google.com/", 
    description: "Le tournoi de pré-saison",
    tasks: [
      { time: "M-10", label: "Réserver la salle (Mairie)" },
      { time: "M-6", label: "Lancer les inscriptions équipes + communication visuelle" },
      { time: "M-2", label: "Faire des demandes d'arbitres officiels" },
      { time: "M-1", label: "Commande des boissons et snacks (prévoir beaucoup d'eau... ou de bière)" },
      { time: "M-1", label: "Recruter des bénévoles" },
      { time: "J-7", label: "Briefing bénévoles" }
    ]
  },
  {
    id: 2,
    title: "Forum Ylium",
    date: "1er week-end de septembre",
    type: "admin",
    driveLink: "https://drive.google.com/",
    description: "Recrutement et présence dans la galerie commerciale.",
    tasks: [
      { time: "M-1", label: "Confirmer l'emplacement avec la direction Ylium" },
      { time: "J-15", label: "Préparer les flyers et fiches d'inscription" },
      { time: "J-3", label: "Vérifier l'état du stand (Kakémono, nappes)" },
      { time: "J-J", label: "Planning de rotation des permanences (ne pas laisser le stagiaire seul)" }
    ]
  },
  {
    id: 3,
    title: "Forum Havre d’Olonne",
    date: "2e week-end de septembre",
    type: "admin",
    driveLink: "",
    description: "Le deuxième round pour ceux qui ont raté le premier.",
    tasks: [
      { time: "M-1", label: "Inscription auprès de l'asso organisatrice" },
      { time: "J-7", label: "Réassort des flyers si tout est parti à Ylium" },
      { time: "J-J", label: "Installation du stand (tôt le matin, courage)" }
    ]
  },
  {
    id: 4,
    title: "Stage Jeunes (Toussaint)",
    date: "1ère semaine vac. scolaires (Oct)",
    type: "youth",
    driveLink: "",
    description: "Occuper les gosses pendant que les parents bossent.",
    tasks: [
      { time: "M-1.5", label: "Définir le programme éducatif et sportif" },
      { time: "M-1", label: "Ouverture des inscriptions en ligne" },
      { time: "J-15", label: "Commande des goûters et repas" },
      { time: "J-2", label: "Impression des fiches de présence et sanitaires" }
    ]
  },
  {
    id: 5,
    title: "Futs’Halloween",
    date: "Vendredi proche du 31 oct.",
    type: "social",
    driveLink: "",
    description: "Du futsal, des déguisements et des bonbons.",
    tasks: [
      { time: "M-1", label: "Communication spécifique (Affiche effrayante)" },
      { time: "J-15", label: "Achat déco et bonbons (Budget dentiste)" },
      { time: "J-J", label: "Installation déco salle + playlist Michael Jackson" }
    ]
  },
  {
    id: 6,
    title: "Repas de Noël Seniors",
    date: "2e week-end de décembre",
    type: "social",
    driveLink: "",
    description: "La raclette ou la tartiflette de la cohésion.",
    tasks: [
      { time: "M-2", label: "Réserver la salle ou le resto" },
      { time: "M-1", label: "Sondage Doodle pour la date exacte et le menu" },
      { time: "J-7", label: "Confirmer le nombre de couverts" }
    ]
  },
  {
    id: 7,
    title: "Noël des Enfants",
    date: "1er samedi vac. Noël",
    type: "youth",
    driveLink: "",
    description: "Le moment où il faut trouver un bénévole pour mettre le costume rouge.",
    tasks: [
      { time: "M-2", label: "Commander les cadeaux/chocolats" },
      { time: "M-1", label: "Trouver le Père Noël (vérifier son casier judiciaire, on sait jamais)" },
      { time: "J-15", label: "Organisation du goûter" }
    ]
  },
  {
    id: 8,
    title: "Nuit du Futsal",
    date: "Dernier samedi de décembre",
    type: "tournament",
    driveLink: "",
    description: "Pour digérer la dinde entre amis.",
    tasks: [
      { time: "M-2", label: "Bloquer la salle (créneau tardif)" },
      { time: "M-1", label: "Inscriptions (tournoi interne ou ouvert ?)" },
      { time: "J-3", label: "Faire les poules du tournoi" }
    ]
  },
  {
    id: 9,
    title: "Galette des Rois",
    date: "Dernier week-end de janvier",
    type: "social",
    driveLink: "",
    description: "L'événement le plus court de l'année.",
    tasks: [
      { time: "J-15", label: "Commander les galettes (Frangipane ET Brioche, sinon c'est la guerre)" },
      { time: "J-7", label: "Acheter cidre et jus de pomme" },
      { time: "J-J", label: "Vérifier qu'on a des couteaux" }
    ]
  },
  {
    id: 10,
    title: "Stage Jeunes (Hiver)",
    date: "1ère semaine vac. Février",
    type: "youth",
    driveLink: "",
    description: "On recommence, comme à la Toussaint.",
    tasks: [
      { time: "M-1.5", label: "Communication lancement inscriptions" },
      { time: "J-15", label: "Planning des encadrants" },
      { time: "J-7", label: "Point météo (si activités ext.)" }
    ]
  },
  {
    id: 11,
    title: "Fut’Job Dating",
    date: "1er vendredi de mars",
    type: "admin",
    driveLink: "",
    description: "Faire semblant de jouer pour trouver du boulot.",
    tasks: [
      { time: "M-3", label: "Démarchage des entreprises partenaires" },
      { time: "M-2", label: "Communication auprès des demandeurs d'emploi" },
      { time: "M-1", label: "Logistique stands entreprises dans la salle" },
      { time: "J-J", label: "Accueil café et badges" }
    ]
  },
  {
    id: 12,
    title: "Tournoi Inter-Entreprises",
    date: "Dernier vendredi de mars",
    type: "tournament",
    driveLink: "",
    description: "Là où les comptables taclent les commerciaux.",
    tasks: [
      { time: "M-3", label: "Lancer les invitations aux boîtes locales" },
      { time: "M-1", label: "Commander les trophées et le traiteur" },
      { time: "J-7", label: "Envoyer le règlement (pas de tacles à la gorge)" }
    ]
  },
  {
    id: 13,
    title: "Stage Jeunes (Pâques)",
    date: "1ère semaine vac. Avril",
    type: "youth",
    driveLink: "",
    description: "Le stage avec les chocolats.",
    tasks: [
      { time: "M-1", label: "Inscriptions" },
      { time: "J-15", label: "Chasse aux œufs à prévoir ?" }
    ]
  },
  {
    id: 14,
    title: "Tournoi de Palets",
    date: "Dernier week-end de mai",
    type: "social",
    driveLink: "",
    description: "Parce qu'on est en Vendée, c'est obligatoire.",
    tasks: [
      { time: "M-2", label: "Récupérer des planches en plomb (appel aux dons)" },
      { time: "M-1", label: "Gérer le stock de bar (très important)" },
      { time: "J-J", label: "Trouver de la craie" }
    ]
  },
  {
    id: 15,
    title: "Fin de saison / AG",
    date: "3e dimanche de juin",
    type: "admin",
    driveLink: "",
    description: "Le bilan financier et l'apéro qui suit.",
    tasks: [
      { time: "M-2", label: "Convocations officielles AG" },
      { time: "M-1", label: "Préparer le rapport moral et financier" },
      { time: "J-7", label: "Commander le buffet de fin de saison" }
    ]
  },
  {
    id: 16,
    title: "Loto du LSO",
    date: "Dernier week-end de juin",
    type: "social",
    driveLink: "",
    description: "Quine ! Carton plein ! (Le truc qui rapporte de l'argent).",
    tasks: [
      { time: "M-4", label: "Déclaration mairie et préfecture" },
      { time: "M-3", label: "Démarchage lots (bons d'achat, jambons)" },
      { time: "M-1", label: "Communication massive (Presse, Facebook)" },
      { time: "J-J", label: "Vérifier le boulier et les micro" }
    ]
  },
  {
    id: 17,
    title: "Stage Jeunes (Été)",
    date: "3e semaine de juillet",
    type: "youth",
    driveLink: "",
    description: "Futsal et soleil.",
    tasks: [
      { time: "M-2", label: "Réserver créneaux salle (souvent fermées l'été)" },
      { time: "M-1", label: "Communication estivale" }
    ]
  },
  {
    id: 18,
    title: "Stage Jeunes (Août)",
    date: "1ère semaine d'août",
    type: "youth",
    driveLink: "",
    description: "Dernier stage avant la reprise.",
    tasks: [
      { time: "M-1", label: "Inscriptions dernière minute" },
      { time: "J-J", label: "Nettoyage matériel avant nouvelle saison" }
    ]
  }
];

const getTypeIcon = (type) => {
  switch (type) {
    case 'tournament': return <Trophy className="w-5 h-5 text-yellow-600" />;
    case 'social': return <PartyPopper className="w-5 h-5 text-purple-600" />;
    case 'youth': return <Users className="w-5 h-5 text-green-600" />;
    case 'admin': return <Briefcase className="w-5 h-5 text-blue-600" />;
    default: return <Calendar className="w-5 h-5 text-gray-600" />;
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'tournament': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'social': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'youth': return 'bg-green-100 text-green-800 border-green-200';
    case 'admin': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const Modal = ({ event, onClose, completedTasks, onToggleTask }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`p-6 border-b flex justify-between items-start ${getTypeColor(event.type).split(' ')[0]}`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white/50`}>
                {event.type}
              </span>
              <span className="text-sm font-medium opacity-75 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {event.date}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <p className="text-gray-600 mb-6 italic border-l-4 border-gray-300 pl-4">
            "{event.description}"
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-blue-600" />
            Rétroplanning & To-Do
          </h3>
          <p className="text-xs text-gray-500 mb-4 -mt-2">Clique sur une tâche pour la marquer comme terminée.</p>

          <div className="space-y-3">
            {event.tasks.map((task, idx) => {
               const taskId = `${event.id}-${idx}`;
               const isCompleted = !!completedTasks[taskId];

               return (
                <div 
                  key={idx} 
                  onClick={() => onToggleTask(event.id, idx)}
                  className={`flex items-start gap-4 p-3 rounded-lg border transition-all cursor-pointer select-none
                    ${isCompleted 
                      ? 'bg-green-50 border-green-200 opacity-75' 
                      : 'hover:bg-gray-50 border-gray-100 bg-white'
                    }`}
                >
                  <div className="flex-shrink-0 pt-1">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                      ${isCompleted ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
                      {isCompleted && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-16 text-right pt-0.5">
                    <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded transition-colors
                      ${isCompleted ? 'bg-green-200 text-green-800' : 'bg-slate-800 text-white'}`}>
                      {task.time}
                    </span>
                  </div>
                  
                  <div className={`flex-grow text-sm md:text-base transition-all ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {task.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            {event.driveLink ? (
              <a 
                href={event.driveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-200"
              >
                <ExternalLink className="w-4 h-4" />
                Accéder au dossier Drive
              </a>
            ) : (
               <button 
                 disabled
                 className="px-6 py-2 bg-gray-200 text-gray-500 font-medium rounded-lg cursor-not-allowed"
                 title="Ajoutez un lien dans le code pour activer ce bouton"
               >
                 Aucun dossier lié
               </button>
            )}
            
            <p className="text-xs text-gray-400 mt-2">
              {event.driveLink ? "Ouvre le dossier dans un nouvel onglet" : "Ajoute l'URL dans la constante eventsData"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LsoFutsalPlanner() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);

  // Initialisation de l'état avec localStorage
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('lsoPlannerTasks');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Erreur lecture localStorage", e);
      return {};
    }
  });

  // Sauvegarde automatique à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('lsoPlannerTasks', JSON.stringify(completedTasks));
    } catch (e) {
      console.error("Erreur écriture localStorage", e);
    }
  }, [completedTasks]);

  // Fonction pour gérer le cocher/décocher
  const toggleTask = (eventId, taskIndex) => {
    const key = `${eventId}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Fonction de partage (Copie le lien)
  const handleShare = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredEvents = filter === 'all' 
    ? eventsData 
    : eventsData.filter(e => e.type === filter);

  // Calcul du % global d'avancement
  const totalTasks = eventsData.reduce((acc, curr) => acc + curr.tasks.length, 0);
  const totalCompleted = Object.values(completedTasks).filter(Boolean).length;
  const progressPercentage = Math.round((totalCompleted / totalTasks) * 100) || 0;

  return (
    <div className="min-h-screen font-sans text-slate-900 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-green-400" />
          <span>Lien copié dans le presse-papier !</span>
        </div>
      )}

      {/* Navbar */}
      <header className="bg-slate-900 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl relative overflow-hidden">
              <span className="z-10 relative">L</span>
              <div 
                className="absolute bottom-0 left-0 w-full bg-green-500 transition-all duration-500" 
                style={{ height: `${progressPercentage}%`, opacity: 0.3 }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">LSO Futsal <span className="text-blue-400">Manager</span></h1>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Progression : <span className="text-green-400 font-bold">{progressPercentage}%</span></span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1 text-slate-500" title="Vos données sont enregistrées automatiquement sur cet appareil"><Save className="w-3 h-3" /> Sauvegarde locale active</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 flex-grow md:flex-grow-0 no-scrollbar">
              {['all', 'tournament', 'social', 'youth', 'admin'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all ${
                    filter === f 
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {f === 'all' ? 'Tout' : f}
                </button>
              ))}
            </div>

            {/* Share Button */}
            <button 
              onClick={handleShare}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors flex-shrink-0"
              title="Copier le lien de la page"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => {
            // Calculer avancement par carte
            const eventTasksTotal = event.tasks.length;
            const eventTasksCompleted = event.tasks.reduce((acc, _, idx) => {
              return acc + (completedTasks[`${event.id}-${idx}`] ? 1 : 0);
            }, 0);
            const isFullyComplete = eventTasksTotal > 0 && eventTasksTotal === eventTasksCompleted;

            return (
              <div 
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`group bg-white rounded-xl shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col relative
                  ${isFullyComplete ? 'border-green-200' : 'border-slate-200 hover:border-blue-300'}
                `}
              >
                {isFullyComplete && (
                  <div className="absolute top-0 right-0 p-2">
                    <div className="bg-green-100 text-green-700 rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start mb-3 pr-6">
                    <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  
                  <h3 className={`font-bold text-lg mb-2 transition-colors ${isFullyComplete ? 'text-green-700' : 'text-slate-800 group-hover:text-blue-600'}`}>
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Clock className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full mb-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isFullyComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${(eventTasksCompleted / eventTasksTotal) * 100}%` }}
                    />
                  </div>

                  <p className="text-sm text-slate-400 line-clamp-2">
                    {event.description}
                  </p>
                </div>
                
                <div className={`px-5 py-3 border-t text-xs text-center font-medium transition-colors
                  ${isFullyComplete 
                    ? 'bg-green-50 text-green-700 border-green-100' 
                    : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'}
                `}>
                  {isFullyComplete ? 'Terminé ! Bravo.' : 'Voir le rétroplanning'}
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p>Aucun événement trouvé dans cette catégorie.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} LSO Futsal - Les données sont stockées localement sur votre navigateur.</p>
      </footer>

      {/* Modal */}
      {selectedEvent && (
        <Modal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
          completedTasks={completedTasks}
          onToggleTask={toggleTask}
        />
      )}
    </div>
  );
}
