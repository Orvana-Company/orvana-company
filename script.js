/* ========================================================= 
   ORVANA COMPANY 
   SCRIPT.JS 
========================================================= */ 
 
 
/* ========================================================= 
   DATA 6 ANGGOTA ORVANA 
========================================================= */ 
 
const employees = [

    {
        name: "Mr. Arnold H. Simbolon",
        position: "Konsultan Akademik",
        photo: "assets/employees/arnold-simbolon.jpg",
        alt: "Foto Mr. Arnold H. Simbolon",
        isTeacher: true
    },

    {
        name: "Andita Sinaga",
        position: "Managing Director",
        photo: "assets/employees/andita.jpg",
        alt: "Foto Andita Sinaga"
    },

    {
        name: "Hosea Siregar",
        position: "Treasury Officer",
        photo: "assets/employees/hosea-siregar.jpg",
        alt: "Foto Hosea Siregar"
    },

    {
        name: "Rebekka Silaen",
        position: "Mitra Organisasi",
        photo: "assets/employees/rebekka-silaen.jpg",
        alt: "Foto Rebekka Silaen"
    },

    {
        name: "Dimas Tamba",
        position: "Mitra Organisasi",
        photo: "assets/employees/dimas-tamba.jpg",
        alt: "Foto Dimas Tamba"
    },

    {
        name: "Sela Pandiangan",
        position: "Mitra Organisasi",
        photo: "assets/employees/sela-pandiangan.jpg",
        alt: "Foto Sela Pandiangan"
    },

    {
        name: "Rehan Pandiangan",
        position: "Mitra Organisasi",
        photo: "assets/employees/rehan-pandiangan.jpg",
        alt: "Foto Rehan Pandiangan"
    }

];
 
 
 
/* ========================================================= 
   GET HTML ELEMENTS 
========================================================= */ 
 
const peopleGrid = 
    document.getElementById("peopleGrid"); 
 
 
const employeeModal = 
    document.getElementById("employeeModal"); 
 
 
const modalBackground = 
    document.getElementById("modalBackground"); 
 
 
const modalClose = 
    document.getElementById("modalClose"); 
 
 
const posterPhoto = 
    document.getElementById("posterPhoto"); 
 
 
const posterName = 
    document.getElementById("posterName"); 
 
 
const posterPosition = 
    document.getElementById("posterPosition"); 
 
 
const menuButton = 
    document.getElementById("menuButton"); 
 
 
const navigation = 
    document.getElementById("navigation"); 
 
 
const yearElement = 
    document.getElementById("year"); 
 
 
 
/* ========================================================= 
   YEAR 
========================================================= */ 
 
yearElement.textContent = 
    new Date().getFullYear(); 
 
 
 
/* ========================================================= 
   RENDER EMPLOYEE CARDS 
========================================================= */ 
 
function renderEmployees() { 
 
    peopleGrid.innerHTML = ""; 
 
 
    employees.forEach( 
        function(employee) { 
 
 
            const card = 
                document.createElement("button"); 
 
 
            card.type = 
                "button"; 
 
 
            card.className = 
                "person-card reveal"; 
 
 
            card.innerHTML = ` 
 
                <div class="person-photo"> 
 
                    <img 
                        src="${employee.photo}" 
                        alt="${employee.alt}" 
                        loading="lazy" 
                    > 
 
                </div> 
 
 
                <div class="person-info"> 
 
                    <div class="person-name"> 
                        ${employee.name} 
                    </div> 
 
 
                    <div class="person-position"> 
                        ${employee.position} 
                    </div> 
 
 
                    <div class="person-hint"> 
                        Lihat poster profil → 
                    </div> 
 
                </div> 
 
            `; 
 
 
            /* ================================================= 
               IMAGE ERROR HANDLER 
            ================================================= */ 
 
            const image = 
                card.querySelector("img"); 
 
 
            image.addEventListener( 
                "error", 
                function() { 
 
 
                    image.style.display = 
                        "none"; 
 
 
                    const photoContainer = 
                        card.querySelector( 
                            ".person-photo" 
                        ); 
 
 
                    photoContainer.innerHTML = ` 
 
                        <div style=" 
                            width:100%; 
                            height:100%; 
                            display:flex; 
                            align-items:center; 
                            justify-content:center; 
                            text-align:center; 
                            color:#777; 
                            font-size:13px; 
                            padding:20px; 
                        "> 
 
                            Foto belum tersedia 
 
                        </div> 
 
                    `; 
 
                } 
            ); 
 
 
 
            /* ================================================= 
               OPEN POSTER 
            ================================================= */ 
 
            card.addEventListener( 
                "click", 
                function() { 
 
                    openEmployeePoster( 
                        employee 
                    ); 
 
                } 
            ); 
 
 
            peopleGrid.appendChild( 
                card 
            ); 
 
        } 
    ); 
 
 
    observeRevealElements(); 
 
} 
 
 
 
/* ========================================================= 
   OPEN EMPLOYEE POSTER 
========================================================= */ 
 
function openEmployeePoster(employee) { 
 
 
    posterPhoto.src = 
        employee.photo; 
 
 
    posterPhoto.alt = 
        employee.alt; 
 
 
    posterName.textContent = 
        employee.name; 
 
 
    posterPosition.textContent = 
        employee.position; 
 
 
    employeeModal.classList.add( 
        "active" 
    ); 
 
 
    employeeModal.setAttribute( 
        "aria-hidden", 
        "false" 
    ); 
 
 
    document.body.style.overflow = 
        "hidden"; 
 
} 
 
 
 
/* ========================================================= 
   CLOSE EMPLOYEE POSTER 
========================================================= */ 
 
function closeEmployeePoster() { 
 
 
    employeeModal.classList.remove( 
        "active" 
    ); 
 
 
    employeeModal.setAttribute( 
        "aria-hidden", 
        "true" 
    ); 
 
 
    document.body.style.overflow = 
        ""; 
 
} 
 
 
 
/* ========================================================= 
   CLOSE BUTTON 
========================================================= */ 
 
modalClose.addEventListener( 
    "click", 
    closeEmployeePoster 
); 
 
 
 
/* ========================================================= 
   CLICK OUTSIDE 
========================================================= */ 
 
modalBackground.addEventListener( 
    "click", 
    closeEmployeePoster 
); 
 
 
 
/* ========================================================= 
   ESC KEY 
========================================================= */ 
 
document.addEventListener( 
    "keydown", 
    function(event) { 
 
 
        if ( 
            event.key === "Escape" && 
            employeeModal.classList.contains( 
                "active" 
            ) 
        ) { 
 
 
            closeEmployeePoster(); 
 
        } 
 
    } 
); 
 
 
 
/* ========================================================= 
   MOBILE MENU 
========================================================= */ 
 
menuButton.addEventListener( 
    "click", 
    function() { 
 
        navigation.classList.toggle( 
            "active" 
        ); 
 
    } 
); 
 
 
 
/* ========================================================= 
   CLOSE MOBILE MENU AFTER CLICK 
========================================================= */ 
 
const navigationLinks = 
    navigation.querySelectorAll("a"); 
 
 
navigationLinks.forEach( 
    function(link) { 
 
 
        link.addEventListener( 
            "click", 
            function() { 
 
                navigation.classList.remove( 
                    "active" 
                ); 
 
            } 
        ); 
 
    } 
); 
 
 
 
/* ========================================================= 
   SCROLL ANIMATION 
========================================================= */ 
 
function observeRevealElements() { 
 
 
    const revealElements = 
        document.querySelectorAll( 
            ".reveal:not(.show)" 
        ); 
 
 
    const observer = 
        new IntersectionObserver( 
 
            function(entries, observerObject) { 
 
 
                entries.forEach( 
                    function(entry) { 
 
 
                        if ( 
                            entry.isIntersecting 
                        ) { 
 
 
                            entry.target.classList.add( 
                                "show" 
                            ); 
 
 
                            observerObject.unobserve( 
                                entry.target 
                            ); 
 
                        } 
 
                    } 
                ); 
 
            }, 
 
            { 
                threshold: 0.12 
            } 
 
        ); 
 
 
    revealElements.forEach( 
        function(element) { 
 
            observer.observe( 
                element 
            ); 
 
        } 
    ); 
 
} 
 
 
 
/* ========================================================= 
   START WEBSITE 
========================================================= */ 
 
renderEmployees(); 
 
 
observeRevealElements(); 
