const phrases = [
    {
      level: 1,
      phrases: [
        { phrase: "It's great to take a hot shower when you _______ get home after a day of work.", answer: "finally" },
        { phrase: "_______, fold in the vinegar and the vanilla.", answer: "Lastly" },
        { phrase: "_________ this course ends I will be continuing to build and refine my own technological literacy.", answer: "After" },
        { phrase: "He went on a diet. Later, he started exercising at the gym.", answer: "Later" },
        { phrase: "You go there, he goes there and ________ she goes here", answer: "finally" },
        { phrase: "It abandoned the plan ______ complaints from staff.", answer: "after." },
        { phrase: "We have to consider the existence of life in another planets.________, we have to explore the space.", answer: "After" },
        { phrase: "She was stressed, so she ________ went to get some tea before solving the problem.", answer: "first" },
        { phrase: "You go there, he goes there and ________ she goes here", answer: "finally" }
      ]
    },
  ];
  
  let currentLevel = 0;
  let currentPhrases = phrases[currentLevel].phrases;
  
  const inputFields = document.querySelectorAll('.input-field');
  const selectFields = document.querySelectorAll('.option-select');
  const submitButton = document.getElementById('submit-button');
  const clearButton = document.getElementById('clear-button');
  const resultDiv = document.getElementById('result');
  const levelDiv = document.querySelector('.level');
  const gameOverDiv = document.getElementById('game-over');
  const successDiv = document.getElementById('success');
  
  submitButton.addEventListener('click', checkAnswers);
  clearButton.addEventListener('click', clearFields);
  
  function checkAnswers() {
    let correctCount = 0;
    let resultText = '';
    for (let i = 0; i < currentPhrases.length; i++) {
      const userAnswer = inputFields[i].value.trim() || selectFields[i].value;
      if (userAnswer === currentPhrases[i].answer) {
        correctCount++;
        resultText += `<p class="correct">Phrase ${i + 1}: Correct!</p>`;
      } else {
        resultText += `<p class="incorrect">Phrase ${i + 1}: Incorrect. Correct answer is "${currentPhrases[i].answer}".</p>`;
      }
    }
    resultText += `<p>You got ${correctCount} out of ${currentPhrases.length} correct!</p>`;
    const score = (correctCount / currentPhrases.length) * 100;
    if (score >= 80) {
      currentLevel++;
      if (currentLevel < phrases.length) {
        currentPhrases = phrases[currentLevel].phrases;
        levelDiv.textContent = `Nível ${currentLevel + 1}`;
        clearFields();
      } else {
        if (currentLevel >= phrases.length) {
          window.location.href = 'winPage.html';
        }
        gameOverDiv.style.display = 'block';
        gameOverDiv.innerHTML = `<h1>Você Ganhou!</h1><p>Parabéns, você completou todos os níveis!</p>`;
        resultDiv.innerHTML = '';
        levelDiv.textContent = '';
        inputFields.forEach(field => field.disabled = true);
        selectFields.forEach(field => field.disabled = true);
        submitButton.disabled = true;
        clearButton.disabled = true;
        setTimeout(() => {
          gameOverDiv.style.display = 'none';
          successDiv.style.display = 'block';
          successDiv.innerHTML = `<h1>You have successfully completed the game!</h1><p>Congratulations, you have finished all levels!</p>`;
        }, 2000);
      }
    }
    resultDiv.innerHTML = resultText;
  }
  
  function clearFields() {
    inputFields.forEach(field => field.value = '');
    selectFields.forEach(field => field.selectedIndex = 0);
    resultDiv.innerHTML = '';
  }