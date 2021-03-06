/*jshint esversion: 6 */
/*jshint esversion: 9 */

var app = new Vue (
    {
        el : '#root',
        data: {
            
            userNewValue : '',
            userFilter :'',
            activeContact : 0,
            activeMessage : false, // di default non visualizza nessuna dropdown
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ]
            
        } ,
        methods: {
            // Al click, la chat cliccata diventa attiva, noi possiamo vedere lo storico dei messaggi con quel contatto
            setActiveContact(index){
                this.activeContact = index;
                this.activeMessage = false;
            },
        
            // Aggiunge un nuovo messaggio alla chat (appare come 'sent'(inviato))
            // Dopo un secondo si riceve una risposta di default ('ok', che appare come 'received' (ricevuto))
            addNewMessage() {
                
                
                
                // se l'utente non compila ma clicca il tasto enter, non succede nulla (non pusha)
                if(this.userNewValue.length > 0 ){
                    
                    // creo un nuovo oggetto messaggio con data corrente e stato 'sent' (inviato)
                    // il messaggio proviene dal v-model nell'HTML, e corrisponde alla stringa inserita dall'utente
                    // nell'apposita input
                    
                    const newMessageObj = {
                    
                        date : dayjs().format("DD/MM/YYYY HH:mm:ss"),
                        text : this.userNewValue,
                        status: 'sent'
                    }

                    console.log(newMessageObj);
                    // pusho il nuovo oggetto messaggio nell'array messages dentro contacts
                    this.contacts[this.activeContact].messages.push(newMessageObj);

                }
            
                // una volta "inviato" il messaggio, la input verr?? resettata
                this.userNewValue = '';

                // per evitare che la risposta arrivi da un altro utente 
                // se in meno di un secondo cambio chat dopo aver inviato un messaggio
                const sentMessageActiveContact = this.activeContact;

                
                // dopo 1 secondo appare la risposta di default del contatto a cui si ?? inviato il messaggio
                setTimeout(() => {
                    console.log(this);
                    const newDefaultAnswer = {
                        date : dayjs().format("DD/MM/YYYY HH:mm:ss"),
                        text : 'ok',
                        status: 'received'
                    }

                    console.log(newDefaultAnswer);
                    // pusho il nuovo oggetto messaggio nell'array messages dentro contacts
                    this.contacts[sentMessageActiveContact].messages.push(newDefaultAnswer);
                }, 1000);
            },

            // Filtra i contatti in base alla barra di ricerca (sezione a sinistra)
            filterContacts() {
                this.contacts.forEach((element) => {
                    
                    // se la stringa userFilter ?? compresa nel name dei contacts 
                    if( element.name.toLowerCase().includes(this.userFilter.toLowerCase())) {
                        // visible = true
                        element.visible = true;
                        
                    } else {
                        // visible = false
                        element.visible = false;
                    }
                } )
            },

            // Mostra o no la dropdown accanto a un messaggio
            toggleOptionsDropdown(msgIndex) {
                if( this.activeMessage === msgIndex) {
                    this.activeMessage = false;
                } else {
                    this.activeMessage = msgIndex;
                }
                
            },

            // Cancella un messaggio specifico dai messaggi dell'utente attivo
            deleteMessage(msgIndex) {
                this.contacts[this.activeContact].messages.splice(msgIndex,1);
                this.activeMessage = false;

            },
            getActiveContactLastMessageDate(index) {
                const activeContactMsg = this.contacts[index].messages;
                return activeContactMsg[activeContactMsg.length - 1].date;
            },

            getLastMessageTextFromContact(contactIndex) {
                const contactMessages = this.contacts[contactIndex].messages;
                console.log(contactMessages);
                const contactLastMessage = contactMessages[contactMessages.length -1].text;
                console.log(contactLastMessage);

                let textToPrint = contactLastMessage.slice(0, 30);

                if( textToPrint.length >= 30) {
                    textToPrint += '...';
                }

                return textToPrint;
            }
        }

        
    }
    
);