(function(){
  "use strict";

  /* ========= CONFIG =========
     1) Incolla qui il webhook Make.com
     2) (Opzionale) Inserisci i link alle pagine corsi se li hai
  */
  const WEBHOOK_URL = "https://hook.eu1.make.com/sq15b9njw376s78u2oegu7obes97opvl";
  const riskOptionsEl = document.getElementById("riskOptions");
  const sectorOptionsEl = document.getElementById("sectorOptions");
  const HELP_ICON = '<img width="50" height="50" src="https://img.icons8.com/ios/50/help--v1.png" alt="help--v1"/>';




  /* ========= DATA: RUOLI ========= */
  const ROLE_DEFS = [
    { id:"lavoratore", label:"Lavoratore" },
    { id:"preposto", label:"Preposto" },
    { id:"dirigente", label:"Dirigente" },
    { id:"datore", label:"Datore di lavoro" },
    { id:"datore_rspp", label:"Datore di lavoro RSPP" },
    { id:"aspp", label:"ASPP" },
    { id:"rspp", label:"RSPP" },
  //{ id:"cspcse", label:"CSP / CSE (Cantieri)" },
    { id:"confinati", label:"Ambienti confinati" }
  ];

  const GROUPS = [
    { key:"ple", title:"PLE", icon:'<img src="https://img.icons8.com/ios/50/scissor-lift.png" alt="scissor-lift"/>' , items:["ple"] },
    { key:"gru", title:"Gru", icon:'<img src="https://img.icons8.com/ios/50/crane.png" alt="crane"/>' , items:["gru"] },
    { key:"carrelli", title:"Carrelli elevatori", icon:'<img src="https://img.icons8.com/ios/50/fork-lift.png" alt="fork-lift"/>' , items:["carrelli"] },
    { key:"mov_terra", title:"Macchine movimento terra", icon:'<img src="https://img.icons8.com/ios/50/digger.png" alt="digger"/>' , items:["mov_terra"] }
    ];


  
  const COURSES = {
    // Lavoratori
    fg: {
    id:"fg",
    title:"Formazione Generale Lavoratori",
    durata:"4 ore",
    modalita:"Presenza / Video / E-learning",
    aggiornamento:"Nessuno",
    link:""
  },

  fs_basso: {
    id:"fs_basso",
    title:"Formazione Specifica Lavoratori (Rischio Basso)",
    durata:"4 ore",
    modalita:"Presenza / Video / E-learning",
    aggiornamento:"6 ore ogni 5 anni",
    modalita_agg:"Presenza / Video / E-learning",
    link:""
  },
  fs_medio: {
    id:"fs_medio",
    title:"Formazione Specifica Lavoratori (Rischio Medio)",
    durata:"8 ore",
    modalita:"Presenza / Video",
    aggiornamento:"6 ore ogni 5 anni",
    modalita_agg:"Presenza / Video / E-learning",
    link:""
  },
  fs_alto: {
    id:"fs_alto",
    title:"Formazione Specifica Lavoratori (Rischio Alto)",
    durata:"12 ore",
    modalita:"Presenza / Video",
    aggiornamento:"6 ore ogni 5 anni",
    modalita_agg:"Presenza / Video / E-learning",
    link:""
  },

  // Preposto
  preposto: {
    id:"preposto",
    title:"Formazione Preposto",
    durata:"12 ore",
    modalita:"Presenza / Video",
    aggiornamento:"6 ore ogni 2 anni",
    modalita_agg:"Presenza / Video",
    link:""
  },

  // Dirigente / Datore
  dirigente_mod: {
    id:"dirigente_mod",
    title:"Formazione Dirigente (Modulo Comune)",
    durata:"12 ore",
    modalita:"Presenza / Video / E-learning",
    aggiornamento:"6 ore ogni 5 anni",
    modalita_agg:"Presenza / Video / E-learning / Convegni",
    link:""
  },
  dirigente_cantieri: {
    id:"dirigente_cantieri",
    title:"Dirigente - Modulo Cantieri",
    durata:"6 ore",
    aggiornamento:"Nessuno",
    link:""
  },
    
  datore_mod: {
    id:"datore_mod",
    title:"Formazione Datore di Lavoro (Modulo Comune)",
    durata:"16 ore",
    modalita:"Presenza / Video / E-learning",
    aggiornamento:"6 ore ogni 5 anni",
    modalita_agg:"Presenza / Video / E-learning / Convegni",
    link:""
  },
    
  datore_cantieri: {
    id:"datore_cantieri",
    title:"Datore di Lavoro - Modulo Cantieri",
    durata:"6 ore",
    modalita:"Presenza / Video / E-learning",
    aggiornamento:"Nessuno",
    link:""
  },

  // Datore RSPP
  datore_rspp_mod: {
    id:"datore_rspp_mod",
    title:"Datore di Lavoro RSPP (Modulo Comune)",
    durata:"8 ore",
    modalita:"Presenza / Video",
    aggiornamento:"8 ore ogni 5 anni",
    modalita_agg:"Presenza / Video / E-learning / Convegni",
    note:"Corso DDL è propedeutico",
    link:""
  },
  datore_rspp_agri: {
    id:"datore_rspp_agri",
    title:"Datore di Lavoro RSPP - Modulo aggiuntivo Agricoltura",
    durata:"16 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Incluso nell’aggiornamento DDL RSPP",
    link:""
  },
  datore_rspp_pesca: {
    id:"datore_rspp_pesca",
    title:"Datore di Lavoro RSPP - Modulo aggiuntivo Pesca",
    durata:"12 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Incluso nell’aggiornamento DDL RSPP",
    link:""
  },
  datore_rspp_costruzioni: {
    id:"datore_rspp_costruzioni",
    title:"Datore di Lavoro RSPP - Modulo aggiuntivo Costruzioni",
    durata:"16 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Incluso nell’aggiornamento DDL RSPP",
    link:""
  },
  datore_rspp_chimico: {
    id:"datore_rspp_chimico",
    title:"Datore di Lavoro RSPP - Modulo aggiuntivo Chimico",
    durata:"16 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Incluso nell’aggiornamento DDL RSPP",
    link:""
  },

  // ASPP/RSPP
  modA: {
    id:"modA",
    title:"ASPP/RSPP - Modulo A",
    durata:"28 ore",
    modalita:"Presenza / Video / E-learning",
    aggiornamento:"Nessuno",
    link:""
  },
  modB: {
    id:"modB",
    title:"ASPP/RSPP - Modulo B Comune",
    durata:"48 ore",
    modalita:"Presenza / Video",
    aggiornamento:"ASPP 20 ore / RSPP 40 ore ogni 5 anni",
    modalita_agg:"Presenza / Video / E-learning / Convegni",
    note:"Modulo A propedeutico",
    link:""
  },
  modC: {
    id:"modC",
    title:"RSPP - Modulo C",
    durata:"24 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Nessuno",
    note:"Mofuli A e B comune propedeutici",
    link:""
  },

  bsp_agri: {
    id:"bsp_agri",
    title:"Modulo B Specializzazione (BSP1) - Agricoltura",
    durata:"16 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Nessuno",
    note:"Moduli A e B comune propedeutici",
    link:""
  },
  bsp_pesca: {
    id:"bsp_pesca",
    title:"Modulo B Specializzazione (BSP2) - Pesca",
    durata:"12 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Nessuno",
    note:"Modulo A e B comune propedeutici",
    link:""
  },
  bsp_costruzioni: {
    id:"bsp_costruzioni",
    title:"Modulo B Specializzazione (BSP3) - Costruzioni",
    durata:"16 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Nessuno",
    note:"Modulo A e B comune propedeutici",
    link:""
  },
  bsp_sanita: {
    id:"bsp_sanita",
    title:"Modulo B Specializzazione (BSP4) - Sanità",
    durata:"12 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Nessuno",
    note:"Modulo A e B comune propedeutici",
    link:""
  },
  bsp_chimico: {
    id:"bsp_chimico",
    title:"Modulo B Specializzazione (BSP5) - Chimico",
    durata:"16 ore",
    modalita:"Presenza / Video",
    aggiornamento:"Nessuno",
    note:"Modulo A e B comune propedeutici",
    link:""
  },

    /*
  // CSP/CSE
  cspcse_base: {
    id:"cspcse_base",
    title:"Coordinatori CSP/CSE - Corso base",
    durata:"120 ore (28+52+16+24)",
    aggiornamento:"40 ore ogni 5 anni",
    link:""
  },
    */

  // Ambienti confinati
  confinati: {
    id:"confinati",
    title:"Ambienti Confinati - Modulo Giuridico + Pratico",
    durata:"12 ore (4 giuridico + 8 pratico)",
    modalita:"Presenza",
    aggiornamento:"4 ore ogni 5 anni solo Pratico",
    modalita_agg:"Presenza",
    link:""
  }
  };

  
  const EQUIP_ITEMS = [

    { id:"ple", label:"PLE", icon:'<img src="https://img.icons8.com/ios/50/scissor-lift.png" alt="scissor-lift"/>' },
    { id:"gru", label:"Gru", icon:'<img src="https://img.icons8.com/ios/50/crane.png" alt="crane"/>' },
    { id:"carrelli", label:"Carrelli elevatori", icon:'<img src="https://img.icons8.com/ios/50/fork-lift.png" alt="fork-lift"/>' },
    { id:"trattori", label:"Trattori", icon:'<img src="https://img.icons8.com/ios/50/tractor.png" alt="tractor"/>' },
    { id:"mov_terra", label:"Macchine movimento terra", icon:'<img src="https://img.icons8.com/ios/50/digger.png" alt="digger"/>' },

    { id:"raccogli_frutta", label:"Raccogli frutta", icon:'<img src="https://img.icons8.com/ios/50/harvester.png" alt="harvester"/>' },
    { id:"carroponte", label:"Carroponte", icon:'<img src="https://img.icons8.com/ios/50/overhead-crane.png" alt="overhead-crane"/>' },
    { id:"pompe_calcestruzzo", label:"Pompe calcestruzzo", icon:'<img src="https://img.icons8.com/ios/50/concrete-pump.png" alt="concrete-pump"/>' },
    { id:"caricatori_materiali", label:"Caricatori materiali", icon:'<img src="https://img.icons8.com/ios/50/crane-hook.png" alt="crane-hook"/>' },
    { id:"none", label:"Nessuna", icon: '<img width="50" height="50" src="https://img.icons8.com/ios/50/cancel.png" alt="cancel"/>' }
    ];



  // Attrezzature che richiedono drill-down (varianti)
    const EQUIP_VARIANTS = {
        ple: [
            { id:"ple_senza", label:"PLE - Senza stabilizzatori" },
            { id:"ple_con", label:"PLE - Con stabilizzatori" },
            { id:"ple_entrambi", label:"PLE - Con e senza stabilizzatori" },
            { id:"ple_unknown", label:"Non lo so" }
        ],

        gru: [
            { id:"gru_autocarro", label:"Gru - Per autocarro" },
            { id:"gru_torre_basso", label:"Gru a torre - Rotazione in basso" },
            { id:"gru_torre_alto", label:"Gru a torre - Rotazione in alto" },
            { id:"gru_torre_basso_alto", label:"Gru a torre - Rotazione in basso e in alto" },
            { id:"gru_mobili", label:"Gru - Mobili" },
            { id:"gru_mobili_falcone", label:"Gru mobili - Modulo aggiuntivo (falcone telescopico / brandeggiabile)" },
            { id:"gru_unknown", label:"Non lo so" }
        ],

        trattori: [
          { id:"trattori_ruote", label:"Trattori - A ruote" },
          { id:"trattori_cingoli", label:"Trattori - A cingoli" },
          { id:"trattori_unknown", label:"Non lo so" }
        ],

        carrelli: [
            { id:"carrelli_industriali", label:"Carrelli - Industriali semoventi" },
            { id:"carrelli_braccio_telescopico", label:"Carrelli - A braccio telescopico" },
            { id:"carrelli_rotativi", label:"Carrelli - Sollevatori telescopici rotativi" },
            { id:"carrelli_combo_16", label:"Carrelli - Industriali semoventi a braccio telescopico e rotativi" },
            { id:"carrelli_combo_14", label:"Carrelli - Semoventi a braccio telescopico + rotativi per sollavemnto carichi sospesi e persone" },
            { id:"carrelli_unknown", label:"Non lo so" }
        ],

        mov_terra: [
            { id:"mme_escavatori_idraulici", label:"MMT - Escavatori idraulici" },
            { id:"mme_escavatori_fune", label:"MMT - Escavatori a fune" },
            { id:"mme_caricatori_frontali", label:"MMT - Caricatori frontali" },
            { id:"mme_terne", label:"MMT - Terne" },
            { id:"mme_autoribaltabili_cingoli", label:"MMT - Autoribaltabili a cingoli" },
            { id:"mme_combo_16", label:"MMT - Escavatori idraulici + caricatori + terne" },
            { id:"mme_unknown", label:"Non lo so" }
        ],

        carroponte: [
          { id:"carroponte_cabina", label:"Carroponte - Comando in cabina" },
          { id:"carroponte_pensile", label:"Carroponte - Comando pensile o radiocomandato" },
          { id:"carroponte_combo_11", label:"Carroponte - Comando pensile o in cabina" },
          { id:"carroponte_unknown", label:"Non lo so" }
        ]
    };


  const EQUIP_BUNDLES = [
    // ===== PLE (pag. 4) =====
    {
      id:"equip_ple_con",
      covers:["ple_con"],
      course:{
        id:"equip_ple_con",
        title:"Abilitazione PLE - Con stabilizzatori",
        durata:"8 ore (4 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_ple_senza",
      covers:["ple_senza"],
      course:{
        id:"equip_ple_senza",
        title:"Abilitazione PLE - Senza stabilizzatori",
        durata:"8 ore (4 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_ple_entrambi",
      covers:["ple_entrambi","ple_unknown"],
      course:{
        id:"equip_ple_entrambi",
        title:"Abilitazione PLE - Con e senza stabilizzatori",
        durata:"10 ore (4 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },

    // ===== GRU (pag. 4) =====
    {
      id:"equip_gru_autocarro",
      covers:["gru_autocarro"],
      course:{
        id:"equip_gru_autocarro",
        title:"Abilitazione Gru per autocarro",
        durata:"12 ore (4 teorico/tecnico + 8 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_gru_torre_basso",
      covers:["gru_torre_basso"],
      course:{
        id:"equip_gru_torre_basso",
        title:"Abilitazione Gru a torre - Rotazione in basso",
        durata:"12 ore (8 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_gru_torre_alto",
      covers:["gru_torre_alto"],
      course:{
        id:"equip_gru_torre_alto",
        title:"Abilitazione Gru a torre - Rotazione in alto",
        durata:"12 ore (8 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_gru_torre_basso_alto",
      covers:["gru_torre_basso_alto"],
      course:{
        id:"equip_gru_torre_basso_alto",
        title:"Abilitazione Gru a torre - Rotazione in basso e in alto",
        durata:"14 ore (8 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_gru_mobili",
      covers:["gru_mobili","gru_unknown"],
      course:{
        id:"equip_gru_mobili",
        title:"Abilitazione Gru mobili",
        durata:"14 ore (7 teorico/tecnico + 7 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      // opzionale aggiuntivo (pag. 4)
      id:"equip_gru_mobili_falcone",
      covers:["gru_mobili_falcone"],
      course:{
        id:"equip_gru_mobili_falcone",
        title:"Gru mobili - Modulo aggiuntivo (falcone telescopico / brandeggiabile)",
        durata:"8 ore (4 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },

    // ===== CARRELLI ELEVATORI (pag. 4) =====
    {
      id:"equip_carrelli_industriali",
      covers:["carrelli_industriali"],
      course:{
        id:"equip_carrelli_industriali",
        title:"Abilitazione Carrelli industriali semoventi",
        durata:"12 ore (8 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_carrelli_braccio_telescopico",
      covers:["carrelli_braccio_telescopico"],
      course:{
        id:"equip_carrelli_braccio_telescopico",
        title:"Abilitazione Carrelli a braccio telescopico",
        durata:"12 ore (8 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_carrelli_rotativi",
      covers:["carrelli_rotativi"],
      course:{
        id:"equip_carrelli_rotativi",
        title:"Abilitazione Sollevatori telescopici rotativi",
        durata:"12 ore (8 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_carrelli_combo_16",
      covers:["carrelli_combo_16"],
      course:{
        id:"equip_carrelli_combo_16",
        title:"Abilitazione Carrelli industriali semoventi a braccio telescopico e rotativi",
        durata:"16 ore (8 teorico/tecnico + 8 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_carrelli_combo_14",
      covers:["carrelli_combo_14"],
      course:{
        id:"equip_carrelli_combo_14",
        title:"Abilitazione Carrelli semoventi a braccio telescopico e rotativi per sollevamento carichi sospesi e persone",
        durata:"14 ore (8 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },

    // ===== TRATTORI (pag. 5) =====
    {
      id:"equip_trattori_ruote",
      covers:["trattori_ruote","trattori_unknown"],
      course:{
        id:"equip_trattori_ruote",
        title:"Abilitazione Trattori a ruote",
        durata:"8 ore (3 teorico/tecnico + 5 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_trattori_cingoli",
      covers:["trattori_cingoli"],
      course:{
        id:"equip_trattori_cingoli",
        title:"Abilitazione Trattori a cingoli",
        durata:"8 ore (3 teorico/tecnico + 5 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },

    // ===== MACCHINE MOVIMENTO TERRA (pag. 5) =====
    {
      id:"equip_mme_escavatori_idraulici",
      covers:["mme_escavatori_idraulici","mme_unknown"],
      course:{
        id:"equip_mme_escavatori_idraulici",
        title:"Abilitazione MMT - Escavatori idraulici",
        durata:"10 ore (4 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_mme_escavatori_fune",
      covers:["mme_escavatori_fune"],
      course:{
        id:"equip_mme_escavatori_fune",
        title:"Abilitazione MMT - Escavatori a fune",
        durata:"10 ore (4 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_mme_caricatori_frontali",
      covers:["mme_caricatori_frontali"],
      course:{
        id:"equip_mme_caricatori_frontali",
        title:"Abilitazione MMT - Caricatori frontali",
        durata:"10 ore (4 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_mme_terne",
      covers:["mme_terne"],
      course:{
        id:"equip_mme_terne",
        title:"Abilitazione MMT - Terne",
        durata:"10 ore (4 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_mme_autoribaltabili_cingoli",
      covers:["mme_autoribaltabili_cingoli"],
      course:{
        id:"equip_mme_autoribaltabili_cingoli",
        title:"Abilitazione MMT - Autoribaltabili a cingoli",
        durata:"10 ore (4 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_mme_combo_16",
      covers:["mme_combo_16"],
      course:{
        id:"equip_mme_combo_16",
        title:"Abilitazione MMT - Escavatori idraulici + caricatori + terne",
        durata:"16 ore (4 teorico/tecnico + 12 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },

    // ===== POMPE CALCESTRUZZO (pag. 5) =====
    {
      id:"equip_pompe_calcestruzzo",
      covers:["pompe_calcestruzzo"],
      course:{
        id:"equip_pompe_calcestruzzo",
        title:"Abilitazione Pompe calcestruzzo",
        durata:"14 ore (7 teorico/tecnico + 7 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },

    // ===== RACCOGLI FRUTTA (pag. 5) =====
    {
      id:"equip_raccogli_frutta",
      covers:["raccogli_frutta"],
      course:{
        id:"equip_raccogli_frutta",
        title:"Abilitazione Raccogli frutta",
        durata:"8 ore (4 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },

    // ===== CARICATORI MATERIALI (pag. 5) =====
    {
      id:"equip_caricatori_materiali",
      covers:["caricatori_materiali"],
      course:{
        id:"equip_caricatori_materiali",
        title:"Abilitazione Caricatori materiali",
        durata:"8 ore (4 teorico/tecnico + 4 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },

    // ===== CARROPONTE (pag. 5) =====
    {
      id:"equip_carroponte_cabina",
      covers:["carroponte_cabina","carroponte_unknown"],
      course:{
        id:"equip_carroponte_cabina",
        title:"Abilitazione Carroponte - Comando in cabina",
        durata:"10 ore (4 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_carroponte_pensile",
      covers:["carroponte_pensile"],
      course:{
        id:"equip_carroponte_pensile",
        title:"Abilitazione Carroponte - Comando pensile o radiocomandato",
        durata:"10 ore (4 teorico/tecnico + 6 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    },
    {
      id:"equip_carroponte_combo_11",
      covers:["carroponte_combo_11"],
      course:{
        id:"equip_carroponte_combo_11",
        title:"Abilitazione Carroponte - Comando pensile o in cabina",
        durata:"11 ore (4 teorico/tecnico + 7 pratico)",
        modalita:"Tutti i moduli e aggiornamento in presenza",
        aggiornamento:"4 ore pratiche ogni 5 anni",
        link:""
      }
    }
];


  /* ========= WIZARD STATE ========= */
  const wizard = document.getElementById("wfWizard");
  const steps = ["roles","risk","cantieri","sector","equip","equip_detail","result"];

  const state = {
    stepIndex: 0,
    answers: {
      roles: new Set(),
      risk: "",
      cantieri: "", // "si" | "no"
      sector: "",
      equip: new Set(),
      equipVariants: {}
    },
    computedCourses: [],
    selectedCourses: new Set(),
    courseMode: {}
  };

  /* ========= DOM ========= */
  const progressEl = document.getElementById("wfProgress");
  const stepEls = Array.from(wizard.querySelectorAll(".wf-step"));

  const roleOptionsEl = document.getElementById("roleOptions");
  const btnRolesNext = document.getElementById("btnRolesNext");

  const btnRiskNext = document.getElementById("btnRiskNext");

  const cantieriOptionsEl = document.getElementById("cantieriOptions");
  const btnCantieriNext = document.getElementById("btnCantieriNext");
  const btnSectorNext = document.getElementById("btnSectorNext");

  const equipOptionsEl = document.getElementById("equipOptions");

  const courseGrid = document.getElementById("courseGrid");
  const noCourses = document.getElementById("noCourses");
  const selectAllCourses = document.getElementById("selectAllCourses");
  const btnOpenModal = document.getElementById("btnOpenModal");

  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const selectedCoursesList = document.getElementById("selectedCoursesList");

  const leadForm = document.getElementById("leadForm");
  const leadName = document.getElementById("leadName");
  const leadEmail = document.getElementById("leadEmail");
  const leadPhone = document.getElementById("leadPhone");
  const leadConsent = document.getElementById("leadConsent");
  const formAlert = document.getElementById("formAlert");
  const formSuccess = document.getElementById("formSuccess");
  const btnSubmitLead = document.getElementById("btnSubmitLead");

  const equipDetailContainer = document.getElementById("equipDetailContainer");
  const btnEquipDetailNext = document.getElementById("btnEquipDetailNext");

  /* ========= RENDER OPTIONS ========= */
  function makeOptionCard({name, id, checked=false, type="checkbox", iconHtml=""}) {
    const wrapper = document.createElement("label");
    wrapper.className = "opt-card";

    const icon = iconHtml
        ? `<div class="opt-icon">${iconHtml}</div>`
        : "";

    wrapper.innerHTML = `
        <input type="${type}" name="${name}" value="${id}" ${checked ? "checked":""}>
        <div class="opt-ui">
            <div class="opt-left">
            ${icon}
            <p class="opt-title">${escapeHtml(idToLabel(id))}</p>
            </div>
            <span class="opt-check">✓</span>
        </div>
    `;

    return wrapper;
    }

    function joinLabels(ids){
      return (ids || [])
        .map(id => idToLabel(id))
        .filter(Boolean)
        .join(", ");
    }

    function courseToText(c){
      // “titolo (durata)” -> es: “Formazione Preposto (12 ore)”
      const det = c.durata ? ` (${c.durata})` : "";
      return `${c.title}${det}`;
    }

    function courseToInlineText(c){
      const det = c.durata ? ` (${c.durata})` : "";
      const mode = state.courseMode[c.id] || "base"; // "base" | "agg"
      const tipo = mode === "agg" ? "Aggiornamento" : "Nuovo";
      return `${c.title}${det} - ${tipo}`;
    }


    function joinCoursesInlineText(courses){
        return (courses || [])
            .map(courseToInlineText)
            .join(" | ");
    }


    function joinCoursesText(courses){
      return (courses || [])
        .map(courseToText)
        .join(" | ");
    }

    function cantieriToLabel(v){
      if (v === "si") return "Sì, opero in cantieri";
      if (v === "no") return "No";
      return "";
    }

    function sectorToLabel(v){
      const map = {
        agri: "Agricoltura",
        pesca: "Pesca",
        costruzioni: "Costruzioni",
        sanita: "Sanità",
        chimico: "Chimico",
        unknown: "Non lo so"
      };
      return map[v] || "";
    }

    function riskToLabel(v){
      const map = {
        basso: "Rischio basso",
        medio: "Rischio medio",
        alto: "Rischio alto"
      };
      return map[v] || "";
    }

    // duratao attrezzature in chiaro: "PLE: PLE - Con stabilizzatori; Gru: Gru - Mobili"
    function equipDetailToText(){
      const parts = [];
      for (const eq of state.answers.equip) {
        if (eq === "none") continue;

        const eqLabel = idToLabel(eq);
        const varId = state.answers.equipVariants[eq];

        if (EQUIP_VARIANTS[eq] && varId) {
          const v = (EQUIP_VARIANTS[eq] || []).find(x => x.id === varId);
          const vLabel = v ? v.label : varId;
          parts.push(`${eqLabel}: ${vLabel}`);
        } else {
          parts.push(eqLabel);
        }
      }
      return parts.join("; ");
}



  function idToLabel(id) {
    const r = ROLE_DEFS.find(x => x.id === id);
    if (r) return r.label;

    const e = EQUIP_ITEMS.find(x => x.id === id);
    if (e) return e.label;

    if (id === "si") return "Sì, opero in cantieri";
    if (id === "no") return "No";

    return id;
}

function getEquipById(id){
  return EQUIP_ITEMS.find(x => x.id === id) || null;
}


  function renderRiskOptions(){
    riskOptionsEl.innerHTML = "";

    const opts = [
        { id:"basso", label:"Rischio basso" },
        { id:"medio", label:"Rischio medio" },
        { id:"alto",  label:"Rischio alto" }
    ];

    opts.forEach(o => {
        const card = document.createElement("label");
        card.className = "opt-card";
        card.innerHTML = `
        <input type="radio" name="risk" value="${o.id}" ${state.answers.risk === o.id ? "checked":""}>
        <div class="opt-ui">
            <p class="opt-title">${escapeHtml(o.label)}</p>
            <span class="opt-check">✓</span>
        </div>
        `;
        riskOptionsEl.appendChild(card);
    });

    riskOptionsEl.addEventListener("change", (e) => {
        if (!e.target || e.target.name !== "risk") return;
        state.answers.risk = e.target.value;
        btnRiskNext.disabled = !state.answers.risk;
    });
}

  function renderSectorOptions(){
    sectorOptionsEl.innerHTML = "";

    const opts = [
        { id:"agri", label:"Agricoltura" },
        { id:"pesca", label:"Pesca" },
        { id:"costruzioni", label:"Costruzioni" },
        { id:"sanita", label:"Sanità" },
        { id:"chimico", label:"Chimico" },
        { id:"unknown", label:"Non lo so" }
    ];

    opts.forEach(o => {
        const card = document.createElement("label");
        card.className = "opt-card";
        card.innerHTML = `
        <input type="radio" name="sector" value="${o.id}" ${state.answers.sector === o.id ? "checked":""}>
        <div class="opt-ui">
            <p class="opt-title">${escapeHtml(o.label)}</p>
            <span class="opt-check">✓</span>
        </div>
        `;
        sectorOptionsEl.appendChild(card);
    });

    sectorOptionsEl.addEventListener("change", (e) => {
        if (!e.target || e.target.name !== "sector") return;
        state.answers.sector = e.target.value;
        btnSectorNext.disabled = !state.answers.sector;
    });
}



  function escapeHtml(s){
    return String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function renderEquipDetail(){
  equipDetailContainer.innerHTML = "";

  const selected = Array.from(state.answers.equip).filter(eq => EQUIP_VARIANTS[eq]);
  if (selected.length === 0) {
    btnEquipDetailNext.disabled = false;
    return;
  }

  selected.forEach(eq => {
    const block = document.createElement("div");
    block.style.marginBottom = "18px";

    const it = getEquipById(eq);
    const iconHtml = (it && it.icon) ? it.icon : "";

    const head = document.createElement("div");
    head.className = "equip-group";
    head.innerHTML = `
    <div class="equip-group-icon">${iconHtml}</div>
    <div class="equip-group-title">${escapeHtml(idToLabel(eq))}</div>
    `;
    block.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "opt-grid";

    (EQUIP_VARIANTS[eq] || []).forEach(v => {
    const card = document.createElement("label");
    card.className = "opt-card";

    const leftIcon = v.id.endsWith("_unknown")
        ? `<div class="opt-icon">${HELP_ICON}</div>`
        : "";

    card.innerHTML = `
        <input type="radio" name="variant_${eq}" value="${v.id}" ${state.answers.equipVariants[eq] === v.id ? "checked":""}>
        <div class="opt-ui">
            <p class="opt-title">${escapeHtml(v.label)}</p>
        <span class="opt-check">✓</span>
        </div>
    `;
    grid.appendChild(card);
    });

    block.appendChild(grid);
    equipDetailContainer.appendChild(block);

  });

  // listener
  equipDetailContainer.onchange = (e) => {
    const name = e.target && e.target.name ? e.target.name : "";
    if (!name.startsWith("variant_")) return;

    const eq = name.replace("variant_", "");
    state.answers.equipVariants[eq] = e.target.value;

    // valida: tutte le macro selezionate con varianti devono avere una scelta
    btnEquipDetailNext.disabled = !allEquipVariantsSelected();
  });

  btnEquipDetailNext.disabled = !allEquipVariantsSelected();
}

function allEquipVariantsSelected(){
  for (const eq of state.answers.equip) {
    if (EQUIP_VARIANTS[eq] && !state.answers.equipVariants[eq]) return false;
  }
  return true;
}


  function renderRoleOptions(){
    roleOptionsEl.innerHTML = "";
    ROLE_DEFS.forEach(r => {
      const card = makeOptionCard({
        name:"roles",
        id:r.id,
        checked: state.answers.roles.has(r.id),
        type:"checkbox"
      });
      roleOptionsEl.appendChild(card);
    });

    roleOptionsEl.addEventListener("change", (e) => {
      if (!e.target || e.target.name !== "roles") return;
      const id = e.target.value;
      if (e.target.checked) state.answers.roles.add(id);
      else state.answers.roles.delete(id);

      btnRolesNext.disabled = state.answers.roles.size === 0;

      if (!(state.answers.roles.has("lavoratore") || state.answers.roles.has("preposto"))) {
        state.answers.risk = "";
        btnRiskNext.disabled = true;
        Array.from(riskOptionsEl.querySelectorAll('input[name="risk"]')).forEach(i => i.checked = false);
        }

        if (!(state.answers.roles.has("datore_rspp") || state.answers.roles.has("rspp") || state.answers.roles.has("aspp"))) {
        state.answers.sector = "";
        btnSectorNext.disabled = true;
        // reset UI radio settore
        Array.from(sectorOptionsEl.querySelectorAll('input[name="sector"]')).forEach(i => i.checked = false);
        }
    }); 
  }

  function renderCantieriOptions(){
    cantieriOptionsEl.innerHTML = "";
    ["si","no"].forEach(id => {
      const card = makeOptionCard({
        name:"cantieri",
        id,
        checked: state.answers.cantieri === id,
        type:"radio"
      });
      cantieriOptionsEl.appendChild(card);
    });

    cantieriOptionsEl.addEventListener("change", (e) => {
      if (!e.target || e.target.name !== "cantieri") return;
      state.answers.cantieri = e.target.value;
      btnCantieriNext.disabled = !state.answers.cantieri;
    });
  }

  function renderEquipOptions(){
    equipOptionsEl.innerHTML = "";

    const items = [...EQUIP_ITEMS].sort((a,b) => {
        if (a.id === "none") return 1;
        if (b.id === "none") return -1;
        return 0;
    });

    items.forEach(it => {
        const card = makeOptionCard({
        name:"equip",
        id: it.id,
        checked: state.answers.equip.has(it.id),
        type:"checkbox",
        iconHtml: it.icon || ""
        });
        equipOptionsEl.appendChild(card);
    });

    equipOptionsEl.addEventListener("change", (e) => {
        if (!e.target || e.target.name !== "equip") return;

        const id = e.target.value;

        if (id === "none" && e.target.checked) {
        state.answers.equip.clear();
        state.answers.equip.add("none");
        equipOptionsEl.querySelectorAll('input[name="equip"]').forEach(inp => {
            if (inp.value !== "none") inp.checked = false;
        });
        return;
        }

        if (id !== "none" && e.target.checked) {
        state.answers.equip.delete("none");
        const noneInp = equipOptionsEl.querySelector('input[name="equip"][value="none"]');
        if (noneInp) noneInp.checked = false;
        }

        if (e.target.checked) state.answers.equip.add(id);
        else state.answers.equip.delete(id);
    });
    }


  function stepIsRequired(stepKey){
    const roles = state.answers.roles;

    if (stepKey === "risk") return roles.has("lavoratore") || roles.has("preposto");
    if (stepKey === "cantieri") return roles.has("dirigente") || roles.has("datore");
    if (stepKey === "sector") return roles.has("datore_rspp") || roles.has("rspp") || roles.has("aspp");
    if (stepKey === "equip_detail") return needsEquipDetail();
    // equip è sempre disponibile (opzionale)
    return true;
  }

  function getVisibleSteps(){
    // start e roles e result sempre
    const base = ["roles"];
    if (stepIsRequired("risk")) base.push("risk");
    if (stepIsRequired("cantieri")) base.push("cantieri");
    if (stepIsRequired("sector")) base.push("sector");
    base.push("equip");
    if (stepIsRequired("equip_detail")) base.push("equip_detail");
    base.push("result");
    return base;
  }

  function renderProgress(){
    const visible = getVisibleSteps();
    progressEl.innerHTML = "";
    visible.forEach((_, i) => {
      const seg = document.createElement("div");
      seg.className = "wf-seg";
      const idx = i;
      if (idx < getCurrentVisibleIndex()) seg.classList.add("is-done");
      if (idx === getCurrentVisibleIndex()) seg.classList.add("is-active");
      progressEl.appendChild(seg);
    });
  }

  function getCurrentVisibleIndex(){
    const visible = getVisibleSteps();
    return Math.max(0, visible.indexOf(steps[state.stepIndex]));
  }

  function showStep(stepKey){
    stepEls.forEach(s => {
      s.classList.toggle("hidden", s.getAttribute("data-step") !== stepKey);
    });
    renderProgress();
  }

  function needsEquipDetail(){
    for (const eq of state.answers.equip) {
        if (EQUIP_VARIANTS[eq]) return true;
    }
    return false;
    }

  function gotoStepIndex(newIndex){
    state.stepIndex = Math.max(0, Math.min(steps.length-1, newIndex));

    let current = steps[state.stepIndex];
    while (current !== "result" && !stepIsRequired(current)) {
      state.stepIndex++;
      current = steps[state.stepIndex];
    }
    showStep(current);

    // quando arrivo a result: calcolo e renderizzo
    if (current === "equip_detail") {
        renderEquipDetail();
    }
    if (current === "result") {
      computeAndRenderResults();
    }
  }

  /* ========= COMPUTE COURSES ========= */
  function computeCoursesFromAnswers(){
    const out = new Map(); // id -> course
    const a = state.answers;

    function add(courseObj){
      if (!courseObj || !courseObj.id) return;
      out.set(courseObj.id, courseObj);
    }

    // --- RUOLI ---
    if (a.roles.has("lavoratore") || a.roles.has("preposto")) {
      add(COURSES.fg);
      if (a.risk === "basso") add(COURSES.fs_basso);
      if (a.risk === "medio") add(COURSES.fs_medio);
      if (a.risk === "alto") add(COURSES.fs_alto);
    }

    if (a.roles.has("preposto")) {
      add(COURSES.preposto);
    }

    if (a.roles.has("dirigente")) {
      add(COURSES.dirigente_mod);
      if (a.cantieri === "si") add(COURSES.dirigente_cantieri);
    }

    if (a.roles.has("datore")) {
      add(COURSES.datore_mod);
      if (a.cantieri === "si") add(COURSES.datore_cantieri);
    }

    if (a.roles.has("datore_rspp")) {
      add(COURSES.datore_rspp_mod);
      // modulo aggiuntivo per settore (se unknown, non aggiungo: meglio non inventare)
      if (a.sector === "agri") add(COURSES.datore_rspp_agri);
      if (a.sector === "pesca") add(COURSES.datore_rspp_pesca);
      if (a.sector === "costruzioni") add(COURSES.datore_rspp_costruzioni);
      if (a.sector === "chimico") add(COURSES.datore_rspp_chimico);
    }

    if (a.roles.has("aspp")) {
      add(COURSES.modA);
      add(COURSES.modB);
      // specializzazione (opzionale): se selezionata
      if (a.sector === "agri") add(COURSES.bsp_agri);
      if (a.sector === "pesca") add(COURSES.bsp_pesca);
      if (a.sector === "costruzioni") add(COURSES.bsp_costruzioni);
      if (a.sector === "sanita") add(COURSES.bsp_sanita);
      if (a.sector === "chimico") add(COURSES.bsp_chimico);
    }

    if (a.roles.has("rspp")) {
      add(COURSES.modA);
      add(COURSES.modB);
      add(COURSES.modC);
      if (a.sector === "agri") add(COURSES.bsp_agri);
      if (a.sector === "pesca") add(COURSES.bsp_pesca);
      if (a.sector === "costruzioni") add(COURSES.bsp_costruzioni);
      if (a.sector === "sanita") add(COURSES.bsp_sanita);
      if (a.sector === "chimico") add(COURSES.bsp_chimico);
    }

    if (a.roles.has("cspcse")) add(COURSES.cspcse_base);
    if (a.roles.has("confinati")) add(COURSES.confinati);


    if (a.equip.size > 0) {
        
        const need = [];

        for (const eq of a.equip) {
            if (EQUIP_VARIANTS[eq]) {
            // richiede variante
            const v = a.equipVariants[eq];
            if (v) need.push(v);
            } else {
            need.push(eq);
            }
        }

        const bundles = pickMinimumBundles(need, EQUIP_BUNDLES);
        bundles.forEach(b => add(b.course));
        }


    return Array.from(out.values());
  }


  function pickMinimumBundles(selectedEquipIds, bundles){
    const need = new Set(selectedEquipIds);
    const picked = [];

    // copia bundle validi
    const pool = bundles.map(b => ({
      id: b.id,
      covers: new Set(b.covers),
      course: b.course
    }));

    while (need.size > 0) {
      let best = null;
      let bestCover = 0;

      for (const b of pool) {
        let c = 0;
        for (const x of b.covers) if (need.has(x)) c++;
        if (c > bestCover) {
          bestCover = c;
          best = b;
        }
      }


      if (!best || bestCover === 0) break;

      picked.push(best);
      for (const x of best.covers) need.delete(x);
  
      const idx = pool.findIndex(p => p.id === best.id);
      if (idx >= 0) pool.splice(idx, 1);
    }

    return picked;
  }


  function computeAndRenderResults(){
    state.computedCourses = computeCoursesFromAnswers();

    state.selectedCourses = new Set();
    state.courseMode = {}; // reset
    (state.computedCourses || []).forEach(c => {
      state.courseMode[c.id] = "base"; // default NUOVO
    });

    selectAllCourses.checked = false;
    btnOpenModal.disabled = true;

    renderCourseCards();
}


  function renderCourseCards(){
    courseGrid.innerHTML = "";
    const courses = state.computedCourses;

    if (!courses || courses.length === 0) {
      noCourses.classList.remove("hidden");
      return;
    }
    noCourses.classList.add("hidden");

    courses.forEach(c => {
      const card = document.createElement("div");
      card.className = "course-card";
      card.setAttribute("data-id", c.id);

      
      const hasAgg = hasRealAgg(c);
      if (!hasAgg && state.courseMode[c.id] === "agg") state.courseMode[c.id] = "base";

      const mode = state.courseMode[c.id] || "base";

      const toggleHtml = hasAgg ? `
        <div class="course-toggle-wrap">
          <div class="course-meta">
            <div><b>Tipologia corso:</b></div>
            </div>

            <div class="course-toggle">
            <button type="button"
                class="ct-btn ${mode === "base" ? "is-active" : ""}"
                data-ct="base"
                data-course="${escapeHtml(c.id)}">
                Nuovo
            </button>

          <button type="button"
            class="ct-btn ct-agg ${mode === "agg" ? "is-active" : ""}"
            data-ct="agg"
            data-course="${escapeHtml(c.id)}">
            <span class="ct-dot"></span>
            Aggiornamento
          </button>
          </div>
        </div>
      ` : "";

      card.innerHTML = `
        <div class="course-h">${escapeHtml(c.title)}</div>

        ${toggleHtml}

        <div class="course-meta">
          <div><b>durata:</b> ${escapeHtml(c.durata || "-")}</div>
          ${c.modalita ? `<div><b>Modalità:</b> ${escapeHtml(c.modalita)}</div>` : ""}
          <div style="margin-top:6px;">
            <b>Aggiornamento:</b> ${escapeHtml(c.aggiornamento || "-")}
          </div>
        </div>

        <input class="course-check" type="checkbox" tabindex="-1" aria-hidden="true">
        ${c.link ? `<a class="course-link" href="${escapeHtml(c.link)}" target="_blank" rel="noopener">Vai al corso →</a>` : ""}
      `;

      // Click sulla card = seleziona/deseleziona corso
      card.addEventListener("click", (e) => {
        const tag = e.target?.tagName?.toLowerCase();
        if (tag === "a" || e.target.closest(".course-toggle")) return;

        toggleCourseSelection(c.id);
        syncCourseCardUI(card, c.id);
        syncSelectAllCheckbox();
        syncCTA();
      });

      courseGrid.appendChild(card);
    });
  }


  function toggleCourseSelection(courseId){
    if (state.selectedCourses.has(courseId)) state.selectedCourses.delete(courseId);
    else state.selectedCourses.add(courseId);
  }

  function syncCourseCardUI(cardEl, courseId){
    const selected = state.selectedCourses.has(courseId);
    cardEl.classList.toggle("is-selected", selected);
    const chk = cardEl.querySelector(".course-check");
    if (chk) chk.checked = selected;
  }

  function syncAllCardsUI(){
    Array.from(courseGrid.querySelectorAll(".course-card")).forEach(card => {
      const id = card.getAttribute("data-id");
      syncCourseCardUI(card, id);
    });
  }

  function syncSelectAllCheckbox(){
    const courses = state.computedCourses;
    if (!courses || courses.length === 0) {
      selectAllCourses.checked = false;
      return;
    }
    const allSelected = courses.every(c => state.selectedCourses.has(c.id));
    selectAllCourses.checked = allSelected;
  }

  function syncCTA(){
    btnOpenModal.disabled = state.selectedCourses.size === 0;
  }

  function hasRealAgg(c){
    const a = (c.aggiornamento || "").trim().toLowerCase();
    if (!a) return false;
    if (a === "nessuno" || a === "-" || a === "n/a") return false;
    return true;
  }


  selectAllCourses.addEventListener("change", () => {
    const courses = state.computedCourses || [];
    if (selectAllCourses.checked) {
      courses.forEach(c => state.selectedCourses.add(c.id));
    } else {
      state.selectedCourses.clear();
    }
    syncAllCardsUI();
    syncCTA();
  });

  courseGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-ct]");
    if (!btn) return;

    e.stopPropagation(); // evita che cliccando toggle selezioni/deselezioni il corso

    const courseId = btn.getAttribute("data-course");
    const mode = btn.getAttribute("data-ct"); // "base" | "agg"

    state.courseMode[courseId] = mode;

    // rerender per aggiornare testi + stato toggle
    renderCourseCards();
    syncAllCardsUI();
  });


  /* ========= MODAL + SUBMIT ========= */
  function openModal(){
    // lista corsi selezionati
    const selected = Array.from(state.selectedCourses);
    const byId = new Map(state.computedCourses.map(c => [c.id, c]));
    const lines = selected
      .map(id => byId.get(id))
      .filter(Boolean)
      .map(c => {
        const modalita = c.modalita ? ` • Modalità: ${escapeHtml(c.modalita)}` : "";
        return `• <b>${escapeHtml(c.title)}</b><br>
            <span style="font-size:12px;">
            durata: ${escapeHtml(c.durata||"-")}
            ${modalita}
            • Aggiornamento: ${escapeHtml(c.aggiornamento||"-")}
            </span>`;
        });



    selectedCoursesList.innerHTML = lines.length ? lines.join("<div style='height:10px'></div>") : "Nessun corso selezionato";

    formAlert.classList.remove("is-show");
    formSuccess.classList.remove("is-show");
    btnSubmitLead.disabled = false;

    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden","false");
  }

  function closeModal(){
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden","true");
  }

  btnOpenModal.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    formAlert.classList.remove("is-show");
    formSuccess.classList.remove("is-show");

    const name = leadName.value.trim();
    const email = leadEmail.value.trim();
    const phone = leadPhone.value.trim();
    const consent = leadConsent.checked;

    if (!name || !email || !phone || !consent) {
      formAlert.classList.add("is-show");
      return;
    }

    if (!WEBHOOK_URL || !/^https:\/\/hook\.[a-z0-9-]+\.make\.com\/.+/i.test(WEBHOOK_URL)) {
      formAlert.textContent = "Config mancante: inserisci la URL del webhook Make.com nello snippet (WEBHOOK_URL).";
      formAlert.classList.add("is-show");
      return;
    }

    btnSubmitLead.disabled = true;

    const recommended = state.computedCourses || [];
    const selected = recommended.filter(c => state.selectedCourses.has(c.id));


    const payload = {
        timestamp: new Date().toISOString(),

        nome: name,
        email: email,
        telefono: phone,

        ruoli: joinLabels(Array.from(state.answers.roles)),
        rischio: riskToLabel(state.answers.risk),
        cantieri: cantieriToLabel(state.answers.cantieri),
        settore_specializzazione: sectorToLabel(state.answers.sector),

        attrezzature: joinLabels(Array.from(state.answers.equip).filter(x => x !== "none")),
        attrezzature_duratao: equipDetailToText(),

        corsi_raccomandati: joinCoursesInlineText(recommended),
        corsi_scelti: joinCoursesInlineText(selected),

        num_corsi_raccomandati: recommended.length,
        num_corsi_scelti: selected.length
    };




    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Webhook error: " + res.status);

      formSuccess.classList.add("is-show");
 
    } catch (err) {
      formAlert.textContent = "Errore invio richiesta. Riprova o contattaci.";
      formAlert.classList.add("is-show");
      console.error(err);
    } finally {
      btnSubmitLead.disabled = false;
    }
  });

  wizard.addEventListener("click", (e) => {
    const nextBtn = e.target.closest("[data-next]");
    const prevBtn = e.target.closest("[data-prev]");
    if (nextBtn) {
      handleNext();
    }
    if (prevBtn) {
      handlePrev();
    }
  });

  function handleNext(){
    const current = steps[state.stepIndex];

    // validazioni step-specifiche
    if (current === "roles" && state.answers.roles.size === 0) return;

    if (current === "risk" && !state.answers.risk) return;
    if (current === "cantieri" && !state.answers.cantieri) return;
    if (current === "sector" && !state.answers.sector) return;

    gotoStepIndex(state.stepIndex + 1);
  }

  function handlePrev(){
    let idx = state.stepIndex - 1;

    while (idx >= 0 && !stepIsRequired(steps[idx])) {
        idx--;
    }

    if (idx < 0) idx = 0;
    gotoStepIndex(idx);
   
  }

  function init(){
    renderProgress();
    renderRiskOptions();
    renderSectorOptions();


    renderRoleOptions();
    renderCantieriOptions();
    renderEquipOptions();

    btnRolesNext.disabled = state.answers.roles.size === 0;

    showStep("roles");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
