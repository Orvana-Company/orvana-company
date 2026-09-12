const visitorForm =
    document.getElementById("visitorForm");

const button =
    document.getElementById("visitorSubmit");

const statusText =
    document.getElementById("visitorStatus");


// ==========================================
// URL GOOGLE APPS SCRIPT
// ==========================================

const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbwhqvJN8IPqNB_QBKiuBH40Zt2INEkjIzarL9vw8YR5J690hsJXud0lw9mdKyz9KnbE/exec";


// ==========================================
// FORM SUBMIT
// ==========================================

visitorForm.addEventListener(
    "submit",
    function(event) {

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
        // NONAKTIFKAN BUTTON
        // ==================================

        button.disabled = true;

        button.textContent =
            "Menyimpan data...";


        showStatus(
            "Sedang menyimpan data pengunjung...",
            false
        );


        // ==================================
        // KIRIM DATA KE GOOGLE APPS SCRIPT
        // ==================================

        const form =
            document.createElement("form");


        form.method = "POST";

        form.action =
            googleScriptURL;

        form.target =
            "googleScriptFrame";

        form.style.display =
            "none";


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


        // Hapus form sementara

        setTimeout(function() {

            form.remove();

        }, 3000);

    }
);


// ==========================================
// MENERIMA RESPONSE DARI GOOGLE APPS SCRIPT
// ==========================================

window.addEventListener(
    "message",
    function(event) {

        if (
            !event.data ||
            !event.data.status
        ) {

            return;

        }


        const result =
            event.data;


        // ==================================
        // BERHASIL
        // ==================================

        if (
            result.status === "success"
        ) {

            showStatus(
                "Data berhasil disimpan. Membuka website ORVANA...",
                false
            );


            button.textContent =
                "Berhasil";


            // Tandai visitor sudah mengisi data

            sessionStorage.setItem(
                "orvanaVisitorVerified",
                "true"
            );


            // Simpan data visitor

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


            // Masuk ke website

            setTimeout(function() {

                window.location.href =
                    "index.html?verified=1";

            }, 700);


            return;

        }


        // ==================================
        // ERROR
        // ==================================

        if (
            result.status === "error"
        ) {

            button.disabled = false;

            button.textContent =
                "Masuk ke ORVANA";


            showStatus(
                result.message ||
                "Terjadi kesalahan saat menyimpan data.",
                true
            );

        }

    }
);


// ==========================================
// TAMBAHKAN INPUT TERSEMBUNYI
// ==========================================

function addHiddenInput(
    form,
    name,
    value
) {

    const input =
        document.createElement("input");


    input.type =
        "hidden";


    input.name =
        name;


    input.value =
        value;


    form.appendChild(input);

}


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


    if (isError) {

        statusText.style.color =
            "#c62828";

    } else {

        statusText.style.color =
            "#2e7d32";

    }

}