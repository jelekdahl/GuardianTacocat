function getValues(inputId, outputId) {
  let toCheck = document.getElementById(inputId).value;
  let results = checkForPalindrome(toCheck);
  displayResults(results, outputId);
}

function checkForPalindrome(toCheck) {
  let results = {
    inputEmpty: false,
    onlyPunctWS: false,
    isPalindrome: true,
    reverse: null,
  };

  if (!toCheck) {
    results.inputEmpty = true;
    results.isPalindrome = false;
  } else {
    let cleanString = toCheck.replace(/[^a-z0-9]/gi, '');

    if (!cleanString) {
      results.onlyPunctWS = true;
      results.isPalindrome = false;
    } else {
      cleanString = cleanString.toLowerCase();
      let i = 0, j = cleanString.length - 1;
      results.reverse = new Array(cleanString.length);

      while (results.isPalindrome && i < j) {
        if (cleanString[i] != cleanString[j]) results.isPalindrome = false;
        results.reverse[i] = cleanString[j];
        results.reverse[j--] = cleanString[i++];
      }

      while (i < j) {
        results.reverse[i] = cleanString[j];
        results.reverse[j--] = cleanString[i++];
      }

      if (i == j) {
        results.reverse[i] = cleanString[i];
      }

      results.reverse = results.reverse.join('');
    }
  }

  return results;
}

function displayResults(results, outputId) {
  let outputHTML;

  if (results.inputEmpty) {
    outputHTML = "<h3>Oops, your entry was completely empty!</h3>" + "<hr>"
      + "<p>Enter a phrase that includes characters other than whitespace and punctuation</p>"
  } else if (results.onlyPunctWS) {
    outputHTML = "<h3>Oops, your entry only has whitespace and punctuation!</h3>" + "<hr>"
      + "<p>Enter a phrase that includes other characters, like letters and numbers</p>"
  } else {
    if (results.isPalindrome) {
      outputHTML = "<h3>Well done! You entered a Palindrome!</h3>" + "<hr>"
        + `<p>Your phrase reversed is: ${results.reverse}</p>`
    } else {
      outputHTML = "<h3>Too bad! You didn't enter a Palindrome...</h3>" + "<hr>"
        + `<p>Your phrase reversed is: ${results.reverse}</p>`
    }
  }

  let output = document.getElementById(outputId);
  output.innerHTML = outputHTML;
  output.classList.remove('invisible');

  if (results.isPalindrome) {
    output.classList.add('bg-success-subtle');
    output.classList.remove('bg-danger-subtle');
  } else {
    output.classList.add('bg-danger-subtle');
    output.classList.remove('bg-success-subtle');
  }
}