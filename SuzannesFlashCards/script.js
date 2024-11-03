let currentFlashcardIndex = 0;
let flashcards = [];

// Load flashcards from the selected JSON file
function loadFlashcards() {
    const selectedSet = document.getElementById('flashcard-set').value;

    if (!selectedSet) {
        // Hide flashcard and button if no set is selected
        document.getElementById('flashcard').style.display = 'none';
        document.getElementById('nextButton').style.display = 'none';
        return;
    }

    fetch(selectedSet)
        .then(response => response.json())
        .then(data => {
            flashcards = data;
            currentFlashcardIndex = 0; // Reset index for new set
            loadFlashcard();
            document.getElementById('flashcard').style.display = 'block';
            document.getElementById('nextButton').style.display = 'block';
        })
        .catch(error => console.error('Error loading flashcards:', error));
}

// Load a flashcard
function loadFlashcard() {
    const flashcardText = document.getElementById('flashcard-text');
    const flashcardAnswer = document.getElementById('flashcard-answer');

    if (flashcards.length === 0) {
        flashcardText.textContent = 'No flashcards available.';
        flashcardAnswer.style.display = 'none';
        return;
    }

    // Set the question text
    flashcardText.textContent = flashcards[currentFlashcardIndex].question;
    flashcardAnswer.textContent = flashcards[currentFlashcardIndex].answer; // Set the answer text
    flashcardAnswer.style.display = 'none'; // Hide the answer initially

    // Update index for the next flashcard
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
}

// Show answer when the flashcard is clicked
document.getElementById('flashcard').addEventListener('click', () => {
    const flashcardAnswer = document.getElementById('flashcard-answer');
    flashcardAnswer.style.display = flashcardAnswer.style.display === 'none' ? 'block' : 'none';
});

// Load flashcards on page load
window.onload = () => {
    // Initially load the first set if any is selected
    loadFlashcards();
};
