const fs = require('fs');
const path = require('path');

// Function to parse date in YYMMDD format and convert it to a Date object
function parseDate(dateString) {
    const day = parseInt(dateString.slice(4, 6), 10);
    const month = parseInt(dateString.slice(2, 4), 10) - 1; // Month is 0-indexed
    const year = 2000 + parseInt(dateString.slice(0, 2), 10); // Assuming the year is 20YY
    return new Date(year, month, day); // Return a Date object
}

// Function to format Date object as DD-MM-YYYY
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Get today's date and set the time to midnight to ignore the time part
const today = new Date();
today.setHours(0, 0, 0, 0);  // Set time to 00:00:00

// Read the event files from the events folder
const eventsDir = path.join(__dirname, 'agenda/events');
const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.txt'));

const campaignsDir = path.join(__dirname, 'campaigns/events');
const campaignFiles = fs.readdirSync(campaignsDir).filter(file => file.endsWith('.txt'));

// Read each event file and parse the information
const events = eventFiles.map(file => {
    const filePath = path.join(eventsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const date = file.slice(0, 6);  // First 6 characters are the date (YYMMDD)
    const name = file.slice(6, -4).replace(/_/g, ' ').trim();  // Everything after the date is the name of the event, replacing underscores with spaces
    
    const description = content.trim();  // Assuming the text file contains the description

    console.log(`Parsing file: ${file}, Date: ${date}, Name: ${name}`);

    return {
        date: date,
        name: name,
        description: description,
    };
});

// Read each event file and parse the information
const campaigns = campaignFiles.map(file => {
    const filePath = path.join(campaignsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const name = file.slice(0, -4).replace(/_/g, ' ').trim();  // Everything after the date is the name of the event, replacing underscores with spaces
    
    const description = content.trim();  // Assuming the text file contains the description

    console.log(`Parsing file: ${file}, Name: ${name}`);

    return {
        name: name,
        description: description,
    };
});

console.log("Parsed events:", events);

// Filter events to exclude those that are before the current date
const upcomingEvents = events.filter(event => {
    const eventDate = parseDate(event.date);
    const isUpcoming = eventDate >= today;
    console.log(`Event: ${event.name}, Date: ${event.date}, IsUpcoming: ${isUpcoming}`);
    return isUpcoming;
});

console.log("Upcoming events:", upcomingEvents);

console.log("Parsed campaigns:", campaigns);

// Sort the filtered events by date (most recent first)
upcomingEvents.sort((a, b) => parseDate(b.date) - parseDate(a.date));

// Generate the HTML for the agenda page
const agendaHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Welkom bij de evenementenagenda van S.A.B. Sikkel & Harp! Hier vindt je onze aankomende openbare evenementen!">
    <meta name="og:description" content="De agenda voor de aankomende evenementen van S.A.B. Sikkel & Harp.">
    <meta name="robots" content="index, follow">
    <title>Agenda - S.A.B. Sikkel en Harp</title>
    <link rel="stylesheet" href="/files/css/stylesheet.css">
    <link rel="icon" type="image/png" sizes="32x32" href="/files/img/logo-32x32.png">
    <script src="/files/components/components.js" type="text/javascript" defer></script>
    <script>
        if (window.location.pathname === '/agenda/index.html') {
          window.location.pathname = '/agenda/';
        }
    </script>
</head>
<body>
    <header-component></header-component>
    <div class="content">
        <p>
            <h2>One-shots</h2>
            Atleast twice a year, we host an open event where we play a one-shot adventure. These are short, self-contained sessions that are perfect for getting to know new systems, stories, and players. Whether you want to try out a new TTRPG system or just enjoy an evening of action and creativity, our one-shots are accessible and open to everyone.<br>

            Tenminste twee keer per jaar organiseren we een open evenement waarin we een one-shot avontuur spelen. Dit zijn kortdurende, op zichzelf staande sessies die perfect zijn om kennis te maken met nieuwe systemen, verhalen en spelers. Of je nu even wil proeven van een nieuw TTRPG-systeem of gewoon een avondje vol actie en creativiteit zoekt, onze one-shots zijn laagdrempelig en open voor iedereen.<br>
        </p>
        <br>
    
        <div id="events-container">
            ${upcomingEvents.map(event => `
            <br>
            <div class="event">
                <div class="event-title">${event.name}</div>
                <div class="event-date">${formatDate(parseDate(event.date))}</div>
                <div class="event-description">${event.description}</div>
            </div>
            `).join('')}
        </div>
    </div>

    <footer-component></footer-component>
</body>
</html>
`;

console.log("Generated HTML:", agendaHtml);

// Write the generated HTML to the agenda folder
const agendaDir = path.join(__dirname, 'agenda');
if (!fs.existsSync(agendaDir)) {
    fs.mkdirSync(agendaDir);
}

fs.writeFileSync(path.join(agendaDir, 'index.html'), agendaHtml);
console.log('Agenda page generated successfully!');

// Generate the HTML for the agenda page
const campaignsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Welkom bij de aanmeldpagina voor de campaigns van S.A.B. Sikkel & Harp! Hier vindt je onze huidige campaigns!">
    <meta name="og:description" content="De aanmeldpagina voor de campaigns van S.A.B. Sikkel & Harp.">
    <meta name="robots" content="index, follow">
    <title>Campaigns - S.A.B. Sikkel en Harp</title>
    <link rel="stylesheet" href="/files/css/stylesheet.css">
    <link rel="icon" type="image/png" sizes="32x32" href="/files/img/logo-32x32.png">
    <script src="/files/components/components.js" type="text/javascript" defer></script>
    <script>
        if (window.location.pathname === '/campaigns/index.html') {
          window.location.pathname = '/campaigns/';
        }
    </script>
</head>
<body>
    <header-component></header-component>
    <div class="content">
        <p>
            <h2>Campaigns</h2>
            We organize long-term campaigns that last for six months. Campaigns offer the opportunity to dive deeper into a story, develop your character, and experience an immersive adventure with your group. To join a campaign, you must be a member of our Discord server or WhatsApp community. Each campaign has its own setting, rule system, and schedule, so there is always a story that suits your play style!<br>

            We organiseren langdurige campaigns die een half jaar duren. Campaigns bieden de kans om dieper in een verhaal te duiken, je personage te ontwikkelen en samen met je groep een meeslepend avontuur te beleven. Om deel te nemen aan een campaign, moet je lid zijn van onze Discord-server of WhatsApp-community. Elke campaign heeft een eigen setting, regelsysteem en speelschema, dus er is altijd wel een verhaal dat bij jouw speelstijl past!<br>
        </p>
        <br>
    
        <div id="events-container">
            ${campaigns.map(event => `
            <br>
            <div class="event">
                <div class="event-title">${event.name}</div>
                <div class="event-description">${event.description}</div>
            </div>
            `).join('')}
        </div>
    </div>

    <footer-component></footer-component>
</body>
</html>
`;

console.log("Generated HTML:", campaignsHtml);

// Write the generated HTML to the agenda folder
const campaignFolderDir = path.join(__dirname, 'campaigns');
if (!fs.existsSync(campaignFolderDir)) {
    fs.mkdirSync(campaignFolderDir);
}

fs.writeFileSync(path.join(campaignFolderDir, 'index.html'), campaignsHtml);
console.log('Campaigns page generated successfully!');