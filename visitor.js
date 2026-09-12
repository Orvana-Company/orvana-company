const visitorForm =
    document.getElementById("visitorForm");

const button =
    document.getElementById("visitorSubmit");

const statusText =
    document.getElementById("visitorStatus");


// ==========================================
// GOOGLE APPS SCRIPT
// ==========================================

const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbwhqvJN8IPqNB_QBKiuBH40Zt2INEkjIzarL9vw8YR5J690hsJXud0lw9mdKyz9KnbE/exec";


// ==========================================
// SUBMIT FORM
// ==========================================

visitorForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ==================================
        // AMBIL DATA
        // ==================================

        const name =
            document
                .getElementById("visitorName")
                .value
                .trim();


        const origin =
            document
                .getElementById("visitorOrigin")
                .value
                .trim();


        const purpose =
            document
                .getElementById("visitorPurpose")
                .value;


        // ==================================
        // CEK DATA
        // ==================================

        if (
            !name ||
            !origin ||
            !purpose
        ) {

            showStatus(
                "Silakan lengkapi semua data terlebih dahulu.",
                true
            );

            return;
        }


        // ==================================
        // SIMPAN DATA DI BROWSER
        // ==================================

        sessionStorage.setItem(
            "orvanaVisitorVerified",
            "true"
        );

        sessionStorage.setItem(
            "orvanaVisitorName",
            name
        );

        sessionStorage.setItem(
            "orvanaVisitorOrigin",
            origin
        );

        sessionStorage.setItem(
            "orvanaVisitorPurpose",
            purpose
        );


        // ==================================
        // UBAH TOMBOL
        // ==================================

        button.disabled = true;

        button.textContent =
            "Memproses...";


        showStatus(
            "Data berhasil diisi. Membuka website ORVANA...",
            false
        );


        // ==================================
        // KIRIM DATA KE GOOGLE SHEETS
        // TANPA MENUNGGU RESPONSE
        // ==================================

        const data =
            new URLSearchParams();

        data.append(
            "name",
            name
        );

        data.append(
            "origin",
            origin
        );

        data.append(
            "purpose",
            purpose
        );


        fetch(
            googleScriptURL,
            {
                method: "POST",
                mode: "no-cors",
                body: data,
                keepalive: true
            }
        ).catch(function () {

            // Jika Google Apps Script lambat/error,
            // pengunjung tetap bisa masuk ke website.

        });


        // ==================================
        // LANGSUNG MASUK KE WEBSITE
        // ==================================

        setTimeout(function () {

            window.location.href =
                "index.html?verified=1";

        }, 1500);

    }
);


// ==========================================
// STATUS
// ==========================================

function showStatus(
    message,
    isError
) {

    statusText.style.display =
        "block";

    statusText.textContent =
        message;

    statusText.style.color =
        isError
            ? "#c62828"
            : "#2e7d32";

}