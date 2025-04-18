function fn(maxCount) {
    let gotItClickCount = 0;

    function triggerConnectAndSend() {
        var gotItButton = document.querySelector('button[aria-label="Got it"]');
        if (gotItButton && gotItClickCount < 4) {
            gotItButton.click();
            gotItClickCount++;
        }

        var buttons = document.querySelectorAll('.artdeco-button--2');
        var connectButtonClicked = false;

        function clickSendWithoutNoteButton() {
            var sendButton = document.querySelector('.artdeco-button--primary.ml1');
            if (sendButton) {
                var span = sendButton.querySelector('span.artdeco-button__text');
                if (span && span.textContent.trim() === 'Send without a note') {
                    sendButton.click();
                }
            }
        }

        function handleEmailPopup() {
            var emailInput = document.querySelector('input[type="email"]');
            if (emailInput) {
                emailInput.value = "abinesh17a@gmail.com"; // Set the email value
                var inputEvent = new Event('input', { bubbles: true });
                emailInput.dispatchEvent(inputEvent); // Trigger the input event to simulate typing

                var doneButton = document.querySelector('.artdeco-button--primary.ml1'); // Look for the "Done" or similar button
                if (doneButton) {
                    doneButton.click();
                }
                return true;
            }
            return false;
        }

        buttons.forEach(function (button) {
            var span = button.querySelector('span.artdeco-button__text');
            if (span && span.textContent.trim() === 'Connect') {
                button.click();
                setTimeout(() => {
                    if (!handleEmailPopup()) { // If the email popup doesn't appear, proceed normally
                        clickSendWithoutNoteButton();
                    }
                }, 1000);
                connectButtonClicked = true;
            }
        });
    }

    async function clickNextButton() {
        const buttons = document.querySelectorAll('button');

        let followOrMessageButtonFound = false;
        let connectButtonFound = false;

        for (const button of buttons) {
            const text = button.textContent.trim();
            if (text === 'Follow' || text === 'Message' || text === 'Pending') {
                followOrMessageButtonFound = true;
                break;
            }
        }

        if (followOrMessageButtonFound) {
            for (const button of buttons) {
                if (button.textContent.trim() === 'Connect') {
                    connectButtonFound = true;
                    break;
                }
            }

            if (connectButtonFound) {
                triggerConnectAndSend();
            } else {
                console.log('************* clicking next page button ***********');
                var nextButton = document.querySelector(
                    '.artdeco-pagination__button--next'
                );
                if (nextButton) nextButton.click();
            }
        } else {
            console.log('No Follow or Message button is there.');
        }
    }

    async function startProcess() {
        for (let count = 0; count < maxCount; count++) {
            await clickNextButton(); // Wait for each call to complete
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay before the next iteration
        }
    }

    startProcess();
}
fn(400);
