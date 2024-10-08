function fn(maxCount) {
    let gotItClickCount = 0;

    function triggerConnectAndSend() {
        // Click "Got it" button if it exists and hasn't been clicked 4 times yet
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
                if (span && span.textContent.trim() === "Send without a note") {
                    sendButton.click();
                }
            }
        }

        buttons.forEach(function(button) {
            var span = button.querySelector('span.artdeco-button__text');
            if (span && span.textContent.trim() === "Connect") {
                button.click();
                setTimeout(clickSendWithoutNoteButton, 1000);
                connectButtonClicked = true;
            }
        });

        // If no "Connect" buttons were clicked, click the "Next" button
        if (!connectButtonClicked) {
            var nextButton = document.querySelector('.artdeco-pagination__button--next');
            if (nextButton) {
                nextButton.click();
            }
        }
    }

    triggerConnectAndSend();
    let count = 0;
    const intervalId = setInterval(() => {
        triggerConnectAndSend();
        count++;

        if (count >= maxCount) {
            clearInterval(intervalId);
        }
    }, 1000);
}
