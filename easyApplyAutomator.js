// Helper function to wait for a specified amount of time
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to fill input fields based on the label text
async function fillInputBasedOnLabel() {
  const frontendKeywords = [
    'React.js',
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Figma',
  ];
  const inputElements = document.querySelectorAll('input[type="text"]');

  for (const input of inputElements) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) {
      const labelText = label.textContent.toLowerCase();

      if (
        frontendKeywords.some((keyword) =>
          labelText.includes(keyword.toLowerCase())
        )
      ) {
        await enterValueAsHuman(input, '3');
      } else if (labelText.includes('notice period')) {
        await enterValueAsHuman(input, '2');
      } else if (!input.value) {
        await enterValueAsHuman(input, '1');
      }
    }
  }

  // Wait 1 second before clicking the review button
  await wait(1000);
  clickReviewButton();
}

// Function to simulate human-like typing into an input field
async function enterValueAsHuman(input, value) {
  input.focus();
  input.value = ''; // Clear any existing value first

  for (const [index, char] of [...value].entries()) {
    await wait(index * 100); // Simulate typing delay
    input.value += char;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// Function to click the review button
function clickReviewButton() {
  const reviewButton = document.querySelector(
    'button[aria-label="Review your application"]'
  );
  if (reviewButton) {
    reviewButton.click();
  }
}

// Main function to automate the Easy Apply process for job listings
async function automateEasyApply() {
  const jobListings = document.querySelectorAll(
    '.jobs-search-results__list-item'
  );

  // Function to handle applying with a delay and processing job listings
  async function clickApplyWithDelay(index) {
    if (index >= jobListings.length) return; // Stop if all job listings are processed

    const jobListing = jobListings[index];
    const applyButton = jobListing.querySelector('a, button');
    if (applyButton) {
      applyButton.click();

      // Wait for the job listing details to load before clicking the Easy Apply button
      await wait(1000);
      const easyApplyButton = document.querySelector(
        'button.jobs-apply-button'
      );
      if (easyApplyButton) {
        easyApplyButton.click();

        // Wait for the Easy Apply process to initiate before clicking the first "Next" button
        await wait(1000);
        const nextButton1 = document.querySelector(
          'button[data-easy-apply-next-button]'
        );
        if (nextButton1) {
          nextButton1.click();

          // Wait for the first "Next" button to be processed before clicking the second "Next" button
          await wait(1000);
          const nextButton2 = document.querySelector(
            'button[aria-label="Continue to next step"]'
          );
          if (nextButton2) {
            nextButton2.click();

            // Wait for the second "Next" button to be processed before filling inputs
            await wait(1000);
            await fillInputBasedOnLabel();

            // Stop after the first job listing if testMode is true
            if (testMode) {
              console.log('Test mode: Stopping after first job listing.');
              return;
            }

            // Proceed to the next job listing if testMode is false
            await wait(2000);
            await clickApplyWithDelay(index + 1);
          }
        }
      }
    } else {
      // Proceed to the next job listing if no apply button was found
      await wait(2000);
      await clickApplyWithDelay(index + 1);
    }
  }

  // Start the process with the first job listing
  await clickApplyWithDelay(0);
}

// Start the automation process
automateEasyApply();
