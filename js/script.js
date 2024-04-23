const { createApp } = Vue;
const dt = luxon.DateTime;
// const now = dt.now();

createApp({
data() {
return {
    contacts: [
    {
        name: "Michele",
        avatar: "_1",
        visible: true,
        lastAccess: "10.20",
        messages: [
        {
            date: "10/01/2020 15:30:55",
            message: "Hai portato a spasso il cane?",
            status: "sent",
        },
        {
            date: "10/01/2020 15:50:00",
            message: "Ricordati di stendere i panni",
            status: "sent",
        },
        {
            date: "10/01/2020 16:15:22",
            message: "Tutto fatto!",
            status: "received",
        },
        ],
    },
    {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        lastAccess: "10.20",
        messages: [
        {
            date: "20/03/2020 16:30:00",
            message: "Ciao come stai?",
            status: "sent",
        },
        {
            date: "20/03/2020 16:30:55",
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
        },
        {
            date: "20/03/2020 16:35:00",
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
        },
        ],
    },
    {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        lastAccess: "10.20",
        messages: [
        {
            date: "28/03/2020 10:10:40",
            message: "La Marianna va in campagna",
            status: "received",
        },
        {
            date: "28/03/2020 10:20:10",
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
        },
        {
            date: "28/03/2020 16:15:22",
            message: "Ah scusa!",
            status: "received",
        },
        ],
    },
    {
        name: "Alessandro B.",
        avatar: "_4",
        visible: true,
        lastAccess: "10.20",
        messages: [
        {
            date: "10/01/2020 15:30:55",
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
        },
        {
            date: "10/01/2020 15:50:00",
            message: "Si, ma preferirei andare al cinema",
            status: "received",
        },
        ],
    },
    {
        name: "Alessandro L.",
        avatar: "_5",
        visible: true,
        lastAccess: "10.20",
        messages: [
        {
            date: "10/01/2020 15:30:55",
            message: "Ricordati di chiamare la nonna",
            status: "sent",
        },
        {
            date: "10/01/2020 15:50:00",
            message: "Va bene, stasera la sento",
            status: "received",
        },
        ],
    },
    {
        name: "Claudia",
        avatar: "_6",
        visible: true,
        lastAccess: "10.20",
        messages: [
        {
            date: "10/01/2020 15:30:55",
            message: "Ciao Claudia, hai novità?",
            status: "sent",
        },
        {
            date: "10/01/2020 15:50:00",
            message: "Non ancora",
            status: "received",
        },
        {
            date: "10/01/2020 15:51:00",
            message: "Nessuna nuova, buona nuova",
            status: "sent",
        },
        ],
    },
    {
        name: "Federico",
        avatar: "_7",
        visible: true,
        lastAccess: "10.20",
        messages: [
        {
            date: "10/01/2020 15:30:55",
            message: "Fai gli auguri a Martina che è il suo compleanno!",
            status: "sent",
        },
        {
            date: "10/01/2020 15:50:00",
            message: "Grazie per avermelo ricordato, le scrivo subito!",
            status: "received",
        },
        ],
    },
    {
        name: "Davide",
        avatar: "_8",
        visible: true,
        lastAccess: "10.20",
        messages: [
        {
            date: "10/01/2020 15:30:55",
            message: "Ciao, andiamo a mangiare la pizza stasera?",
            status: "received",
        },
        {
            date: "10/01/2020 15:50:00",
            message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
            status: "sent",
        },
        {
            date: "10/01/2020 15:51:00",
            message: "OK!!",
            status: "received",
        },
        ],
    },
    ],

    risposteCasuali: [
        "Sì, esattamente!",
        "No, assolutamente non sono d'accordo.",
        "Hmm, interessante punto di vista!",
        "Non ne sono sicuro, che ne pensi tu?",
        "Wow, non ci avevo mai pensato in quel modo!",
        "Mi piacerebbe approfondire questa discussione!",
        "Potrebbe essere, dipende dalle circostanze.",
        "Ah, è possibile, ma non ne sono convinto al 100%.",
        "Guardiamola da un'altra prospettiva.",
        "Non ho idea di cosa stia succedendo, ma suona divertente!"
    ],

    newMessage: {
        date: "",
        message: "",
        status: "sent",
    },

    chatSearch: "",
    activeIndex: 0,
    
    isTyping: false,
    online: false,
};
},
methods: {
    sendMessage: function() {
        const newMessageCopy = {...this.newMessage};
        newMessageCopy.date = dt.now().toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
        const newMessageCopyTrimmed = newMessageCopy.message.trim()
        console.log(newMessageCopyTrimmed);

        if (newMessageCopyTrimmed !== "") {
            this.contacts[this.activeIndex].messages.push(newMessageCopy);
            this.newMessage.message = "";
            this.isTyping = true;
    
            setTimeout(() => {
                let answer = {
                    date: dt.now().toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                    message: this.risposteCasuali[Math.floor(Math.random() * this.risposteCasuali.length)],
                    status: "received",
                };
                this.contacts[this.activeIndex].messages.push(answer);
                this.isTyping = false;
                this.online = true;
            }, 2000);

            setTimeout(() => {
                this.online = false;
                this.contacts[this.activeIndex].lastAccess = dt.now().toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
            }, 5000);
        }
    },
    search: function() {
        // porto tutto in minuscolo per confrontare
        const searchQuery = this.chatSearch.toLowerCase();

        this.contacts.forEach(contact => {
            // anche name in minuscolo
            //con inludes restituisco a visible true o false
            contact.visible = contact.name.toLowerCase().includes(searchQuery);
        });
    },
    deleteMex: function (index) {
        this.contacts[this.activeIndex].messages.splice(index, 1)
    },
    lastMex: function (index) {
        return this.contacts[index].messages[this.contacts[index].messages.length - 1].message;
    },
    lastTime: function (index) {
        return this.contacts[index].messages[this.contacts[index].messages.length - 1].date;
    },
},
}).mount("#app");

// Bonus aggiuntivi:
//*fatto
// evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi
// A) cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio) finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, quando l'input non è vuoto si visualizza l'icona dell'aeroplano. Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono.
// B) inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano
// predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc
// sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello stato: visualizzare il testo "sta scrivendo..." nel timeout in cui il pc risponde, poi mantenere la scritta "online" per un paio di secondi e infine visualizzare "ultimo accesso alle xx:yy" con l'orario corretto
//*da fare
// dare la possibilità all'utente di cancellare tutti i messaggi di un contatto o di cancellare l'intera chat con tutti i suoi dati: cliccando sull'icona con i tre pallini in alto a destra, si apre un dropdown menu in cui sono presenti le voci "Elimina messaggi" ed "Elimina chat"; cliccando su di essi si cancellano rispettivamente tutti i messaggi di quel contatto (quindi rimane la conversazione vuota) oppure l'intera chat comprensiva di tutti i dati del contatto oltre che tutti i suoi messaggi (quindi sparisce il contatto anche dalla lista di sinistra)
// dare la possibilità all'utente di aggiungere una nuova conversazione, inserendo in un popup il nome e il link all'icona del nuovo contatto
