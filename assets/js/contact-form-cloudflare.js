const TOKEN = '5846541553:AAGj_EY5I_j53da3trdpi0aLdYNXS36JduM';
const CHAT_ID = '5191233561';
const requestHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Max-Age": "86400",
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request){
    if (request.method == "OPTIONS") {
        return new Response(null, {
            headers: requestHeaders
        })
    } else {
        const body = await request.json();
        const {name, email, message} = body;
        if (!name || !email || !message) {
            return new Response('Slvp veuillez remplir tous les champs', {
                status: 200
            })
        }
        const response = await fetch(`https://api.telegram.org/bot/${TOKEN}/sendMessage`, {
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: `<b> Nouveau message envoyé.</b> \n\n <b>Name: </b> ${name} \n <b>Email: </b> ${email} \n <b>Message: </b> ${message} \n  <b>IP: </b> ${request.headers.get(cf-connecting-ip)}`,
                parse_mode: 'HTML'
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        const result = await response.json();
        const responseMessage = result.Ok ? 'Votre message a été envoyé avec succés' : "Une erreur est survenue durant l'envoi du message"
        return new Response(responseMessage, {status: 200, headers: requestHeaders})
    }

}
