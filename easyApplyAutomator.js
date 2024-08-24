const testMode = true; // Set this to false when you want to process all job listings

function automateEasyApply() {
  const jobListings = document.querySelectorAll('.jobs-search-results__list-item');

  function clickApplyWithDelay(index) {
    if (index < jobListings.length) {
      const jobListing = jobListings[index];
      const applyButton = jobListing.querySelector('a, button');
      if (applyButton) {
        applyButton.click();

        // Wait for the job listing details to load before clicking the Easy Apply button
        setTimeout(() => {
          const easyApplyButton = document.querySelector(
            'button.jobs-apply-button'
          );
          if (easyApplyButton) {
            easyApplyButton.click();

            // Wait for the "Easy Apply" process to be initiated before clicking "Next"
            setTimeout(() => {
              const nextButton = document.querySelector(
                'button[data-easy-apply-next-button]'
              );
              if (nextButton) {
                nextButton.click();
              }
              // Stop after the first job listing if testMode is true
              if (testMode) {
                console.log('Test mode: Stopping after first job listing.');
                return;
              }
              // Proceed to the next job listing if testMode is false
              setTimeout(() => clickApplyWithDelay(index + 1), 2000);
            }, 1000); // Adjust the delay if needed to match loading time for "Next" button
          }
        }, 1000); // Adjust the delay if needed to match loading time for "Easy Apply" button
      } else {
        // Proceed to the next job listing if no apply button was found
        setTimeout(() => clickApplyWithDelay(index + 1), 2000);
      }
    }
  }

  clickApplyWithDelay(0);
}

automateEasyApply();
