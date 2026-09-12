const visitorForm =
    document.getElementById("visitorForm");


const otpSection =
    document.getElementById("otpSection");


const otpInput =
    document.getElementById("visitorOtp");


const button =
    document.getElementById("visitorSubmit");


const statusText =
    document.getElementById("visitorStatus");


const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbwhqvJN8IPqNB_QBKiuBH40Zt2INEkjIzarL9vw8YR5J690hsJXud0lw9mdKyz9KnbE/exec";


let otpSent = false;


// ==========================================
// SESSION ID
// ==========================================

let sessionId =
    sessionStorage.getItem(
        "orvanaOtpSession"
    );


if (!sessionId) {

    sessionId =
        crypto.randomUUID();

    sessionStorage.setItem(
        "orvanaOtpSession",
        sessionId
    );

}


// ==========================================
// FORM SUBMIT
// ==========================================

visitorForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // ==================================
        // TAHAP 1 — KIRIM OTP
        // ==================================

        if (!otpSent) {

            sendOtp();

            return;

        }


        // ==================================
        // TAHAP 2 — VERIFIKASI OTP
        // ==================================

        verifyOtp();

    }
);


// ==========================================
// KIRIM OTP
// ==========================================

function sendOtp() {


    const name =
        document
            .getElementById("visitorName")
            .value
            .trim();


    const email =
        document
            .getElementById("visitorEmail")
            .value
            .trim()
            .toLowerCase();


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
    // CEK FORM
    // ==================================

    if (
        !name ||
        !email ||
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
    // CEK GMAIL
    // ==================================

    if (
        !email.endsWith("@gmail.com")
    ) {

        showStatus(
            "Silakan gunakan alamat Gmail (@gmail.com).",
            true
        );

        return;

    }


    button.disabled = true;

    button.textContent =
        "Mengirim kode...";


    showStatus(
        "Sedang mengirim kode ke Gmail...",
        false
    );


    // ==================================
    // BUAT FORM TERSEMBUNYI
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
        "action",
        "requestOtp"
    );


    addHiddenInput(
        form,
        "sessionId",
        sessionId
    );


    addHiddenInput(
        form,
        "name",
        name
    );


    addHiddenInput(
        form,
        "email",
        email
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


    setTimeout(function() {

        form.remove();

    }, 3000);

}


// ==========================================
// VERIFIKASI OTP
// ==========================================

function verifyOtp() {


    const otp =
        otpInput
            .value
            .trim();


    // ==================================
    // CEK 4 DIGIT
    // ==================================

    if (!/^\d{4}$/.test(otp)) {

        showStatus(
            "Masukkan kode verifikasi 4 digit.",
            true
        );

        return;

    }


    button.disabled = true;

    button.textContent =
        "Memeriksa kode...";


    showStatus(
        "Memeriksa kode verifikasi...",
        false
    );


    // ==================================
    // FORM VERIFY
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
        "action",
        "verifyOtp"
    );


    addHiddenInput(
        form,
        "sessionId",
        sessionId
    );


    addHiddenInput(
        form,
        "otp",
        otp
    );


    document.body.appendChild(form);


    form.submit();


    setTimeout(function() {

        form.remove();

    }, 3000);

}


// ==========================================
// MENERIMA RESPONSE APPS SCRIPT
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
        // BERHASIL KIRIM OTP
        // ==================================

        if (
            result.status === "success" &&
            !otpSent
        ) {

            otpSent = true;


            otpSection.style.display =
                "block";


            otpInput.focus();


            button.disabled = false;

            button.textContent =
                "Verifikasi Kode";


            showStatus(
                "Kode 4 digit sudah dikirim ke Gmail kamu. Periksa inbox atau folder Spam.",
                false
            );


            return;

        }


        // ==================================
        // OTP BENAR
        // ==================================

        if (
            result.status === "verified"
        ) {

            sessionStorage.setItem(
                "orvanaVisitorVerified",
                "true"
            );


            showStatus(
                "Verifikasi berhasil. Membuka website ORVANA...",
                false
            );


            button.textContent =
                "Berhasil";


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


            if (otpSent) {

                button.textContent =
                    "Verifikasi Kode";

            } else {

                button.textContent =
                    "Kirim Kode Verifikasi";

            }


            showStatus(
                result.message ||
                "Terjadi kesalahan.",
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