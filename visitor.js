const visitorForm =
    document.getElementById("visitorForm");


visitorForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const name =
        document.getElementById("visitorName").value.trim();

    const origin =
        document.getElementById("visitorOrigin").value.trim();

    const purpose =
        document.getElementById("visitorPurpose").value;


    if (!name || !origin || !purpose) {

        alert("Silakan lengkapi semua data terlebih dahulu.");

        return;
    }


    const visitorData = {

        name: name,

        origin: origin,

        purpose: purpose,

        time: new Date().toLocaleString("id-ID")

    };


    const googleScriptURL =
        "https://script.google.com/macros/s/AKfycbwhqvJN8IPqNB_QBKiuBH40Zt2INEkjIzarL9vw8YR5J690hsJXud0lw9mdKyz9KnbE/exec";


    const button =
        visitorForm.querySelector("button");


    button.disabled = true;

    button.textContent = "Memproses...";


    try {

        await fetch(googleScriptURL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(visitorData)

        });


        sessionStorage.setItem("orvanaVisitorVerified", "true");
         window.location.href = "index.html";


    } catch (error) {

        console.error(
            "Gagal mengirim data:",
            error
        );


        alert(
            "Data belum berhasil dikirim. Silakan coba lagi."
        );


        button.disabled = false;

        button.textContent =
            "Masuk ke Website ORVANA";

    }

});
