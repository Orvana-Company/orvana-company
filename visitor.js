const visitorForm = document.getElementById("visitorForm");
const button = document.getElementById("visitorSubmit");
const statusText = document.getElementById("visitorStatus");

const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbwhqvJN8IPqNB_QBKiuBH40Zt2INEkjIzarL9vw8YR5J690hsJXud0lw9mdKyz9KnbE/exec";


visitorForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("visitorName")
            .value
            .trim();

    const origin =
        document.getElementById("visitorOrigin")
            .value
            .trim();

    const purpose =
        document.getElementById("visitorPurpose")
            .value;


    // Cek data

    if (!name || !origin || !purpose) {

        showStatus(
            "Silakan lengkapi semua data terlebih dahulu.",
            true
        );

        return;
    }


    // Ubah tombol

    button.disabled = true;

    button.textContent = "Menyimpan data...";


    showStatus(
        "Sedang menyimpan data pengunjung...",
        false
    );


    // Kirim data ke Google Apps Script

    const form =
        document.createElement("form");

    form.method = "POST";

    form.action = googleScriptURL;

    form.target = "googleScriptFrame";

    form.style.display = "none";


    addHiddenInput(
        form,
        "name",
        name
    );

    addHiddenInput(
        form,
        "origin",
        origin
    );

    addHiddenInput(
        form,
        "purpose",
        purpose
    );


    document.body.appendChild(form);

    form.submit();


    setTimeout(function () {

        form.remove();

    }, 3000);

});


// ==========================================
// MENERIMA RESPONSE GOOGLE APPS SCRIPT
// ==========================================

window.addEventListener("message", function (event) {

    if (
        !event.data ||
        !event.data.status
    ) {
        return;
    }


    const result = event.data;


    if (result.status === "success") {

        sessionStorage.setItem(
            "orvanaVisitorVerified",
            "true"
        );

        sessionStorage.setItem(
            "orvanaVisitorName",
            document
                .getElementById("visitorName")
                .value
                .trim()
        );

        sessionStorage.setItem(
            "orvanaVisitorOrigin",
            document
                .getElementById("visitorOrigin")
                .value
                .trim()
        );

        sessionStorage.setItem(
            "orvanaVisitorPurpose",
            document
                .getElementById("visitorPurpose")
                .value
        );


        button.textContent = "Berhasil";


        showStatus(
            "Data berhasil disimpan. Membuka website ORVANA...",
            false
        );


        setTimeout(function () {

            window.location.href =
                "index.html?verified=1";

        }, 700);


        return;
    }


    if (result.status === "error") {

        button.disabled = false;

        button.textContent =
            "Masuk ke ORVANA";


        showStatus(
            result.message ||
            "Terjadi kesalahan saat menyimpan data.",
            true
        );

    }

});


// ==========================================
// INPUT TERSEMBUNYI
// ==========================================

function addHiddenInput(
    form,
    name,
    value
) {

    const input =
        document.createElement("input");

    input.type = "hidden";

    input.name = name;

    input.value = value;

    form.appendChild(input);

}


// ==========================================
// STATUS
// ==========================================

function showStatus(
    message,
    isError
) {

    statusText.style.display = "block";

    statusText.textContent = message;

    statusText.style.color =
        isError
            ? "#c62828"
            : "#2e7d32";

}