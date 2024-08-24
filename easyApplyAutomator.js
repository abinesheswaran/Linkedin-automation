function automateEasyApply() {
  const jobListings = document.querySelectorAll(
    '.jobs-search-results__list-item'
  );
  function clickApplyWithDelay(index) {
    if (index < jobListings.length) {
      const applyButton = jobListings[index].querySelector('a, button');
      if (applyButton) {
        applyButton.click();
      }
      setTimeout(() => clickApplyWithDelay(index + 1), 2000);
    }
  }
  clickApplyWithDelay(0);
}
automateEasyApply();
