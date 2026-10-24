
function updateTime() { 
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    if (timeText) {
        timeText.innerHTML = currentTime;
    }
}
setInterval(updateTime, 1000);


var biggestIndex = 1;
var topBar = document.querySelector("#top");

function handleWindowTap(element) {
    if (!element) return;
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    if (topBar) {
        topBar.style.zIndex = biggestIndex + 1;
    }
}

function addWindowTapHandling(windowElement) {
    if (windowElement) {
        windowElement.addEventListener("mousedown", function() {
            handleWindowTap(windowElement);
        });
    }
}

function dragElement(element) {
    if (!element) return;

    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;
    
    var header = document.getElementById(element.id + "header");
    if (header) {
        header.onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }
    
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        handleWindowTap(element);
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }
    
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// General Open/Close Window functions
function closeWindow(element) {
    if (element) {
        element.style.display = "none";
    }
}

function openWindow(element) {
    if (element) {
        element.style.display = "flex";
        element.style.flexDirection = "column";
        handleWindowTap(element);
    }
}

// --- 1. WELCOME WINDOW SETUP ---
var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

if (welcomeScreen) {
    dragElement(welcomeScreen);
    addWindowTapHandling(welcomeScreen);
}

if (welcomeScreenClose) {
    welcomeScreenClose.addEventListener("click", function() {
        closeWindow(welcomeScreen);
    });
}

if (welcomeScreenOpen) {
    welcomeScreenOpen.addEventListener("click", function() {
        openWindow(welcomeScreen);
    });
}

// --- 2. NOTES WINDOW SETUP ---
var yappingScreen = document.querySelector("#himesyappingsessions");
var yappingClose = document.querySelector("#yappingclose");
var appLauncher = document.querySelector("#appLauncher");

if (yappingScreen) {
    dragElement(yappingScreen);
    addWindowTapHandling(yappingScreen);
}

if (yappingClose) {
    yappingClose.addEventListener("click", function() {
        closeWindow(yappingScreen);
    });
}

if (appLauncher) {
    appLauncher.addEventListener("click", function() {
        openWindow(yappingScreen);
    });
}


var notesData = JSON.parse(localStorage.getItem("himeWebOSNotes")) || [
    { id: 1, title: "Welcome Note", content: "I simply yap, then jot down some of my yap starters.\n\nTime Will Tell ~ hime" }
];
var activeNoteId = notesData[0] ? notesData[0].id : null;

var notesListContainer = document.querySelector("#notesList");
var noteTitleInput = document.querySelector("#noteTitleInput");
var noteContentInput = document.querySelector("#noteContentInput");
var newNoteBtn = document.querySelector("#newNoteBtn");

function saveAndRenderNotes() {
    localStorage.setItem("himeWebOSNotes", JSON.stringify(notesData));
    renderNotesList();
}

function renderNotesList() {
    if (!notesListContainer) return;
    notesListContainer.innerHTML = "";

    notesData.forEach(function(note) {
        var noteItem = document.createElement("div");
        noteItem.style.padding = "8px";
        noteItem.style.borderRadius = "8px";
        noteItem.style.cursor = "pointer";
        noteItem.style.backgroundColor = (note.id === activeNoteId) ? "#e0e6ed" : "transparent";
        
        noteItem.innerHTML = `<p style="margin: 0; font-size: 14px; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${note.title || "Untitled"}</p>`;
        
        noteItem.addEventListener("click", function() {
            activeNoteId = note.id;
            loadActiveNote();
            renderNotesList();
        });

        notesListContainer.appendChild(noteItem);
    });
}

function loadActiveNote() {
    var activeNote = notesData.find(function(n) { return n.id === activeNoteId; });
    if (activeNote && noteTitleInput && noteContentInput) {
        noteTitleInput.value = activeNote.title;
        noteContentInput.value = activeNote.content;
    } else if (noteTitleInput && noteContentInput) {
        noteTitleInput.value = "";
        noteContentInput.value = "";
    }
}

if (noteTitleInput && noteContentInput) {
    noteTitleInput.addEventListener("input", function() {
        var activeNote = notesData.find(function(n) { return n.id === activeNoteId; });
        if (activeNote) {
            activeNote.title = noteTitleInput.value;
            saveAndRenderNotes();
        }
    });

    noteContentInput.addEventListener("input", function() {
        var activeNote = notesData.find(function(n) { return n.id === activeNoteId; });
        if (activeNote) {
            activeNote.content = noteContentInput.value;
            saveAndRenderNotes();
        }
    });
}

if (newNoteBtn) {
    newNoteBtn.addEventListener("click", function() {
        var newNote = {
            id: Date.now(),
            title: "New Yap Session",
            content: ""
        };
        notesData.push(newNote);
        activeNoteId = newNote.id;
        loadActiveNote();
        saveAndRenderNotes();
    });
}

loadActiveNote();
renderNotesList();


var wisdomScreen = document.querySelector("#wisdomwhimsy");
var wisdomClose = document.querySelector("#wisdomclose");
var wisdomLauncher = document.querySelector("#wisdomLauncher");

if (wisdomScreen) {
    dragElement(wisdomScreen);
    addWindowTapHandling(wisdomScreen);
}

if (wisdomClose) {
    wisdomClose.addEventListener("click", function() {
        closeWindow(wisdomScreen);
    });
}

if (wisdomLauncher) {
    wisdomLauncher.addEventListener("click", function() {
        openWindow(wisdomScreen);
    });
}

var quotesData = JSON.parse(localStorage.getItem("himeWisdomQuotes")) || [
    { id: 1, text: "Time Will Tell", author: "hime" },
    { id: 2, text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { id: 3, text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" }
];
var activeQuoteId = quotesData[0] ? quotesData[0].id : null;

var quoteText = document.querySelector("#quoteText");
var quoteAuthor = document.querySelector("#quoteAuthor");
var quoteThumbnails = document.querySelector("#quoteThumbnails");
var newQuoteText = document.querySelector("#newQuoteText");
var newQuoteAuthor = document.querySelector("#newQuoteAuthor");
var addQuoteBtn = document.querySelector("#addQuoteBtn");

function renderWisdomGallery() {
    if (!quoteThumbnails) return;
    quoteThumbnails.innerHTML = "";

    quotesData.forEach(function(q) {
        var thumb = document.createElement("div");
        thumb.style.padding = "6px 12px";
        thumb.style.borderRadius = "6px";
        thumb.style.cursor = "pointer";
        thumb.style.whiteSpace = "nowrap";
        thumb.style.fontSize = "12px";
        thumb.style.border = "1px solid rgba(255,255,255,0.2)";
        thumb.style.backgroundColor = (q.id === activeQuoteId) ? "#a633d6" : "#252429";
        thumb.textContent = `"${q.text.substring(0, 15)}..."`;

        thumb.addEventListener("click", function() {
            activeQuoteId = q.id;
            displayActiveQuote();
            renderWisdomGallery();
        });

        quoteThumbnails.appendChild(thumb);
    });
}

function displayActiveQuote() {
    var q = quotesData.find(function(item) { return item.id === activeQuoteId; });
    if (q && quoteText && quoteAuthor) {
        quoteText.textContent = `"${q.text}"`;
        quoteAuthor.textContent = `~ ${q.author || "Anonymous"}`;
    }
}

if (addQuoteBtn) {
    addQuoteBtn.addEventListener("click", function() {
        if (!newQuoteText.value.trim()) return;

        var newEntry = {
            id: Date.now(),
            text: newQuoteText.value.trim(),
            author: newQuoteAuthor.value.trim() || "Anonymous"
        };

        quotesData.push(newEntry);
        activeQuoteId = newEntry.id;

        localStorage.setItem("himeWisdomQuotes", JSON.stringify(quotesData));

        newQuoteText.value = "";
        newQuoteAuthor.value = "";

        displayActiveQuote();
        renderWisdomGallery();
    });
}

displayActiveQuote();
renderWisdomGallery();