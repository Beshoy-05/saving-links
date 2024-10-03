// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reservationForm');
    const linkType = document.getElementById('linkType');
    const linkDescription = document.getElementById('link-description'); // Get the description input element
    const linkUrl = document.getElementById('linkUrl');
    const linkList = document.getElementById('linkList');

    // Load saved links from localStorage when the page is loaded
    loadLinks();

    // Event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the selected link type, entered description, and the URL
        const selectedLinkType = linkType.value;
        const enteredDescription = linkDescription.value;
        const enteredUrl = linkUrl.value;

        // Validate URL input
        if (enteredUrl === "" || enteredDescription === "") {
            alert("Please enter both a valid description and URL.");
            return;
        }

        // Create a new link object
        const newLink = {
            type: selectedLinkType,
            description: enteredDescription, // Include description in the link object
            url: enteredUrl
        };

        // Add the new link to localStorage
        saveLink(newLink);

        // Add the new link to the displayed list
        displayLink(newLink);

        // Clear the input fields after submission
        linkDescription.value = "";
        linkUrl.value = "";
    });

    // Function to load links from localStorage and display them
    function loadLinks() {
        const storedLinks = JSON.parse(localStorage.getItem('reservedLinks')) || [];

        storedLinks.forEach(link => {
            displayLink(link);
        });
    }

    // Function to save a new link to localStorage
    function saveLink(link) {
        const storedLinks = JSON.parse(localStorage.getItem('reservedLinks')) || [];
        storedLinks.push(link);
        localStorage.setItem('reservedLinks', JSON.stringify(storedLinks));
    }

    // Function to display a link in the link list
    function displayLink(link) {
        const listItem = document.createElement('li');
        listItem.textContent = `${link.type} - ${link.description}: ${link.url}`; // Display type, description, and URL
        linkList.appendChild(listItem);
    }
});
