var app = new Vue (
    {
        el : '#root',
        data: {
            
            userNewValue : '',
            userFilter :'',
            activeContact : 0,
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
            setActiveContact(index){
                this.activeContact = index;
            },
        
            addNewMessage() {
                
                
                
                // se l'utente non compila ma clicca il tasto enter, non succede nulla (non pusha)
                if(this.userNewValue.length > 0 ){
                    
                    
                    
                    const newMessageObj = {
                    
                        date : dayjs().format("DD/MM/YYYY HH:mm:ss"),
                        text : this.userNewValue,
                        status: 'sent'
                    }

                    console.log(newMessageObj);
                    this.contacts[this.activeContact].messages.push(newMessageObj);

                }
            
                this.userNewValue = '';

                console.log(this);
                setTimeout(() => {
                    console.log(this);
                    const newDefaultAnswer = {
                        date : dayjs().format("DD/MM/YYYY HH:mm:ss"),
                        text : 'ok',
                        status: 'received'
                    }

                    console.log(newDefaultAnswer);
                    this.contacts[this.activeContact].messages.push(newDefaultAnswer);
                }, 1000);
            },

            filterContacts() {
                this.contacts.forEach((element) => {
                    
                    // se la stringa userFilter è compresa nel name dei contacts 
                    if( element.name.toLowerCase().includes(this.userFilter.toLowerCase())) {
                        // visible = true
                        element.visible = true;
                        
                    } else {
                        // visible = false
                        element.visible = false;
                    }
                } )

                
            }
        }

        
    }
    
);